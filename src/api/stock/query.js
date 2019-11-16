import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'
//明细查询
export const inventoryDetail = data => {
    return request('post', `${serverUrl}/inventory/detail`, data).then(result => result)
}


//汇总查询
export const inventorySummary = data => {
    return request('post', `${serverUrl}/inventory/summary`, data).then(result => result)
}

//转换
export const inventoryConversion = data => {
    return request('post', `${serverUrl}/inventory/conversion`, data).then(result => result)
}

//转移
export const inventoryTransfer = data => {
    return request('post', `${serverUrl}/inventory/transfer`, data).then(result => result)
}


//获取转入客户
export const getCustList = data => {
    return request('get', `${serverUrl}/sys/dealer/incustomer`).then(result => result)
}