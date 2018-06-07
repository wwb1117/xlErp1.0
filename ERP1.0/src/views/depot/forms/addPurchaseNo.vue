<template>
    <div id="chooseGoodWrap">
        <div class="head color_gray">
            <el-input
                size="small"
                placeholder="请输入商品名称/商品编号"
                prefix-icon="el-icon-search"
                :style="{width: '378px'}"
                v-model="tableParam.serchText">
            </el-input>
            <el-button :style="{margin: '0 10px'}" type="primary" size="small">搜索</el-button>
            <i style="float: right; line-height: 60px" class="el-icon-close" @click="cancelBtnEvent"></i>
        </div>
        <div class="content">
            <el-table
                :height="$store.state.home.modelContentHeight - 98"
                @selection-change="tableChangeEvent"
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    width="55">
                    <template slot-scope="scope">
                        <el-radio class="radio" v-model="radio" :label="scope.row.id"></el-radio>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="purchaseOrderNo"
                    label="采购单号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="sellerName"
                    label="供应商">
                </el-table-column>
                <el-table-column
                    prop="buyerName"
                    label="采购单位">
                </el-table-column>
                <el-table-column
                    prop="purchaseHouseName"
                    label="入库仓库">
                </el-table-column>
                <el-table-column
                    prop="receivedPrice"
                    label="采购金额">
                </el-table-column>
                <el-table-column
                    prop="creator"
                    width="90"
                    label="制单人">
                </el-table-column>
                <el-table-column
                    prop="purchasingAgent"
                    label="采购员">
                </el-table-column>
                <el-table-column
                    label="采购时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.orderTime | time_m}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="入库状态">
                    <template slot-scope="scope">
                        <span style="color: #f37069" v-if="scope.row.storeStatus == 0">{{$allEnumeration.storeStatus[scope.row.storeStatus]}}</span>
                        <span style="color: #e7a03d" v-if="scope.row.storeStatus == 1">{{$allEnumeration.storeStatus[scope.row.storeStatus]}}</span>
                        <span v-if="scope.row.storeStatus == 2">{{$allEnumeration.storeStatus[scope.row.storeStatus]}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="model_footer">
            <el-button @click="sureBtnEvent" style="width: 90px" type="primary" size="small">确定</el-button>
            <el-button @click="cancelBtnEvent" style="width: 90px" size="small">取消</el-button>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="tableParam.pageNo"
                :page-sizes="[10, 30, 50, 100]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalPage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import 'utils/allEnumeration'
import api from 'api/purchase'
export default {
    data(){
        return {
            radio: '',
            SKUSelectvalue: [],
            totalPage: 1,
            goodsItemSelectData: [],
            goodsInfoData: [{
                oper: '',
                selfNum: '',
                barCode: '',
                goodName: '',
                SKU: '',
                qualityDate: '',
                productData: '',
                purchaseNum: '',
                unit: '',
                unitPrice: '',
                unitTotal: ''
            }],
            SKUSelectData: [],
            tableParam: {
                serchText: '',
                pageSize: 10,
                pageNo: 1,
                mainImg: '',
                title: '',
                itemCode: '',
                categoryName: '',
                brandName: '',
                barCode: ''
            },
            tableData: [],
            selectTableData: []
        }
    },
    computed:{},
    methods:{
        handleSizeChange(data){
            this.getTableData({pageNo: this.currentPage, pageSize: data})
        },
        handleCurrentChange(data){
            this.getTableData({pageNo: data})
        },
        tableChangeEvent() {},
        getTableData(data){
            api.getPurchaseList(data).then((response) => {
                this.totalPage = response.data.total
                this.tableData = response.data.list
            })
        },
        sureBtnEvent(){
            // var flg = true;
            this.selectTableData = []
            console.log(this.radio, '打印选中')
            this.tableData.forEach((res) => {
                if (res.id == this.radio) {
                    this.selectTableData.push(res)
                }
            })
            console.log(this.tableData, '表中数据')
            if (this.selectTableData.length == 0) {
                this.$message({
                    type: 'warning',
                    duration: 1500,
                    showClose: true,
                    message: '请选择订单'
                })
                return
            }
            this.$emit('saveAddpurchaseFn', this.selectTableData)
            this.$store.commit('hidePurchase')
        },
        cancelBtnEvent(){
            this.$store.commit('hidePurchase')
        }
    },
    activated(){
        this.getTableData()
    },
    created(){},
    mounted(){
        this.getTableData()
    }
}
</script>
<style>
    #chooseGoodWrap .radio .el-radio__label{
        display: none;
    }
</style>
<style scoped>
    #chooseGoodWrap{
        background: white;
    }
    .head{
        height: 60px;
        line-height: 60px;
        font-size: 16px;
        padding: 0 20px;
    }
    .banner{
        height: 56px;
        background: #f5f5f5;
        padding-top: 11px;
    }
    .model_footer{
        text-align: left;
        padding-top: 11px;
        padding-left: 20px;
    }
    .content{
        padding: 10px;
    }
    .el-table{
        border: 1px solid #E4E7ED;
    }
    .el-pagination{
        float: right;
        padding-top: 0;
    }

</style>
