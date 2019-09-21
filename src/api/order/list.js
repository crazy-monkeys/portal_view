import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//客户列表
export const queryList = data => {
    return request('post', `${serverUrl}/order/query/list`, data).then(result => result)
}
export const detail = data => {
    return request('get', `${serverUrl}/order/approval/detail/${data.id}`).then(result => result)
}