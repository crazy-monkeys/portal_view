import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'
//获取用户列表
export const getUserList = data => {
        return request('post', `${serverUrl}/user/list`, data).then(result => result)
    }
    //新建角色
export const saveRole = data => {
        return request('post', `${serverUrl}/permission/saveRole`, data).then(result => result)
    }
    //修改角色
export const updateRole = data => {
    return request('post', `${serverUrl}/permission/updateRole`, data).then(result => result)
}


//获取快照列表
export const sa = data => {
    return request('get', `${serverUrl}/snapshot?${stringify(data)}`).then(result => result)
}

//发送测试短信
export const savePermission = data => {
        return request('post', `${serverUrl}/permission/savePermission`, data).then(result => result)
    }
    //重新计算roi
export const recalculate = data => {
        return request('get', `${serverUrl}/marketing/notice/report/recalculation?${stringify(data)}`).then(result => result)
    }
    //活动报告
export const getReport = data => {
    return request('get', `${serverUrl}/marketing/notice/report?${stringify(data)}`).then(result => result)
}