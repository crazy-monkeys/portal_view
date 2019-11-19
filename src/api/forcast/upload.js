import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//列表
export const queryList = data => {
    return request('get', `${serverUrl}/forecast/agency/data/query`, data).then(result => result)
}
export const rejectList = data => {
    return request('get', `${serverUrl}/forecast/agency/data/reject`, data).then(result => result)
}

export const submit = data => {
    return request('get', `${serverUrl}/forecast/agency/data/submit?${stringify(data)}`).then(result => result)
}

export const update = data => {
    return request('post', `${serverUrl}/forecast/agency/data/update`, data).then(result => result)
}

export const del = data => {
    return request('get', `${serverUrl}/forecast/agency/data/delete?${stringify(data)}`).then(result => result)
}


export const temUpload = (data) => {
    return request('post', `${serverUrl}/forecast/agency/template/upload`, data).then(result => result)
}