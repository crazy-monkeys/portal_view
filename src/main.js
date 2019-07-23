// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入echarts
import VCharts from 'v-charts'
import echarts from "echarts"
Vue.prototype.$echarts = echarts;
import './axios/http'
//解决urlsearchparams  的兼容问题
import 'url-search-params-polyfill'
//解决ie不支持 ES6 问题
import 'babel-polyfill'
//引入 ele ui
import '../ele/index.css'
import ElementUI from 'element-ui';
Vue.use(ElementUI);
Vue.use(echarts)
Vue.use(VCharts)
import { HappyScroll } from 'vue-happy-scroll'
//自定义组件名
Vue.component('happy-scroll', HappyScroll)
    // 引入css
import 'vue-happy-scroll/docs/happy-scroll.css'

import formTest from './assets/js/formTest.js'
Vue.prototype.$formTest = formTest;
Vue.config.productionTip = false
    //引入仓库
import store from './store'
//默认样式
import './assets/css/common.css'
import './assets/css/animate.css'
import './assets/iconfont/iconfont.css'
import './assets/css/el.css'

import Print from 'vue-print-nb'

Vue.use(Print); //注册
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>',
    store,
    render: h => h(App)
})