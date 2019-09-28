import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

export const apply = data => {
    return request('post', `${serverUrl}/order/apply/create`, data).then(result => result)
}