import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//客户列表
export const getList = data => {
    return request('get', `${serverUrl}/customer/list?${stringify(data)}`).then(result => result)
}

//新增客户信息
export const addAndEdit = data => {
    return request('post', `${serverUrl}/customer/info`, data).then(result => result)
}

//客户详情
export const customDetail = data => {
    return request('get', `${serverUrl}/customer/info/${data.id}`).then(result => result)
}

//删除客户
export const customDel = data => {
    return request('delete', `${serverUrl}/customer/info/${data.id}`).then(result => result)
}

//查看用户中文名是否存在
export const checkCustomName = data => {
    return request('post', `${serverUrl}/customer/checkName`, data).then(result => result)
}

//审批通过
export const improve = data => {
    return request('get', `${serverUrl}/approval/${data.id}`).then(result => result)
}

//资源详情
export const upload = data => {
        return request('post', `${serverUrl}/announcement/file`, data).then(result => result)
    }
    //资源详情
export const view = data => {
    return request('get', `${serverUrl}/announcement/file/${data.id}`).then(result => result)
}