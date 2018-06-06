<template>
    <div>
        <div class="model_topcol">
            <span>商品库存</span>
            <div>
                <el-button size="small">库存盘点</el-button>
                <el-button size="small">库存调拨</el-button>
                <el-button type="primary" @click="purchaseAddEvent" size="small">导出库存表</el-button>
            </div>
        </div>
        <div class="model_content" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <div class="model_content_inner">
                <el-card v-show="isSupperBoxShow" class="box_card">
                    <div slot="header" class="clearfix">
                        <span :style="{fontSize: '16px'}">高级搜索</span>
                        <i @click="supperBoxShow" class="el-icon-close" style="float: right; padding: 3px 0; cursor: pointer"></i>
                    </div>
                    <el-form class="myForm" :inline="true" :model="searchFormData" label-position="right" size="small" label-width="80px">
                        <el-form-item label="商品编号">
                            <el-input v-model="searchFormData.itemSku" placeholder="请输入商品编号"></el-input>
                        </el-form-item>
                        <el-form-item label="条码">
                            <el-input v-model="searchFormData.itemMac" placeholder="请输入条码"></el-input>
                        </el-form-item>
                        <el-form-item label="名称">
                            <el-input v-model="searchFormData.itemName" placeholder="请输入名称"></el-input>
                        </el-form-item>
                        <br>
                        <el-form-item label="商品分类">
                            <el-select v-model="searchFormData.itemTypeId" placeholder="请选择">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="选择仓库">
                            <el-select
                                v-model="searchFormData.houseId"
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
                        <el-form-item label="采购单位">
                            <el-select v-model="searchFormData.buyerId" placeholder="请选择">
                                <el-option
                                    v-for="item in buyerId_option"
                                    :key="item.id"
                                    :label="item.buyerCompanyName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <br>
                        <el-form-item label="预警状态">
                            <el-select v-model="searchFormData.houseStatus" placeholder="请选择">
                                <el-option label="高于上限" value="1"></el-option>
                                <el-option label="低于下限" value="2"></el-option>
                                <el-option label="低于效期" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <br>
                        <el-form-item>
                            <el-button style="width: 90px" type="primary" @click="search">确定</el-button>
                            <el-button @click="supperBoxShow" style="width: 90px">取消</el-button>
                            <el-button type="text" style="width: 40px; color: #636365" @click="clear">清空</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
                <div v-show="!isExportShow" class="purchaseList_title">
                    <el-input
                        size="small"
                        placeholder="请输入编码/条码/名称"
                        prefix-icon="el-icon-search"
                        :style="{width: '378px'}"
                        v-model="serchText">
                    </el-input>
                    <el-button :style="{margin: '0 10px'}" type="primary" size="small" @click="search">搜索</el-button>
                    <span @click="supperBoxShow">高级搜索</span>
                    <div :style="{display: 'inline-block', marginLeft: '45px'}">
                        <span>预警状态</span>
                        <el-select v-model="searchFormData.houseStatus" placeholder="请选择">
                            <el-option label="高于上限" value="1"></el-option>
                            <el-option label="低于下限" value="2"></el-option>
                            <el-option label="低于效期" value="3"></el-option>
                        </el-select>
                    </div>
                </div>
                <div v-show="isExportShow" class="purchaseList_exportWrap">
                    <ul>
                        <li :style="{borderRight: '1px solid #E4E7ED', fontSize: '12px', color: '#757577'}">
                            <span :style="{fontSize: '18px',verticalAlign: 'middle'}" class="el-icon-close" @click="closeExportWrap"></span>
                            <span>已选择</span>
                            <span v-text="selectTableData.length"> 2 </span>
                            <span>项</span>
                        </li>
                        <li :style="{paddingLeft: '20px'}">
                            <el-button :style="{width: '100px'}" size="small">导出</el-button>
                        </li>
                    </ul>
                </div>

                <el-table
                    :data="tableData"
                    :height="$store.state.home.modelContentHeight - 83"
                    ref="purchaseListTable"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="itemSku"
                        label="编号"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="itemMac"
                        label="条码"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="itemName"
                        label="名称">
                    </el-table-column>
                    <el-table-column
                        prop="itemSpec"
                        label="规格-sku">
                    </el-table-column>
                    <el-table-column
                        prop="itemExp"
                        label="保质期">
                    </el-table-column>
                    <el-table-column
                        label="生产日期">
                        <template slot-scope="scope">
                            <span>{{scope.row.productionDate | time}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="itemValid"
                        label="有效期">
                    </el-table-column>
                    <el-table-column
                        prop="itemQuantifierUnit"
                        label="单位">
                    </el-table-column>
                    <el-table-column
                        prop="warehouseName"
                        label="所属仓库">
                    </el-table-column>
                    <el-table-column
                        prop="buyerName"
                        label="采购单位">
                    </el-table-column>
                    <el-table-column
                        prop="inventoryUpperLimit"
                        label="库存上限">
                    </el-table-column>
                    <el-table-column
                        prop="inventoryLowerLimit"
                        label="库存下限">
                    </el-table-column>
                    <el-table-column
                        prop="blockedInventory"
                        label="已付款未发货库存">
                    </el-table-column>
                    <el-table-column
                        prop="availableInventory"
                        label="可用库存">
                    </el-table-column>
                    <el-table-column
                        prop="physicalInventory"
                        label="实际库存">
                    </el-table-column>
                    <el-table-column
                        prop="prop"
                        width="150"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button
                                @click.native.prevent="inDetail(scope.$index, scope.row)"
                                type="text"
                                size="small">
                                详情
                            </el-button>
                            <el-button
                                :style="{marginRight: '10px'}"
                                @click.native.prevent="editTable(scope.$index, scope.row)"
                                type="text"
                                size="small">
                                修改
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog title="修改库存信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="库存上限" :label-width="formLabelWidth">
                    <el-input v-model="form.inventoryUpperLimit" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="库存下限" :label-width="formLabelWidth">
                    <el-input v-model="form.inventoryLowerLimit" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="效期" :label-width="formLabelWidth">
                    <el-input v-model="form.itemValid" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editRepertory">确 定</el-button>
            </div>
        </el-dialog>
        <div class="model_footer">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[10, 30, 50, 100]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
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
            warnState: '',
            serchText: '',
            currentPage: 1,
            loading: false,
            dialogFormVisible: false,
            formLabelWidth: '120px',
            form: {
                id: null,
                itemValid: null,
                inventoryLowerLimit: null,
                inventoryUpperLimit: null
            },
            selectTableData: [],
            isSupperBoxShow: false,
            tableHeight: 500,
            houseId_option: [],
            buyerId_option: [],
            searchFormData: {
                itemSku: null,
                itemMac: null,
                itemName: null,
                itemTypeId: null,
                houseId: null,
                buyerId: null,
                houseStatus: null
            },
            isExportShow: false,
            tableData: [
                {
                    itemSku: '1',
                    itemMac: '2',
                    itemName: '3',
                    itemValid: '4',
                    itemSpec: '5',
                    itemExp: '6',
                    itemQuantifierUnit: '7',
                    productionDate: '8',
                    availableInventory: '9',
                    blockedInventory: '10',
                    physicalInventory: '11',
                    inventoryLowerLimit: '12',
                    inventoryUpperLimit: '13',
                    warehouseName: '14',
                    buyerName: '15'
                }
            ],
            total: 0
        }
    },
    computed:{},
    methods:{
        handleSizeChange(data){
            this.getTableList({pageNo: this.currentPage, pageSize: data})
        },
        handleCurrentChange(data){
            this.getTableList({pageNo: data})
        },
        // 获取库存列表
        getTableList(data) {
            API.getInventoryList(data).then(res => {
                this.tableData = res.data.list
                this.total = res.data.total || 0
                console.log("获取库存", res.data.list)
            })
        },
        // 获取采购列表
        getPurchaseList() {
            API.getPurchaseAll().then(res => {
                this.buyerId_option = res.data
                console.log(this.buyerId_option, "采购列表")
            })
        },
        inDetail(index, data){
            this.$router.push({name: '出入库明细', params: {id: data.itemSku || 12314654}})
            $('#secondMenu_ul li').removeClass('active')
            $('#secondMenu_ul li').eq(3).addClass('active')
        },
        editTable(index, data) {
            this.dialogFormVisible = true
            this.form.inventoryLowerLimit = data.inventoryLowerLimit
            this.form.inventoryUpperLimit = data.inventoryUpperLimit
            this.form.itemValid = data.itemValid
            this.form.id = data.id

        },
        editRepertory() {
            API.editInventory(this.form).then(res => {
                if (res.result === 1) {
                    this.$message({
                        type:'success',
                        message:'编辑成功'
                    })
                    this.getTableList()
                }
            })
            this.dialogFormVisible = false
        },
        search() {
            if (this.searchFormData.date) {
                this.searchFormData.startTime = Date.parse(this.searchFormData.date[0]) / 1000
                this.searchFormData.endTime = Date.parse(this.searchFormData.date[1]) / 1000
            }
            this.postData = ME.deepCopy(this.searchFormData)
            this.$delete(this.postData, 'date')
            console.log(this.postData)
            this.getTableList(this.postData)
            this.isSupperBoxShow = false
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
        // 搜索清空
        clear() {
            for (let key in this.searchFormData) {
                this.searchFormData[key] = null
            }
        },
        closeExportWrap(){
            this.isExportShow = false
            this.$refs.purchaseListTable.clearSelection()
        },
        handleSelectionChange(val){
            this.selectTableData = val
            if (this.selectTableData.length > 0){
                this.isExportShow = true
            } else {
                this.isExportShow = false
            }
        },
        supperBoxShow(){
            this.isSupperBoxShow = !this.isSupperBoxShow
        },
        purchaseAddEvent(){
            this.$router.push({
                name: '新增入库',
                params: {type: '出库'}
            })
        },
        dropdownSelectEvent(command){
            if (command == 1){
                this.$router.push({
                    path: '/purchaseListDetail'
                })
            }
        }
    },
    created(){},
    mounted(){
        this.getPurchaseList()
    },
    activated() {
        this.currentPage = 1
        this.getTableList()

    }
}
</script>


<style scoped>
    .purchaseList_title{
        height: 63px;
        line-height: 63px;
        padding-left: 17px;
    }
    .purchaseList_exportWrap{
        height: 63px;
        padding-top: 15px;
    }
    .purchaseList_title span{
        cursor: pointer;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
        font-size: 12px;
    }
    .purchaseList_exportWrap>ul{
        overflow: hidden;
        padding-left: 0;
    }
    .purchaseList_exportWrap>ul>li{
        float: left;
        padding: 0 20px;
        height: 33px;
        line-height: 32px;
    }
    .box_card{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 300px;
        z-index: 9;
    }
    .model_content_inner{
        position: relative;
    }
    .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
        width: 360px;
    }
    .el-form, .el-table{
        color: #636365;
    }
    .el-table .cell .auditStatus_0, .el-table .cell .auditStatus_1{
        color: #e6a23c;
    }
    .el-table .cell .auditStatus_2{
        color: #606266;
    }
    .el-table .cell .auditStatus_3{
        color: #f56c6c;
    }

</style>
