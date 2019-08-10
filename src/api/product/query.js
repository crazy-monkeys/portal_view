import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//客户列表
export const getList = data => {
    return request('post', `${serverUrl}/product/getList`, data).then(result => result)
}