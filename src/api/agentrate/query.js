import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//代理商费率列表
export const getList = data => {
    return request('get', `${serverUrl}/agencyRate/list?${stringify(data)}`).then(result => result)
}

//代理商费率列表
export const approve = data => {
    return request('get', `${serverUrl}/agencyRate/approve/${data.ids}`).then(result => result)
}