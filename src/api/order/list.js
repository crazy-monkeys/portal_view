import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//销售单列表
export const queryList = data => {
        return request('post', `${serverUrl}/order/query/list`, data).then(result => result)
    }
    //销售单明细
export const detail = data => {
        return request('get', `${serverUrl}/order/query/detail/${data.id}`).then(result => result)
    }
    //销售单明细
export const applyDetail = data => {
        return request('get', `${serverUrl}/order/apply/detail/${data.id}`).then(result => result)
    }
    //u获取授信额度
export const getCredit = data => {
        return request('get', `${serverUrl}/sys/dealer/getCredit/${data.id}`).then(result => result)
    }
    //提货
export const submitPro = data => {
    return request('post', `${serverUrl}/order/apply/submitOrderDelivery`, data).then(result => result)
}
export const submitFormModDate = (data, param) => {
        return request('post', `${serverUrl}/order/apply/modifyDeliveryDate/${data.orderId}`, param).then(result => result)
    }
    //提货单列表
export const getProList = data => {
        return request('post', `${serverUrl}/order/query/list/delivery`, data).then(result => result)
    }
    //修改提货单
export const modPro = data => {
        return request('post', `${serverUrl}/order/apply/update/delivery`, data).then(result => result)
    }
    //取消提货单
export const calPro = data => {
        return request('post', `${serverUrl}/order/apply/cancel/delivery`, data).then(result => result)
    }
    //删除提货单
export const delPro = data => {
        return request('get', `${serverUrl}/order/apply/delete/delivery/${data.id}`).then(result => result)
    }
    //提货单明细
export const getProDetail = data => {
        return request('get', `${serverUrl}/order/query/delivery/detail/${data.id}`).then(result => result)
    }
    //提货单审批明细
export const getProApprovalDetail = data => {
    return request('get', `${serverUrl}/order/query/delivery/approval/detail/${data.id}`).then(result => result)
}

//销售单取消
export const cancelOrder = (data, param) => {
    return request('post', `${serverUrl}/order/apply/cancel/${data.orderId}?${stringify(param)}`).then(result => result)
}


export const recevie = data => {
    return request('post', `${serverUrl}/order/apply/delivery/receiving`, data).then(result => result)
}