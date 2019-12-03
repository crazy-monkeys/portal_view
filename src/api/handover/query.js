import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//下载模版
export const getList = data => {
    return request('get', `${serverUrl}/handover/sales/customer/data?${stringify(data)}`).then(result => result)
}