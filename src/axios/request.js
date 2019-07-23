import axios from "axios";
import {message} from 'antd';
import {qs} from "qs";
import {baseUrl} from "./baseurl"
const service=axios.create({
    baseURL:baseUrl,
    timeout:5000
})
function postParams(data) {
    let req = {
        form: '2',
        operateCode: '',
        operateName: '',
        reqData: data,
        sign: '',
        time: '',
        token: ''
    }
    return req
}
service.interceptors.request.use(config => {
    config.method==="post" ? config.data=postParams({...config.data}) : config.params={...config.params};
    config.headers["Content-Type"]="application/json;charset=utf-8";
    return config
},error => {
    message.warning(error, 2);
    return Promise.reject(error)
})

service.interceptors.response.use(response => {
        let res = response.data
        if (response.status === 200) {
            // 根据后端响应状态码 处理请求
            if (res.repCode === '0000') {
                return Promise.resolve(res)
            } else {
                if (response.config.responseType === 'json') {
                    message.error(res.repMsg, 2)
                }
                message.error(res.repMsg, 2)
                return Promise.resolve(res)
            }
        } else {
            return Promise.reject(res)
        }
    },
    error => {
        //  1.判断请求超时
        if (
            error.code === 'ECONNABORTED' &&
            error.message.indexOf('timeout') !== -1
        ) {
            message.error('请求超时，请稍后再试！',2)
            return Promise.reject(error)
            // return service.request(originalRequest);//例如再重复请求一次
        }
        if (error.response) {
            switch (error.response.status) {
                // 按照需求 处理异常
                case 401:
                    break
                case 403:
                    message.error('登录过期，请重新登录',2)
                    break
                case 404:
                    message.error( '服务器处理异常，请稍后再试！',2)
                    break
                default:
                    message.error('服务器处理异常，请稍后再试！',2)
            }
            return Promise.reject(error.response)
        } else {
            message.error('服务器处理异常，请稍后再试！',2)
            return Promise.reject(error.response)
        }
    }
)
export default service;