import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//公告列表
export const getList = data => {
    return request('get', `${serverUrl}/param/selectAll?${stringify(data)}`).then(result => result)
}

//新增修改
export const addAndEdit = data => {
    return request('post', `${serverUrl}/param/saveOrUpdate`, data).then(result => result)
}


//获取类型
export const getType = data => {
    return request('get', `${serverUrl}/sys/selectByMAndF/${data.model}/${data.func}`).then(result => result)
}

export const getShip = () => {
    return request('get', `${serverUrl}/user/dealer/getShip`).then(result => result)
}


export const getDealerList = () => {
    return request('get', `${serverUrl}/sys/dealer/list`).then(result => result)
}