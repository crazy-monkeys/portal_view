import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//下载模版
export const download = data => {
        return request('get', `${serverUrl}/handover/template?${stringify(data)}`).then(result => result)
    }
    //下载错误数据
export const downloadError = data => {
    return request('get', `${serverUrl}/handover/error?${stringify(data)}`).then(result => result)
}

//上传
export const upload = data => {
        return request('post', `${serverUrl}/handover/template`, data).then(result => result)
    }
    //提交
export const sub = (data) => {
        return request('post', `${serverUrl}/handover/detail`, data).then(result => result)
    }
    //驳回记录
export const getReject = data => {
    return request('get', `${serverUrl}/handover/dealer/reject?${stringify(data)}`).then(result => result)
}

//上传页面查询部分
export const getList = data => {
    return request('get', `${serverUrl}/handover/dealer/detail?${stringify(data)}`).then(result => result)
}

//确认  通过或者驳回
export const operat = (data, param) => {
    return request('get', `${serverUrl}/handover/operation/${data.id}?${stringify(param)}`).then(result => result)
}