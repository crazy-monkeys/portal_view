import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'
//获取用户列表
export const getUserList = (data, params) => {
        return request('post', `${serverUrl}/user/list?${stringify(data)}`, params).then(result => result)
    }
    //给用户授权（添加角色）
export const saveUserRole = data => {
    return request('post', `${serverUrl}/permission/improveUserPerm?${stringify(data)}`).then(result => result)
}