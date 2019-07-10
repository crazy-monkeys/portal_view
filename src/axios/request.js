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
            console.log(err)
        })
}