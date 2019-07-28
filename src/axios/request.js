// import 'babel-polyfill';
require('es6-promise').polyfill();
import axios from 'axios'
import { Message } from 'element-ui';

// 配置API接口地址
// used environment variable
export const serverUrl = process.env.API_ROOT; // 本地


// 自定义判断元素类型JS
function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
export const request = (method, url, data = {}, header = {}) => {

    const dataType = method.toLocaleLowerCase() === 'get' ? 'params' : 'data'
    let options = {
        url,
        method,
        [dataType]: data,
        headers: {
            'Authorization': sessionStorage.getItem('data'),
            'Content-Type': 'application/json;charset=UTF-8',
            ...header
        }
    }
    return axios(options)
        .then(result => {
            if (result.data && result.data.code === 1) {
                return result
            }
            Message.error(result.data.msg)
        })
        .catch(err => {
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(err.response.data);
                Message.error(err.response.data.msg)
            } else if (err.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(err.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', err.message);
            }
            console.log(err)
        })
}