import optionPublicFun from '../../../utils/optionPublic.js'
import dataLineFunc from './dataLine.js'
class optionLineFun {
  constructor(data) {
    this.data = data;
  }
  /**
   * @namespace lineTooltip
   * @param {字体加粗} weight 
   * @param {字体大小} size 
   * @author he
   * create in 19-11-27
   */
  lineTooltip(weight, size) {
    let tooltip = {
      trigger: 'axis',
      textStyle: new optionPublicFun().textStyle(weight, size)
    };
    return tooltip;
  }
  /**
   * @namespace lineDataZoom
   * @param {zoomData 高度} zoomHeight 
   */
  lineDataZoom(zoomHeight) {
    let result = [
      {
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2
        },
        textStyle: {
          color: '#fff'
        },
        height: zoomHeight,
        bottom: "0"
      },
      {
        type: 'inside'
      }
    ]
    return result;
  }
  /**
   * @namespace lineLegend
   * @param {字体加粗} weight 
   * @param {字体大小} size 
   * @param {legend垂直/水平显示} orientData 
   * @param {选中城市} selectedCity 
   */
  lineLegend(weight, size, orientData, selectedCity) {
    let legend = {
      orient: orientData,
      type: 'scroll',
      right: 10,
      top: 8,
      selectedMode: 'multiple',
      selected: selectedCity,
      textStyle: new optionPublicFun().textStyle(weight, size)
    }
    return legend;
  }
  /**
   * @namespace lineXaxis
   * @param {季度} cycle 
   * @param {18个地市同一季度的得分} indicatorValue 
   */
  lineXaxis(indicatorValue, indexCycle) {
    let xaxis = {
      axisLine: {
        show: true,
        lineStyle: new optionPublicFun().lineStyle("#fff", 1)
      },
      axisLabel: {
        show: true,
        textStyle: new optionPublicFun().textStyle("normal", 12),
        nameTextStyle: new optionPublicFun().textStyle("bold", 12)
      },
      data: indicatorValue,//该指标的周期值（指标值）
      name: indexCycle
    }
    return xaxis;
  }
  /**
   * @namespace lineYaxis
   * @param {指标单位} indexUnit 
   */
  lineYaxis(indexUnit) {
    let yaxis = {
      type: 'value',
      axisLabel: {
        formatter: '{value} '
      },
      axisLine: {
        lineStyle: new optionPublicFun().lineStyle("#fff", 1)
      },
      textStyle: new optionPublicFun().textStyle("normal", 12),
      nameTextStyle: new optionPublicFun().textStyle("bold", 12),
      name: indexUnit,
      splitLine: {
        show: true,
        lineStyle: new optionPublicFun().lineStyle("#1B283E", 1)
      },
      min: new dataLineFunc(this.data).lineMinScore()
    }
    return yaxis
  }
}


// 折线图
/**
 * @namespace lineTooltip 折线图提示框
 * **/
// let lineTooltip = function(weight,size){
//   return {
//     trigger: 'axis',
//     textStyle: optionPublicFun.textStyle(weight,size)
//   }
// }
// /**
//  * @namespace lineDataZoom 折线图数据缩放
//  * **/
// let lineDataZoom = function(){
//   return [
//     {
//       handleStyle: {
//         color: '#fff',
//         shadowBlur: 3,
//         shadowColor: 'rgba(0, 0, 0, 0.6)',
//         shadowOffsetX: 2,
//         shadowOffsetY: 2
//       },
//       textStyle: {
//         color: '#fff'
//       }
//     },
//     {
//       type: 'inside'
//     }
//   ]
// }
// /**
//  * @namespace lineLegend 折线图 小图例
//  * @param selectedCity  城市默认状态 是 显示 还是 不显示
//  * **/
// let lineLegend = function(weight,size,orientData,selectedCity){
//   return {
//     orient: orientData,
//     type: 'scroll',
//     right: 10,
//     top: 8,
//     selectedMode: 'multiple',
//     selected: selectedCity,
//     textStyle: optionPublicFun.textStyle(weight,size)
//   }
// }
// /**
//  * @namespace lineXaxis 折线图 x轴样式 和 数值
//  * @param indicatorValue  季度(周期)值 
//  * **/
// let lineXaxis = function(indicatorValue){
//   return { 
//     axisLine: {
//       show: true,
//       lineStyle: optionPublicFun.lineStyle("#fff",1)
//     },
//     axisLabel: {
//       show: true,
//       textStyle: optionPublicFun.textStyle("normal",12),
//       nameTextStyle: optionPublicFun.textStyle("bold",12)
//     },
//     data: indicatorValue,//该指标的周期值（指标值）
//     name: "季度"
//   }
// }
// /**
//  * @namespace lineYaxis 折线图 y轴 样式和数值
//  * @param indexUnit  指标单位 
//  * **/
// let lineYaxis = function(indexUnit){
//   return {
//     type: 'value',
//     axisLabel: {
//       formatter: '{value} '
//     },
//     axisLine: {
//       lineStyle: optionPublicFun.lineStyle("#fff",1)
//     },
//     textStyle: optionPublicFun.textStyle("normal",12),
//     nameTextStyle: optionPublicFun.textStyle("bold",12),
//     name: indexUnit,
//     splitLine: {
//       show: true,
//       lineStyle: optionPublicFun.lineStyle("#1B283E",1)
//     },
//     min: 70
//   }
// }

// let optionLineFun ={//所有方法的集合
//   lineTooltip,//传入子指标/指标值，获取对应索引号，通用
//   lineDataZoom,
//   lineLegend,
//   lineXaxis,
//   lineYaxis
// }
export default optionLineFun;