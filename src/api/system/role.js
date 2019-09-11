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

//获取角色详情
export const findRole = data => {
    return request('get', `${serverUrl}/permission/findRole/${data.id}`).then(result => result)
}

//获取角色菜单
export const findRoleResource = data => {
        return request('get', `${serverUrl}/permission/findPermission/${data.id}`).then(result => result)
    }
    //获取角色菜单
export const modRolePermission = data => {
    return request('post', `${serverUrl}/permission/savePermission`, data).then(result => result)
}
export const delRow = data => {
    return request('delete', `${serverUrl}/permission/delete/${data.id}`).then(result => result)
}