<template>
    <div>
        <div class="model_topcol">
            <span style="color: #409EFF">{{$route.params.type}}单</span>
            <span> - 新增{{$route.params.type}}单</span>
        </div>
        <div class="model_content" >
            <add-good v-if="isShowAddGoods" @saveAddgoodsFn="fromAddGoods"></add-good>
            <div v-if="!isShowAddGoods" class="content" :style="{height: $store.state.home.modelContentHeight - 20 + 'px'}">
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
                            show-summary
                            :span-method="arraySpanMethod"
                            border
                            :summary-method="getSummaries"
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
                                label="编号"
                                width="180">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.itemId === ''">
                                        <el-autocomplete
                                            disabled="true"
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
                                        <span v-text="scope.row.itemCode"></span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="itemMac"
                                label="条码">
                            </el-table-column>
                            <el-table-column
                                prop="itemName"
                                label="商品">
                            </el-table-column>
                            <el-table-column
                                prop="itemSpec"
                                label="规格-SKU">
                            </el-table-column>
                            <el-table-column
                                prop="itemExp"
                                label="保质期">
                            </el-table-column>
                            <el-table-column
                                prop="productionDate"
                                label="生产日期">
                            </el-table-column>
                            <el-table-column
                                prop="currentStoreNumber"
                                label="入库数"
                                v-if="inbound">
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
                                prop="currentStoreNumber"
                                label="出库数"
                                v-if="outbound">
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
                                prop="itemQuantifierUnit"
                                label="单位">
                            </el-table-column>
                            <el-table-column
                                label="备注">
                                <template slot-scope="scope">
                                    <div class="addRemark" @click="addRemark(scope.$index, scope.row)" v-if="scope.row.remark === ''">
                                        <i class="el-icon-plus" style="font-weight: 900;font-size: 16px"></i>
                                    </div>
                                    <div class="addRemark" @click="addRemark(scope.$index, scope.row)" v-else style="line-height: 20px;max-height: 40px;overflow: hidden;text-overflow: ellipsis">
                                        <i class="el-icon-edit" style="font-weight: 900;font-size: 16px"></i>
                                        <span>{{scope.row.remark}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <el-dialog
                        title="备注说明"
                        :visible.sync="dialogVisible"
                        width="30%">
                        <el-input
                            type="textarea"
                            :rows="4"
                            placeholder="请输入备注信息，不得超过200字"
                            v-model="remarkTextarea">
                        </el-input>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="remarkCancle">取 消</el-button>
                            <el-button type="primary" @click="remarkSure">确 定</el-button>
                        </span>
                    </el-dialog>

                    <div class="goodInfoBox">
                        <el-form-item prop="storeNo" label="入库单号" v-if="inbound">
                            <el-input v-model="addFormData.storeNo" placeholder="请输入入库单号" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item prop="storeNo" label="出库单号" v-if="outbound">
                            <el-input v-model="addFormData.storeNo" placeholder="请输入出库单号" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item prop="operator" label="经办人">
                            <el-input v-model="addFormData.operator" placeholder="请输入经办人"></el-input>
                        </el-form-item>
                        <br>
                        <el-form-item prop="creator" label="制单人">
                            <el-input v-model="addFormData.creator" placeholder="请输入制单人" :disabled="true"></el-input>
                        </el-form-item>
                        <br>
                        <el-form-item class="marker" :style="{width: '700px'}" prop="storeRemark" label="备注">
                            <el-input type="textarea" :style="{width: '530px'}" :rows="4" v-model="addFormData.storeRemark" placeholder="请输入备注信息，最多不超过100字"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="model_footer" v-if="!isShowAddGoods">
            <el-button style="width: 90px" type="primary" size="small" @click="save">保存</el-button>
            <el-button style="width: 90px" size="small" v-RouterBack>取消</el-button>
        </div>
    </div>
</template>

<script>
import 'utils/allEnumeration'
import addGood from './forms/addGoods'
import ME from 'utils/base'
import API from 'api/depot'
export default {
    components: {
        addGood
    },
    data(){
        return {
            dialogVisible: false,
            remarkTextarea: '',
            remarkIndex: 0,
            choose: false,
            querySearchText: '',
            houseId_option: [],
            buyerId_option: [],
            loading: false,
            inbound: false,
            outbound: false,
            goodsInfoData: [{
                itemCode: '',
                currentStoreNumber: '',
                itemId: ''
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
                list: [],
                creatorId: ''
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
        isShowAddGoods() {
            return this.$store.state.depot.showAddGoods.id > 0
        }
    },
    methods:{
        // 添加商品备注
        addRemark(index, data) {
            this.dialogVisible = true
            this.remarkTextarea = data.remark
            this.remarkIndex = index
        },
        remarkCancle() {
            this.dialogVisible = false
        },
        remarkSure() {
            this.dialogVisible = false
            this.goodsInfoData[this.remarkIndex].remark = this.remarkTextarea
        },
        clearAll() {
            for (let key in this.addFormData) {
                this.addFormData[key] = ''
            }
            this.goodsInfoData = [{
                itemCode: '',
                currentStoreNumber: '',
                itemId: ''
            }]
        },
        fromAddGoods(data) {
            this.goodsInfoData = []
            console.log(data, '接收的数据')
            data.forEach(res => {
                let obj = {
                    itemMac: res.barCode,
                    itemCode: res.itemCode,
                    itemName: res.title,
                    itemSpec: res.skuGroups,
                    itemExp: res.expirationDate,
                    productionDate: '',
                    itemId: res.id,
                    currentStoreNumber: res.mount,
                    itemQuantifierUnit: res.unit,
                    remark: ''
                }

                this.goodsInfoData.push(obj)
            })
        },
        goodTableAddEvent(){
            let itemobj = {
                oper: '',
                itemId: '',
                itemSpec: '',
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
        goodTableReduceEvent(data) {
            this.goodsInfoData.splice(data.$index, 1)
            if (this.goodsInfoData.length < 1){
                let obj = {
                    itemId: ''
                }

                this.goodsInfoData.push(obj)
            }
        },
        arraySpanMethod({row, column, rowIndex, columnIndex}) {
            // console.log(rowIndex)
            // console.log(this.goodsInfoData.length)
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
            data.row.currentStoreNumber = data.row.currentStoreNumber.replace(/[^\d\.]/g, '')
            if (data.row.unitPrice == '' || data.row.currentStoreNumber == ''){
                data.row.unitTotal = ''
                return
            }

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
                if (column.property == 'currentStoreNumber' || column.property == 'unitTotal'){
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
        chooseGoodEvent(){
            this.$store.commit('showAddGoods')
        },
        // 产生随机数并加到编码
        MathRand(data, type) {
            let sixNum = ''
            let myDate = new Date()
            let monthArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
            let day = myDate.getDate().toString() > 9 ? myDate.getDate() : '0' + myDate.getDate()

            for (let i = 0; i < data; i++) {
                sixNum += Math.floor(Math.random() * 10);
            }
            this.addFormData.storeNo = type + '-' + myDate.getFullYear() + monthArr[myDate.getMonth()] + day + '-' + sixNum
        },
        // 保存结果
        save() {
            this.addFormData.totalStoreNumber = 0
            this.addFormData.list = []
            console.log(this.goodsInfoData, "表中信息")
            // 将表中商品信息添加到addFormData
            this.goodsInfoData.forEach(res => {
                let obj = {
                    itemId: '',
                    currentStoreNumber: '',
                    purchasingNumber: '',
                    remark: '',
                    itemSpec: '3灌装'
                }

                obj.itemId = res.itemId
                obj.remark = res.remark
                // obj.itemSpec = res.itemSpec

                obj.currentStoreNumber = res.currentStoreNumber
                this.addFormData.totalStoreNumber += parseInt(obj.currentStoreNumber, 10)
                this.addFormData.list.push(obj)
            })
            console.log(this.addFormData, "表中信息2")
            let userInfo = JSON.parse(localStorage.getItem('userInfo'))

            this.addFormData.creatorId = userInfo.user.id
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
            console.log(JSON.stringify(this.postData), "添加数据")
            // 出入库操作
            if (this.$route.params.type === '入库') {
                // 数据判空
                for (let key in this.postData) {
                    if (!this.postData[key]) {
                        if (key == 'storeType') {
                            this.$message({
                                type: 'warning',
                                message: '请选择入库类型'
                            })
                            return
                        }
                        if (key == 'storeHouseId') {
                            this.$message({
                                type: 'warning',
                                message: '请选择入库仓库'
                            })
                            return
                        }
                        if (key == 'buyerId') {
                            this.$message({
                                type: 'warning',
                                message: '请选择采购单位'
                            })
                            return
                        }
                        if (key == 'storeTime') {
                            this.$message({
                                type: 'warning',
                                message: '请选择入库时间'
                            })
                            return
                        }
                        if (key == 'storeNo') {
                            this.$message({
                                type: 'warning',
                                message: '请选择入库单号'
                            })
                            return
                        }
                        if (key == 'creator') {
                            this.$message({
                                type: 'warning',
                                message: '请选择制单人'
                            })
                            return
                        }
                    }
                }
                if (!this.postData.list[0].itemId) {
                    this.$message({
                        type: 'warning',
                        message: '请选择商品'
                    })
                    return
                }
                // 调取新增入库单的接口
                API.addInboundOrder(this.postData).then(res => {
                    this.$message({
                        type:'success',
                        message:'入库单添加成功'
                    })
                    this.$router.push({ name: "入库列表" })
                }).catch(error => {

                })
            } else if (this.$route.params.type === '出库') {
                this.$set(this.postData, 'deliverHouseId', this.postData.storeHouseId)
                this.$set(this.postData, 'deliverHouseName', this.postData.storeHouseName)
                this.$set(this.postData, 'deliverNo', this.postData.storeNo)
                this.$set(this.postData, 'deliverTime', this.postData.storeTime)
                this.$set(this.postData, 'deliverType', this.postData.storeType)
                this.$set(this.postData, 'totalDeliverNumber', this.postData.totalStoreNumber)
                this.$set(this.postData, 'deliverRemark', this.postData.storeRemark)
                this.postData.list.forEach(res => {
                    this.$set(res, 'deliverNumber', res.currentStoreNumber)
                    this.$delete(res, 'currentStoreNumber')
                })
                this.$delete(this.postData, 'storeHouseId')
                this.$delete(this.postData, 'storeHouseName')
                this.$delete(this.postData, 'storeNo')
                this.$delete(this.postData, 'storeTime')
                this.$delete(this.postData, 'storeType')
                this.$delete(this.postData, 'totalStoreNumber')
                this.$delete(this.postData, 'storeRemark')
                console.log(this.postData, '转化数据')
                // 数据判空
                for (let key in this.postData) {
                    if (!this.postData[key]) {
                        if (key == 'deliverType') {
                            this.$message({
                                type: 'warning',
                                message: '请选择出库类型'
                            })
                            return
                        }
                        if (key == 'deliverHouseId') {
                            this.$message({
                                type: 'warning',
                                message: '请选择出库仓库'
                            })
                            return
                        }
                        if (key == 'buyerId') {
                            this.$message({
                                type: 'warning',
                                message: '请选择采购单位'
                            })
                            return
                        }
                        if (key == 'deliverTime') {
                            this.$message({
                                type: 'warning',
                                message: '请选择出库时间'
                            })
                            return
                        }
                        if (key == 'deliverNo') {
                            this.$message({
                                type: 'warning',
                                message: '请选择出库单号'
                            })
                            return
                        }
                        if (key == 'creator') {
                            this.$message({
                                type: 'warning',
                                message: '请选择制单人'
                            })
                            return
                        }
                    }
                }
                if (!this.postData.list[0].itemId) {
                    this.$message({
                        type: 'warning',
                        message: '请选择商品'
                    })
                    return
                }
                // 调取新增出库单的接口
                API.addOutboundOrder(this.postData).then(res => {
                    this.$message({
                        type:'success',
                        message:'出库单添加成功'
                    })
                    this.$router.push({ name: "出库列表" })
                }).catch(error => {

                })
            }
        }
    },
    created(){},
    mounted(){
        // 获取采购单位列表
        this.getPurchaseList()
    },
    activated () {
        this.clearAll()
        if (this.$route.params.type === '入库') {
            this.inbound = true
            this.outbound = false
        } else if (this.$route.params.type === '出库') {
            this.outbound = true
            this.inbound = false
        }
        if (this.outbound) {
            this.MathRand(6, 'OUT')
        }
        if (this.inbound) {
            this.MathRand(6, 'IN')
        }

        // 更新制单人
        const USER = sessionStorage.getItem('user')

        this.addFormData.creator = JSON.parse(USER).loginCode
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
    .addRemark{
        cursor: pointer;
    }
</style>
