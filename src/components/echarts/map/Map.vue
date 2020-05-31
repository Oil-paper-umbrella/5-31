<template>
  <div class="map-chart">
    <div id="map-container"></div>
  </div>
</template>

<script>
require("echarts/map/js/province/henan");
import optionPublicFun from "../../../utils/optionPublic.js";
import optionMapFun from "./optionMap.js";
require("echarts/lib/chart/map");
require("echarts/lib/component/tooltip");
export default {
  name: "map-chart",
  data() {
    return {
      myChart: {},
      datas: [
        {
          name: "郑州市",
          value: 100,
          itemStyle: {
            normal: {
              areaColor: "#60C1DE"
            }
          }
        },
        {
          name: "开封市",
          value: 400,
          itemStyle: {
            normal: {
              areaColor: "#60C1DE"
            }
          }
        },
        {
          name: "洛阳市",
          value: 100,
          itemStyle: {
            normal: {
              areaColor: "#60C1DE"
            }
          }
        },
        {
          name: "平顶山市",
          value: 466,
          itemStyle: {
            normal: {
              areaColor: "#FCD85A"
            }
          }
        },
        {
          name: "焦作市",
          value: 100,
          itemStyle: {
            normal: {
              areaColor: "#60C1DE"
            }
          }
        },
        {
          name: "鹤壁市",
          value: 300,
          itemStyle: {
            normal: {
              areaColor: "#60C1DE"
            }
          }
        },
        {
          name: "新乡市",
          value: 500,
          itemStyle: {
            normal: {
              areaColor: "#60C1DE"
            }
          }
        },
        {
          name: "安阳市",
          value: 200,
          itemStyle: {
            normal: {
              areaColor: "#60C1DE"
            }
          }
        },
        {
          name: "濮阳市",
          value: 500,
          itemStyle: {
            normal: {
              areaColor: "#60C1DE"
            }
          }
        },
        {
          name: "许昌市",
          value: 200,
          itemStyle: {
            normal: {
              areaColor: "#60C1DE"
            }
          }
        },
        {
          name: "漯河市",
          value: 500,
          itemStyle: {
            normal: {
              areaColor: "#60C1DE"
            }
          }
        },
        {
          name: "三门峡市",
          value: 200,
          itemStyle: {
            normal: {
              areaColor: "#60C1DE"
            }
          }
        },
        {
          name: "南阳市",
          value: 400,
          itemStyle: {
            normal: {
              areaColor: "#60C1DE"
            }
          }
        },
        {
          name: "商丘市",
          value: 600,
          itemStyle: {
            normal: {
              areaColor: "#60C1DE"
            }
          }
        },
        {
          name: "信阳市",
          value: 300,
          itemStyle: {
            normal: {
              areaColor: "#60C1DE"
            }
          }
        },
        {
          name: "周口市",
          value: 600,
          itemStyle: {
            normal: {
              areaColor: "#60C1DE"
            }
          }
        },
        {
          name: "驻马店市",
          value: 300,
          itemStyle: {
            normal: {
              areaColor: "#60C1DE"
            }
          }
        },
        {
          name: "济源市",
          value: 600,
          itemStyle: {
            normal: {
              areaColor: "#60C1DE"
            }
          }
        }
      ],
      yData: [],
      barData: []
    };
  },
  created() {
    this.$nextTick(() => {
      this.dataInit();
      this.mapCharts();
    });
  },
  methods: {
    dataInit(){
      this.barData = this.datas;
      for (let i = 0; i < this.barData.length - 1; i++) {
        for (let j = 0; j < this.barData.length - 1 - i; j++) {
          if (this.barData[j].value < this.barData[j + 1].value) {
            let temp = this.barData[j];
            this.barData[j] = this.barData[j + 1];
            this.barData[j + 1] = temp;
          }
        }
      }
      for (let i = 0; i < this.barData.length - 1; i++) {
        this.yData.push(i + this.barData[i].name);
      }
    },
    mapCharts() {
      this.myChart = new optionPublicFun().init("map-container");
      this.myChart.setOption({
        title: new optionMapFun().mapTitle(),
        tooltip: new optionMapFun().mapTooltip(),
        grid: new optionMapFun().mapBarGrid(),
        xAxis: {
          show: false
        },
        yAxis: new optionMapFun().mapBarYaxis(this.yData),
        series: new optionMapFun().mapBarSeries(this.datas,this.barData)
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.map-chart {
  width: 100%;
  height: 100%;
  #map-container {
    width: 100%;
    height: 100%;
  }
}
</style>