<template>
        <el-dialog
            title="提示"
            :visible.sync="vis"
            width="30%"
            :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="vis = false">取 消</el-button>
            <el-button type="primary" @click="vis = false">确 定</el-button>
            </span>
        </el-dialog>
</template>    
<script>
    export default {
        props:{
        },
        data() {
            return {
                vis:false
            };
        },
        watch:{
            vis: {
                handler:function(n,o){
                    this.$emit('data',n)
                }
            }
            
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            }
        }
    };
</script>