'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')



module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // API_ROOT: '"http://192.168.101.14:8080/portal-api"'
    // API_ROOT: '"http://localhost:8080/portal-api"'
    // API_ROOT: '"http://192.168.101.15:8080/portal-api"'
    API_ROOT: '"http://portal.threeape.cn/portal-api"'
        // API_ROOT: '"http://192.168.101.6:8080/portal-api"'
        // API_ROOT: '"http://localhost:8080/portal-api"'
        // API_ROOT: '"http://192.168.101.3:9090/portal-api"'
        // API_ROOT: '"http://192.168.0.103:8080/portal-api"'
        // API_ROOT: '"https://result.eolinker.com/zClHbPQ1b2ab5ed3ffb38c435e1c4f71e0b2b62da68e2f7?uri="'
        // API_ROOT: '"http://192.168.101.14:8080"'
})