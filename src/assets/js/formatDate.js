
    export default{
         /**
     * formatDate方法，将 Date 转化为指定格式的String
     * @param {String} a 指定格式的字符串，例如 "yyyy-M-d h:m:s"
     * @return {String} 匹配指定格式的日期时间字符串
     * 说明：月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
     * 例子：   
     * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
     * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18  
     */

       formatDate(a){
            var d = new Date();  // 获取当前时间//带时分秒
            // 构造对象o，里面存储当前时间对应的年、月、日、时、分、秒、季度、毫秒参数
            var o = {
                "M+": d.getMonth() + 1,
                "d+": d.getDate(),
                "h+": d.getHours(),
                "m+": d.getMinutes(),
                "s+": d.getSeconds(),
                "q+": Math.floor((d.getMonth() + 3) / 3),
                "S": d.getMilliseconds()
            };
            // 获取年份
            if (/(y+)/.test(a)) a = a.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    
          // 获取其他
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(a)) a = a.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
            return a;
        },
        formatDateNow(a){
            var d = new Date();  // 获取当前时间
            // 构造对象o，里面存储当前时间对应的年、月、日、时、分、秒、季度、毫秒参数
            var o = {
                "M+": d.getMonth() + 1,
                "d+": d.getDate(),
            };
            // 获取年份
            if (/(y+)/.test(a)) a = a.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    
          // 获取其他
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(a)) a = a.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
            return a;
        },
        // 当前时间前一月
        formatDateLastMonth(a){
            var d = new Date(new Date().getTime() - 30*24*60*60*1000)  //获取1个月之前的时间//带时分秒
            // 构造对象o，里面存储当前时间对应的年、月、日、时、分、秒、季度、毫秒参数
            var o = {
                "M+": d.getMonth() + 1,
                "d+": d.getDate(),
                "h+": d.getHours(),
                "m+": d.getMinutes(),
                "s+": d.getSeconds(),
                "q+": Math.floor((d.getMonth() + 3) / 3),
                "S": d.getMilliseconds()
            };
            // 获取年份
            if (/(y+)/.test(a)) a = a.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    
          // 获取其他
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(a)) a = a.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
            return a;
        },
        formatDateLastDay(a,q){
            var d = new Date(new Date().getTime() - q*24*60*60*1000)  //获取昨天的时间//带时分秒
            // 构造对象o，里面存储当前时间对应的年、月、日、时、分、秒、季度、毫秒参数
            var o = {
                "M+": d.getMonth() + 1,
                "d+": d.getDate(),
                "h+": d.getHours(),
                "m+": d.getMinutes(),
                "s+": d.getSeconds(),
                "q+": Math.floor((d.getMonth() + 3) / 3),
                "S": d.getMilliseconds()
            };
            // 获取年份
            if (/(y+)/.test(a)) a = a.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    
          // 获取其他
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(a)) a = a.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
            return a;
        },
        formatDateTom(a){
            var d = new Date(new Date().getTime() - 24*60*60*1000)  //获取昨天的时间
            // 构造对象o，里面存储当前时间对应的年、月、日、时、分、秒、季度、毫秒参数
            var o = {
                "M+": d.getMonth() + 1,
                "d+": d.getDate(),
            };
            // 获取年份
            if (/(y+)/.test(a)) a = a.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    
          // 获取其他
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(a)) a = a.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
            return a;
        },
        formatDateAnyDay(a,q){
            var d = new Date(new Date().getTime() - q*24*60*60*1000)  //获取任何一天的时间  不带时分秒
            // 构造对象o，里面存储当前时间对应的年、月、日、时、分、秒、季度、毫秒参数
            var o = {
                "M+": d.getMonth() + 1,
                "d+": d.getDate(),
            };
            // 获取年份
            if (/(y+)/.test(a)) a = a.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    
          // 获取其他
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(a)) a = a.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
            return a;
        },
        formatDateLastHalfYear(a){
            var d = new Date(new Date().getTime() - 180*24*60*60*1000)  //获取半年之前的时间//带时分秒
            // 构造对象o，里面存储当前时间对应的年、月、日、时、分、秒、季度、毫秒参数
            var o = {
                "M+": d.getMonth() + 1,
                "d+": d.getDate(),
                "h+": d.getHours(),
                "m+": d.getMinutes(),
                "s+": d.getSeconds(),
                "q+": Math.floor((d.getMonth() + 3) / 3),
                "S": d.getMilliseconds()
            };
            // 获取年份
            if (/(y+)/.test(a)) a = a.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    
          // 获取其他
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(a)) a = a.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
            return a;
        }
    }
    