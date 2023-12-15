import axios from "axios";
const url="http://47.113.205.105/myweb3/doFileDownServlet";
export const doFileDownload = async (params) => {
    return await axios.get(url,{
        params,
        responseType:"blob"
    });
}