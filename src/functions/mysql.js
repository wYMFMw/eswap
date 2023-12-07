import axios from "axios";
// const preurl="http://127.0.0.1:8998/myweb3/";
const preurl="http://47.113.205.105/myweb3/";
export const doQuery=async (params)=>{
    let xparams=JSON.stringify(params);
    let url=preurl+"doQueryServlet?paramvalues="+encodeURIComponent(xparams);
    return await axios.post(url)
}
export const doUpdate=async (params)=>{
    let xparams=JSON.stringify(params);
    let url=preurl+"doUpdateServlet?paramvalues="+encodeURIComponent(xparams);
    return await axios.post(url)
}
export const doQueryTree=async (params)=>{
    params.style=params.style??"tree";
    //这里默认的style是tree，但如果取的数据并不符合树结构，可以设置style为datagrid
    let xparams=JSON.stringify(params);
    let url=preurl+"doTreeServlet?paramvalues="+encodeURIComponent(xparams);
    return await axios.post(url)
}