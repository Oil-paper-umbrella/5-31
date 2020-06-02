<template>
  <div class="bar-chart" v-bind:style="{ height: clientHeight }">
    <!-- 排序下拉菜单 -->
    <div class="bar-sort-menu">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          排序
          <i class="el-icon-arrow-down"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            @click.native="sort()"
            style="padding:0;width:75px;text-align:center;"
            >默认</el-dropdown-item
          >
          <el-dropdown-item
            @click.native="sort('>')"
            style="padding:0;width:75px;text-align:center;"
            >从高到低</el-dropdown-item
          >
          <el-dropdown-item
            @click.native="sort('<')"
            style="padding:0;width:75px;text-align:center;"
            >从低到高</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 指标级联框 -->
    <div class="index-menu">
      <span class="menu-name">指标：</span>
      <el-cascader
        v-model="checkedVal"
        :options="indicator"
        size="small"
        filterable
      ></el-cascader>
    </div>
    <!-- 渲染柱形图容器 -->
    <div id="bar-container"></div>
  </div>
</template>

<script>
import dataPublicFun from "../../../utils/dataPublic";
import optionPublicFun from "../../../utils/optionPublic.js";
import DataBarFun from "./dataBar.js";
import optionBarFun from "./optionBar.js";
import requestCommonData from "../../../api/common.js";
import getBarChart from "../../../api/bar.js";
require("echarts/lib/chart/bar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
require("echarts/lib/component/grid");
export default {
  name: "echarts",
  data() {
    return {
      clientHeight: "100%",
      myChart: {},
      barDataObj: {
        overAvg: [], // 超过平均分的 城市得分
        belowAvg: [], // 低于平均分的 城市得分
        xAxisData: [], // x轴城市名
        indexUnit: "", // 指标单位
        allCityScore: [], // 十八城市得分
        otherCityScore: [], // 其他十七个城市得分
        pdCityScore: [], // 平顶山市得分
        weight: "bold",
        size: 15,
      },
      storeData: null,
      flag: false, // 用于切换 字体样式
      indicator: [
        {
          value: 1,
          label: "指标",
          children: null,
        },
        {
          value: 2,
          label: "部门",
          children: [
            {
              value: "1",
              label: "安监部",
              children: [
                {
                  value: "13",
                  label: "期初值",
                },
                {
                  value: "14",
                  label: "1803",
                },
                {
                  value: "15",
                  label: "1903",
                },
              ],
            },
            {
              value: "2",
              label: "设备部",
              children: [
                {
                  value: "13",
                  label: "期初值",
                },
                {
                  value: "14",
                  label: "1803",
                },
                {
                  value: "15",
                  label: "1903",
                },
              ],
            },
            {
              value: "3",
              label: "国防部",
              children: [
                {
                  value: "13",
                  label: "期初值",
                },
                {
                  value: "14",
                  label: "1803",
                },
                {
                  value: "15",
                  label: "1903",
                },
              ],
            },
          ],
        },
      ],
      allIndexs: [],
      allTimes: [],
      checkedVal: [], // 选中的 指标参数 和 季度参数
    };
  },
  mounted() {
    // 判断当前页面路由 如果为 whole 则切换字体样式
    let nowPath = this.$route.path;
    if (nowPath == "/whole/bar") {
      this.setClient();
    } else if (nowPath == "/whole") {
      this.flag = true;
    }
    this.getBarInfo();
  },
  methods: {
    // 请求所有季度跟指标,默认初始渲染第一个季度跟第一个指标
    async getBarInfo() {
      let timeData = await requestCommonData.getAllTimes();
      let indexData = await requestCommonData.getAllIndexs();
      this.resuestAllTimes(timeData.data);
      this.resuestAllIndexs(indexData.data);
      this.checkedVal = [
        1,
        indexData.data.Allindexs[3].iid,
        timeData.data.Alltime[1].tid,
      ];
    },
    // 请求所有指标
    resuestAllIndexs(data) {
      this.allIndexs = new dataPublicFun(data).getAllIndexs(
        "bar",
        this.allTimes
      );
      this.indicator[0].children = this.allIndexs;
    },
    // 请求所有季度
    resuestAllTimes(data) {
      this.allTimes = new dataPublicFun(data).getAllTimes();
    },
    //设置legend样式
    setLegendStyle(flag) {
      if (flag) {
        this.barDataObj.weight = "normal";
        this.barDataObj.size = 12;
      }
    },
    /**
     * @name reqGetINfo 通过api 请求数据
     * @param resApi 响应数据处理队列
     * @param getApi APi请求队列
     * */
    reqGetInfo(getApi, resApi) {
      // 异步请求数据
      let result = Promise.all(getApi);
      result
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].code === 0) {
              resApi[i](data[i].data);
            } else {
              throw new Error(data[i].message);
            }
          }
        })
        .catch((error) => {
          throw error;
        });
    },
    /**
     * @namespace requestBarChartData 向后台发起请求
     */
    resuestBarChartData(data) {
      if (data.cityScore.length <= 0) {
        this.$message.error("请求数据为空");
      } else {
        this.setLegendStyle(this.flag);
        this.barCharts(data);
        this.storeData = data;
        this.initCompont(data);
      }
    },
    /**
     * @namespace init 用来初始化bar数据模板
     * @param data 后台响应的数据
     */
    initCompont(data, types) {
      let barObj = this.barDataObj;
      let barFnc = new DataBarFun(data);
      let pubFnc = new dataPublicFun(data);
      let sortCityArray;
      // 对数据进行排序 symbol(空、>、<)
      if (types) {
        sortCityArray = barFnc.rankScores(types);
      } else {
        sortCityArray = barFnc.rankScores(types);
      }
      barObj.indexUnit = pubFnc.getUnit("bar"); // 获取 指标单位
      barObj.xAxisData = barFnc.allCitysName(sortCityArray); // 获取排序过后 x轴城市名
      barObj.allCityScore = barFnc.allCityScores(sortCityArray); // 获取 18 个城市得分
      barObj.otherCityScore = barFnc.otherCityScores(sortCityArray); // 获取除 平顶山市 以外的 17个 城市得分
      barObj.pdCityScore = barFnc.getPDScore(sortCityArray); // 获取 平顶山市 的得分
      barObj.overAvg = barFnc.overAverage(barObj.allCityScore); // 高于平均分的得分，若低于平均分，该城市得分为 0
      barObj.belowAvg = barFnc.belowAverage(barObj.allCityScore); // 获取低于平均分的得分，若高于平均分，该城市得分为 0
    },
    /**
     * @namespace sort 对18个城市得分进行排序
     * @param symbol 排序符  >、<、空
     */
    sort(symbol) {
      this.initCompont(this.storeData, symbol);
    },
    barCharts(data) {
      this.myChart = new optionPublicFun().init("bar-container");
      let opBarFnc = new optionBarFun(data);
      // 数据渲染
      this.myChart.setOption({
        legend: opBarFnc.barLegend(
          this.barDataObj.weight,
          this.barDataObj.size
        ),
        tooltip: opBarFnc.barTooltip(
          this.barDataObj.xAxisData,
          this.barDataObj.weight,
          this.barDataObj.size
        ),
        grid: opBarFnc.barGrid(),
        xAxis: opBarFnc.barXaxis(this.barDataObj.xAxisData),
        yAxis: opBarFnc.barYaxis(this.barDataObj.indexUnit),
        series: opBarFnc.barSeries(
          this.barDataObj.otherCityScore,
          this.barDataObj.pdCityScore,
          this.barDataObj.overAvg,
          this.barDataObj.belowAvg
        ),
      });
    },
    setClient() {
      let clientHeight = document.documentElement
        ? document.documentElement.clientHeight
        : document.body.clientHeight;
      this.clientHeight = clientHeight - 125 + "px";
    },
  },
  watch: {
    barDataObj: {
      handler: function(val) {
        this.barDataObj = val;
        this.barCharts(this.storeData);
      },
      deep: true,
    },
    checkedVal: {
      handler: function(val) {
        let getApi = [getBarChart({ timeid: val[2], indexid: val[1] })];
        let resApi = [this.resuestBarChartData];
        this.reqGetInfo(getApi, resApi);
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.bar-chart {
  width: 100%;
  position: relative;
  .bar-sort-menu {
    position: absolute;
    right: 4%;
    top: 0px;
    .el-dropdown {
      color: white;
      z-index: 100;
      width: 75px;
      text-align: center;
      line-height: 32px;
      border-radius: 5px;
      border: 1px solid #60c1de;
    }
    .el-dropdown-menu {
      background-color: #fff;
      border: 1px solid #fff;
      padding: 0;
      user-select: none;
    }
    .el-dropdown-menu__item:focus,
    .el-dropdown-menu__item:not(.is-disabled):hover {
      background-color: #fff;
      color: #3d97f5;
      border-radius: 5px;
    }
  }
  .index-menu,
  .index-menu:hover {
    display: inline-block;
    margin: 0 10px;
    .el-input__inner {
      background-color: #111739;
      border: 1px solid #60c1de;
      color: #fff;
    }
    .el-input__inner:hover {
      border: 1px solid #60c1de;
    }
    .menu-name {
      font-size: 13px;
      color: #60c1de;
    }
  }
  #bar-container {
    margin-top: 10px;
    width: 100%;
    height: 90%;
  }
}
</style>
