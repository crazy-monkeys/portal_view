<template>
  <div class="organization">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>组织架构</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>组织架构</h1>
    </div>
    <div class="box">
      <div class="btns">
        <el-button class="add" type="primary" @click="add" size="small">
          <i class="el-icon-plus"></i> 新增组织架构
        </el-button>
        <div class="content clear">
            <div class="l-con">
                <el-tree 
                    :data="resource"
                    node-key="userGroupId"
                    :props="defaultProps"
                    empty-text='当前没有组织架构'
                    @node-click='nodeClick'     
                    @node-drag-start="handleDragStart"
                    @node-drag-enter="handleDragEnter"
                    @node-drag-leave="handleDragLeave"
                    @node-drag-over="handleDragOver"
                    @node-drag-end="handleDragEnd"
                    @node-drop="handleDrop"
                    :allow-drop="allowDrop"
                    >
                    <!-- :allow-drag="allowDrag" -->

                    <span class="custom-tree-node" slot-scope="{ node }" >
                        <div style="width:100%" @mouseenter="mouseenter(node)" @mouseleave="mouseleave(node)">
                        <span>{{ node.label }}</span>
                        <span v-if="node.show">
                            <i class="icon el-icon-edit" @click="() => edit(node)"></i>
                            <i class="icon el-icon-delete" @click="() => delResource(node)"></i>
                            <!-- <i class="icon el-icon-rank" @click="() => remove(node,resource,'up')"></i> -->

                            <!-- <i class="icon el-icon-arrow-up" @click="() => remove(node,resource,'up')"></i> -->
                            <!-- <i class="icon el-icon-arrow-down" @click="() => remove(node,resource,'down')"></i> -->
                        </span>
                        </div>
                    </span>
                </el-tree>
            </div>
            <div class="r-con" v-if='dialogVisible'>
                <el-form label-position="top" label-width="auto" :model="form" :rules='rules' ref='form' class="form">
                    <el-form-item label="用户组名" prop='name' >
                        <el-input v-model="form.name" maxlength='20' placeholder="请输入用户组名"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="用户组代码" prop=''>
                        <el-input v-model="form.code" maxlength='30'></el-input>
                    </el-form-item> -->
                    <el-form-item label="用户组值" prop='organization'>
                        <el-radio-group v-model="form.type">
                            <el-radio label="BRAND_SHOP">店铺</el-radio>
                            <el-radio label="FOLDER">商户</el-radio>
                            <el-radio label="WANGWANG">旺旺</el-radio>
                            BRAND_SHOP FOLDER WANGWANG
                        </el-radio-group>
                        <el-select v-model='form.organization' placeholder="请选择">
                            <el-option v-for='type in types' :key='type.id' :label="type.value" :value='type.id'>
                            </el-option>
                        </el-select>
                        <el-input v-model="form.organization" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="用户组级别" prop='level' >
                        <el-input v-model="form.level" placeholder="请输入用户组级别"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop=''>
                        <el-input type='textarea' v-model="form.desc" maxlength='10'></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="close">取消</el-button>
                    <el-button type="primary" @click="submitForm('form')">提交</el-button>
                </span>
            </div>
            

        </div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
    name:'organization',
    data(){
        return {
            id:'',
            types:[],
            name:'',
            value:'',
            filterText:'',
            rules:{
                organization: [
                    { required: true, trigger: "change",  validator: (rule, value, callback) => 
                        {
                            if(!value){
                                callback(new Error('用户组值不能为空'))
                            }else{
                                callback()
                            }
                        },
                    }
                ],
                name: [
                    { required: true, trigger: "change",  validator: (rule, value, callback) =>{
                        var reg = /[`~!@#$%^&*()\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、 ]{1,10}$/
                            // var reg = /^[^\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\|\\\;\:\'\"\,\.\<\>\/\?\ ]{1,5}$/;
                            if (!value) {
                                callback(new Error('用户组名称不能为空'))
                            } else {
                                if(value.length>10){
                                    callback(new Error('用户组名称最长不能超过20个字'))
                                }else{
                                    if(reg.test(value)){
                                        callback(new Error('用户组名称不能包含除了"_"之外的特殊字符'))
                                    }else{
                                        callback()
                                    }
                                }
                            }
                        },
                    }
                ],
                // code: [
                //     { required: true, trigger: "change",  validator: (rule, value, callback) =>{
                //         var reg = /^[0-9a-zA-Z]$/g
                //             if (!value) {
                //                 callback(new Error('用户组代码不能为空'))
                //             } else {
                //                 if(value.length>30){
                //                     callback(new Error('用户组代码最长不能超过30个字'))
                //                 }else{
                //                     if(!reg.test(value)){
                //                         callback(new Error('用户组代码只能输入数字、大小写英文字母'))
                //                     }else{
                //                         callback()
                //                     }
                //                 }
                //             }
                //         },
                //     }
                // ],
                level: [
                    { required: true, trigger: "change",  validator: (rule, value, callback) =>{
                        var reg = /^[0-9]*$/
                            if (!value) {
                                callback(new Error('用户组级别不能为空'))
                            } else {
                                if(value*1 >=1 && value*1<=100){
                                    callback()
                                }else{
                                    callback(new Error('用户组级别为小于100的正整数'))
                                }
                            }
                        },
                    }
                ],
            },
            form:{
                name:'',
                code:'',
                type:'BRAND_SHOP',
                organization:'',
                level:'',
                desc:'',
            },
            dialogVisible:false,
            editToggle:false,
            defaultProps:{
                children: 'children',
                label: 'userGroupName'
            },
            resource:[],
        }
    },
    created(){
        this.getSource()
    },
    watch:{
        "form.type":{
            handler:function(n,o){
                this.getNoRelation(n)
                this.form.organization = ''
                if(this.editToggle){
                    this.getMore(this.value)
                }
            }
        },
        filterText: {
            handler:function(n,o){
                console.log(11111)
                this.$refs.tree.filter(n);
            }
            
        }
    },
    methods:{
        getNoRelation(type){
            this.$http.get(''+process.env.API_ROOT+'/system/userGroup/undisposedGroupVal?type='+ type)
            .then((res)=>{
                console.log('未关联的列表数据',res)
                if(res.data.code ==1){
                    this.types = res.data.data
                }else{
                    this.types = []
                }
            }).catch((err)=>{
                console.log(err);
                alert('网络异常')
            })
        },
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
   
        nodeClick(obj,node,item){
            console.log(obj,node,item)
            this.value =obj.userGroupId
            console.log(this.value)
        },
        delResource(node){
            console.log(node)
            this.$http.post(''+process.env.API_ROOT+'/system/userGroup/delete?userGroupId=' + node.key)
            .then((res)=>{
                console.log('删除组织架构结果',res)
                if(res.data.code ==1){
                    this.$message({
                        type:'success',
                        message:'删除成功'
                    })
                    this.getSource()
                }else{
                    this.$message({
                        type:'error',
                        message:res.data.msg
                    })
                }
            }).catch((err)=>{
                console.log(err);
                alert('网络异常')
            })
        },
        updateResource(){
            var data ={
                //类型
                userGroupId:this.value,
                userGroupName:this.form.name,
                userGroupType:this.form.type,
                userGroupCode:this.form.code,
                userGroupValue:this.form.organization,
                userGroupLevel:this.form.level,
                userGroupDesc:this.form.desc,
                parentGroupId:this.id,
            }
            this.$http.post(''+process.env.API_ROOT+'/system/userGroup/update',data)
            .then((res)=>{
                console.log('修改组织架构',res)
                if(res.data.code ==1){
                    this.$message({
                        type:'success',
                        message:'修改成功'
                    })
                    this.dialogVisible = false
                    this.resetForm('form')
                    this.clear()
                    this.getSource()
                }else{
                    this.$message({
                        type:'error',
                        message:res.data.msg
                    })
                }
            }).catch((err)=>{
                console.log(err);
                alert('网络异常')
            })
        },
        
        addResource(){
            var data ={
                //类型
                userGroupName:this.form.name,
                userGroupType:this.form.type,
                userGroupCode:this.form.code,
                userGroupValue:this.form.organization,
                userGroupLevel:this.form.level,
                userGroupDesc:this.form.desc,
                parentGroupId:this.value,
            }
            if(this.value){
                this.$http.post(''+process.env.API_ROOT+'/system/userGroup/addUserGroup',data)
                .then((res)=>{
                    console.log('新增组织架构',res)
                    if(res.data.code ==1){
                        this.$message({
                            type:'success',
                            message:'新增成功'
                        })
                        this.dialogVisible = false
                        this.clear()
                        this.resetForm('form')
                        this.getSource()
                    }else{
                        this.$message({
                            type:'error',
                            message:res.data.msg
                        })
                    }
                }).catch((err)=>{
                    console.log(err);
                    alert('网络异常')
                })
            }else{
                this.$message({
                    type:'error',
                    message:'请单击左边菜单选择父级'
                })
            }
            
        },
        getMore(id){
            this.$http.get(''+process.env.API_ROOT+'/system/userGroup/preEdit?userGroupId='+id)
            .then((res)=>{
                console.log('获取单个组织架构信息',res)
                if(res.data.code ==1){
                    console.log('用户组值',res.data.data.userGroupValue)
                    this.form.name = res.data.data.userGroupName
                    this.form.code = res.data.data.userGroupCode
                    this.form.desc = res.data.data.userGroupDesc
                    this.form.type  = res.data.data.userGroupType
                    this.form.level  = res.data.data.userGroupLevel
                    this.form.organization = res.data.data.userGroupValue
                    this.id = res.data.data.parentGroupId
                }else{
                }
            }).catch((err)=>{
                console.log(err);
                alert('网络异常')
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if(this.editToggle){
                        this.updateResource()
                    }else{
                        this.addResource()
                    }
                } else {
                console.log("error submit!!");
                return false;
                }
            });
        },
        clear(){
            this.form.name = ''
            this.form.code = ''
            this.form.type = 'BRAND_SHOP'
            this.form.level = ''
            this.form.organization = ''
            this.form.desc = ''
            this.value = ''
            this.id = ''
        },
        //重置表单
        resetForm(formName) {
            if (this.$refs[formName]) {
                if (this.$refs[formName] !== undefined) {
                this.$refs[formName].resetFields();
                } else {
                this.$nextTick(() => {
                    this.$refs[formName].resetFields();
                });
                }
            }
        },
        close(){
            this.dialogVisible = false
            this.clear()
            this.resetForm('form')
        },
        mouseenter(node){
            this.$set(node,'show',true)
        },
        mouseleave(node){
            this.$set(node,'show',false)
        },
        add(){
            this.clear()
            this.dialogVisible = true;
            this.editToggle = false
            this.getNoRelation('BRAND_SHOP')
        },
        edit(node) {
            this.getMore(node.key)
            this.editToggle = true;
            this.dialogVisible = true
        },
        del(node) {
        },
        remove(node, resource) {
            console.log(node.data.parentId)
            console.log(resource)
        },
        filterNode(value, data) {
            console.log(value,data)
            if (!value) return true;
            return data.resourceName.indexOf(value) !== -1;
        },
        // 获取组织架构数据
        getSource(){
            this.$http.get(''+process.env.API_ROOT+'/system/userGroup/getAllUserGroup'
            )
            .then((res)=>{
                console.log('组织架构数据',res)
                if(res.data.code ==1){
                    this.resource = res.data.data
                }else{
                    this.resource=[]
                }
            }).catch((err)=>{
                console.log(err);
                alert('网络异常')
            })
        },
    }
};
</script>
<style lang="scss" scoped>

    
        
.organization {
    .el-form-item{
        .el-select{
            width: 100%;
        }
    }
    
  .head {
    h1 {
      opacity: 0.87;
      font-family: "zt2";
      font-size: 18px;
      color: #000;
      letter-spacing: 0;
      line-height: 36px;
      height: 42px;
      font-weight: bold;
      padding: 0 50px;
    }
    .el-breadcrumb {
      margin-left: 50px;
      line-height: 30px;
      margin-right: 20px;
    }
  }
  .box {
    position: relative;
    margin: 0 20px 20px 20px;
    background: #ffffff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    .btns {
      .add {
        font-family: "zt2";
        margin: 12px 0 12px 30px;
      }
    }
    .content{
        border-top: 1px solid #ccc;
        background: #fff;
        box-shadow: 0 0 8px 0 rgba(0,0,0,0.05);
        padding: 30px;
        .l-con{
            padding: 20px;
            box-sizing: border-box;
            width: 50%;
            float: left;
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
        .r-con{
            padding: 20px;
            box-sizing: border-box;
            width: 50%;
            float: left;
        }
    }
  }
}
</style>

