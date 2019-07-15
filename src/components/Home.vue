<template>
  <div class="home">
    <Menu></Menu>
    <div class="jobBox">
      <Banner></Banner>
      <div class="boxbox">
        <router-view></router-view>
      </div>
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
  height: 100%;
  overflow: hidden;
  .jobBox {
    height: 100%;
    background: #f5f5f5;
    overflow: auto;
    padding-top: 56px;
    position: relative;
    box-sizing: border-box;
    .banner{
      position: absolute;
      top:0;
    }
    .boxbox{
      width: 100%;
      box-sizing: border-box;
      height: 100%;
      // padding: 0 20px 20px 20px ;
    }
  }
  .menu {
    float: left;
  }
}
</style>
