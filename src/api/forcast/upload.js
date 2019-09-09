import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//列表
export const getQueryList = data => {
    return request('post', `${serverUrl}/price/actual/query`, data).then(result => result)
}