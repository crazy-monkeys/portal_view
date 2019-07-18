<template>
    <div class="daterange">
        <el-date-picker class="startTime" size='small' type="date" placeholder="开始日期"
            v-model="startTime">
        </el-date-picker>
        <span>至</span>
        <el-date-picker class="endTime" size='small' type="date" placeholder="结束日期"
            v-model="endTime">
        </el-date-picker>
    </div>
</template>
<script>
export default {
    data(){
        return {
            startTime:'',
            endTime:'',
        }
    }
}
</script>

<style lang="scss" scoped>
    .daterange{
        // width: 414px;
        // background: red;
        box-sizing: border-box;
        .startTime,.endTime{
            width: 195px;
            box-sizing: border-box;
        }
        span{
            display: inline-block;
            width: 14px;
            margin: 0;
            padding: 0;
        }
    }
</style>
