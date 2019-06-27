
import { serverUrl, request } from '@/axios/request.js'
import { stringify } from 'qs'

export const getRetainedList = params => {
  return request('get', `${serverUrl}/report/retained/list?${stringify(params)}`, {}).then(result => result.data.data)
}

export const exportRetainedList = params => {
  window.open(`${serverUrl}/report/retained/exportRetainedData?${stringify(params)}`)
  // return request('post', `${serverUrl}/report/retained/exportRetainedData`, params, {'Content-Type': 'text/html;charset=UTF-8'}).then(result => result.data.data)
}

export const getRepurchaseList = params => {
  return request('get', `${serverUrl}/report/rePurchase/list?${stringify(params)}`).then(result => result.data.data)
}

export const exportRepurchaseList = params => {
  window.open(`${serverUrl}/report/rePurchase/exportRePurchaseData?${stringify(params)}`)
  // return request('post', `${serverUrl}/report/rePurchase/exportRePurchaseData`, params, {'Content-Type': 'text/html;charset=UTF-8'}).then(result => result.data.data)
}
