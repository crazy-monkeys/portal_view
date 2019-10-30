export default {
    // 用户名正则
    loginNameTest: (rule, value, callback) => {
        let loginNameReg = /^[a-zA-Z0-9_-]{4,16}$/
        if (!value) {
            callback(new Error('用户名不能为空'))
        }
        setTimeout(() => {
            if (!loginNameReg.test(value)) {
                callback(new Error('请输入4到16位（字母，数字，下划线，减号）'))
            } else {
                callback()
            }
        }, 500)
    },
    account: (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,10}$/;
        if (!value) {
            callback(new Error('账户不能为空'))
        }
        setTimeout(() => {
            if (!reg.test(value)) {
                callback(new Error('账户不能超过10个字符,且不能包含特殊字符'))
            } else {
                callback()
            }
        }, 500)
    },
    coupon: (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,10}$/;
        if (!value) {
            callback()
        }
        setTimeout(() => {
            if (!reg.test(value)) {
                callback(new Error('规则名称不能超过10个字符,且不能包含特殊字符'))
            } else {
                callback()
            }
        }, 500)
    },
    roleName: (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,10}$/;
        if (!value) {
            callback(new Error('角色名称不能为空'))
        }
        setTimeout(() => {
            if (!reg.test(value)) {
                callback(new Error('角色名称不能超过10个字符,且不能包含特殊字符'))
            } else {
                callback()
            }
        }, 500)
    },
    name: (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,10}$/;
        if (!value) {
            callback(new Error('姓名不能为空'))
        }
        setTimeout(() => {
            if (!reg.test(value)) {
                callback(new Error('姓名不能超过10个字符,且不能包含特殊字符'))
            } else {
                callback()
            }
        }, 500)
    },

    pwd: (rule, value, callback) => {
        var reg = /^(?=.*[0-9].*)(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*[~!@#$%^&*_+=-].*).{8,}$/
        if (!value) {
            callback(new Error('密码不能为空'))
        } else {
            if (!reg.test(value)) {
                callback(new Error('请输入正确的密码格式'))
            } else {
                callback()
            }
        }
    },
    passWordTest: (rule, value, callback) => {
        let passWordReg = /^[A-Za-z0-9]{8}$/;
        if (!value) {
            callback(new Error('密码不能为空'))
        }
        setTimeout(() => {
            if (!passWordReg.test(value)) {
                callback(new Error('请输入8位字母数字组合'))
            } else {
                callback()
            }
        }, 500)
    },
    contentTest: (rule, value, callback) => {
        // let contentReg = /[\u4E00-\u9FA5]/;
        if (!value) {
            callback(new Error('内容不能为空'))
        } else {
            callback()
        }
    },
    emailTest: (rule, value, callback) => {
        // let emailReg =/^([a-z0-9A-Z]+[-|\\.]?)+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$/
        let emailReg = /^[a-zA-Z0-9_-]+([-_.]{0,}[A-Za-z0-9])+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (value.length == 0) {
            callback(new Error('邮箱不能为空'))
        } else {
            if (!emailReg.test(value)) {
                callback(new Error('请输入正确的邮箱格式'))
            } else {
                callback()
            }
        }

    },
    pointTest: (rule, value, callback) => {
        var reg = /^(0|[1-9][0-9]{0,5})$/
        if (!value) {
            callback()
        } else {
            if (!reg.test(value)) {
                callback(new Error('请输入正确的积分数量'))
            } else {
                callback()
            }
        }

    },
    email1Test: (rule, value, callback) => {
        let emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (value.length == 0) {
            callback()
        } else {
            if (!emailReg.test(value)) {
                callback(new Error('请输入正确的邮箱格式'))
            } else {
                callback()
            }
        }

    },
    phoneTest: (rule, value, callback) => {
        let phoneReg = /^1[34578]\d{9}$/;
        // //console.log(value)
        if (value.length == 0) {
            callback(new Error('手机号码不能为空'))
        } else {
            if (!phoneReg.test(value)) {
                callback(new Error('请输入正确的手机号码'))
            } else {
                callback()
            }
        }
    },
    phone1Test: (rule, value, callback) => {
        let phoneReg = /^1[23456789]\d{9}$/;
        if (value.length == 0) {
            callback()
        } else {
            if (!phoneReg.test(value)) {
                callback(new Error('请输入正确的手机号码'))
            } else {
                callback()
            }
        }

    },

    memberVipCode: (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9]*$/;
        if (value.length == 0) {
            callback()
        } else {
            if (!reg.test(value)) {
                callback(new Error('请输入正确的会员ID'))
            } else {
                callback()
            }
        }

    },
    //英文字母汉字
    memberName: (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]*$/;
        if (value.length == 0) {
            callback()
        } else {
            if (!reg.test(value)) {
                callback(new Error('请输入正确的会员姓名'))
            } else {
                callback()
            }
        }
    },
    shopId: (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9]*$/;
        if (value.length == 0) {
            callback(new Error('店铺ID不能为空'))
        } else {
            if (!reg.test(value)) {
                callback(new Error('请输入正确的店铺ID'))
            } else {
                callback()
            }
        }
    },
    personName: (rule, value, callback) => {
        let reg = /^[a-zA-Z\u4e00-\u9fa5]*$/;
        if (value.length == 0) {
            callback(new Error('联系人姓名不能为空'))
        } else {
            if (!reg.test(value)) {
                callback(new Error('请输入正确的联系人姓名'))
            } else {
                callback()
            }
        }
    },
    sourceId: (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9]*$/;
        if (value.length == 0) {
            callback(new Error('渠道ID不能为空'))
        } else {
            if (!reg.test(value)) {
                callback(new Error('请输入正确的渠道ID'))
            } else {
                callback()
            }
        }
    },
    taobaoId: (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]*$/;
        if (value.length == 0) {
            callback()
        } else {
            if (!reg.test(value)) {
                callback(new Error('请输入正确的淘宝ID'))
            } else {
                callback()
            }
        }
    },
    idTest: (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]*$/;
        if (value.length == 0) {
            callback()
        } else {
            if (!reg.test(value)) {
                callback(new Error('请输入正确的旺旺ID'))
            } else {
                callback()
            }
        }
    },
    ipTest: (rule, value, callback) => {
        let ipReg = /(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})(\.(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})){3}/g;
        if (!ipReg.test(value)) {
            callback(new Error('请输入正确的ip地址'))
        } else {
            callback()
        }
    },
    pathTest: (rule, value, callback) => {

        if (value.indexOf('//') != -1 || value.indexOf('\\') != -1 || !value) {
            callback(new Error('请输入正确的路径（只能是/）'))
        } else {
            callback()
        }
    },
    nameTest: (rule, value, callback) => {
        var reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、 ]{1,5}$/
            // var reg = /^[^\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\|\\\;\:\'\"\,\.\<\>\/\?\ ]{1,5}$/;
        if (!value) {
            callback(new Error('属性名称不能为空'))
        } else {
            if (value.length > 5) {
                callback(new Error('属性名称最长不能超过5个字'))
            } else {
                if (!reg.test(value)) {
                    callback(new Error('属性名称不能包含特殊字符'))
                } else {
                    callback()
                }
            }
        }
    },
    shopNameTest: (rule, value, callback) => {
        var reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、 ]{1,15}$/
            // var reg = /^[^\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\|\\\;\:\'\"\,\.\<\>\/\?\ ]{1,5}$/;
        if (!value) {
            callback(new Error('店铺名称不能为空'))
        } else {
            if (value.length > 15) {
                callback(new Error('店铺名称最长不能超过15个字'))
            } else {
                if (reg.test(value)) {
                    callback(new Error('店铺名称不能包含特殊字符'))
                } else {
                    callback()
                }
            }
        }
    },
    sourceNameTest: (rule, value, callback) => {
        var reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、 ]{1,10}$/
            // var reg = /^[^\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\|\\\;\:\'\"\,\.\<\>\/\?\ ]{1,5}$/;
        if (!value) {
            callback(new Error('渠道名称不能为空'))
        } else {
            if (value.length > 10) {
                callback(new Error('渠道名称最长不能超过10个字'))
            } else {
                if (reg.test(value)) {
                    callback(new Error('渠道名称不能包含特殊字符'))
                } else {
                    callback()
                }
            }
        }
    },
    name5Test: (rule, value, callback) => {
        // var reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、 ]{1,30}$/
        var reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、 ]/im

        // var reg = /^[^\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\|\\\;\:\'\"\,\.\<\>\/\?]{1,30}$/;
        if (!value) {
            callback(new Error('等级名称不能为空'))
        } else {
            if (value.length > 30) {
                callback(new Error('等级名称最长不能超过30个字'))
            } else {
                if (reg.test(value)) {
                    callback(new Error('等级名称不能包含特殊字符'))
                } else {
                    callback()
                }
            }
        }
    },
    discountTest: (rule, value, callback) => {
        var reg = /^[0-9]{1}(\.\d{0,2})?$/
        if (!value) {
            callback()
        } else {
            if (!reg.test(value)) {
                callback(new Error('请输入正确的会员折扣'))
            } else {
                callback()
            }
        }
    },
    // 0和非0开头的数字
    num1Test: (rule, value, callback) => {
        var reg = /^(0|[1-9][0-9]*)$/
        if (!value) {
            callback()
        } else {
            if (!reg.test(value)) {
                callback(new Error('请输入正确的积分数量'))
            } else {
                callback()
            }
        }
    },
    moneyTest: (rule, value, callback) => {
        var reg = /[^\d]/g
        if (!value) {
            callback(new Error('累计交易金额不能为空'))
        } else {
            if (reg.test(value)) {
                callback(new Error('请输入正确的累计交易金额'))
            } else {
                callback()
            }
        }
    },
    name1Test: (rule, value, callback) => {
        // var reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、 ]{1,10}$/g
        var reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、 ]/im
            // var reg = /^[^\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\|\\\;\:\'\"\,\.\<\>\/\?]{1,10}$/;
        if (!value) {
            callback(new Error('目录名称不能为空'))
        } else {
            if (value.length > 10) {
                callback(new Error('目录名称最长不能超过10个字'))
            } else {
                if (reg.test(value)) {
                    callback(new Error('目录名称不能包含特殊字符'))
                } else {
                    callback()
                }
            }
        }
    },
    name3Test: (rule, value, callback) => {
        // var reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、 ]{1,10}$/
        var reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、 ]/im

        // var reg = /^[^\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\|\\\;\:\'\"\,\.\<\>\/\?]{1,10}$/;
        if (!value) {
            callback(new Error('属性值不能为空'))
        } else {
            if (value.length > 10) {
                callback(new Error('属性值最长不能超过10个字'))
            } else {
                if (reg.test(value)) {
                    callback(new Error('属性值不能包含特殊字符'))
                } else {
                    callback()
                }
            }
        }
    },
    name2Test: (rule, value, callback) => {
        // var reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、 ]{1,10}$/
        var reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、 ]/im

        // var reg = /^[^\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\|\\\;\:\'\"\,\.\<\>\/\?]{1,10}$/;
        if (!value) {
            callback(new Error('外部客户名称不能为空'))
        } else {
            if (value.length > 10) {
                callback(new Error('外部客户最长不能超过10个字'))
            } else {
                if (reg.test(value)) {
                    callback(new Error('外部客户不能包含特殊字符'))
                } else {
                    callback()
                }
            }
        }
    },
    valueTest: (rule, value, callback) => {
        // //console.log(value)

        if (!value) {
            callback(new Error('属性值不能为空'))
        } else {
            if (value.length > 5) {
                callback(new Error('属性值最长不能超过5个字'))
            } else {
                callback()
            }
        }
    },
    time1Test: (rule, value, callback) => {
        if (value) {
            // // //console.log('time1',new Date(value[0]).getTime(),new Date(value[1]).getTime())
            if (value.length == 0) {
                callback(new Error('请选择执行时间段!'))
            } else {
                if (new Date(value[0]).getTime() < new Date().getTime()) {
                    callback(new Error('执行开始时间要晚于当前时间'))
                } else {
                    if (new Date(value[0]).getTime() == new Date(value[1]).getTime()) {
                        callback(new Error('执行结束时间要晚于执行开始时间'))
                    } else {
                        callback()
                    }
                }
            }
        } else {
            callback(new Error('请选择执行时间段!'))
        }
    },
    roiTest: (rule, value, callback) => {
        if (value) {
            // // //console.log('time1',new Date(value[0]).getTime(),new Date(value[1]).getTime())
            if (value.length == 0) {
                callback(new Error('请选择roi时间段!'))
            } else {
                if (new Date(value[0]).getTime() < new Date().getTime()) {
                    callback(new Error('执行开始时间要晚于当前时间'))
                } else {
                    if (new Date(value[0]).getTime() == new Date(value[1]).getTime()) {
                        callback(new Error('roi结束时间要晚于roi开始时间'))
                    } else {
                        callback()
                    }
                }
            }
        } else {
            callback(new Error('请选择roi时间段!'))
        }
    },
    time11Test: (rule, value, callback) => {
        if (value) {
            // // //console.log('time1',new Date(value[0]).getTime(),new Date(value[1]).getTime())
            if (value.length == 0) {
                callback(new Error('请选择执行时间段!'))
            } else {
                if (new Date(value).getTime() < new Date().getTime()) {
                    callback(new Error('执行开始时间要晚于当前时间'))
                } else {
                    callback()
                }
            }
        } else {
            callback(new Error('请选择执行时间段!'))
        }
    },
    numTest: (rule, value, callback) => {
        let passWordReg = /^[0-9]+$/;
        // //console.log(value)
        if (value.length == 0) {
            callback(new Error('内容不能为空'))
        }
        setTimeout(() => {
            if (!passWordReg.test(value)) {
                callback(new Error('请输入正确的格式'))
            } else {
                callback()
            }
        }, 500)
    },
    webPortTest: (rule, value, callback) => {
        let webPortReg = /^[0-9]{4}$/;
        if (!value) {
            callback(new Error('端口号不能为空'))
        }
        setTimeout(() => {
            if (!webPortReg.test(value)) {
                callback(new Error('请输入4数字的端口'))
            } else {
                callback()
            }
        }, 500)
    },
    resetForm(formRef) {
        if (formRef) {
            if (formRef !== undefined) {
                formRef.resetFields();
            } else {
                this.$nextTick(() => {
                    formRef.resetFields();
                });
            }
        }
    },
    submitForm(formRef, fun) {
        formRef.validate(valid => {
            if (valid) {
                fun()
            } else {
                // //console.log("error submit!!");
                return false;
            }
        });
    },


}