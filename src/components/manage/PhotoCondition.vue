<template>
  <div class="photoCodition">
    <div class="head clear">
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/home' }">客户营销</el-breadcrumb-item> -->
        <el-breadcrumb-item>客户管理</el-breadcrumb-item>
        <el-breadcrumb-item>快照管理</el-breadcrumb-item>
        <el-breadcrumb-item>快照且或非</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>
        <i class="el-icon-back" @click="back"></i>
        快照且或非</h1>
      
    </div>
    <div class="box">
      <el-form class="baseMsg"  :label-position="labelPosition" :model="form" ref="form" label-width="100px">
        <h1>基本信息</h1>
        <el-form-item label="快照名称" class="name" :rules='rules.name' prop='name'>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <p>已选快照：{{name}}</p>
        <el-form-item label="筛选条件"   >
          <div v-for="(item,index) in valueArr" :key="index" class='valueBox' >
            <div class="drop">
              <el-dropdown trigger="click" @command='a'>
                <span class="el-dropdown-link">
                  {{item.select}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command='{name:"或者",value:"or",index:index}'>或者</el-dropdown-item>
                  <el-dropdown-item :command='{name:"排除",value:"not",index:index}'>排除</el-dropdown-item>
                  <el-dropdown-item :command='{name:"并且",value:"and",index:index}'>并且</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <el-select v-model="item.snapshotId" class="proName" placeholder="请选择快照"  filterable >
              <el-option
                v-for="ele in newList"
                :key="ele.snapshotId"
                :label="ele.snapshotName"
                :value="ele.snapshotId"
                >
              </el-option>
            </el-select>
            <i class="el-icon-plus plus" @click="addValue" ></i>
            <i class="el-icon-delete plus" @click="delValue(index)" v-if="index!=0" ></i>
          </div>  
        </el-form-item>
      </el-form>
      <div class="btns">
        <el-button type="primary"  @click="submitForm('form',1)">计算</el-button> <span class="num"> （当前选择{{num}}个客户） </span> 
      </div>
    </div>
    <div class="bottom">
      <el-button @click="back">取消</el-button>
      <el-button type='primary' @click="submitForm('form',0)">生成</el-button>
    </div>
  </div>
  
</template>

<script>
  import formTest from '../../assets/js/formTest'

export default {
  name: 'photoCodition',
  data () {
    return {
      name:'',
      num:0,
      list:[],
      newList :[],
      valueArr: [
        {
          select:'或者',
          snapshotId:'',
          type: "or",
          priorityValue:1
        }
      ],
      rules: {
        name: [
          { required: true, message: '快照名称不能为空', trigger: 'blur' },
        ],
        phone: [
          { required: true,  trigger: 'blur' ,validator:formTest.phoneTest}
        ],
        email: [
          { required: true, trigger: 'blur',validator:formTest.emailTest }
        ],
        snapshotId: [
          { required: true, trigger: 'blur',message: '请选择快照', }
        ],
      },
      labelPosition:'top',
      form:{
        name:'',
      },
      //搜索条件
      way:{
        // 全部类型、SMS、EDM、TB”
      },
      selStr:"",
      tableData: [],
      //默认页
      currentPage : 1,
      //默认数量
      pageSize : 10,
      //默认总页数
      total:0,
      //用户店铺列表
      shopList:[
        {
          shop_info_id:'',
        }
      ],
    }
  },
  created(){
      this.getBlack(this.currentPage,this.pageSize,this.shopId)
      
  },
  computed: {
    shopId(){
      return this.$store.state.shopId.shopId
    },
    type(){
      return this.$route.params.type
    },
    valueStr(){
      var arr  = [];
      var str = '';
      this.valueArr.forEach(item=>{
        arr.push(item.snapshotId)
      })
      str = arr.join(',')
      return str
    }
  },
  watch:{
    shopId:{
      handler:function(n,o){
        if(n!=o){
          console.log(1111111111111)
            this.getBlack(this.currentPage,this.pageSize,this.shopId);
        }
      }
    },
    // valueStr:{
    //   handler:function(n,o){
    //     console.log('n',n)
    //     console.log('o',o)
    //     if(n!=o){
    //       console.log(this.list)
    //       console.log('数组制空')

    //       this.newList = [];
    //       this.list.forEach(item=> {
    //         this.newList.push(item)
    //       })
    //       console.log('复制数组',this.newList)
    //       this.valueArr.forEach(ele=>{
    //       console.log('数据循环')

    //         this.list.forEach((item,index)=> {
    //       console.log('数组循环')
            
    //       console.log('判断条件',item.snapshotId == ele.snapshotId)

    //           if(item.snapshotId == ele.snapshotId){
                
    //             console.log(index)
    //               this.newList.splice(index,1)
    //           }
    //         })
    //       });
    //       console.log(this.newList)
    //     }
    //   }
    // }
  },
  methods:{
    // focus(val){
    //   this.newList = this.list
    //   // console.log(val)
    //   this.list.forEach((item,index)=> {
    //     this.valueArr.forEach(ele=>{
    //       if(item.snapshotId == ele.snapshotId){
    //         this.newList.splice(index,1)
    //       }
    //     })
        
    //   });
      // this.valueArr.forEach((item,index) => {
      //   console.log(item.snapshotId)
      //   this.list.forEach(val=>{
      //   console.log(val.snapshotId)
      //     if(val.snapshotId == item.snapshotId){
      //       this.valueArr.splice(index,1)

      //     }
      //   })
      // });
      //   console.log( this.valueArr)

    // },
    back() {
      this.$router.push({ name: "photo" });
    },
        //删除属性值
    delValue(index) {
      this.valueArr.splice(index, 1);
    },
        //添加属性值
    addValue() {
      if (this.valueArr.length < 5) {
        let obj = {
          select:'或者',
          snapshotId:'',
          type: "or",
          priorityValue:this.valueArr.length+1
        };
        this.valueArr.push(obj);
      } else {
        this.$message({
          type: "error",
          message: "筛选条件最多可以添加至5个"
        });
      }
    },
  // 选择全部，活动或者快照名称
    a(command){
      this.valueArr[command.index].select = command.name
      this.valueArr[command.index].type = command.value
      console.log(this.valueArr)
    },
    //表单验证
    submitForm(formName,type) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            this.commit(type);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //清空表单
    resetForm(formName) {
      if(this.$refs[formName]){
      if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
      }else{
        this.$nextTick(()=>{
          this.$refs[formName].resetFields();
        })
      }
      }
    },
    code(code){
      switch (code){
        case 37000 :
          this.$message({
            type:'error',
            message:'店铺信息不存在'
          })
          break;
        case 37001 :
        this.$message({
            type:'error',
            message:'必填参数值不能为空'
          })
          break;
        case 37002 :
        this.$message({
            type:'error',
            message:'必填参数值不能为空'
          })
          break;
        case 37003 :
        this.$message({
            type:'error',
            message:'有筛选条件为空，请重新输入'
          })
          break;
        case 37004 :
       this.$message({
            type:'error',
            message:'快照类型不一致，请重新选择'
          })
          break;
        case 37005 :
        this.$message({
            type:'error',
            message:'快照优先级不符合标准，请重新输入'
          })
          break;
        case 37006 :
        this.$message({
            type:'error',
            message:'请勿操作不同店铺的快照'
          })
          break;
        case 37007 :
        this.$message({
            type:'error',
            message:'快照名称已存在，请重新输入'
          })
          break;
      }
    },
    // 提交
    commit(type) {
      var data = {
        "newSnapshotName":this.form.name,
        "currentSnapshotId":this.$route.params.id,
        "mergeList":this.valueArr,
        "isCalculation":type,
      }
      this.$http.post(''+process.env.API_ROOT+'/snapshot/merge',data).then((res)=>{
                  console.log("提交结果",res)
                  if(res.data.code ==1){
                    if(type == 0){
                      this.$router.push({
                        name:'photo'
                      })
                    }else{
                      console.log('计算')
                      this.num =res.data.data
                    }
                    
                  }else{
                    this.code(res.data.code)
                  }
              }).catch((err)=>{
                console.log(err);
                alert('网络异常')
              })
    },
    //获取快照列表
    getBlack(pageIndex,pageSize,shopid) {
      this.$http({
        method:'get',
        url:''+process.env.API_ROOT+'/snapshot?pageIndex='+pageIndex+'&pageSize='+pageSize+'&shopInfoId=' + shopid +'&snapshotName=&snapshotType='+this.type+'&isPage=0'
      }).then(res => {
          console.log("快照列表", res);
          if(res.data.code==1){
            this.list = res.data.data.list
            this.newList=[]
            // this.list.forEach(item=>{
            //   if(item.snapshotId == this.$route.params.id){}
              
            // })
            // console.log(this.list)
            this.list.forEach(item=>{
              if(item.snapshotId == this.$route.params.id){
                this.name = item.snapshotName
              }else{
                this.newList.push(item)
              }
            })

          }
        })
        .catch(error => {
          console.log(error);
          alert("获取失败");
        });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
$sc:12;
.photoCodition{
  position: relative;
  height: 94%;
  // margin-top: -56px;
  .head{
    h1{
        opacity: 0.87;
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #000;
        letter-spacing: 0;
        line-height: 36px;
        height: 42px;
        font-weight: bold;
        padding: 0 50px;
        // float: left;
      }
    .el-breadcrumb{
      // float: right;
      margin-left: 50px;
      line-height: 30px;
      margin-right: 20px
    }
    i {
        font-weight: bold;
        margin-right: 20px;
        cursor: pointer;
        padding-right: 30px;
        border-right: 1px solid #aaa
      }
  }
  .box{
    position: relative;
    margin: 0 20px 20px 20px;
    background: #FFFFFF;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.05);
    border-radius: 2px;
    padding: 20px 0 0 0 ;
    .baseMsg{
      padding:0 20px;
      border-bottom: 1px solid  #F0F1F4;;
      .name{
        .el-input__inner{
          width: 50%;
        }
      }
      h1{
        font-size: 16px;
        color: #333333;
        letter-spacing: 0.5px;
        line-height: 16px;
      }
      .valueBox{
          margin-bottom: 20px;
         .drop{
          border:  1px solid #ccc;
          height: 38px;
          line-height: 38px;
          padding: 0 10px 0 10px;
          margin:0 20px 0 0;
          float: left;
          box-sizing: border-box;
        }
        .proName {
          width: 60%;
        }
      }
      
      .plus {
        font-size: 20px;
        margin-left: 20px;
      } 
    }
    .btns{
      padding: 20px;
      .num{
        font-size: 14px;
        color: #3366FF;
        letter-spacing: 0;
        line-height: 20px;
      }
    }
  }
  .bottom{
    display: flex;
    position: absolute;
    justify-content: center;
    width: 100%;
    background: #fff;
    padding: 20px;
  }
}
</style>
