<template>
  <div class="page-container">
    <el-tabs v-model="activeList">
      <el-tab-pane label="天猫优惠券" name="TMALL">
        <tmall-list />
      </el-tab-pane>
      <el-tab-pane label="线下优惠券" name="OFFLINE">
        <offline-list />
      </el-tab-pane>
      <el-tab-pane label="A&F优惠码投放" name="ANF">
        <anf-list />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import breadBar from '@/components/common/breadBar'
import TmallList from './TmallList'
import AnfList from './AnfList'
import OfflineList from './OfflineList'
export default {
  components: { breadBar, TmallList, AnfList, OfflineList },
  data () {
    return {
      shopId: this.$store.state.shopId.shopId,
      data: [],
      activeList: 'TMALL'
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
