import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//子账号列表
export const getList = data => {
    return request('get', `${serverUrl}/subAgent/list?${stringify(data)}`).then(result => result)
}

//新增子账号
export const subAgentAdd = data => {
    return request('post', `${serverUrl}/subAgent/register`, data).then(result => result)
}

//新增子账号
export const subAgentMod = data => {
    return request('post', `${serverUrl}/subAgent/update`, data).then(result => result)
}

//新增子账号
export const roleList = data => {
    return request('get', `${serverUrl}/subAgent/getRoles`).then(result => result)
}