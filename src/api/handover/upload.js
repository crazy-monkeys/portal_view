import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//客户列表
export const download = data => {
        return request('get', `${serverUrl}/handover/template?${stringify(data)}`).then(result => result)
    }
    //客户列表
export const downloadError = data => {
    return request('get', `${serverUrl}/handover/error?${stringify(data)}`).then(result => result)
}

//客户列表
export const upload = data => {
        return request('post', `${serverUrl}/handover/template`, data).then(result => result)
    }
    //提交
export const sub = (data) => {
        return request('post', `${serverUrl}/handover/detail`, data).then(result => result)
    }
    //客户详情
export const detail = data => {
    return request('get', `${serverUrl}/customer/info/${data.id}`).then(result => result)
}

//删除报备
export const del = data => {
    return request('delete', `${serverUrl}/customer/info/${data.id}`).then(result => result)
}

//新增客户
export const add = data => {
    return request('post', `${serverUrl}/customer/info`, data, { 'Content-Type': 'multipart/form-data' }).then(result => result)
}


//新增客户
export const approve = data => {
    return request('get', `${serverUrl}/customer/approval?${stringify(data)}`).then(result => result)
}

//新增客户
export const ret = data => {
        return request('get', `${serverUrl}/customer/reject?${stringify(data)}`).then(result => result)
    }
    // boundary=----WebKitFormBoundaryooHyQ87B5UJFDb9I