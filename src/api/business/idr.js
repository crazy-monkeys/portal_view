import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//客户列表
export const getList = data => {
    return request('get', `${serverUrl}/business/idr/list?${stringify(data)}`).then(result => result)
}

//客户列表
export const detail = data => {
    return request('get', `${serverUrl}/business/idr/find/${data.id}`).then(result => result)
}