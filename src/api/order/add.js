import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//客户列表
export const apply = data => {
    return request('post', `${serverUrl}/orderAapply/apply`, data).then(result => result)
}