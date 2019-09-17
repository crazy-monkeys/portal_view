import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//询价列表
export const getList = data => {
    return request('post', `${serverUrl}/price/enquiryApproval/query`, data).then(result => result)
}

//新建询价
export const approve = data => {
        return request('post', `${serverUrl}/price/enquiryApproval/approval`, data).then(result => result)
    }
    //新建询价
export const getDetail = data => {
    return request('post', `${serverUrl}/price/catalog/detail`, data).then(result => result)
}