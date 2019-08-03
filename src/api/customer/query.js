import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//公告列表
export const getList = data => {
    return request('get', `${serverUrl}/customer/list?${stringify(data)}`).then(result => result)
}

//公告列表
export const detail = data => {
    return request('get', `${serverUrl}/customer/info/${data.id}`).then(result => result)
}