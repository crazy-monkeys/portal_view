// import 'babel-polyfill';
require('es6-promise').polyfill();
import axios from 'axios'
import { Message, Loading, MessageBox } from 'element-ui';

// 配置API接口地址
// used environment variable
export const serverUrl = process.env.API_ROOT; // 本地
// axios.defaults.withCredentials = true;


let loading
let pending = []
let loadingArr = []
let CancelToken = axios.CancelToken

let cancelPending = (config) => {
    pending.forEach((item, index) => {
        if (config) {
            if (item.UrlPath === config.url) {
                item.Cancel() // 取消请求
                pending.splice(index, 1) // 移除当前请求记录
            };
        } else {
            item.Cancel() // 取消请求
            pending.splice(index, 1) // 移除当前请求记录
        }
    })
}


let startLoading = (config) => { // 使用Element loading-start 方法
    loading = Loading.service({
        // target: '.jobBox',
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0)',
        url: config.url
    })
    loadingArr.push(loading)
}
let endLoading = (config) => { // 使用Element loading-close 方法
    // loading.close()
    loadingArr.forEach(item => {
        if (config) {
            if (item.url === config.url) {
                item.close()
            };
        } else {
            item.close() // 取消请求
        }
    })


}

// 自定义判断元素类型JS
function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

axios.interceptors.request.use(
    config => {
        //console.log(config)
        cancelPending(config)
        config.cancelToken = new CancelToken(res => {
            pending.push({ 'UrlPath': config.url, 'Cancel': res })
        })
        startLoading(config)
        return config
    },
    (error, response) => {
        // //console.log(111111)

        //console.log(error)
        //console.log(response)
    }
)

axios.interceptors.response.use(
    response => {
        // setTimeout(() => {
        endLoading(response.config)
        cancelPending(response.config)
            // }, 500);
            // //console.log(response)
        if (response.headers.authorization) {
            // //console.log(111111)
            // //console.log(sessionStorage.getItem('data'))
            sessionStorage.setItem('data', response.headers.authorization)
        }
        return response
    }, (error, res) => {
        //console.log(error, res)
        // //console.log(22222)
        endLoading(error.config)
        return Promise.reject(error)
    }
)

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
            ...header,
        }
    }
    return axios(options)
        .then(result => {
            if (result.data && result.data.code === 1) {
                // //console.log(result)

                return result
            }
            Message.error(result.data.msg)
        })
        .catch(err => {
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (err.status == 404) {
                    Message.error('错误的请求')
                }
                if (err.response.data.code == 10005) {
                    // //console.log(err.response.data);
                    // Message.error(err.response.data.msg)
                    MessageBox.alert('会话已经过期', '提示', {
                            showClose: false,
                            distinguishCancelAndClose: true,
                            confirmButtonText: '确定',
                            // cancelButtonText: '取消'
                        })
                        .then(() => {
                            // //console.log(window)
                            window.location.href = '/portal'
                        })
                        .catch(action => {

                        });
                }
                if (err.response.data.code == 10004) {
                    // //console.log(err.response.data);
                    // Message.error(err.response.data.msg)
                    MessageBox.alert('未登录', '提示', {
                            showClose: false,
                            distinguishCancelAndClose: true,
                            confirmButtonText: '确定',
                            // cancelButtonText: '取消'
                        })
                        .then(() => {
                            // //console.log(window)
                            window.location.href = '/portal'
                        })
                        .catch(action => {

                        });
                }

            } else if (err.request) {

                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // // //console.log(err.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                // // //console.log('Error', err.message);
            }
            // // //console.log(err)
        })
}