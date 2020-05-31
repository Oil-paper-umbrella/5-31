import optionPublicFun from '../../../utils/optionPublic.js'
import dataPublicFun from '../../../utils/dataPublic.js'
import dataBarFun from './dataBar.js'
let splitNum = 5;
class optionBarFun {
  constructor(data) {
    this.data = data;
  }
  /**
   * @namespace barTooltip 柱状图提示框
   * @param {x轴坐标数据} xData 
   * @param {字体加粗} weight 
   * @param {字体大小} size 
   * @author he
   * create in 19-11-27
   */
  barTooltip(xData, weight, size) {
    let toolTip = {
      type: "axis",
      textStyle: new optionPublicFun(this.data).textStyle(weight, size),
      formatter: (params) => {
        let sortIndex = new dataBarFun(this.data).rankScores(">"); // 对 得分 进行排序
        let index; // 排名
        for (let i = 0; i < sortIndex.length; i++) {
          if (xData[params.dataIndex] == sortIndex[i].cityName) {
            index = i;
            break;
          }
        }
        return (
          xData[params.dataIndex] +
          "<br/>" +
          params.seriesName +
          ":" +
          params.value +
          "分<br>" +
          "排名：" +
          (index + 1)
        );
      }
    };
    return toolTip;
  }
  /**
   * @namespace barLegend 柱状图图例
   * @param {字体加粗} weight 
   * @param {字体大小} size 
   */
  barLegend(weight, size) {
    let legend = {
      show: true,
      textStyle: new optionPublicFun(this.data).textStyle(weight, size)
    };
    return legend;
  }
  /**
   * @namespace barGrid 柱状图网格
   */
  barGrid() {
    let grid = [
      {//底下Y轴
        show: false,
        bottom: "12%",
        containLabel: false,
        height: "40%",
      },
      {//X轴
        show: false,
        top: "48%",
        height: "0%",
        zlevel: 100
      },
      {//上边Y轴
        show: false,
        top: "8%",
        containLabel: false,
        height: "40%"
      }
    ];
    return grid;
  }
  /**
   * @namespace barXaxis 柱状图 x 轴
   * @param {x轴数据} xData 
   */
  barXaxis(xData) {
    let xaxis = [
      {
        type: "category",
        position: "bottom",
        data: []
      },
      {//x轴样式
        gridIndex: 1,
        type: "category",
        position: "center",
        axisLine: {
          show: true,
          lineStyle: new optionPublicFun(this.data).lineStyle("#fff", 1)
        },
        zlevel: 200,
        axisLabel: {
          show: true,
          align: "center",
          textStyle: new optionPublicFun(this.data).textStyle("normal", 12),
          inside: true
        },
        data: xData,
        name: "城市",
        nameTextStyle: new optionPublicFun(this.data).textStyle("bold", 12)
      },
      {
        gridIndex: 2,
        type: "category",
        position: "top",
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        data: []
      }
    ];
    return xaxis;
  }
  /**
   * @namespace barYaxis 柱状图 y 轴
   * @param {指标单位} indexUnit 
   */
  barYaxis(indexUnit) {
    let yaxis = [
      {
        type: "value",
        inverse: true, //echarts Y轴翻转属性,
        position: "left", //位置属性
        axisLabel: {
          show: true,
          textStyle: new optionPublicFun(this.data).textStyle("bold", 12),
          formatter: function (value) {
            // 消除 下边 x轴 的原点值，避免其与上边 x轴 原点值交错
            let item = "";
            if (value == 0) {
              item = "";
            } else {
              item = value;
            }
            return item;
          }
        },
        axisLine: {
          lineStyle: new optionPublicFun(this.data).lineStyle("#fff", 1)
        },
        axisTick: {
          show: true,
          lineStyle: new optionPublicFun(this.data).lineStyle("#fff", 1)
        },
        splitLine: {
          show: true,
          lineStyle: new optionPublicFun(this.data).lineStyle("#1B283E", 1)
        },
        max: new dataBarFun(this.data).maxScoreWithAvg(),
        splitNumber: splitNum,
        // name: "低于平均值/" + indexUnit
        name: indexUnit
      },
      {
        gridIndex: 1, //对应的是grid  通过grid设置X Y相对位置
        show: false
      },
      {
        gridIndex: 2,
        type: "value",
        position: "left", //双Y轴一个翻转一个不翻转
        axisLine: {
          lineStyle: new optionPublicFun(this.data).lineStyle("#fff", 1)
        },
        axisLabel: {
          show: true,
          textStyle: new optionPublicFun(this.data).textStyle("bold", 12)
        },
        axisTick: {
          show: true,
          lineStyle: new optionPublicFun(this.data).lineStyle("#fff", 1)
        },
        splitLine: {
          show: true,
          lineStyle: new optionPublicFun(this.data).lineStyle("#1B283E", 1)
        },
        min: new dataPublicFun(this.data).minScore(),
        max: new dataPublicFun(this.data).maxScore(),
        splitNumber: splitNum,
        name: indexUnit,
        nameTextStyle: {
          fontWeight: "bold"
        }
      }
    ];
    return yaxis;
  }
  /**
   * @namespace barSeries 柱状图 series 数据
   * @param {其他十七地市得分} otherCityScore 
   * @param {平顶山市得分} pdCityScore 
   * @param {十八地市超过平均分} overAvg 
   * @param {十八地市低于平均分} belowAvg 
   */
  barSeries(otherCityScore, pdCityScore, overAvg, belowAvg) {
    let series = [
      {
        gridIndex: 0, //选取调整好的轴,调整图形是向上还是向下
        type: "bar",
        name: "得分",
        barWidth: "55%",
        data: otherCityScore, // 除 平顶山市 以外的17个城市对应得分
        xAxisIndex: 2,
        yAxisIndex: 2,
        stack: "城市得分",
        itemStyle: {
          color: "#76DA91"
        }
      },
      {
        gridIndex: 0, //选取调整好的轴,调整图形是向上还是向下
        type: "bar",
        name: "得分",
        barWidth: "55%",
        data: pdCityScore, // 平顶山市 得分
        xAxisIndex: 2,
        yAxisIndex: 2,
        stack: "城市得分",
        itemStyle: {
          color: "#F8CB7F"
        }
      },
      {
        gridIndex: 1, ////选取调整好的轴,调整图形是向上还是向下
        type: "bar",
        name: "超过平均分",
        barWidth: "55%",
        data: overAvg, // 超过平均多少，低于平均分值置为0
        itemStyle: {
          color: "#60C1DE"
        },
        stack: "与平均分的差"
      },
      {
        gridIndex: 1, ////选取调整好的轴,调整图形是向上还是向下
        type: "bar",
        name: "低于平均分",
        barWidth: "55%",
        data: belowAvg, // 低于平均分，超过平均分值置为0
        itemStyle: {
          color: "#C23531"
        },
        stack: "与平均分的差"
      }
    ]
    return series;
  }
}
export default optionBarFun;