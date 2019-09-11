import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//列表
export const getList = data => {
    return request('get', `${serverUrl}/forecast/data/query?${stringify(data)}`).then(result => result)
}