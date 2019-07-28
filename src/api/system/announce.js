import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//公告列表
export const getList = data => {
    return request('get', `${serverUrl}/announcement/list?${stringify(data)}`).then(result => result)
}

//公告详情
export const detail = data => {
    return request('get', `${serverUrl}/announcement/preview/${data.id}`).then(result => result)
}

//撤销
export const cancel = data => {
    return request('get', `${serverUrl}/announcement/revoke/${data.id}`).then(result => result)
}

//发布
export const improve = data => {
    return request('get', `${serverUrl}/announcement/release/${data.id}`, data).then(result => result)
}

//新增修改
export const addAndEdit = data => {
    return request('post', `${serverUrl}/announcement/info`, data).then(result => result)
}

//资源详情
export const upload = data => {
        return request('post', `${serverUrl}/announcement/file`, data).then(result => result)
    }
    //资源详情
export const view = data => {
    return request('get', `${serverUrl}/announcement/file/${data.id}`).then(result => result)
}