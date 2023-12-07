export const cryptoOut=()=>{
    let str="";
    for(let i=0;i<4;i++){
        let r=Math.random();
        if(r<0.3){
            str+=String.fromCharCode("a".charCodeAt(0)+Math.round(Math.random()*25));
        }else if(r<0.7){
            str+=String.fromCharCode("A".charCodeAt(0)+Math.round(Math.random()*25));
        }else{
            str+=String.fromCharCode("0".charCodeAt(0)+Math.round(Math.random()*9));
        }
    }
    return str;
}