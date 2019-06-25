<template>
  <el-select v-model='name'>
    <el-input v-model='filterText'  placeholder="搜索" class="fil"> </el-input>
    <el-option :value='value'>
      <el-tree  id="tree-option"
        ref="selectTree"
        :data="options"
        :props="defaultProps"
        node-key="resourceId" 
        @node-click='nodeClick'  
        :filter-node-method="filterNode" 
        >
      </el-tree>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "el-tree-select",

  data() {
    return {
        filterText:'',
        value:'',
        name:'',
        options:[],
        defaultProps:{
            children: 'children',
            label: 'resourceName'
        },
    }
  },
  mounted(){
    this.getSource()
  },
  watch:{
    
      filterText: {
          handler:function(n,o){
              console.log(11111)
              this.$refs.selectTree.filter(n);
          }
          
      }
  },
  methods: {
    filterNode(value, data) {
        console.log(value,data)
        if (!value) return true;
        return data.resourceName.indexOf(value) !== -1;
    },
    nodeClick(obj,node,item){
        console.log(obj,node,item)
        this.name = obj.resourceName
        this.value =obj.resourceId
    },
    getSource(){
        this.$http.get(''+process.env.API_ROOT+'/system/resource/getAllResource'
        )
        .then((res)=>{
            console.log('权限数据',res)
            if(res.data.code ==1){
            this.options = res.data.data.children
            }else{
            this.options=[]
            }
        }).catch((err)=>{
            console.log(err);
            alert('网络异常')
        })
    },
  }
};
</script>
<style lang='scss' scoped>
    .fil{
      padding: 20px;
      box-sizing: border-box;
    }
    .is-vertical{
      width: 0;
      height: 0;
    }
    .is-horizontal{
      height: 0;
    }
    .el-scrollbar{
      .el-scrollbar__view{
          .el-select-dropdown__item{
            height: 90%;
            // max-height: 247px;
            padding: 20px;
            background: #fff;
            // overflow: hidden;
            overflow-y: auto;
            box-sizing: border-box;
          }
      }
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
    /deep/  .el-tree .is-current .el-tree-node__label{
        color: #3366FF;
        font-weight: 700;
    }
</style>
