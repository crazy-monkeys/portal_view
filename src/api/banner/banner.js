import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//公告列表
export const getDealerInfo = () => {
    return request('get', `${serverUrl}/user/dealer/getDealerInfo`).then(result => result)
}

//新增修改
export const updateDealerInfo = data => {
    return request('post', `${serverUrl}/user/dealer/updateDealerInfo`, data).then(result => result)
}