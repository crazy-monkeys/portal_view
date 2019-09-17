import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//列表
export const getList = data => {
        return request('get', `${serverUrl}/forecast/data/leader/query?${stringify(data)}`).then(result => result)
    }
    //列表
export const getSdList = data => {
    return request('get', `${serverUrl}/forecast/data/leader/query/sd?${stringify(data)}`).then(result => result)
}