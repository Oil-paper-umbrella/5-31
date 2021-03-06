import axios from '../control/filter/http.js'
/**
 * @namespace getAllIndexs 获取所有指标
 */
let getAllIndexs = function () {
  return new Promise((resolve, reject)=>{
    axios.get('/api/dianyeAutho/rest/JsonData/allIndexs')
        .then(data=>{
          console.log("jj",data);
          if(data.status===200){
            //处理状态
            resolve(data.data);
          }else {
            reject(data.status)
          }
        })
  })
}
/**
 * @namespace getAllTimes 获取所有季度
 */
let getAllTimes = async function () {
  return new Promise((resolve, reject)=>{
    axios.get('/api/dianyeAutho/rest/JsonData/allTimes')
        .then(data=>{
          if(data.status===200){
            //处理状态
            resolve(data.data);
          }else {
            reject(data.status)
          }
        })
  })
}

let requestCommonData =  {
  getAllIndexs,
  getAllTimes
}
export default requestCommonData;