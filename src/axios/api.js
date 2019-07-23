import service from "./request"
//post请求
export const postApi =(url,data) => {
    return service({
        url:url,
        method:"post",
        data:data
    })
}