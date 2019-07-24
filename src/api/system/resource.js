import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//所有资源
export const getResource = () => {
    return request('get', `${serverUrl}/permission/getAll`).then(result => result)
}

//删除资源
export const delResource = data => {
    return request('delete', `${serverUrl}/permission/delResource/${data.resourceId}`).then(result => result)
}

//新增资源
export const addResource = data => {
    return request('post', `${serverUrl}/permission/addResource`, data).then(result => result)
}

//修改资源
export const editResource = data => {
    return request('post', `${serverUrl}/permission/editResource`, data).then(result => result)
}

//资源详情
export const findResource = data => {
    return request('get', `${serverUrl}/permission/findRes/${data.resourceId}`).then(result => result)
}