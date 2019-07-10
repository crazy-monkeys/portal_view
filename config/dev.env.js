'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')



module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_ROOT: '"http://47.100.106.186/portal-api"'
        // API_ROOT: '"http://192.168.101.14:8080"'
})