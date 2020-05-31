import optionPublicFun from '../../../utils/optionPublic.js'
class optionRadarFun {
  /**
   * @namespace radarLegend
   * @param {字体加粗} weight 
   * @param {字体大小} size 
   * @param {legend 位置} legendRight 
   * @param {城市的选择} selectedCity 
   * @author he
   * create in 19-11-28
   */
  radarLegend(weight, size, legendRight, selectedCity) {
    let legend = {
      type: 'scroll',
      orient: 'vertical',
      right: legendRight,
      top: '6%',
      // bottom: '3%',
      selectedMode: 'multiple',
      selected: selectedCity,
      textStyle: new optionPublicFun().textStyle(weight, size)
    }
    return legend
  }
  /**
   * @namespace radarLabel
   * @param {字体大小} size 
   */
  radarLabel(size){
    let label = {
      fontSize: size
    }
    return label;
  }
  /**
   * @namespace radarRadius
   * @param {判断路由是否为whole} flag 
   */
  radarRadius(flag) {
    let radius;
    if (flag) {
      radius = '68%';
    } else {
      radius = '85%';
    }
    return radius;
  }
}
export default optionRadarFun;