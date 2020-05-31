import axios from '../control/filter/http.js'
/**
 * @namespace getFiles 获取所有权限
 * @author he
 * create in 2020-1-5
 */
let getFiles = async function () {
  return await axios
  .get(
    "/dianyeAutho/rest/JsonData/allFiles"
  )
}

/**
 * @namespace uploadFile 添加权限
 * @param {新增权限信息} body {"authorityName":"qq","authorityDescribe":"vv"}
 */
let uploadFile = async function (body) {
  return await axios
  .post(
    "/dianyeAutho/readExcelServlet",body
  )
}

let requestPower = {
  getFiles,
  uploadFile
}
export default requestPower;