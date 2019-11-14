import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'
//库存查询
export const inventoryDetail = data => {
    return request('post', `${serverUrl}/inventory/detail`, data).then(result => result)
}

export const inventorySummary = data => {
    return request('post', `${serverUrl}/inventory/summary`, data).then(result => result)
}