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
    return request('delete', `${serverUrl}/customer/info/${data.id}`).then(result => result)
}

//新增客户
export const add = data => {
    return request('post', `${serverUrl}/customer/info`, data).then(result => result)
}