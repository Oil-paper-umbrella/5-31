class DataBarFun {
  constructor(data) {
    this.data = data;
  }
  /**
   * @namespace allCitysName  获取所有城市名称
   * @param {所有城市数组} cityArry 
   * @author he
   * create in 19-11-27
   */
  allCitysName(cityArry) {
    let cityNames = [];
    for (let i = 0; i < 18; i++) {
      cityNames.push(cityArry[i].cityName);
    }
    return cityNames;
  }
  /**
   * @namespace allCityScores 所有城市得分
   * @param {所有城市数组} cityArry 
   */
  allCityScores(cityArry) {
    let cityScores = [];
    for (let i = 0; i < 18; i++) {
      cityScores.push(cityArry[i].datas);
    }
    return cityScores;
  }
  /**
   * @namespace otherCityScores 获取除平顶山市以外其余地市的得分
   * @param {十八地市cityScore} cityArry 
   */
  otherCityScores(cityArry) {
    let cityScore = []; // 获取城市得分
    let score;
    for (let i = 0; i < 18; i++) {
      if (cityArry[i].cityName === "平顶山" || cityArry[i].cityName === "平顶山市") {
        score = 0;
      } else {
        score = cityArry[i].datas;
      }
      cityScore.push(score);
    }
    return cityScore;
  }
  /**
   * @namespace getPDScore 获取平顶山市的得分
   * @param {十八地市cityScore} cityArry 
   */
  getPDScore(cityArry) {
    let cityScores = []; // 获取城市得分
    let score;
    for (let i = 0; i < 18; i++) {
      if (cityArry[i].cityName == "平顶山" || cityArry[i].cityName === "平顶山市") {
        score = cityArry[i].datas;
      } else {
        score = 0;
      }
      cityScores.push(score);
    }
    return cityScores;
  }
  /**
   * @namespace overAverage 超过平均分
   * @param {十八地市所有得分} allcityScores 
   */
  overAverage(allcityScores) {
    let avg = this.data.cityScore[20].datas;
    let overAvgData = [];
    for (let i = 0; i < 18; i++) {
      let result = parseFloat((allcityScores[i] - avg).toFixed(2));
      if (result < 0) {
        result = 0;
      }
      overAvgData.push(result);
    }
    return overAvgData;
  }
  /**
   * @namespace belowAverage 低于平均分
   * @param {十八地市所有得分} allcityScores 
   */
  belowAverage(allcityScores) {
    let avg = this.data.cityScore[20].datas;
    let belowAvgData = [];
    for (let i = 0; i < 18; i++) {
      let result = parseFloat((allcityScores[i] - avg).toFixed(2));
      if (result < 0) {
        result = Math.abs(result);
      } else {
        result = 0;
      }
      belowAvgData.push(result);
    }
    return belowAvgData;
  }
  /**
   * @spacename rankScores 对城市得分进行排序
   * @param {排序符号} symbol 
   */
  rankScores(symbol) {

    let rankCityScores = []; // 数组中包含 cityName 跟 datas
    for (let i = 0; i < 18; i++) {
      rankCityScores.push(this.data.cityScore[i]);
    }
    if (symbol != undefined) {
      if (symbol === '<') {
        for (let i = 0; i < rankCityScores.length - 1; i++) {
          for (let j = 0; j < rankCityScores.length - 1 - i; j++) {
            if (rankCityScores[j].datas > rankCityScores[j + 1].datas) {
              let temp = rankCityScores[j]
              rankCityScores[j] = rankCityScores[j + 1]
              rankCityScores[j + 1] = temp
            }
          }
        }
      } else if (symbol === '>') {
        for (let i = 0; i < rankCityScores.length - 1; i++) {
          for (let j = 0; j < rankCityScores.length - 1 - i; j++) {
            if (rankCityScores[j].datas < rankCityScores[j + 1].datas) {
              let temp = rankCityScores[j]
              rankCityScores[j] = rankCityScores[j + 1]
              rankCityScores[j + 1] = temp
            }
          }
        }
      }
    }
    return rankCityScores;
  }
  /**
   * @maxScoreWithAvg 超过/低于平均分的最高分
   */
  maxScoreWithAvg() {
    let maxScore = this.data.cityScore[18].datas;
    let minScore = this.data.cityScore[19].datas;
    let avg = this.data.cityScore[20].datas;
    let overAvgs = (maxScore - avg).toFixed(2);
    let belowAvgs = (avg - minScore).toFixed(2);
    let maxData;
    if (overAvgs > belowAvgs) {
      maxData = overAvgs;
    } else {
      maxData = belowAvgs;
    }
    maxData = Math.ceil(maxData);
    return maxData;
  }
}
export default DataBarFun;