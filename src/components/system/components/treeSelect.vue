<template>
  <el-select v-model="valueTitle" :clearable="clearable" @clear="clearHandle" ref='sel'>
    <el-input v-model='filterText'  placeholder="搜索" class="fil"> </el-input>
    <el-option :value="valueTitle" :label="valueTitle" class="options">
      <el-tree  id="tree-option"
        ref="selectTree"
        :accordion="accordion"
        :data="options"
        :props="props"
        :node-key="props.resourceId"    
        :default-expanded-keys="defaultExpandedKey"
        @node-click="handleNodeClick"
        :filter-node-method="filterNode" 
        >
      </el-tree>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "el-tree-select",
  props:{
    /* 配置项 */
    props:{
      type: Object,
      default:()=>{
        return {
          value:'id',             // ID字段名
          label: 'title',         // 显示名称
          children: 'children'    // 子级字段名
        }
      }
    },
    /* 选项列表数据(树形结构的对象数组) */
    options:{
      type: Array,       
      default: ()=>{ return [] }
    },
    /* 初始值 */
    value:{
      type: Number,
      default: ()=>{ return null }
    },
    /* 可清空选项 */
    clearable:{
      type:Boolean,
      default:()=>{ return true }
    },
    /* 自动收起 */
    accordion:{
      type:Boolean,
      default:()=>{ return false }
    },
    clear:{
      type:Boolean,
      default:()=>{ return false }
    }
  },
  data() {
    return {
      filterText:'',
      valueId:this.value,    // 初始值
      valueTitle:' ',
      defaultExpandedKey:[]    
    }
  },
  mounted(){
    this.initHandle()
    console.log(this.props)
    console.log(this.valueId)
    console.log(this.clear)
  },
  methods: {
    filterNode(value, data) {
        console.log(value,data)
        if (!value) return true;
        return data.resourceName.indexOf(value) !== -1;
    },
    // 初始化值
    initHandle(){
      console.log(this.valueId)
      // console.log(this.$refs.selectTree.getNode(this.valueId))
      
      if(this.valueId || this.valueId===0){
        // this.valueTitle = this.$refs.selectTree.getNode(this.valueId).data[this.props.label]     // 初始化显示
        // this.$refs.selectTree.setCurrentKey(this.valueId)       // 设置默认选中
        // this.defaultExpandedKey = [this.valueId]      // 设置默认展开

      } else{
        this.clearHandle()
      }
      this.initScroll()
    },
    // 初始化滚动条
    initScroll(){
      this.$nextTick(()=>{
        let scrollWrap = document.querySelectorAll('.el-scrollbar .el-select-dropdown__wrap')[0]
        let scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar')
        scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
        scrollBar.forEach(ele => ele.style.width = 0)
      })
    },
    // 切换选项
    handleNodeClick(node){
      console.log(node)
      this.valueTitle = node.resourceName
      this.valueId = node.resourceId
      console.log(this.valueId)
      this.$emit('getValue',this.valueId)
      this.defaultExpandedKey = []
    },
    // 清除选中
    clearHandle(){ 
      this.filterText=''
      this.valueTitle = ' '
      this.valueId = null
      this.defaultExpandedKey = []
      this.clearSelected()
      this.$emit('getValue',null)
    },
    /* 清空选中样式 */
    clearSelected(){
      let allNode = document.querySelectorAll('#tree-option .el-tree-node')
      allNode.forEach((element)=>element.classList.remove('is-current'))
    }
  },
  watch: {
    value(){
      console.log(1111)
      this.valueId = this.value
      this.initHandle()
    },
    filterText: {
        handler:function(n,o){
            console.log(11111)
            this.$refs.selectTree.filter(n);
        }
        
    },
    clear: {
      handler:function(n,o){
        if(n){
          this.clearHandle()
        }
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .fil{
    box-sizing: border-box;
    padding: 20px;
  }
  .el-scrollbar .el-scrollbar__view .el-select-dropdown__item{
    height: auto;
    max-height: 274px;
    padding: 20px;
    background: #fff;
    overflow: hidden;
    overflow-y: auto;
  }
  .el-select-dropdown__item.selected{
    font-weight: normal;
  }
  ul li >>>.el-tree .el-tree-node__content{
    height:auto;
    padding: 0 20px;
  }
  .el-tree-node__label{
    font-weight: normal;
  }
  .el-tree >>>.is-current .el-tree-node__label{
    color: #3366FF;
    font-weight: 700;
  }
  .el-tree >>>.is-current .el-tree-node__children .el-tree-node__label{
    color:#606266;
    font-weight: normal;
  }

  /* 开发禁用 */
  /* .el-tree-node:focus>.el-tree-node__content{
    background-color:transparent;
    background-color: #f5f7fa;
    color: #c0c4cc;
    cursor: not-allowed;
  }
  .el-tree-node__content:hover{
    background-color: #f5f7fa;
  } */
</style>
