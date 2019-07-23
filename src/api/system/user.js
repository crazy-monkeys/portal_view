import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'
//获取用户列表
export const getUserList = data => {
        return request('post', `${serverUrl}/user/list`, data).then(result => result)
    }
    //获取角色列表
export const getRoles = data => {
        return request('post', `${serverUrl}/permission/roleInfo`, data).then(result => result)
    }
    //get
export const sa = data => {
        return request('get', `${serverUrl}/snapshot?${stringify(data)}`).then(result => result)
    }
    //给用户授权（添加角色）
export const saveRole = data => {
    return request('post', `${serverUrl}/permission/savePermission`, data).then(result => result)
}