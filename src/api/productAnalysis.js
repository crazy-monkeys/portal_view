
import { serverUrl, request } from '@/axios/request.js'
import { stringify } from 'qs'

export const getProducts = params => {
  return request('get', `${serverUrl}/insight/goodSale/searchSkuShopList?${stringify(params)}`).then(result => result.data.data)
}

export const exportPorducts = params => {
  window.open(`${serverUrl}/insight/goodSale/exportShopTable?${stringify(params)}`)
}

export const getAllLinkedProducts = params => {
  return request('get', `${serverUrl}/insight/goodSale/getRelationSkuList?${stringify(params)}`).then(result => result.data.data)
}

export const exportAllLinkedProducts = params => {
  window.open(`${serverUrl}/insight/goodSale/exportRelationShopTable?${stringify(params)}`)
}

export const getLinkedProducts = params => {
  return request('get', `${serverUrl}/insight/goodSale/getOtherSkuList?${stringify(params)}`).then(result => result.data.data)
}

export const exportLinkedProducts  = params => {
  window.open(`${serverUrl}/insight/goodSale/exportOtherShopTable?${stringify(params)}`)
}
