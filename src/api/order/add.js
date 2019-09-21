import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//客户列表
export const apply = data => {
    return request('post', `${serverUrl}/order/apply/submit`, data).then(result => result)
}