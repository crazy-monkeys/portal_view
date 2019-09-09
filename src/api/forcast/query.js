import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//询价列表
export const getList = data => {
    return request('post', `${serverUrl}/price/actual/query`, data).then(result => result)
}