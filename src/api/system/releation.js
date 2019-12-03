import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//公告列表
export const getList = data => {
    return request('post', `${serverUrl}/user/mapping`, data).then(result => result)
}

export const dealerList = () => {
    return request('get', `${serverUrl}/sys/user/list`).then(result => result)
}

export const csList = () => {
    return request('get', `${serverUrl}/sys/cs/list`).then(result => result)
}

export const dsList = () => {
    return request('get', `${serverUrl}/sys/ds/list`).then(result => result)
}

export const addReleation = data => {
    return request('post', `${serverUrl}/user/createMapping`, data).then(result => result)
}