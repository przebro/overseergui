
export function isError(val){
    return (val && val.stack && val.message)?true:false;
}

export function getCurrentOdate(){
    let now  = new Date()
    let y = now.getFullYear()
    let m = now.getMonth() + 1
    let d = now.getDate()
    d = d<10? '0'+d:d;
    m = m<10? '0'+m:m;

    return y+""+m+""+d
 }