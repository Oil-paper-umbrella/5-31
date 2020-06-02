<template>
  <div class="line-chart" v-bind:style="{height:clientHeight}">
    <div class="index-menu">
      <span class="menu-name">指标：</span>
      <el-cascader v-model="checkedVal" :options="allIndexs" size="small"></el-cascader>
    </div>
    <div id="line-container"></div>
  </div>
</template>

<script>
import dataPublicFun from "../../../utils/dataPublic.js";
import optionPublicFun from "../../../utils/optionPublic.js";
import dataLineFun from "./dataLine.js";
import optionLineFun from "./optionLine.js";
import requestCommonData from "../../../api/common.js";
import getLineChart from "../../../api/line.js";
require("echarts/lib/chart/line");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
require("echarts/lib/component/legendScroll");
require("echarts/lib/component/grid");
require("echarts/lib/component/dataZoom");
const selectedCity = {
  平顶山: true,
  安阳: false,
  鹤壁: false,
  济源: false,
  焦作: false,
  开封: false,
  洛阳: false,
  漯河: false,
  南阳: false,
  濮阳: false,
  三门峡: false,
  商丘: false,
  新乡: false,
  信阳: false,
  许昌: false,
  郑州: false,
  周口: false,
  驻马店: false
};
const colors = [
  "#600000",
  "#D9006C",
  "#AE00AE",
  "#6F00D2",
  "#FF60AF",
  "#B15BFF",
  "#0000C6",
  "#009393",
  "#FF0000",
  "#01B468",
  "#2894FF",
  "#00FFFF",
  "#F0FFF0",
  "#79FF79",
  "#424200",
  "#844200",
  "#FFFF37",
  "#FF8F59"
];
const defaultCityName = "平顶山";
export default {
  name: "echarts",
  data() {
    return {
      clientHeight: "100%",
      myChart: {},
      lineStyle: {
        weight: "bold",
        size: 14,
        orientData: "vertical",
        zoomHeight: "30"
      },
      flag: false,
      allIndexs: [],
      checkedVal: [] // 选中的 指标参数 和 季度参数
    };
  },
  mounted() {
    let nowPath = this.$route.path;
    if (nowPath == "/whole/line") {
      this.setClient();
    } else if (nowPath == "/whole") {
      this.flag = true;
    }
    this.getLineInfo()
  },
  methods: {
    async getLineInfo(){
      let indexData = await requestCommonData.getAllIndexs();
      this.requestAllIndexs(indexData.data)
      this.checkedVal = [indexData.data.Allindexs[1].iid];
    },
    reqGetInfo(getApi, resApi) {
      /**
       * 异步请求数据
       * */
      let result = Promise.all(getApi);
      result
        .then(data => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].code === 0) {
              resApi[i](data[i].data);
            } else {
              throw new Error(data[i].message);
            }
          }
        })
        .catch(error => {
          throw error;
        });
    },
    requestLineChartData(data) {
      this.setLineStyle(this.flag);
      this.lineCharts(data);
    },
    requestAllIndexs(data) {
      this.allIndexs = new dataPublicFun(data).getAllIndexs("line");
    },
    lineCharts(data) {
      let pd_this = this;
      let lineObj = this.lineStyle;
      let opPubFnc = new optionPublicFun();
      let daLineFnc = new dataLineFun(data);
      let opLineFnc = new optionLineFun(data);
      let option = {
        tooltip: opLineFnc.lineTooltip(lineObj.weight, lineObj.size),
        color: colors,
        dataZoom: opLineFnc.lineDataZoom(lineObj.zoomHeight),
        legend: opLineFnc.lineLegend(
          lineObj.weight,
          lineObj.size,
          lineObj.orientData,
          selectedCity
        ),
        grid: {
          bottom: "15%"
        },
        xAxis: opLineFnc.lineXaxis(
          daLineFnc.getAllTimes(),
          daLineFnc.getIndexCycle()
        ),
        yAxis: opLineFnc.lineYaxis(new dataPublicFun(data).getUnit("line")),
        series: daLineFnc.getLineData()
      };
      this.myChart = opPubFnc.init("line-container");
      this.myChart.setOption(option);
      // legend发生变化事件
      this.myChart.on("legendselectchanged", function(params) {
        let stack = opPubFnc.getStack(params);
        if (stack == 4) {
          pd_this.$message.warning({
            showClose: true,
            message: "糟糕，数据太多了，眼花缭乱的。请至多对三个地市进行比较"
          });
          pd_this.myChart.setOption(
            opPubFnc.initSelectedCity(
              params,
              defaultCityName,
              selectedCity,
              option
            )
          );
        }
      });
    },
    
    setClient() {
      let clientHeight = document.documentElement
        ? document.documentElement.clientHeight
        : document.body.clientHeight;
      this.clientHeight = clientHeight - 125 + "px";
    },
    // 设置 折线图 样式
    setLineStyle(flag) {
      if (flag) {
        this.lineStyle.weight = "normal";
        this.lineStyle.size = 12;
        this.lineStyle.orientData = "horizontal";
        this.lineStyle.zoomHeight = "20";
      }
    }
  },
  watch: {
    checkedVal: {
      handler: function(val) {
        let getApi = [getLineChart({ indexid: val[0] })];
        let resApi = [this.requestLineChartData];
        this.reqGetInfo(getApi, resApi);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.line-chart {
  width: 100%;
  height: 100%;
  position: relative;
  .index-menu,
  .index-menu:hover {
    display: inline-block !important;
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
  #line-container {
    width: 100%;
    height: 85%;
  }
}
</style>