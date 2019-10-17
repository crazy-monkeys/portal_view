import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//客户列表
export const getList = data => {
    return request('get', `${serverUrl}/handover?${stringify(data)}`).then(result => result)
}

export const confirm = data => {
    return request('get', `${serverUrl}/handover/deliver/data/email?${stringify(data)}`).then(result => result)
}
export const sure = data => {
    return request('get', `${serverUrl}/handover/deliver/data/confirm?${stringify(data)}`).then(result => result)
}