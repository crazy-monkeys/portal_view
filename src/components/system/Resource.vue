<template>
  <div class="resource">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>资源管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- <h1>资源管理</h1> -->
    </div>
    <div class="box">
      <div class="btns">
        <el-button class="add" type="primary" @click="add" size="small">
          新增资源
        </el-button>
        <div class="content">
            <el-tree 
                :data="resource"
                node-key="id"
                :props="defaultProps"
                empty-text='当前没有资源'
                @node-click='nodeClick'     
                @node-drag-start="handleDragStart"
                @node-drag-enter="handleDragEnter"
                @node-drag-leave="handleDragLeave"
                @node-drag-over="handleDragOver"
                @node-drag-end="handleDragEnd"
                @node-drop="handleDrop"
                draggable
                :allow-drop="allowDrop"
              >
                <!-- :allow-drag="allowDrag" -->

                <span class="custom-tree-node" slot-scope="{ node }" >
                    <div style="width:100%" @mouseenter="mouseenter(node)" @mouseleave="mouseleave(node)">
                    <span>{{ node.label }}</span>
                    <span v-if="node.show">
                        <i class="icon el-icon-edit" @click="() => edit(node)"></i>
                        <i class="icon el-icon-delete" @click="() => delResource(node)"></i>
                    </span>
                    </div>
                </span>
            </el-tree>
        </div>
      </div>
    </div>

    <el-dialog
      :title="editToggle? '编辑资源信息' :'新增资源信息'"
      top='8vh'
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="close"
      :close-on-click-modal="false">
      <el-form size="small"  :inline="true" label-position="top" label-width="auto" :model="form" :rules='rules' ref='form' class="form clear">
        <el-form-item label="父级菜单" prop='catalog'  class="selectdrop">
            <SelectTree 
                :props="props"
                :options="resource"
                :value="valueId"
                :clear='clearOnoff'
                @getValue="getValue($event)"/>
        </el-form-item>
        <el-form-item label="资源名称" prop='name' >
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <!-- <el-form-item label="资源代码" prop='code'>
          <el-input v-model="form.code" maxlength='50'></el-input>
        </el-form-item> -->
        <el-form-item label="资源URL" prop='url'>
          <el-input v-model="form.url" ></el-input>
        </el-form-item>
        <el-form-item label="资源类型" prop='type' >
          <el-select v-model='form.type'>
                <el-option v-for='type in types' :key='type.id' :label="type.name" :value='type.id'>
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="资源icon" prop='icon' >
            <el-input v-model="form.icon" ></el-input>
        </el-form-item>
        <el-form-item label="权限前缀" prop='permission' >
            <el-input v-model="form.permission" ></el-input>
        </el-form-item>
        <el-form-item label="描述" class="desc" prop='desc'>
          <el-input type='textarea' v-model="form.desc" maxlength='10'></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close" size="small">取消</el-button>
        <el-button type="primary" size="small" @click="submitForm('form')">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import SelectTree from "./components/treeSelect.vue";
import {getResource,addResource,delResource,editResource,findResource} from "@/api/system/resource.js";

