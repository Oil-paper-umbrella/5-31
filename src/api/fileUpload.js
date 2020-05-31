
import Http from "../http/http.js";
export let fileUpload = async (file)=> {
  let param = new FormData();
  param.append('upload',file);
  return Http({
      method: 'post',
      url: '/dianyeAutho/readExcelServlet',
      headers: {"mimeType": "multipart/form-data"},
      data: param
  })
};