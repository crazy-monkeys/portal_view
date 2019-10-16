<template>
    <div class="tem"  >
        <h1 class="sy">
            <div class="wat">
                <div class="watword">
                    UNISOC CONFIDENTIAL
                </div>
            </div>
        </h1>
        
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
           <div class="tab">
               <el-table
                style="width:100%"
                :data="tableData"
                >
                <el-table-column
                type="index"
                label="序号"
                width="100"
                >
                
                </el-table-column>
                <el-table-column
                prop="bu"
                label="事业部"
                width="100"
                >
                 <template slot-scope="scope">
                <span v-if="scope.row.bu=='Connectivity Device BU'">泛连接</span>
                <span v-if="scope.row.bu=='Industrial Electronics BU'">工业电子</span>
                <span v-if="scope.row.bu=='Consumer Electronics BU'">消费电子</span>
              </template>
                </el-table-column>
                <el-table-column
                prop="productModel"
                label="产品型号"
                width="100"
                >
                </el-table-column>
                <el-table-column
                prop=""
                label="单位"
                width="100"
                >
                <template>套</template>
                </el-table-column>
                <el-table-column
                prop=""
                width="100"
                label="数量">
                <template>1</template>
                </el-table-column>
                <el-table-column
                prop="catalogPrice"
                label="PO价格"
                width="100"
                >
                </el-table-column>
                <el-table-column
                v-if='type==1 || type==2 || type==4'
                prop="actualPrice"
                label="实际价格"
                width="100"
                >
                </el-table-column>
                <el-table-column
                prop="effectTime"
                label="生效时间"
                width="120"
                >
                </el-table-column>
            </el-table>
           </div>
            
           <div class="desc" v-if="type=='all'">
                <h3>报价说明：</h3> 
                <div><span> 一.</span><p>上述价格币别为美金</p></div>   
                <div><span> 二.</span><p>上述价格人民币采购汇率为下达采购订单当日的中国人民银行美金中间价（仅限样品）</p></div>   
                <div><span> 三.</span><p>上述价格若以人民币采购不包含相关税费（仅限样品）</p></div>   
                <div><span> 四.</span><p>上述套片价格无拆分价格</p></div>   
                <div><span> 五.</span><p>上述产品的交货周期为询价方提供准确有效的需求预测后十二周</p></div>   
                <div><span> 六.</span><p>上述产品需以最小包装的整数倍向展锐或展锐代理商下单采购（样品除外）</p></div>   
                <div><span> 七.</span><p>上述报价信息属高度机密，未经报价方事先书面同意，不得向贵司以外的任何第三方直接或间接透露</p></div>   
                <div><span> 八.</span><p>本报价单取代展锐之前已向贵司发出的相同型号报价单</p></div>   
                <div><span> 九.</span><p>报价有效期：{{start}}—{{end}}</p></div>   
           </div>
           <div class="desc" v-if="type=='empty'">
                <h3>报价说明：</h3> 
                <div><span> 一.</span><p>上述价格币别为美金</p></div>   
                <div><span> 二.</span><p>上述价格人民币采购汇率为下达采购订单当日的中国人民银行美金中间价（仅限样品）</p></div>   
                <div><span> 三.</span><p>上述价格若以人民币采购不包含相关税费（仅限样品）</p></div>   
                <div><span> 四.</span><p>上述套片价格无拆分价格</p></div>   
                <div><span> 五.</span><p>上述产品的交货周期为询价方提供准确有效的需求预测后十二周</p></div>   
                <div><span> 六.</span><p>上述产品需以最小包装的整数倍向展锐下单采购（样品除外）</p></div>   
                <div><span> 七.</span><p>本报价单取代展锐之前已向贵司发出的相同型号报价单</p></div>   
                <div><span> 八.</span><p>报价有效期：{{start}}—{{end}}</p></div>   
           </div>
           <div class="desc" v-if="type=='noEmpty'">
                <h3>报价说明：</h3> 
                <div><span> 一.</span><p>上述价格仅适用于代理商负责之最终客户{{name}}</p></div>   
                <div><span> 二.</span><p>上述价格币别为美金</p></div>   
                <div><span> 三.</span><p>上述价格人民币采购汇率为下达采购订单当日的中国人民银行美金中间价（仅限样品）</p></div>   
                <div><span> 四.</span><p>上述价格若以人民币采购不包含相关税费（仅限样品）</p></div>   
                <div><span> 五.</span><p>上述套片价格无拆分价格</p></div>   
                <div><span> 六.</span><p>上述产品的交货周期为询价方提供准确有效的需求预测后十二周</p></div>   
                <div><span> 七.</span><p>上述产品需以最小包装的整数倍向展锐下单采购（样品除外）</p></div>   
                <div><span> 八.</span><p>上述报价信息属高度机密，未经报价方事先书面同意，不得向贵司以外的任何第三方直接或间接透露</p></div>   
                <div><span> 九.</span><p>本报价单取代展锐之前已向贵司发出的相同型号报价单</p></div>   
                <div><span> 十.</span><p>报价有效期：{{start}}—{{end}}</p></div>   
           </div>

           <div class="desc" v-if="type==1">
                <h3>报价说明：</h3> 
                <div><span> 一.</span><p>上述价格币别为美金</p></div>   
                <div><span> 二.</span><p>上述套片价格无拆分价格</p></div>   
                <div><span> 三.</span><p>上述产品的交货周期为询价方提供准确有效的需求预测后十二周</p></div>   
                <div><span> 四.</span><p>上述产品需以最小包装的整数倍向展锐或展锐代理商下单采购（样品除外）</p></div>   
                <div><span> 五.</span><p>上述报价信息属高度机密，未经报价方事先书面同意，不得向贵司以外的任何第三方直接或间接透露</p></div>   
                <div><span> 六.</span><p>本报价单取代展锐之前已向贵司发出的相同型号报价单</p></div>   
                <div><span> 七.</span><p>报价有效期：{{start}}—{{end}}</p></div>   
           </div>
           <div class="desc" v-if="type==2">
                <h3>报价说明：</h3> 
                <div><span> 一.</span><p>上述价格币别为美金</p></div>   
                <div><span> 二.</span><p>上述套片价格无拆分价格</p></div>   
                <div><span> 三.</span><p>上述产品的交货周期为询价方提供准确有效的需求预测后十二周</p></div>   
                <div><span> 四.</span><p>上述产品需以最小包装的整数倍向展锐或展锐代理商下单采购（样品除外）</p></div>   
                <div><span> 五.</span><p>上述报价信息属高度机密，未经报价方事先书面同意，不得向贵司以外的任何第三方直接或间接透露</p></div>   
                <div><span> 六.</span><p>本报价单取代展锐之前已向贵司发出的相同型号报价单</p></div>   
                <div><span> 七.</span><p>报价有效期：{{start}}—{{end}}</p></div>   
           </div>
           <div class="desc" v-if="type==4">
                <h3>报价说明：</h3> 
                <div><span> 一.</span><p>上述价格币别为美金</p></div>   
                <div><span> 二.</span><p>上述套片价格无拆分价格</p></div>   
                <div><span> 三.</span><p>上述产品的交货周期为询价方提供准确有效的需求预测后十二周</p></div>   
                <div><span> 四.</span><p>上述产品需以最小包装的整数倍向展锐或展锐代理商下单采购（样品除外）</p></div>   
                <div><span> 五.</span><p>上述报价信息属高度机密，未经报价方事先书面同意，不得向贵司以外的任何第三方直接或间接透露</p></div>   
                <div><span> 六.</span><p>本报价单取代展锐之前已向贵司发出的相同型号报价单</p></div>   
                <div><span> 七.</span><p>报价有效期：{{start}}—{{end}}</p></div>   
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
    props:['table','queryPrice','type','name','effectTime'],
    data(){
        return {
            
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
        },
        start(){
            return this.effectTime.split('-')[0]+'年' +this.effectTime.split('-')[1]+'月' +this.effectTime.split('-')[2] +'日'
        },
        end(){
            var time = this.$moment(this.effectTime).subtract(-1, "years").format("YYYY-MM-DD")
            return time.split('-')[0]+'年' +time.split('-')[1]+'月' +time.split('-')[2] +'日'
        },
        tableData(){
            return this.table
        }
    },
    created(){
        // console.log(this.table)
        // console.log(this.type)
    },
    updated(){
        // console.log(this.table)
        // console.log(this.type)
    }
  }
</script>
<style lang="scss">
    .tem{
        height: 100%;
        font-size: 18px;
        position:absolute;
        top: 0;
        z-index: -1111;
        .sy{
            display: flex;
            align-items: center;
            position: absolute;
            width: 100%;
            height: 90%;
            z-index: 1;
            left: 0;
            .wat{
                color: rgba(128,0,128,0.1);
                font-size: 100px;
                margin: 0 auto;
            }
            .watword{
                text-align: center;
                transform: rotate(-40deg);
            }

        }
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
  