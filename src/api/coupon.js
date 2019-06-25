
import { serverUrl, request } from '@/axios/request.js'
import { stringify } from 'qs'

export const getMerchant = params => {
  return request('get', `${serverUrl}/merchantIds?${stringify(params)}`).then(result => result.data.data)
}

export const getTmallCoupons = params => {
  return request('get', `${serverUrl}/coupon/tmall/configs?${stringify(params)}`).then(result => result.data.data)
}

export const modifyTmallCoupon = data => {
  return request('post', `${serverUrl}/coupon/tmall/config`, data).then(result => result.data.data)
}

export const getTmallCouponDetail = params => {
  return request('get', `${serverUrl}/coupon/tmall/configInfo?${stringify(params)}`).then(result => result.data.data)
}

export const delTmallCoupon = data => {
  return request('post', `${serverUrl}/coupon/tmall/config/del`, data).then(result => result.data.data)
}

export const getCouponData = params => {
  return request('get', `${serverUrl}/coupon/tmall/config/data?${stringify(params)}`).then(result => result.data.data)
}
