import axios from '../control/filter/http.js'
/**
 * @namespace getFiles 获取所有权限
 * @author he
 * create in 2020-1-5
 */
let getFiles = async function () {
  return await axios
  .get(
    "/api/dianyeAutho/rest/JsonData/allFiles"
  )
}

let requestPower = {
  getFiles
}
export default requestPower;