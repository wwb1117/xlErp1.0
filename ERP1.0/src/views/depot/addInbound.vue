<template>
    <div>
        <div class="model_topcol">
            <span style="color: #409EFF">{{$route.params.type}}单</span>
            <span> - 新增{{$route.params.type}}单</span>
        </div>
        <div class="model_content" >
            <div class="content" :style="{height: $store.state.home.modelContentHeight - 20 + 'px'}">
                <el-form class="myForm" :inline="true" :model="addFormData" :rules="rules" label-position="right" size="small" label-width="110px">
                    <div class="banner">
                        基本信息
                    </div>
                    <div class="baseInfoBox">
                        <el-form-item prop="storeType" label= "入库类型" v-if = "inbound">
                            <el-select v-model="addFormData.storeType" placeholder="请选择入库类型">
                                <el-option label="采购" value="1"></el-option>
                                <el-option label="销售退货" value="2"></el-option>
                                <el-option label="其他" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="storeType" label= "出库类型" v-if = "outbound">
                            <el-select v-model="addFormData.storeType" placeholder="请选择出库类型">
                                <el-option label="商城订单" value="0"></el-option>
                                <el-option label="线下订单" value="1"></el-option>
                                <el-option label="采购退货" value="2"></el-option>
                                <el-option label="批发" value="3"></el-option>
                                <el-option label="其他" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="storeHouseId" label="入库仓库" v-if = "inbound">
                            <el-select
                                v-model="addFormData.storeHouseId"
                                filterable
                                remote
                                reserve-keyword
                                placeholder="请输入关键词"
                                :remote-method="remoteMethod"
                                :loading="loading">
                                <el-option
                                    v-for="item in houseId_option"
                                    :key="item.id"
                                    :label="item.warehouseName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="storeHouseId" label="出库仓库" v-if = "outbound">
                            <el-select
                                v-model="addFormData.storeHouseId"
                                filterable
                                remote
                                reserve-keyword
                                placeholder="请输入关键词"
                                :remote-method="remoteMethod"
                                :loading="loading">
                                <el-option
                                    v-for="item in houseId_option"
                                    :key="item.id"
                                    :label="item.warehouseName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="buyerId" label="采购单位">
                            <el-select v-model="addFormData.buyerId" placeholder="请选择">
                                <el-option
                                    v-for="item in buyerId_option"
                                    :key="item.id"
                                    :label="item.buyerCompanyName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="purchaseOrderNo" label="关联采购单号">
                            <el-input v-model="addFormData.purchaseOrderNo" placeholder="请选择采购单号">
                            </el-input>
                            <span @click="chooseGoodEvent" class="el-icon-more" style="position: absolute; right: 5px;top: 9px;"></span>
                        </el-form-item>
                        <el-form-item prop="storeTime" label="入库时间" v-if="inbound">
                            <el-date-picker
                                v-model="addFormData.storeTime"
                                type="datetime"
                                placeholder="请选择入库时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item prop="storeTime" label="出库时间" v-if="outbound">
                            <el-date-picker
                                v-model="addFormData.storeTime"
                                type="datetime"
                                placeholder="请选择出库时间">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="banner">
                        商品信息
                    </div>
                    <div style="padding: 10px;">
                        <el-table
                            :data="goodsInfoData"
                            :span-method="arraySpanMethod"
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
                                prop="itemId"
                                label="编号"
                                width="180">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.itemId === ''">
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
                                    <div v-if="scope.row.itemId !== ''">
                                        <span v-text="scope.row.itemId"></span>
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
                                prop="currentStoreNumber"
                                label="入库数">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.itemId === ''">
                                        <span></span>
                                    </div>
                                    <div v-if="scope.row.itemId !== ''">
                                        <el-input @change.native="unitTatalEvent(scope)" @keyup.native="unitTatalEvent(scope)" v-model="scope.row.currentStoreNumber"></el-input>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="unit"
                                label="单位">
                            </el-table-column>
                            <el-table-column
                                prop="remark"
                                label="备注">
                            </el-table-column>
                        </el-table>
                    </div>

                    <div class="goodInfoBox">
                        <el-form-item prop="storeNo" label="入库单号" v-if="inbound">
                            <el-input v-model="addFormData.storeNo" placeholder="请输入入库单号"></el-input>
                        </el-form-item>
                        <el-form-item prop="storeNo" label="出库单号" v-if="outbound">
                            <el-input v-model="addFormData.storeNo" placeholder="请输入出库单号"></el-input>
                        </el-form-item>
                        <el-form-item prop="operator" label="经办人">
                            <el-input v-model="addFormData.operator" placeholder="请输入经办人"></el-input>
                        </el-form-item>
                        <br>
                        <el-form-item prop="creator" label="制单人">
                            <el-input v-model="addFormData.creator" placeholder="请输入制单人"></el-input>
                        </el-form-item>
                        <br>
                        <el-form-item class="marker" :style="{width: '700px'}" prop="storeRemark" label="备注">
                            <el-input type="textarea" :style="{width: '530px'}" :rows="4" v-model="addFormData.storeRemark" placeholder="请输入备注信息，最多不超过100字"></el-input>
                        </el-form-item>
            </div>
                </el-form>
            </div>
        </div>
        <div class="model_footer">
            <el-button style="width: 90px" type="primary" size="small" @click="save">保存</el-button>
            <el-button style="width: 90px" size="small" v-RouterBack>取消</el-button>
        </div>
    </div>
