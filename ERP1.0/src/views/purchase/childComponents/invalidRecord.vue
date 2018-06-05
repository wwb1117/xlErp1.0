<template>
    <div class="wrap">
        <div class="check_wrap fontwe_500">
            <el-checkbox :style="{color: '#f37069'}" v-model="totalChecked">作废原因</el-checkbox>
            <span class="color_gray">商品入库时,核对错误,并未实际入库</span>
        </div>
        <div class="content_wrap">
            <div class="content">
                <div class="title_wrap">
                    <div class="title">
                    作废记录
                    </div>
                    <span class="el_icon el-icon-arrow-down"></span>
                </div>
                <div class="btn_wrap">
                    <div class="tab_title fontWe_600">
                        <span class="title_title">作废时间 : </span>
                        <span class="title_data">2018-05-21 11:17</span>
                        <span class="title_title">采购单号 : </span>
                        <span class="title_data">456655222222222222522</span>
                        <span class="title_title">供应商 : </span>
                        <span class="title_data">杭州苏雅诗贸易有限公司</span>
                        <span class="title_title">采购单位 : </span>
                        <span class="title_data">妈妈去哪儿</span>
                        <span class="title_title">入库仓库 : </span>
                        <span class="title_data">默认仓库</span>
                        <!-- <span class="title_title">采购时间 : </span>
                        <span class="title_data">2018-05-18 16:34</span> -->
                    </div>
                </div>
                <div class="banner">
                    商品信息
                </div>
                <div class="table_wrap">
                    <el-table
                        :data="goodsInfoData"
                        border
                    style="width: 100%">
                        <el-table-column
                        label=" "
                        type="index"
                        width="50">
                        </el-table-column>
                        <el-table-column
                        prop="selfNum"
                        label="编号"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="barCode"
                        label="条码">
                        </el-table-column>
                        <el-table-column
                        prop="goodName"
                        label="商品">
                        </el-table-column>
                        <el-table-column
                        prop="SKU"
                        label="规格-SKU">
                        </el-table-column>
                        <el-table-column
                        prop="qualityDate"
                        label="保质期">
                        </el-table-column>
                        <el-table-column
                        prop="productData"
                        label="生产日期">
                        </el-table-column>
                        <el-table-column
                        prop="purchaseNum"
                        label="采购数">
                        </el-table-column>
                        <el-table-column
                        prop="inRepositoryNum"
                        label="已入库数">
                        </el-table-column>
                        <el-table-column
                        prop="itemRepositoryNum"
                        label="本次入库数">
                        </el-table-column>
                        <el-table-column
                        prop="unit"
                        label="单位">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="table_bottom color_gray fontWe_500">
                    <div style="margin-bottom: 30px; line-height: 30px">
                        <span class="title_title">入库单号 : </span>
                        <span class="title_data">456655222222222222522</span>
                        <span class="title_title">入库仓库 : </span>
                        <span class="title_data">默认仓库</span>
                        <span class="title_title">经办人 : </span>
                        <span class="title_data">李思思</span><br>
                        <span class="title_title">入库备注 : </span>
                        <span ></span><span>我是一只小鸭子,咿呀,咿呀, 呦,, </span>
                        <!-- <span class="title_title">采购时间 : </span>
                        <span class="title_data">2018-05-18 16:34</span> -->
                    </div>
                    <div style="margin-bottom: 30px; line-height: 30px">
                        <span class="title_title">采购单号 : </span>
                        <span class="title_data">456655222222222222522</span>
                        <span class="title_title">采购员 : </span>
                        <span class="title_data">章撒</span>
                        <span class="title_title">制单人 : </span>
                        <span class="title_data">李思思</span><br>
                        <span class="title_title">采购备注 : </span>
                        <span ></span><span>我是一只小鸭子,咿呀,咿呀, 呦,, </span>
                        <!-- <span class="title_title">采购时间 : </span>
                        <span class="title_data">2018-05-18 16:34</span> -->
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props: ['fatherValue'],
    data(){
        return {
            dialogVisible: false,
            invalidRecord: '',
            totalChecked: "",
            formData: {
                inrepository: '',
                purchaseCom: '',
                inRepositoryDate: '',
                repositoryNo: '8558558',
                makerMan: 'wwb',
                repositoryType: '',
                marker: ''

            },
            goodsInfoData: [{
                oper: '',
                selfNum: '11111',
                barCode: '',
                goodName: '',
                SKU: '',
                qualityDate: '',
                productData: '',
                purchaseNum: '',
                inRepositoryNum: '',
                itemRepositoryNum: '',
                unit: ''
            }]
        }
    },
    computed:{},
    methods:{
        unitTatalEvent (data){
            data.row.itemRepositoryNum = data.row.itemRepositoryNum.replace(/[^\d\.]/g, '')
        },
        invalidBtnEvent(){
            this.dialogVisible = true
        },
        dialogSureEvent(){
            this.$router.push({
                path: '/invalidRecord'
            })
            this.dialogVisible = false
        }
    },
    created(){},
    mounted(){

    }
}
</script>
<style scoped>
    .wrap{
        margin-top: 10px;
    }
    .title{
        height: 32px;
        line-height: 32px;
        color: #ffffff;
        font-weight: 600;
        padding-left: 10px;
        width: 100px;
        background: #909498;
        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;
    }
    .title_wrap{
        height: 49px;
        border-bottom: 1px solid #E4E7ED;
        padding-top: 8px;
        position: relative;
    }
    .btn_wrap{
        height: 66px;
        padding: 10px;
    }
    .el_icon{
        display: inline-block;
        position: absolute;
        right: 20px;
        top: 20px;
        cursor: pointer;
    }
    .banner{
        height: 40px;
        background: #f5f5f5;
        line-height: 40px;
        color: #606266;
        font-weight: 600;
        padding-left: 10px;
    }
    .table_wrap{
        padding: 10px;
    }
    .table_bottom_form{
        padding: 10px;
    }
    .table_bottom{
        padding-left: 10px;
    }
    .title_data{
        margin-right: 30px;
    }
    .check_wrap{
        background: #fff2ef;
        height: 64px;
        line-height: 64px;
        padding-left: 17px;
    }
    .check_wrap span{
        display: inline-block;
        margin-left: 40px;
    }
    .content_wrap{
       padding: 10px;
    }
    .content{
        border: 1px solid #E4E7ED;
    }
    .tab_title{
        font-size: 15px;
    }
    .title_title{
        color: #929597;
    }
    .title_data{
        color: #5f6264;
        margin-right: 40px;
    }
</style>
