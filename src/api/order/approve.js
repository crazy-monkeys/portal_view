import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//客户列表
export const approveList = data => {
    return request('post', `${serverUrl}/order/approval/list`, data).then(result => result)
}
export const detail = data => {
    return request('get', `${serverUrl}/order/approval/detail/${data.id}`).then(result => result)
}
export const approve = data => {
    return request('post', `${serverUrl}/order/approval/approval`, data).then(result => result)
}
export const getCreditInfo = data => {
    return request('get', `${serverUrl}/order/approval/creditInfo/${data.id}`).then(result => result)
}