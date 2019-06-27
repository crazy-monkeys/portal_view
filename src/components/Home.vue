<template>
  <div class="home">

    <Menu></Menu>
    <!-- <Job></Job> -->
    <div class="jobBox">
      <Banner></Banner>
      <router-view></router-view>
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
  .jobBox {
    /* min-width: 500px; */
    // height: 100%;
    // background: pink;
    height: 100%;
    background: #f5f5f5;
    // overflow-y: auto;
    overflow-y: auto;
    overflow-x: hidden;
    .job {
      height: 100%;
      background: #f5f5f5;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }

  .menu {
    float: left;
  }
}
</style>
