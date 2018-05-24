<template>
    <div>
        <div class="model_topcol">
            <span style="color: #409EFF">采购单</span>
            <span> - 新增采购单</span>
        </div>
        <div class="model_content" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <div class="model_content_inner" :style="{height: $store.state.home.modelContentHeight - 20 + 'px'}">
                <el-form class="myForm" :inline="true" :model="addFormData" :rules="rules" label-position="right" size="small" label-width="90px">
                    <div class="banner">
                        基本信息
                    </div>
                    <div class="baseInfoBox">
                        <el-form-item prop="sellerId" label="供应商">
                            <el-select v-model="addFormData.sellerId" placeholder="请选择供应商">
                                <el-option v-for="item in supplierSelectData" :key="item.id" :label="item.sellerCompanyName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="purchaseHouseId" label="入库仓库">
                            <el-select v-model="addFormData.purchaseHouseId" placeholder="请输入入库仓库">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="buyerId" label="采购单位">
                            <el-select v-model="addFormData.buyerId" placeholder="请输入采购单位">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="banner">
                        商品信息
                    </div>
                    <div style="padding: 10px;">
                        <el-table
                            :data="goodsInfoData"
                            :span-method="arraySpanMethod"
                            :summary-method="getSummaries"
                            show-summary
                            border
                        style="width: 100%">
                            <el-table-column
                            label=" "
                            type="index"
                            width="50">
                            </el-table-column>
                            <el-table-column
                            prop="oper"
                            label="操作"
                            width="60">
                                <template slot-scope="scope">
                                    <i @click="goodTableAddEvent(scope)" style="font-size: 16px; color: #666666; cursor: pointer; margin-right: 10px;" class="fa fa-plus"></i>
                                    <i @click="goodTableReduceEvent(scope)" style="font-size: 16px; color: #666666; cursor: pointer" class="fa fa-minus"></i>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="selfNum"
                            label="编号"
                            width="180">
                            <template slot-scope="scope">
                                <div v-if="scope.row.selfNum === ''">
                                    <el-autocomplete
                                    v-model="querySearchText"
                                    :style="{width: '270px'}"
                                    :fetch-suggestions="querySearchAsync"
                                    placeholder="输入商品名称/编号"
                                    @select="querySearchAsynSelect"
                                    >
                                    </el-autocomplete>

                                    <span @click="chooseGoodEvent" class="el-icon-more"></span>
                                </div>
                                <div v-if="scope.row.selfNum !== ''">
                                    <span v-text="scope.row.selfNum"></span>
                                </div>
                            </template>
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
                                <template slot-scope="scope">
                                    <div v-if="scope.row.selfNum === ''">
                                        <span></span>
                                    </div>
                                    <div v-if="scope.row.selfNum !== ''">
                                        <el-input @change.native="unitTatalEvent(scope)" @keyup.native="unitTatalEvent(scope)" v-model="scope.row.purchaseNum"></el-input>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="unit"
                            label="单位">
                            </el-table-column>
                            <el-table-column
                            prop="unitPrice"
                            label="采购单价(元)">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.selfNum === ''">
                                        <span></span>
                                    </div>
                                    <div v-if="scope.row.selfNum !== ''">
                                        <el-input @change.native="unitTatalEvent(scope)" @keyup.native="unitTatalEvent(scope)" v-model="scope.row.unitPrice"></el-input>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="unitTotal"
                            label="小计(元)">
                            </el-table-column>
                        </el-table>
                        <div class="tableBottom">
                            <div style="width: 350px; float: right;padding-top: 10px">
                                <el-form-item prop="freight" label="运费">
                                    <el-input @change.native="costInputChangeEvent()" @keyup.native="costInputChangeEvent()" v-model="addFormData.freight" placeholder="请输入运费"></el-input>
                                </el-form-item>
                                <el-form-item prop="otherMoney" label="其他费用">
                                    <el-input @change.native="costInputChangeEvent()" @keyup.native="costInputChangeEvent()" v-model="addFormData.otherMoney" placeholder="请输入其他费用"></el-input>
                                </el-form-item>
                                <el-form-item prop="receivedPrice" label="应付金额">
                                    <span style="color: #f56c6b" v-text="addFormData.receivedPrice"></span>
                                </el-form-item>
                            </div>
                        </div>
                    </div>

                    <div class="goodInfoBox" style="width: 650px">
                        <el-form-item prop="orderTime" label="采购时间">
                            <el-date-picker
                            v-model="addFormData.orderTime"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item prop="purchaseOrderNo" label="采购单号">
                            <el-input v-model="addFormData.purchaseOrderNo" placeholder="请输入采购单号"></el-input>
                        </el-form-item>
                        <br>
                        <el-form-item prop="purchasingAgent" label="采购员">
                            <el-input v-model="addFormData.purchasingAgent" placeholder="请输入采购员"></el-input>
                        </el-form-item>
                        <el-form-item prop="creator" label="制单人">
                            <el-input v-model="addFormData.creator" placeholder="请输入制单人"></el-input>
                        </el-form-item>
                        <br>
                        <el-form-item class="marker" :style="{width: '100%'}" prop="purchaseRemark" label="备注">
                            <el-input style="width: 490px" type="textarea" :rows="4" v-model="addFormData.purchaseRemark" placeholder="请输入备注"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>

        </div>
        <div class="model_footer">
            <el-button @click="saveBtnEvent" style="width: 90px" type="primary" size="small">保存</el-button>
            <el-button style="width: 90px" size="small">取消</el-button>
        </div>
    </div>
</template>

