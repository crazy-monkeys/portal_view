import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//客户列表
export const queryList = data => {
    return request('post', `${serverUrl}/order/query/list`, data).then(result => result)
}

export const detail = data => {
    return request('get', `${serverUrl}/order/query/detail/${data.id}`).then(result => result)
}

export const getCredit = data => {
    return request('get', `${serverUrl}/sys/dealer/getCredit/${data.id}`).then(result => result)
}

export const submitPro = data => {
    return request('post', `${serverUrl}/order/apply/submitOrderDelivery`, data).then(result => result)
}

export const getProList = data => {
    return request('post', `${serverUrl}/order/query/list/delivery`, data).then(result => result)
}
export const modPro = data => {
    return request('post', `${serverUrl}/order/apply/update/delivery`, data).then(result => result)
}
export const calPro = data => {
    return request('post', `${serverUrl}/order/apply/cancel/delivery`, data).then(result => result)
}
export const delPro = data => {
    return request('get', `${serverUrl}/order/apply/delete/delivery/${data.id}`).then(result => result)
}
export const getProDetail = data => {
    return request('get', `${serverUrl}/order/query/delivery/detail/${data.id}`).then(result => result)
}