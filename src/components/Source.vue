<template>
  <div class="source">
    <div class="head clear">
      <h1>资源管理</h1>
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>资源管理</el-breadcrumb-item>      
      </el-breadcrumb>
    </div>
    <div class="box">
      
      <el-tree
        :data="data5"
        icon-class='el-icon-plus'
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        @node-drag-start="handleDragStart"
        @node-drag-enter="handleDragEnter"
        @node-drag-leave="handleDragLeave"
        @node-drag-over="handleDragOver"
        @node-drag-end="handleDragEnd"
        @node-drop="handleDrop"
        draggable
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
        >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click="() => append(data)">
              添加
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)">
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
let id = 1111;
export default {
  name: 'Source',
  data () {
    return {
      data5: [],
    }
  },
  watch:{
    data5:function(val){
      this.data5 = val
    }
  },
  created(){
    this.getSource();
    console.log(this.data5)
  },
  methods:{
      getSource(){
         this.$http.post('https://www.easy-mock.com/mock/5c3699240357c614dea295c9/example/source')
            .then(res => {
                console.log("res", res);
               this.data5 = JSON.parse(JSON.stringify(res.data.data))
              })
              .catch(error => {
                console.log(error);
                alert("登入失败");
              });
      },
      handleDragStart(node, ev) {
        console.log('drag start', node);
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver(draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', dropNode.label, dropType);
      },
      allowDrop(draggingNode, dropNode, type) {
        if (dropNode.data.label === '二级 3-1') {
          return type !== 'inner';
        } else {
          return true;
        }
      },
      allowDrag(draggingNode) {
        return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
      },

      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },

      // renderContent(h, { node, data, store }) {
      //   return (
      //     <span class="custom-tree-node">
      //       <span>{node.label}</span>
      //       <span>
      //         <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
      //         <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
      //       </span>
      //     </span>);
      // }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc:12;
.source{
 .head{
    h1{
      opacity: 0.87;
      font-family: PingFangSC-Medium;
      font-size: 18px;
      color: #000;
      letter-spacing: 0;
      line-height: 72px;
      height: 72px;
      font-weight: bold;
      padding: 0 50px;
      float: left;
    }
    .el-breadcrumb{
      float: right;
      line-height: 72px;
      margin-right: 20px
    }
  }
}
</style>
