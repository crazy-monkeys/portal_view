import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//客户列表
export const getMore = (data, param) => {
    return request('get', `${serverUrl}/handover/detail/${data.id}?${stringify(param)}`).then(result => result)
}