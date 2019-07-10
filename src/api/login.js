import { request } from '../axios/request'

const loginServer = {
    getTestData(params) {
        return request({
            methods: 'Post',
            url: '/user/login',
            params: params
        })
    }
}
export default {
    loginServer
}