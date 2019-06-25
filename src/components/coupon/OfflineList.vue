<template>
  <div>
    <div class="page-content">
      <div class="filter-bar">
        <div class="filter-area">
          <el-button size="small" class="create-button" type="primary" @click.stop="createCoupon">
            <i class="unex unex-icon-add"></i>
            新建
          </el-button>
        </div>
        <div class="action-area">
          <el-button size="small" class="filter-panel-button" @click.stop="toggleFilterPanel">
            <i class="unex unex-icon-filter" />筛选
            <i v-if="filterPanel.isOpen" class="unex unex-icon-up" />
            <i v-else class="unex unex-icon-down" />
          </el-button>
        </div>
      </div>
      <div class="filter-panel" v-if="filterPanel.isOpen">
        <el-row :gutter="24">
          <el-col :span="6">
            <label>规则名称</label>
            <el-input v-model="filter.name" size="small"/>
          </el-col>
          <el-col :span="6">
            <label>活动状态</label>
            <el-select v-model="filter.status" placeholder="请选择" size="small">
              <el-option
                v-for="item in filterPanel.statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <label>规则时间</label>
            <el-date-picker
                size="small"
                v-model="filter.dateRange"
                type="datetimerange"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"/>
          </el-col>
          <el-col :span="6">
            <label>是否已关联优惠券规则</label>
            <el-select v-model="filter.isUnion" placeholder="请选择" size="small">
              <el-option label="不限" value="" />
              <el-option label="是" value="1" />
              <el-option label="否" value="0" />
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="6" :offset="18">
            <div class="button-group">
              <el-button plain @click.stop="resetFilter" size="small">重置</el-button>
              <el-button type="primary" plain @click.stop="search" size="small">搜索</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="page-block">
      <el-table :data="data">
        <el-table-column label="活动详情·详情" prop="name" min-width="400"></el-table-column>
        <el-table-column label="已投放量/可投放上限" prop="limit" align="left" min-width="160"></el-table-column>
        <el-table-column label="活动开始时间" prop="startTime" align="left" min-width="200"></el-table-column>
        <el-table-column label="活动结束时间" prop="endTime" align="left" min-width="200"></el-table-column>
        <el-table-column label="活动状态" prop="status" align="left" fixed="right" min-width="80"></el-table-column>
        <el-table-column label="操作" fixed="right" min-width="160">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.stop="publish(scope)">投放</el-button>
            <el-button type="text" size="small" @click.stop="edit(scope)">编辑</el-button>
            <el-dropdown size="small" @command="e => { moreAction(e, scope) }">
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="delCoupon">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-bar">
        <custom-pagination :page="pagination.page" :size="pagination.size" :total="pagination.total"  @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"/>
      </div>
    </div>
  </div>
</template>
<script>
import customPagination from '@/components/common/customPagination'
export default {
  components: { customPagination },
  data () {
    return {
      data: [{
        name: '优惠优惠优惠优惠优惠... • 指定商品 • 规则规则规则规则…',
        limit: '10000/30000',
        startTime: '2018-12-01 09:00:00',
        endTime: '2018-12-01 09:00:00',
        status: '已生效'
      }],
      filter: {
        name: '',
        status: '-1',
        dateRange: [],
        isUnion: ''
      },
      filterPanel: {
        isOpen: true,
        statusOptions: [
          { label: '不限', value: "-1" },
          { label: '领取中', value: "0" },
          { label: '未开始', value: "1" },
          { label: '已结束', value: "2" },
        ]
      },
      pagination: {
        page: 1,
        total: 0,
        size: 10
      }
    }
  },
  methods: {
    getData() {
      // TODO
    },
    search () {
      this.getData()
    },
    resetFilter () {
      this.filter = {
        name: '',
        status: '-1',
        dateRange: [],
        isUnion: ''
      }
    },
    createCoupon () {
      // TODO
    },
    toggleFilterPanel () {
      this.filterPanel.isOpen = !this.filterPanel.isOpen
    },
    moreAction (e, scope) {
      if(this[e]) {
        this[e](scope)
      }
    },
    handleSizeChange (val) {
      this.pagination.size = val
    },
    handleCurrentChange (val) {
      this.pagination.page = val
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/variable';
.el-dropdown-link {
  color: $blue;
  font-size: $small;
  font-weight: 600;
}
</style>
