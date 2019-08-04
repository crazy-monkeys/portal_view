<template>
    <div class="daterange">
        <el-date-picker class="startTime" size='small' type="date" placeholder="开始日期"
            v-model="time.startTime" @change="changeStartTime" value-format="yyyy-MM-dd">
        </el-date-picker>
        <span>至</span>
        <el-date-picker class="endTime" size='small' type="date" placeholder="结束日期"
            v-model="time.endTime" @change="changeEndTime" value-format="yyyy-MM-dd">
        </el-date-picker>
    </div>
</template>
<script>
export default {
    props:['resetDataReg','resetDataCreate'],
    data(){
        return {
            time:{
                startTime:'',
                endTime:'',
            }
        }
    },
    watch:{
        time:{
            handler:function(n,o){
                console.log(n)
                this.$emit('data',n)
            },
            deep:true
        },
        resetDataReg:{
            handler:function(n,o){
                console.log(n)
                if(n){
                    this.time = {
                        startTime :'',
                        endTime :'',
                    }
                }
            }
        },
        resetDataCreate:{
            handler:function(n,o){
                console.log(n)
                if(n){
                    this.time = {
                        startTime :'',
                        endTime :'',
                    }
                }
            }
        },
    },
    methods:{
        changeStartTime(val){
            console.log(val)
            this.$emit('data',this.time)
        },
        changeEndTime(val){
            console.log(val)
            this.$emit('data',this.time)

        },
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