export default {
    components:{
        SelectTree
    },
    data(){
        return {
            clearOnoff:false,
            props:{               // 配置项（必选）
                value: 'id',
                label: 'resourceName',
                children: 'children',
            },
            valueId:0,
            types:[
                // “菜单、按钮、API”
                {
                    name:'菜单',
                    id:1
                },
                // {
                //     name:'按钮',
                //     id:2
                // },
                // {
                //     name:'API',
                //     id:3
                // }
            ],
            name:'',
            value:'',
            filterText:'',
            rules:{
                catalog: [
                    { required: true, trigger: "change",  validator: (rule, value, callback) => 
                        {
                            if(this.valueId || this.valueId===0){
                                callback()
                            }else{
                                callback(new Error('资源所在目录不能为空'))
                            }
                        },
                    }
                ],
                type: [
                    { required: true, trigger: "change",  validator: (rule, value, callback) => 
                        {
                            if(!value){
                                callback(new Error('资源类型不能为空'))
                            }else{
                                callback()
                            }
                        },
                    }
                ],
                name: [
                    { required: true, trigger: "blur",message:'资源名称不能为空'}
                    //   validator: (rule, value, callback) =>{
                    //     var reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、 ]{1,10}$/
                    //         // var reg = /^[^\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\|\\\;\:\'\"\,\.\<\>\/\?\ ]{1,5}$/;
                    //         if (!value) {
                    //             callback(new Error('资源名称不能为空'))
                    //         } else {
                    //             if(value.length>10){
                    //                 callback(new Error('资源名称最长不能超过10个字'))
                    //             }else{
                    //                 if(reg.test(value)){
                    //                     callback(new Error('资源名称不能包含特殊字符'))
                    //                 }else{
                    //                     callback()
                    //                 }
                    //             }
                    //         }
                    //     },
                    // }
                ],
                code: [
                    { required: true, trigger: "change",  validator: (rule, value, callback) =>{
                        var reg = /[\u4e00-\u9fa5]/g
                            if (!value) {
                                callback(new Error('资源代码不能为空'))
                            } else {
                                if(value.length>50){
                                    callback(new Error('资源代码最长不能超过50个字'))
                                }else{
                                    if(reg.test(value)){
                                        callback(new Error('资源名称不能包含汉字'))
                                    }else{
                                        callback()
                                    }
                                }
                            }
                        },
                    }
                ],
                url: [
                    { required: true, trigger: "change",  validator: (rule, value, callback) =>{
                            if (!value) {
                                callback(new Error('资源URL不能为空'))
                            } else {
                                callback()
                            }
                        },
                    }
                ],
            },
            form:{
                permission:'',
                catalog:'',
                name:'',
                url:'',
                type:'',
                desc:'',
                icon:'',
                id:'',
            },
            dialogVisible:false,
            editToggle:false,
            show:false,
            defaultProps:{
                children: 'children',
                label: 'resourceName'
            },
            resource:[],
        }
    },
    created(){
        this.getResource()
    },
    watch:{
        filterText: {
            handler:function(n,o){
                console.log(11111)
                this.$refs.tree.filter(n);
            }
            
        }
    },
    methods:{
        //拖动函数
        allowDrop(draggingNode, dropNode, type) {
            return type !== 'inner' &&draggingNode.data.parentId ==dropNode.data.parentId;
        },
        // allowDrag(draggingNode) {
        //     return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
        // },
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
            console.log('tree drop: ', draggingNode, dropNode, dropType);
            var data ={
                resourceId :draggingNode.key,
                resourceOrder :draggingNode.data.resourceOrder,
                upId :dropNode.key,
                upOrder :dropNode.data.resourceOrder,
            }
            this.$http.post(''+process.env.API_ROOT+'/system/resource/changeResource',data)
            .then((res)=>{
                console.log('移动资源',res)
                if(res.data.code ==1){
                    
                }else{
                    
                }
            }).catch((err)=>{
                console.log(err);
                alert('网络异常')
            })
        },
        // 取值
        getValue(value){
            this.valueId = value
            console.log(this.valueId);
            this.form.catalog = this.valueId;
        },
        nodeClick(obj,node,item){
            console.log(obj,node,item)
            this.value =obj.resourceId
            console.log(this.value)
        },
        async delResource(node){
            console.log(node)
            var data ={
                resourceId:node.key
            }
            const res = await delResource(data)
                console.log('删除资源结果',res)
            if(res){
                this.$message({
                    type:'success',
                    message:'删除成功'
                })
                this.getResource()
            }
        },
        async editResource(){
            var data ={
                resourceType:this.form.type,
                resourceName:this.form.name,
                id:this.form.id,
                resourceUrl:this.form.url,
                resourceDesc:this.form.desc,
                iconClass:this.form.icon,
                parentId:this.valueId,
                permissionPrefixUrl:this.form.permission,
            }
            const res = await editResource(data);
            console.log('编辑资源',res)
            if(res){
                this.$message({
                    type:'success',
                    message:'编辑成功'
                })
                this.dialogVisible = false
                this.clear()
                this.resetForm('form')
                this.getResource()
            }
            
        },
        async addResource(){
            var data ={
                //类型
                resourceType:this.form.type,
                resourceName:this.form.name,
                // resourceCode:this.form.code,
                resourceUrl:this.form.url,
                resourceDesc:this.form.desc,
                iconClass:this.form.icon,
                parentId:this.valueId,
                permissionPrefixUrl:this.form.permission,
            }
            const res = await addResource(data);
            console.log('新增资源',res)
            if(res){
                this.$message({
                    type:'success',
                    message:'新增成功'
                })
                this.dialogVisible = false
                this.clear()
                this.resetForm('form')
                this.getResource()
            }
            
        },
        async getMore(resourceId){
            var data ={
                resourceId:resourceId
            }
            const res = await findResource(data);
            console.log('资源详情',res)
            if(res){
                this.form.name = res.data.data.resourceName
                this.form.permission = res.data.data.permissionPrefixUrl
                this.form.url = res.data.data.resourceUrl
                this.form.desc = res.data.data.resourceDesc
                this.form.type  = res.data.data.resourceType
                this.form.icon  = res.data.data.iconClass
                this.form.catalog = res.data.data.parentId
                this.valueId = res.data.data.parentId
                console.log(this.valueId)
                this.form.id = res.data.data.id
            }
        },
        submitForm(formName) {
            this.$formTest.submitForm(this.$refs[formName],this.editToggle ? this.editResource : this.addResource)
        },
        clear(){
            this.form.name = ''
            this.form.desc = ''
            this.form.type = ''
            this.form.url = ''
            this.form.code = ''
            this.form.catalog = ''
            this.form.icon = ''
            this.valueId=null
            this.clearOnoff = true
        },
        //重置表单
        resetForm(formName) {
            this.$formTest.resetForm(this.$refs[formName])
        },
        close(){
            this.valueId = null
            this.dialogVisible = false
            this.clear()
            this.resetForm('form')
        },
        mouseenter(node){
            console.log(node.data.id)
            if(node.data.id){
            this.$set(node,'show',true)

            }
        },
        mouseleave(node){

            this.$set(node,'show',false)
        },
        add(){
            this.dialogVisible = true;
            this.editToggle = false
        },
        edit(node) {
            this.getMore(node.key)
            this.editToggle = true;
            this.dialogVisible = true
        },
        filterNode(value, data) {
            console.log(value,data)
            if (!value) return true;
            return data.resourceName.indexOf(value) !== -1;
        },
        // 获取权限数据
        async getResource(){
            const res =  await getResource()
            console.log('所有资源',res)
            if(res){
                this.resource = [res.data.data]
            }
        },
    }
};
</script>
<style lang="scss" scoped>

    
        
.resource {
    .form{
        box-sizing: border-box;
        .el-form-item{
        box-sizing: border-box;
        margin-right: 0;
        padding: 0 5px;
        float: left;
        width: 50%;
        .el-select{
            width: 100%;
        }
    }
    .desc{
            width: 100%;
            .el-input{
                width: 100%;
            }
        }
    .selectdrop{
        .el-select{
            width: 100%;
        }
        
    }
    }   
    
    
  .head {
    padding: 10px 40px;
  }
  .box {
    position: relative;
    margin: 0 20px 20px 20px;
    background: #ffffff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    .btns {
      .add {
        margin: 10px 20px;
      }
    }
    .content{
        border-top: 1px solid #ccc;
        background: #fff;
        box-shadow: 0 0 8px 0 rgba(0,0,0,0.05);
        padding: 20px;
        .custom-tree-node{
            display: inline-block;
            width: 100%;
            .icon:first-child{
                margin-left: 20px;
            }
            .icon{
                padding: 0 5px;
            }
        }
    }
  }
}
</style>

