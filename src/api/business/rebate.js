import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//客户rebate列表
export const getList = data => {
        return request('get', `${serverUrl}/business/rebate/list?${stringify(data)}`).then(result => result)
    }
    //rebate查询列表
export const queryList = data => {
        return request('get', `${serverUrl}/business/rebate/items?${stringify(data)}`).then(result => result)
    }
    //详情
export const detail = data => {
    return request('get', `${serverUrl}/business/rebate/find/${data.id}`).then(result => result)
}

//发送确认函
export const send = data => {
    return request('post', `${serverUrl}/business/rebate/confirm`, data).then(result => result)
}

//详情
export const getAll = data => {
    return request('get', `${serverUrl}/customer/all`).then(result => result)
}