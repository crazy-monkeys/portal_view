<template>
    <div class="relative-element">
        <textarea v-model="myForm.remark" type="textarea" :maxlength="300" placeholder="请输入备注，300字以内"></textarea>
        <div class="bottom-labels" ref="remarkLabels">
            <span title="<姓名1>" @click.stop="autoFillIn('<姓名1>', $event)">姓名1</span>
            <span title="<姓名2>" @click.stop="autoFillIn('<姓名2>', $event)">姓名2</span>
            <span title="<姓名3>" @click.stop="autoFillIn('<姓名3>', $event)">姓名3</span>
            <span title="<姓名4>" @click.stop="autoFillIn('<姓名4>', $event)">姓名4</span>
            <span title="<姓名5>" @click.stop="autoFillIn('<姓名5>', $event)">姓名5</span>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                myForm: {
                    remark: '小说迷 '
                }
            }
        },
        mounted() {
            this.initLabelsCheck(this.myForm.remark);
        },
        methods: {
            // textarea初始化（标签根据内容是否选中）
            initLabelsCheck(remark) {
                if(remark){
                    let remarkArr = remark.split(" ");
                    if(remarkArr.length > 0 && this.$refs.remarkLabels){
                        let labels = this.$refs.remarkLabels.querySelectorAll("span");
                        for(let i=0; i<remarkArr.length; i++){
                            for(let l=0; l<labels.length; l++) {
                                if(remarkArr[i].trim()!=='' && remarkArr[i] === labels[l].getAttribute("title")){
                                    labels[l].classList.add('active');
                                }
                            }
                        }
                    }
                }
            },
            // textarea点击标签自动填入
            autoFillIn(text, event){
                let target = event.target;
                if(target.classList.contains("active")){
                    // 再次点击删除
                    text = text + " ";
                    this.myForm.remark = this.myForm.remark.replace(text, '');
                } else {
                    if(this.myForm.remark.length === 0){
                        this.myForm.remark += text + " ";
                    } else {
                        this.myForm.remark = this.myForm.remark.trim() + " " + text + " ";
                    }
                }
                target.classList.toggle("active");
            }
        }
    }
</script>
<style lang="scss" scoped>
    .relative-element {
        position: relative;
        margin: 30px 40px;
        width: 400px;
        textarea {
            display: block;
            padding: 5px 15px;
            width: 100%;
            height: 150px;
            resize: vertical;
            line-height: 1.5;
            box-sizing: border-box;
            font-size: inherit;
            color: #606266;
            background-color: #fff;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        }
        .bottom-labels {
            position: absolute;
            left: 10px;
            right: 10px;
            bottom: 3px;
            line-height: 18px;
            background-color: #fff;
            user-select: none;

            span {
                display: inline-block;
                margin: 0 3px;
                padding: 0 6px;
                font-size: 12px;
                background-color: #f3f3f3;
                vertical-align: middle;
                &:hover {
                    cursor: pointer;
                }
                &.active {
                    color: #29e;
                }
            }
        }
    }
</style>