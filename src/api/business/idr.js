import { request, serverUrl } from "../../axios/request";
import { stringify } from 'qs'

//客户列表
export const getList = data => {
    return request('get', `${serverUrl}/business/idr/list?${stringify(data)}`).then(result => result)
}

//详情
export const detail = data => {
    return request('get', `${serverUrl}/business/idr/find/${data.id}`).then(result => result)
}

//详情
export const commit = data => {
    return request('post', `${serverUrl}/business/idr/submit`, data).then(result => result)
}

//获取内部客户
export const getIn = data => {
        return request('get', `${serverUrl}/user/ships`).then(result => result)
    }
    //获取发货方编码
export const getCode = data => {
    return request('get', `${serverUrl}/param/list`).then(result => result)
}

//下载模版
export const download = data => {
    return request('get', `${serverUrl}/business/idr/templateDownload?${stringify(data)}`).then(result => result)
}