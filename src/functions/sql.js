import axios from "axios"
const ajax=async (url,data={},type="GET")=>{
    return new Promise((resolve,reject)=>{
        let promise;
        if(type=="GET"){
            promise=axios.get(url,{
                params:data
            }) 
        }else{
            promise=axios.post(url,data);
        }
        promise.then(response=>{
            resolve(response.data)
        }).catch(e=>{
            console.log("请求出错了:"+e);
        })
    })
}
export const domySQL=(params)=>{
    if(params.nodetype==undefined)params.nodetype="datagrid";
    let xparams=JSON.stringify(params);
    let url="http://localhost:8080/myServer/doSQL?paramvalues="+encodeURIComponent(xparams);
    return ajax(url,{},"POST");
}