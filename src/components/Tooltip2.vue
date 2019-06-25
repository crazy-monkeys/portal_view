<template>
    <el-tooltip effect='' placement="bottom" popper-class='a' :visible-arrow='false'>
      <div slot="content"> 
        <div  class="content">发送人数即选择人群范围统计的人数</div>  
      </div>
      <i class="el-icon-question" style="color:#ccc;margin-left:5px;"></i>
    </el-tooltip>
</template>

<script>
  export default {
  };
</script>
<style lang="scss" scoped>
$sc:12;
.a{
  background:#fff ;
  border: 1px solid #EBEBEB;
}
.content{
  width: 140px;
  height: 36px;
  line-height: 18px;
  font-size: 12px;
  color: #333333;
  letter-spacing: 0;
  text-align: center;
  border: 1px solid #000;
  background: #fff;

}
</style>
