<template>
  <div class="radar-chart" v-bind:style="{height:clientHeight}">
    <div id="radar-container"></div>
  </div>
</template>

<script>
import optionPublicFun from "../../../utils/optionPublic.js";
import optionRadarFun from "./optionRadar.js";
require("echarts/lib/chart/radar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legendScroll");
require("echarts/lib/component/legend");
const selectedCity = {
  平顶山市: true,
  安阳市: false,
  鹤壁市: false,
  济源市: false,
  焦作市: false,
  开封市: false,
  洛阳市: false,
  漯河市: false,
  南阳市: false,
  濮阳市: false,
  三门峡市: false,
  商丘市: false,
  新乡市: false,
  信阳市: false,
  许昌市: false,
  郑州市: false,
  周口市: false,
  驻马店市: false
};
const citysColor = [
  "#600000",
  "#D9006C",
  "#AE00AE",
  "#FF0000",
  "#6F00D2",
  "#FF60AF",
  "#B15BFF",
  "#0000C6",
  "#009393",
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
const defaultCityName = "平顶山市";
export default {
  name: "echarts",
  data() {
    return {
      clientHeight: "100%",
      myChart: {},
      radarLegendStyle: {
        weight: "bold",
        size: 14,
        legendRight: 150,
        width: 4
      },
      datas: [
        { name: "郑州市", value: [112, 153, 125, 145] },
        { name: "开封市", value: [140, 135, 120, 144] },
        { name: "洛阳市", value: [132, 142, 103, 192] },
        { name: "平顶山市", value: [114, 123, 105, 119] },
        { name: "焦作市", value: [152, 145, 168, 172] },
        { name: "鹤壁市", value: [102, 154, 168, 145] },
        { name: "新乡市", value: [121, 126, 145, 168] },
        { name: "安阳市", value: [112, 134, 162, 191] },
        { name: "濮阳市", value: [102, 113, 154, 187] },
        { name: "许昌市", value: [148, 156, 170, 185] },
        { name: "漯河市", value: [131, 152, 144, 168] },
        { name: "三门峡市", value: [130, 145, 162, 178] },
        { name: "南阳市", value: [121, 143, 155, 146] },
        { name: "商丘市", value: [149, 151, 172, 181] },
        { name: "信阳市", value: [141, 135, 162, 188] },
        { name: "周口市", value: [130, 151, 126, 135] },
        { name: "驻马店市", value: [154, 162, 155, 185] },
        { name: "济源市", value: [143, 154, 166, 178] }
      ],
      flag: false
    };
  },
  created() {
    this.$nextTick(() => {
      this.setLegendStyle();
      this.radarCharts();
    });
  },
  methods: {
    setClient() {
      let clientHeight = document.documentElement
        ? document.documentElement.clientHeight
        : document.body.clientHeight;
      this.clientHeight = clientHeight - 125 + "px";
    },
    setLegendStyle() {
      if (this.flag) {
        this.radarLegendStyle.weight = "normal";
        this.radarLegendStyle.size = 9;
        this.radarLegendStyle.legendRight = "3%";
        this.radarLegendStyle.width = 2;
      }
    },
    radarCharts() {
      let radarObj = this.radarLegendStyle;
      let pd_this = this;
      let opPubFnc = new optionPublicFun();
      let opRadarFnc = new optionRadarFun();
      this.myChart = opPubFnc.init("radar-container");
      let option = {
        legend: opRadarFnc.radarLegend(
          radarObj.weight,
          radarObj.size,
          radarObj.legendRight,
          selectedCity
        ),
        color: citysColor,
        tooltip: {}, // 不可删除，用于提示
        radar: {
          name: {
            fontSize: this.radarLegendStyle.size
          },
          axisLabel: {
            show: true,
            showMaxLabel: true, //不显示最大值，即外圈不显示数字30
            showMinLabel: true //显示最小数字，即中心点显示0
          },
          indicator: [
            { name: "电网发展质量", max: 200, color: "#fff" },
            { name: "公司管理效率", max: 200, color: "#D8514B", axisLabel:{show:false} },
            { name: "创新创效能力", max: 200, color: "#54DCF2", axisLabel:{show:false} },
            { name: "基础保障力", max: 200, color: "#FCD85A", axisLabel:{show:false} }
          ],
          center: ["41%", "50%"],
          radius: opRadarFnc.radarRadius(this.flag),
          color: [],
          label: opRadarFnc.radarLabel(this.radarLegendStyle.size),
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.4)"
            }
          },
          splitArea: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.4)"
            }
          }
        },
        series: [
          {
            type: "radar",
            lineStyle: {
              normal: {
                width: 3
              }
            },
            symbolSize: 8,
            data: this.datas
          }
        ]
      };
      this.myChart.setOption(option);
      // legend 变化事件
      this.myChart.on("legendselectchanged", function(params) {
        let stack = opPubFnc.getStack(params);
        if (stack == 4) {
          pd_this.$message.warning({
            showClose: true,
            message: "糟糕，数据太多了，眼花缭乱的。请至多对三个地市进行比较"
          });
          let newOption = opPubFnc.initSelectedCity(
            params,
            defaultCityName,
            selectedCity,
            option
          );
          pd_this.myChart.setOption(newOption);
        }
      });
    }
  },
  mounted() {
    let nowPath = this.$route.path;
    if (nowPath == "/whole/radar") {
      this.setClient();
    } else if (nowPath == "/whole") {
      this.flag = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.radar-chart {
  width: 100%;
  #radar-container {
    width: 100%;
    height: 100%;
  }
}
</style>