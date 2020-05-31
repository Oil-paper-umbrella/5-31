// const initialValue = "期初值"

class dataLineFun {
  constructor(data) {
    this.data = data;
  }
  /**
   * @namespace getAllTimes 获取除期初值以外的所有季度
   * @author he
   * create in 19-11-27
   */
  getAllTimes() {
    let indexAllTimes = this.data.allTimes;
    let newIndexTimes = [];
    for (let i = 0; i < indexAllTimes.length; i++) {
      // if (indexAllTimes[i] != initialValue) {
        newIndexTimes.push(indexAllTimes[i]);
      // }
    }
    return newIndexTimes;
  }
  /**
   * @namespace seriesDatas 获得绘制所有地市的数据
   */
  getLineData() {
    let seriesDatas = [];
    let cityArry = this.data.cityScore;
    for (let i = 0; i < 18; i++) {
      let cityName = cityArry[i].cityName;
      let cityDatas = cityArry[i].dataList;
      seriesDatas.push({
        name: cityName,
        type: 'line',
        data: cityDatas
      })
    }
    return seriesDatas;
  }
  /**
   * @namespace getIndexCycle 获得指标周期单位 (季度)
   */
  getIndexCycle() {
    let cycle = this.data.indexInfo.circle;
    return cycle;
  }
  /**
   * @namespace lineMinScore 获得折线图的最小值
   */
  lineMinScore(){
    let score = this.data.cityScore[19].dataList;
    let minScore = score[0]
    for(let i in score){
      if(minScore > score[i]){
        minScore = score[i]
      }
    }
    minScore = Math.floor(minScore);
    return minScore;
  }
}
export default dataLineFun;