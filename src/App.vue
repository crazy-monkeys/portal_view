<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
  import Vue from "vue";
  import router from "./router";
  export default {
    name: "App",
    data() {
      return {
        lastTime: null, //最后一次点击的时间
        currentTime: null, //当前点击的时间
        timeOut: 1 * 60 * 100 //设置超时时间： 10分钟
      }
    },
    created() {
      this.lastTime = new Date().getTime();   //网页第一次打开时，记录当前时间
      //在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem("data")) {
        this.$store.replaceState(
          Object.assign(
            {},
            this.$store.state,
            JSON.parse(sessionStorage.getItem("data"))
          )
        );
      }

      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("data", JSON.stringify(this.$store.state));
      });

      // this.$http.interceptors.response.use(
      //   function(response) {
      //     // 对响应数据做点什么
      //     // console.log(response)
      //     if (response.data.code == 10016) {
      //       console.log("未登录");
      //       router.replace({
      //         path: "/"
      //         // query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
      //       });
      //     }
      //     if ( response.data.code == 10007) {
      //       console.log("异地登陆");
      //       router.replace({
      //         path: "/"
      //         // query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
      //       });
      //     }
      //     return response;
      //   },
      //   function(error) {
      //     // 对响应错误做点什么
      //     console.log(error);
      //     return Promise.reject(error);
      //   }
      // );
      // router.beforeEach((to, from, next) => {
      //   console.log(to,from,next)
      //   next()
      // })
    },
    methods: {
      isDo() {
        this.currentTime = new Date().getTime(); //记录这次点击的时间
        if (this.currentTime - this.lastTime > this.timeOut) {  //判断上次最后一次点击的时间和这次点击的时间间隔是否大于10分钟
          // 这里写状态已过期后执行的操作
          router.replace({
            path: "/"
            // query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
          });
          this.lastTime = new Date().getTime(); //如果在10分钟内点击，则把这次点击的时间记录覆盖掉之前存的最后一次点击的时间

        } else {
          this.lastTime = new Date().getTime(); //如果在10分钟内点击，则把这次点击的时间记录覆盖掉之前存的最后一次点击的时间
        }
      }
    },

  };
</script>

<style lang='scss'>
  @import './common/font/font.css';

  #app {
    height: 100%;

    .el-table {
      border-top: 1px solid #EBEEF5
    }

    .el-table th {
      user-select: text;
    }
  }
</style>