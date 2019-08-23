import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//询价列表
export const getList = data => {
    return request('post', `${serverUrl}/price/enquiry/query`, data).then(result => result)
}

//新建询价
export const addEnquiry = data => {
    return request('post', `${serverUrl}/price/enquiry/apply`, data).then(result => result)
}