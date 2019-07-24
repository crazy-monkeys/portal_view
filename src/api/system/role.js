import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//新建角色
export const saveRole = data => {
        return request('post', `${serverUrl}/permission/saveRole`, data).then(result => result)
    }
    //修改角色
export const updateRole = data => {
    return request('post', `${serverUrl}/permission/updateRole`, data).then(result => result)
}

//获取所有角色
export const getRolesAll = () => {
        return request('get', `${serverUrl}/permission/findRoles`).then(result => result)
    }
    //获取角色列表 分页
export const getRoles = data => {
    return request('get', `${serverUrl}/permission/rolePageInfo`, data).then(result => result)
}