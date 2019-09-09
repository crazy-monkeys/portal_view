import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//客户列表
export const getList = data => {
    return request('get', `${serverUrl}/customer/list?${stringify(data)}`).then(result => result)
}

//客户详情
export const detail = data => {
    return request('get', `${serverUrl}/customer/info/${data.id}`).then(result => result)
}

//删除报备
export const del = data => {
    return request('get', `${serverUrl}/customer/delete/${data.id}`).then(result => result)
}

//新增客户
export const add = data => {
        return request('post', `${serverUrl}/customer/report`, data, { 'Content-Type': 'multipart/form-data' }).then(result => result)
    }
    //新增客户
export const update = data => {
    return request('post', `${serverUrl}/customer/update`, data, { 'Content-Type': 'multipart/form-data' }).then(result => result)
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



//新增客户
export const checkCust = data => {
    return request('get', `${serverUrl}/customer/check/${data.name}`).then(result => result)
}