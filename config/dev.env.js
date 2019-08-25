'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')



module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // API_ROOT: '"http://192.168.101.14:8080/portal-api"'
    // API_ROOT: '"http://192.168.101.15:8080/portal-api"'
    API_ROOT: '"http://47.100.106.186/portal-api"'
        // API_ROOT: '"http://192.168.101.16/portal-api"'
        // API_ROOT: '"http://192.168.101.3:8080/portal-api"'
        // API_ROOT: '"http://192.168.101.6:8081/portal-api"'
        // API_ROOT: '"https://result.eolinker.com/zClHbPQ1b2ab5ed3ffb38c435e1c4f71e0b2b62da68e2f7?uri="'
        // API_ROOT: '"http://192.168.101.14:8080"'
})