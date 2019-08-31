<template>
    <div class="tem"  >
        <div>
           <img class="lglogo" src="@/assets/img/logostr.png" alt="" >
           <div class="r line">
               文档编号:2019
           </div>
           <h1>报价单</h1>
           <div class="r">
               报价时间：{{time}}
           </div>
           <div class="box clear">
               <span class="box-left" >报价方：北京紫光展锐科技有限公司</span>
               <span class="box-right">询价方：{{queryPrice}}</span> 
           </div>
            <el-table
                :data="table"
                >
                <el-table-column
                type="index"
                label="序号"
                width="100"
                >
                </el-table-column>
                <el-table-column
                prop="productModel"
                label="产品型号"
                >
                </el-table-column>
                <el-table-column
                prop=""
                label="单位">
                <template>套</template>
                </el-table-column>
                <el-table-column
                prop=""
                label="数量">
                <template>1</template>
                </el-table-column>
                <el-table-column
                prop="catalogPrice"
                label="PO价格">
                </el-table-column>
                <el-table-column
                prop="effectTime"
                label="生效时间">
                </el-table-column>
            </el-table>
           <div class="desc">
                <h3>报价说明：</h3> 
                <div><span> 一.</span><p>上述价格仅适用于代理商负责之最终客户XX（“最终客户”）</p></div>   
                <div><span> 二.</span><p>上述价格币别为美金</p></div>   
                <div><span> 三.</span><p>上述价格人民币采购汇率为下达采购订单当日的中国人民银行美金中间价（仅限样品）</p></div>   
                <div><span> 四.</span><p>上述价格若以人民币采购不包含相关税费（仅限样品）</p></div>   
                <div><span> 五.</span><p>上述套片价格无拆分价格</p></div>   
                <div><span> 六.</span><p>上述产品的交货周期为询价方提供准确有效的需求预测后十二周</p></div>   
                <div><span> 七.</span><p>上述产品需以最小包装的整数倍向展锐下单采购（样品除外）</p></div>   
                <div><span> 八.</span><p>上述报价信息属高度机密，未经报价方事先书面同意，不得向贵司以外的任何第三方直接或间接透露</p></div>   
                <div><span> 九.</span><p>本报价单取代展锐之前已向贵司发出的相同型号报价单</p></div>   
                <div><span> 十.</span><p>报价有效期：年月日-年月日（一年）</p></div>   
           </div>
           <div class="company">
               北京紫光展锐科技有限公司
           </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'tem',
    props:['table','queryPrice'],
    data(){
        return {
            tableData:[],
            desc:[
                {
                    value:1,
                    label:'上述价格仅适用于代理商负责之最终客户XX（“最终客户”）'
                },
                {
                    value:2,
                    label:'上述价格币别为美金'
                },
                {
                    value:3,
                    label:'上述价格人民币采购汇率为下达采购订单当日的中国人民银行美金中间价（仅限样品）'
                },
                {
                    value:4,
                    label:'上述价格若以人民币采购不包含相关税费（仅限样品）'
                },
                {
                    value:5,
                    label:'上述套片价格无拆分价格'
                },
                {
                    value:6,
                    label:'上述产品的交货周期为询价方提供准确有效的需求预测后十二周'
                },
                {
                    value:7,
                    label:'上述产品需以最小包装的整数倍向展锐下单采购（样品除外）'
                },
                {
                    value:8,
                    label:'上述报价信息属高度机密，未经报价方事先书面同意，不得向贵司以外的任何第三方直接或间接透露'
                },
                {
                    value:9,
                    label:'本报价单取代展锐之前已向贵司发出的相同型号报价单'
                },
                {
                    value:10,
                    label:'报价有效期：年月日-年月日（一年）'
                },
            ]
        }
    },
    computed:{
        time(){
            var res = 
            this.$moment(new Date().getTime()).format('YYYY-MM-DD').split('-')[0]+'年'+
            this.$moment(new Date().getTime()).format('YYYY-MM-DD').split('-')[1]+'月'+
            this.$moment(new Date().getTime()).format('YYYY-MM-DD').split('-')[2]+'日'
            return  res
        }
    },
    created(){
        console.log(this.table)
    }
  }
</script>
<style lang="scss">
    .tem{
        font-size: 18px;
        position:absolute;
        top: 0;
        z-index: -1111;
        .lglogo{
            width: 200px
        }
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
            padding:50px 0px 50px 0px;
        }
        .box{
            .box-left{
                // color: red;
                float: left;
            }
            .box-right{
                // color: yellow;
                float: right;
            }
        }
        .desc{
            font-size: 18px;
            font-weight: bold;
            line-height: 40px;
            span{
                float: left;
            }
            p{
                margin-left: 20px;
            }
        }
        .company{
            text-align: right
        }
        .el-table{
                border-bottom: 1px solid #000;
            th,td{
                border: 1px solid #000;
            }
        }
    }
</style>
  