// import 'babel-polyfill';
require('es6-promise').polyfill();
import axios from 'axios'
import { Message } from 'element-ui';

// 配置API接口地址
// used environment variable
export const serverUrl = process.env.API_ROOT; // 本地
// const serverUrl = 'https://unicrm.baozun.com/member-union'; // 生产地址
// const serverUrl = 'http://106.75.81.206/member-union'; // 测试地址
// const serverUrl = 'http://10.88.12.32:8080/member-union'; // 测试地址
// const bathUrl = 'http://127.0.0.1:9000';
// const bathUrl = 'https://unicrm.baozun.com';
// const bathUrl = 'http://106.75.81.206';

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
  .catch(function(err) {
    if (err) {
      Message.error(err.message)
    }
  })
}
