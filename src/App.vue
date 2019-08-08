<template>
  <div id="app" 
    :loading='loading'
    element-loading-text="请稍候..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.8)">
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
        loading:false
      }
    },
    created() {
      //在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem("vuexData")) {
        this.$store.replaceState(
          Object.assign(
            {},
            this.$store.state,
            JSON.parse(sessionStorage.getItem("vuexData"))
          )
        );
      }

      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("vuexData",JSON.stringify(this.$store.state));
      });


      // this.$http.interceptors.request.use(
      //   function(response) {
      //     // 对响应数据做点什么
      //     // console.log(response)

      //     return response;
      //   },
      //   function(error) {
      //     // 对响应错误做点什么
      //     console.log(error);
      //     return Promise.reject(error);
      //   }
      // );

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
    }
  };
</script>

<style lang='scss'>
  // @import './common/font/font.css';

  #app {
    /* font-family: Arial, Helvetica, sans-serif; */
    // font-family: 'sy';
    /* font-family: 'zt2'; */
    /* font-weight: bold; */
    height: 100%;

    .el-table {
      border-top: 1px solid #EBEEF5
    }

    .el-table th {
      user-select: text;
    }
  }
</style>