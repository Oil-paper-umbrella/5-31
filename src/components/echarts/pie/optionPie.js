import optionPublicFun from '../../../utils/optionPublic.js'
import dataPieFun from './dataPie.js';

class optionPieFun {
  constructor(data) {
    this.data = data;
  }
  /**
   * @namespace firstPieTooltip
   * @param {字体加粗} weight 
   * @param {字体大小} size 
   * @param {饼图级别} type
   * @author yqf
   * created in 19-11-24
   */
  firstPieTooltip(weight, size, type) {
    let toolTip = {
      trigger: 'item',
      textStyle: new optionPublicFun().textStyle(weight, size),
      formatter: (params) => {
        let allModulesScore = new dataPieFun(this.data).indexAllScore(type);
        let allSum = 0;
        for(let i=0;i<allModulesScore.length;i++){
          allSum += allModulesScore[i];
        }
        let indexScore = new dataPieFun(this.data).indexAllScore(type)[params.dataIndex];
        return params.name + "<br />得分：" + params.value + "分" + "<br/>满分：" + indexScore + "分" + "<br>预期占比：" + (indexScore/allSum)*100 + "%" + "<br>实际占比：" + params.percent + "%" ;
      }
    }
    return toolTip;
  }
  /**
   * @namespace firstPieLegend
   * @param {字体加粗} weight 
   * @param {字体大小} size 
   * @param {leng定位} legendRight 
   */
  firstPieLegend(weight, size, legendRight) {
    let legend = {
      orient: 'vertical',
      right: legendRight,
      top: '30%',
      textStyle: new optionPublicFun().textStyle(weight, size)
    }
    return legend;
  }
  /**
   * @namespace pieLabel
   * @param {字体大小} size 
   */
  pieLabel(size) {
    let label= {
      fontSize: size
    }
    return label;
  }
  /**
   * @namespace firstPieSeries
   * @param {判断饼图类型} type 
   */
  firstPieSeries(type) {
    let result = [
      {
        type: 'pie',
        radius: '75%',
        center: ['43%', '50%'],
        data: null,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
    let pieFnc = new dataPieFun(this.data);
    let status = {
      "first": () => {
        return pieFnc.fourModuleData()
      },
      "second": () => {
        return pieFnc.subIndexScoreOfModule(this.data)
      }
    }
    if (status[type]) {
      result[0]['data'] = status[type]();
    }
    else
      throw new Error("firstPieSeries param type is coundn't find");
    return result;
  }
}
export default optionPieFun;