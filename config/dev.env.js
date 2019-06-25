'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')



module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://shopcat-sit.baozun.com/crm-web"'
})
//http://10.45.80.129:8082
// http://10.45.81.146:8082
// http://10.11.107.90:8080/crm-branch
//http://10.11.107.91:8082/uat-web-api
// http://shopcat-sit.baozun.com/crm-web
