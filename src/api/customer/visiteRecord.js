import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//摆放记录列表
export const getList = data => {
    return request('get', `${serverUrl}/customer/visitRecord/list?${stringify(data)}`).then(result => result)
}

//客户列表
export const download = () => {
    return request('get', `${serverUrl}/customer/visitRecord/download`).then(result => result)
}