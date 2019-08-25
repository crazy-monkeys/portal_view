<template>
    <div class="tem"  >
        <div>
           <img class="lglogo" src="@/assets/img/logostr.png" alt="" >
           <div class="r line">
               文档编号:2019
           </div>
           <h1>报价单</h1>
           <div class="r">
               报价时间：2019年1月XX日
           </div>
           <div class="box">
               <span class="box-left" >报价方：北京紫光展锐科技有限公司</span>
               <span class="box-right">询价方：****有限公司</span> 
           </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'tem',
    data(){
        return {
            
        }
    }
  }
</script>
<style lang="scss">
    .tem{
        position:absolute;
        top: 0;
        z-index: -1111;
        .r{
            text-align: right;
        }
        .line{
            border: 2px solid #000;
            border-left: none;
            border-right: none;
        }
        h1{
            font-size:50px;
            font-weight:bold;
            text-align: center;
            padding:50px 0px 100px 0px;
        }
        .box{
            .box-left{
                color: red;
            }
            .box-right{
                color: yellow;
            }
        }
    }
</style>
  