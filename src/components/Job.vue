<template>
  <div class="job">
    <Banner></Banner>
    <!-- <div> -->
      <router-view></router-view>
    <!-- </div> -->
  </div>
</template>

<script>
 import Banner from '../components/Banner'

export default {
  name: 'Job',
  components:{
    Banner
  },
  data () {
    return {
     
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
 .job{
  height: 100%;
  background: #F5F5F5;
  overflow-y: auto;
  overflow-x: hidden;
  // float: left;

 }
</style>
