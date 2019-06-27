//引入VUEX
import Vue from 'vue'
import Vuex,{Store} from 'vuex'
Vue.use(Vuex)
import menu from './menu'
import loginUser from './loginUser'
import id from './id'
import shopId from './shopId'
import merchant from './merchant'

var store = new Store({
    modules:{
        menu,loginUser,id,shopId,merchant
    }
})

export default store