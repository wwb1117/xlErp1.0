<template>
    <div id="purchaseDetail_wrap">
        <div class="tab_wrap">
            <el-tabs v-model="tabActive" @tab-click="tabHandleClick">
                <el-tab-pane class="model_content" :style="{height: $store.state.home.modelContentHeight + 'px'}" label="采购单详情" name="detail">
                    <div class="tab_content">
                        <div class="tab_title fontWe_600">
                            <span class="title_states">待入库</span>
                            <span style="margin-left: 30px" class="title_title">采购单号 : </span>
                            <span class="title_data">456655222222222222522</span>
                            <span class="title_title">供应商 : </span>
                            <span class="title_data">杭州苏雅诗贸易有限公司</span>
                            <span class="title_title">采购单位 : </span>
                            <span class="title_data">妈妈去哪儿</span>
                            <span class="title_title">入库仓库 : </span>
                            <span class="title_data">默认仓库</span>
                            <span class="title_title">采购时间 : </span>
                            <span class="title_data">2018-05-18 16:34</span>
                        </div>
                        <div class="banner">
                            商品信息
                        </div>
                        <div class="table_wrap" :style="{height: $store.state.home.modelContentHeight - 125 + 'px'}">
                            <el-table
                                :data="goodsInfoData"
                                show-summary
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
                                prop="unit"
                                label="单位">
                                </el-table-column>
                                <el-table-column
                                prop="unitPrice"
                                label="采购单价(元)">
                                </el-table-column>
                                <el-table-column
                                prop="unitTotal"
                                label="小计(元)">
                                </el-table-column>
                            </el-table>
                            <div class="table_bottom">
                                <div class="table_bottom_item">
                                    <span class="table_bottom_title">备注 : </span>
                                    <span></span>
                                </div>
                                <div class="table_bottom_item">
                                    <span class="table_bottom_title">采购员 : </span>
                                    <span>浩克</span>
                                </div>
                                <div class="table_bottom_item">
                                    <span class="table_bottom_title">制单人 : </span>
                                    <span>托尼</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane class="model_content" :style="{height: $store.state.home.modelContentHeight + 'px'}" label="入库记录" name="inrepos">
                    <div class="tab_content">
                        <div class="tab_title fontWe_600 tab_ruku_title">
                            <span class="title_states">待入库</span>
                            <span style="margin-left: 30px" class="title_title">采购单号 : </span>
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
                        <div :style="{height: $store.state.home.modelContentHeight - 64 + 'px'}"  class="ruku_content">
                            <wait-ruku></wait-ruku>
                            <stock-record></stock-record>
                        </div>
                    </div>


                </el-tab-pane>
            </el-tabs>
            <div v-show="tabActive == 'detail'" style="position: absolute; right: 10px; top: 7px">
                <el-button size="small" style="width: 90px">导出</el-button>
                <el-button size="small" style="width: 90px">编辑</el-button>
                <el-button size="small" @click="deleteEvent" style="width: 90px">删除</el-button>
                <el-button size="small" style="width: 90px">打印</el-button>
                <el-button size="small" type="primary" style="width: 90px">入库</el-button>
            </div>
        </div>
        <div class="wrap_footer">
            <el-button style="width: 90px" size="small">返回</el-button>
        </div>
    </div>
</template>

<script>
import waitRuku from 'views/purchase/childComponents/waitin_goodslist'
import stockRecord from 'views/purchase/childComponents/stockRecord'
export default {
    components: {
        waitRuku,
        stockRecord
    },
    data(){
        return {
            tabActive: 'detail',
            goodsInfoData: [{
                selfNum: '11111',
                barCode: '',
                goodName: '',
                SKU: '',
                qualityDate: '',
                productData: '',
                purchaseNum: '',
                unit: '',
                unitPrice: '',
                unitTotal: ''
            }]
        }
    },
    computed:{},
    methods:{
        tabHandleClick(tab){
            console.log(tab)
        },
        deleteEvent(){
            this.myBase.confirmDelet('你确定要删除该订单?', function(){
                alert("wwoo")
            })
        }
    },
    created(){},
    mounted(){}
}
</script>
<style scoped>
.tab_title{
    height: 65px;
    line-height: 65px;
    padding-left: 20px;
    font-size: 15px;
}
.tab_ruku_title{
    background: #fff2ef
}
.tab_title span{
    display: inline-block;
}
.title_states{
    color: #ec706b;
    font-size: 18px;
}
.tab_content{
    background: #ffffff;
    height: 100%;
}
.title_title{
    color: #929597;
}
.title_data{
    color: #5f6264;
    margin-right: 40px;
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
    overflow: auto;
}
.table_bottom{
    margin-top: 20px;
}
.table_bottom_item{
    height: 35px;
    line-height: 35px;
    font-weight: 600;
    color: #606365;
}
.table_bottom_title{
    display: inline-block;
    width: 70px;
    text-align: right;
}
.wrap_footer{
    height: 49px;
    line-height: 49px;
    padding-left: 25px;
}
.ruku_content{
    overflow: auto;
    padding: 10px;
}
</style>
