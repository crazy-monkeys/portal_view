import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//列表
export const getList = data => {
    return request('get', `${serverUrl}/forecast/list?${stringify(data)}`).then(result => result)
}


export const getDealerList = data => {
    return request('get', `${serverUrl}/sys/user/list`, data).then(result => result)
}


export const add = data => {
    return request('post', `${serverUrl}/forecast/save`, data).then(result => result)
}


export const mod = data => {
    return request('post', `${serverUrl}/forecast/update`, data).then(result => result)
}

