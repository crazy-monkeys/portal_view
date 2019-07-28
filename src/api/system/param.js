import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//公告列表
export const getList = data => {
    return request('get', `${serverUrl}/sys/param/selectAll?${stringify(data)}`).then(result => result)
}

//新增修改
export const addAndEdit = data => {
    return request('post', `${serverUrl}/sys/param/saveOrUpdate`, data).then(result => result)
}