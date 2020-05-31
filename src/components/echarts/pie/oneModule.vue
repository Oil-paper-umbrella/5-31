<template>
  <div class="pie-chart" v-bind:style="{height:clientHeight}">
    <div class="index-menu">
      <span class="menu-name">指标：</span>
      <el-cascader v-model="checkedVal" :options="allIndexs" size="small"></el-cascader>
    </div>
    <div id="one-module-container"></div>
  </div>
</template>

<script>
import optionPublicFun from "../../../utils/optionPublic.js";
import optionPieFun from "./optionPie.js";
// import getFourModual from "../../../api/modules.js";
import getOneModual from "../../../api/oneModule.js";
import requestCommonData from "../../../api/common.js";
import dataPublicFun from "../../../utils/dataPublic";
const colors = ["#FCD85A", "#0084C8", "#D8514B", "#9CCB63"];
require("echarts/lib/chart/pie");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
export default {
  name: "echarts",
  data() {
    return {
      clientHeight: "100%",
      myChart: {},
      allIndexs: [],
      allTimes: [],
      checkedVal: [],
      indexs: []
    };
  },
  mounted() {
    this.setClient();
    let m = parseInt(this.$route.params.module);
    let t = parseInt(this.$route.params.time);
    this.checkedVal = [m, t];
    this.getOneModuleInfo()
  },
  methods: {
    setClient() {
      let clientHeight = document.documentElement
        ? document.documentElement.clientHeight
        : document.body.clientHeight;
      this.clientHeight = clientHeight - 125 + "px";
    },
    async getOneModuleInfo(){
      let timeData = await requestCommonData.getAllTimes();
      this.requestAllTimes(timeData.data);
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
    requestOneModuleData(data) {
      this.oneModulePieCharts(data);
    },
    // 请求所有季度
    requestAllTimes(data) {
      this.allTimes = new dataPublicFun(data).getAllTimes();
    },
    oneModulePieCharts(data) {
      this.myChart = new optionPublicFun().init("one-module-container");
      let opPieFnc = new optionPieFun(data);
      this.myChart.setOption({
        color: colors,
        tooltip: opPieFnc.firstPieTooltip("bold", 14, "second"),
        legend: opPieFnc.firstPieLegend("bold", 14, "13%"),
        series: opPieFnc.firstPieSeries("second")
      });
    }
  },
  watch: {
    checkedVal: {
      handler: function(val) {
        console.log("object one ");
        let getApi = [getOneModual({ timeid: val[1], moduleid: val[0] })];
        let resApi = [this.requestOneModuleData];
        this.reqGetInfo(getApi, resApi);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.pie-chart {
  width: 100%;
  height: 100%;
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
  #one-module-container {
    width: 100%;
    height: 100%;
  }
}
</style>