import { serverUrl, request } from '@/axios/request.js'
import { stringify } from 'qs'

export const getSnapshot = params => {
  return request('get', `${serverUrl}/snapshot?${stringify(params)}`).then(result => result.data.data)
}
