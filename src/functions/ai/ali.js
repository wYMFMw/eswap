import axios from "axios";
const preurl="http://47.113.205.105/myweb4/AliServlet";
export const doAliQuery = async (params) => {//axios非流式
    let xparams=JSON.stringify(params);
    let url=preurl+"?paramvalues="+encodeURIComponent(xparams);
    return await axios.post(url)
}