<script>
import api from 'api/purchase'
export default {
    data(){
        return {
            querySearchText: '',
            tableTotalUnit: 0,
            supplierSelectData: [],
            goodsInfoData: [{
                oper: '',
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
            }],
            addFormData: {
                buyerId: "123",
                buyerName: "",
                creator: "",
                purchaseOrderNo: "",
                list: [
                    {
                        itemId: "2",
                        purchaseTotalPrice: "1000",
                        purchaseUnitPrice: "10",
                        purchasingNumber: "100"
                    }
                ],
                orderTime: "",
                purchaseHouseId: "123",
                purchaseHouseName: "",
                purchasingAgent: "",
                purchasingTotalNumber: "",
                receivedPrice: "",
                sellerId: "",
                sellerName: "",
                totalMoney: "",
                freight: "",
                otherMoney: ''


            },
            rules: {
                sellerId: [
                    { required: true, message: '请选择供应商', trigger: 'blur' }
                ],
                purchaseHouseId: [
                    { required: true, message: '请选择入库仓库', trigger: 'blur' }
                ],
                buyerId: [
                    { required: true, message: '请选择采购单位', trigger: 'blur' }
                ],
                orderTime: [
                    { required: true, message: '请选择采购时间', trigger: 'blur' }
                ],
                purchaseOrderNo: [
                    { required: true, message: '请输入采购单号', trigger: 'blur' }
                ],
                creator: [
                    { required: true, message: '请输入制单人', trigger: 'blur' }
                ]
            }
        }
    },
    watch: {
        tableTotalUnit(newvalue){
            this.addFormData.receivedPrice = newvalue

            if (!isNaN(this.addFormData.freight) && this.addFormData.freight != ""){
                this.addFormData.receivedPrice = this.addFormData.receivedPrice + parseFloat(this.addFormData.freight)
            }
            if (!isNaN(this.addFormData.otherMoney) && this.addFormData.otherMoney != ""){
                this.addFormData.receivedPrice = this.addFormData.receivedPrice + parseFloat(this.addFormData.otherMoney)
            }
        }
    },
    computed:{},
    methods:{
        goodTableAddEvent(){
            var itemobj = {
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
            }

            this.goodsInfoData.push(itemobj)
        },
        getSummaries(param){
            var columns = param.columns
            var data = param.data
            var sums = []

            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                if (column.property == 'purchaseNum' || column.property == 'unitTotal'){
                    const values = data.map(item => Number(item[column.property]));

                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);

                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);

                    }

                    if (column.property == 'unitTotal'){
                        this.tableTotalUnit = sums[index]
                    }
                } else {
                    sums[index] = ''
                }
            })

            return sums

        },
        goodTableReduceEvent(data){
            if (this.goodsInfoData.length > 1){
                this.goodsInfoData.splice(data.$index, 1)
            }
        },
        arraySpanMethod({row, column, rowIndex, columnIndex}) {
            if (columnIndex === 2) {
                if (row.selfNum == ""){
                    return [1, 3];
                } else {
                    return [1, 1];
                }
            } else {
                return [1, 1];
            }
        },
        querySearchAsync(){

        },
        querySearchAsynSelect(){

        },
        unitTatalEvent(data){
            data.row.unitPrice = data.row.unitPrice.replace(/[^\d\.]/g, '')
            data.row.purchaseNum = data.row.purchaseNum.replace(/[^\d\.]/g, '')

            if (data.row.unitPrice == '' || data.row.purchaseNum == ''){
                data.row.unitTotal = 0
                return
            }
            var price = parseFloat(data.row.unitPrice)
            var num = parseFloat(data.row.purchaseNum)

            data.row.unitTotal = price * num

        },
        costInputChangeEvent(){
            this.addFormData.freight = this.addFormData.freight.replace(/[^\d\.]/g, '')
            this.addFormData.otherMoney = this.addFormData.otherMoney.replace(/[^\d\.]/g, '')
            this.addFormData.receivedPrice = this.tableTotalUnit

            if (this.addFormData.freight != "" && !isNaN(this.addFormData.freight)){
                this.addFormData.receivedPrice = this.addFormData.receivedPrice + parseFloat(this.addFormData.freight)
            }
            if (this.addFormData.otherMoney != "" && !isNaN(this.addFormData.otherMoney)){
                this.addFormData.receivedPrice = this.addFormData.receivedPrice + parseFloat(this.addFormData.otherMoney)
            }
        },
        chooseGoodEvent(){
            this.$router.push({
                path: '/chooseGood'
            });
        },
        getSupplierSelectData(){
            api.getSupplierSelectData().then((response) => {
                this.supplierSelectData = response.data.list
            })
        },
        saveBtnEvent(){
            api.addPurchaseList().then((response) => {
                console.log(response)
            })
        }
    },
    created(){
        this.getSupplierSelectData()
    },
    activated(){
        this.getSupplierSelectData()
    },
    mounted(){}
}
</script>
<style scoped>
.banner{
    height: 40px;
    background: #f5f5f5;
    line-height: 40px;
    color: #606266;
    font-weight: 600;
    padding-left: 10px;
}
.baseInfoBox{
    height: 82px;
    padding-top: 10px;
}
.el-icon-more{
    cursor: pointer;
}
.tableBottom{
    width: 100%;
    height: 150px;
    border: 1px solid #E4E7ED;
    border-top: none;
}
.el-date-editor{
    width: 194px;
}
.model_footer{
    line-height: 50px;
    text-align: left;
    padding-left: 40px;
}
.model_content_inner{
    overflow: auto;
}
.el-textarea__inner{
    width: 370px;
}
</style>