</template>

<script>
import 'utils/allEnumeration'
import ME from 'utils/base'
import API from 'api/depot'
export default {
    data(){
        return {
            querySearchText: '',
            houseId_option: [],
            buyerId_option: [],
            loading: false,
            inbound: false,
            outbound: false,
            goodsInfoData: [{
                oper: '',
                itemId: '1231',
                currentStoreNumber: '5',
                barCode: '',
                goodName: '',
                SKU: '',
                qualityDate: '',
                productData: '',
                unit: '',
                unitPrice: '',
                unitTotal: '',
                remark: '入库备注1'
            },
            {
                oper: '',
                itemId: '1223',
                currentStoreNumber: '6',
                barCode: '',
                goodName: '',
                SKU: '',
                qualityDate: '',
                productData: '',
                unit: '',
                unitPrice: '',
                unitTotal: '',
                remark: '入库备注2'
            }],
            addFormData: {
                storeType: '',
                storeTime: '',
                storeHouseId: '',
                storeHouseName: '',
                buyerId: '',
                buyerName: '',
                operator: '',
                creator: '',
                purchaseOrderNo: '',
                totalStoreNumber: 0,
                storeRemark: '',
                list: []
            },
            rules: {
                storeType: [
                    { required: true, message: '入库类型', trigger: 'blur' }
                ],
                storeHouseId: [
                    { required: true, message: '请选择入库仓库', trigger: 'blur' }
                ],
                buyerId: [
                    { required: true, message: '请选择采购单位', trigger: 'blur' }
                ],
                storeTime: [
                    { required: true, message: '请选择采购时间', trigger: 'blur' }
                ],
                creator: [
                    { required: true, message: '请输入制单人', trigger: 'blur' }
                ],
                storeNo: [
                    { required: true, message: '请输入入库单号', trigger: 'blur' }
                ]
            },
            postData: {}
        }
    },
    computed:{
    },
    methods:{
        goodTableAddEvent(){
            let itemobj = {
                oper: '',
                itemId: '',
                barCode: '',
                goodName: '',
                SKU: '',
                qualityDate: '',
                productData: '',
                currentStoreNumber: '',
                unit: '',
                unitPrice: '',
                unitTotal: ''
            }

            this.goodsInfoData.push(itemobj)
        },
        goodTableReduceEvent(data){
            if (this.goodsInfoData.length > 1){
                this.goodsInfoData.splice(data.$index, 1)
            }
        },
        arraySpanMethod({row, column, rowIndex, columnIndex}) {
            console.log(rowIndex)
            console.log(this.goodsInfoData.length)
            if (columnIndex === 2) {
                if (row.itemId == ""){
                    return [1, 3];
                } else {
                    return [1, 1];
                }
            } else {
                return [1, 1];
            }
        },
        // 获取采购列表
        getPurchaseList() {
            API.getPurchaseAll().then(res => {
                this.buyerId_option = res.data
                console.log(this.buyerId_option, "采购列表")
            })
        },
        // 入库仓库模糊搜索
        remoteMethod(query) {
            if (query !== '') {
                this.loading = true;
                let post = {};

                post.warehouseName = query
                setTimeout(() => {
                    this.loading = false;
                    API.getWarehouseList(post).then(res => {
                        this.houseId_option = res.data.list
                        console.log(res, "请求来仓库")
                    })
                    this.houseId_option = this.houseId_option.filter(item => {
                        return item.label.toLowerCase()
                            .indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
            } else {
                this.houseId_option = [];
            }
        },
        querySearchAsync(){

        },
        querySearchAsynSelect(){

        },
        unitTatalEvent(data){
            data.row.unitPrice = data.row.unitPrice.replace(/[^\d\.]/g, '')
            data.row.currentStoreNumber = data.row.currentStoreNumber.replace(/[^\d\.]/g, '')
            if (data.row.unitPrice == '' || data.row.currentStoreNumber == ''){
                data.row.unitTotal = ''
                return
            }
            var price = parseFloat(data.row.unitPrice)
            var num = parseFloat(data.row.currentStoreNumber)



            data.row.unitTotal = price * num
        },
        chooseGoodEvent(){
            this.$router.push({
                path: '/chooseGood'
            });
        },
        // 保存结果
        save() {
            this.addFormData.totalStoreNumber = 0
            this.addFormData.list = []
            // 将表中商品信息添加到addFormData
            let obj = {
                itemId: '',
                currentStoreNumber: '',
                purchasingNumber: '',
                remark: ''
            }

            this.goodsInfoData.forEach(res => {
                obj.itemId = res.itemId
                obj.currentStoreNumber = res.currentStoreNumber
                obj.remark = res.remark
                this.addFormData.totalStoreNumber += parseInt(obj.currentStoreNumber, 10)
                this.addFormData.list.push(obj)
            })
            // 通过仓库ID和采购单ID赋值给addFormData的name
            this.houseId_option.forEach(res => {
                if (res.id === this.addFormData.storeHouseId) {
                    this.addFormData.storeHouseName = res.warehouseName
                }
            })
            this.buyerId_option.forEach(res => {
                if (res.id === this.addFormData.buyerId) {
                    this.addFormData.buyerName = res.buyerCompanyName
                }
            })
            this.postData = ME.deepCopy(this.addFormData)
            this.postData.storeTime = Date.parse(this.postData.storeTime) / 1000
            console.log(this.postData, "添加数据")
            console.log(this.$route.params, "添加数据")
            if (this.$route.params.type === '入库') {
                // 调取新增入库单的接口
                API.addInboundOrder(this.postData).then(res => {
                    this.$message({
                        type:'success',
                        message:'入库单添加成功'
                    })
                }).catch(error => {

                })
            } else if (this.$route.params.type === '出库') {
                this.postData.deliverHouseId = this.postData.storeHouseId
                this.postData.deliverHouseName = this.postData.storeHouseName
                this.$delete(this.postData, 'storeHouseId')
                this.$delete(this.postData, 'storeHouseName')
                console.log(this.postData, '转化数据')

            }

        }
    },
    created(){},
    mounted(){

    },
    activated () {
        // 获取采购单位列表
        this.getPurchaseList()
        for (let key in this.addFormData) {
            this.addFormData[key] = ''
        }
        if (this.$route.params.type === '入库') {
            this.inbound = true
            this.outbound = false
        } else if (this.$route.params.type === '出库') {
            this.outbound = true
            this.inbound = false
        }
        console.log(this.inbound, this.outbound)
    }
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
        padding-top: 10px;
    }
    .el-icon-more{
        cursor: pointer;
    }
    .el-date-editor{
        width: 194px;
    }
    .model_footer{
        line-height: 50px;
        text-align: left;
        padding-left: 40px;
    }
    .content{
        overflow: auto;
        background: #FFFFFF;
    }
    .goodInfoBox{
        width: 100%;
        margin-top: 20px;
    }
    .goodInfoBox .el-form-item{
        width: 400px;
    }
</style>
