<template>
  <div class="home">

    <Menu></Menu>
    <!-- <Job></Job> -->
    <div class="jobBox">
      <Banner></Banner>
      <div class="boxbox">
        <router-view></router-view>
      </div>
      <!-- <div class="footer">
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[10, 100]" :page-size="10" layout="sizes,total, jumper, prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import Menu from "../components/Menu";
import Job from "../components/Job";
import Banner from "../components/Banner";

export default {
  name: "Home",
  components: {
    Menu,
    Job,
    Banner
  },
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  >
$sc: 12;

.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .jobBox {
    height: 100%;
    background: #f5f5f5;
    overflow: hidden;
    position: relative;
    .boxbox{
      position:absolute;
      top: 64px;
      bottom:50px;
      width: 100%;
      box-sizing: border-box;
      height: 100%;
    }
    .footer{
      bottom:0;
      position:absolute;
      height: 50px;
      background: #fff;
      width: 100%;
      margin-left: 20px;
      z-index: 222222;
      //  .block {
      // padding: 10px 20px;
      // // background: #fff;
      // .el-pagination {
      //   width: 100%;
      //   text-align: center;
      // }
    // }
    }
    .banner{
      position: absolute;
      top:0;
    }
  }

  .menu {
    float: left;
  }
}
</style>
