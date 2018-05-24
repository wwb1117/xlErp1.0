<template>
    <div>
        <div class="model_topcol">
            <span>出入库明细</span>
            <div>
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
                    <el-form class="myForm" :inline="true" :model="searchFormData" label-position="right" size="small" label-width="90px">
                        <el-form-item label="编号">
                            <el-input v-model="searchFormData.itemSku" placeholder="请输入编号"></el-input>
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
                                <el-option label="区域一" value=""></el-option>
                                <el-option label="区域二" value=""></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属仓库">
                            <el-select v-model="searchFormData.houseId" placeholder="请选择">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="出入库类型">
                            <el-select v-model="outInboundType" placeholder="出入库类型">
                                <el-option-group
                                    v-for="group in inoutBoundOption"
                                    :key="group.label"
                                    :label="group.label">
                                    <el-option
                                        v-for="item in group.options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-option-group>
                            </el-select>
                        </el-form-item>

                        <br>
                        <el-form-item label="采购单位">
                            <el-select v-model="searchFormData.buyerId" placeholder="请选择">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="采购时间">
                            <el-date-picker
                                v-model="searchFormData.date"
                                type="daterange"
                                :editable="false"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <br>
                        <el-form-item>
                            <el-button style="width: 90px" type="primary" >确定</el-button>
                            <el-button @click="supperBoxShow" style="width: 90px">取消</el-button>
                            <el-button type="text" style="width: 40px; color: #636365">清空</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
                <div v-show="!isExportShow" class="purchaseList_title">
                    <el-input
                        size="small"
                        placeholder="请输入编号/条码/名称"
                        prefix-icon="el-icon-search"
                        :style="{width: '378px'}"
                        v-model="serchText">
                    </el-input>
                    <el-button :style="{margin: '0 10px'}" type="primary" size="small">搜索</el-button>
                    <span @click="supperBoxShow">高级搜索</span>
                </div>

                <el-table
                    :data="tableData"
                    :height="$store.state.home.modelContentHeight - 83"
                    ref="purchaseListTable"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <el-table-column
                        width="100"
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
                        prop="productionDate"
                        label="生产日期">
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
                        prop="orderNo"
                        label="出入库单号">
                    </el-table-column>
                    <el-table-column
                        prop="orderTime"
                        label="出入库时间">
                    </el-table-column>
                    <el-table-column
                        prop="orderNumber"
                        label="出入库数">
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
                                @click.native.prevent="inBoundDetail(scope.$index, scope.row)"
                                type="text"
                                size="small">
                                详情
                            </el-button>
                            <el-button
                                @click.native.prevent="editTable(scope.$index, tableData)"
                                type="text"
                                size="small">
                                编辑
                            </el-button>
                            <el-button
                                @click.native.prevent="deleteTable(scope.$index, tableData)"
                                type="text"
                                size="small">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="model_footer">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import 'utils/repertory'
import API from 'api/depot'
export default {
    data(){
        return {
            warnState: '',
            serchText: '',
            currentPage: 2,
            selectTableData: [],
            isSupperBoxShow: false,
            tableHeight: 500,
            outInboundType: '',
            searchFormData: {
                itemSku: '1',
                itemMac: '2',
                itemName: '3',
                itemTypeId: '4',
                houseId: '5',
                buyerId: '8',
                startTime: '',
                endTime: '',
                date: ''
            },
            isExportShow: false,
            tableData: [
                {
                    itemSku: '1',
                    itemMac: '2',
                    itemName: '3',
                    itemSpec: '5',
                    itemExp: '6',
                    itemQuantifierUnit: '7',
                    productionDate: '8',
                    physicalInventory: '11',
                    warehouseName: '14',
                    buyerName: '15',
                    orderNo: '00000',
                    orderTime: '16666',
                    orderNumber: '17'
                }
            ],
            inoutBoundOption: [{
                label: '入库类型',
                options: [{
                    value: '1',
                    label: '入库采购'
                }, {
                    value: '2',
                    label: '销售退货'
                }, {
                    value: '3',
                    label: '其他'
                }]
            }, {
                label: '出库类型',
                options: [{
                    value: '00',
                    label: '商城订单'
                }, {
                    value: '11',
                    label: '线下订单'
                }, {
                    value: '22',
                    label: '采购退货'
                }, {
                    value: '33',
                    label: '批发'
                }, {
                    value: '44',
                    label: '其他'
                }]
            }]
        }
    },
    computed:{},
    methods:{
        handleSizeChange(){

        },
        handleCurrentChange(){

        },
        // 获取出入库列表
        getInoutBoundList() {
            API.inoutBound().then(res => {
                this.tableData = res.data.list
            })
        },
        // 进入详情页
        inBoundDetail(index, data) {
            if (data.type == 1) { //出库
                this.$router.push({name: '出入库详情', params: {id: data.orderNo || 123, type: '出库'}})
            }
            else if (data.type == 0) { //入库
                this.$router.push({name: '出入库详情', params: {id: data.orderNo || 123, type: '入库'}})
            }
            else {
                return false
            }
        },
        editTable(index, data) {},
        deleteTable(index, data) {},
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
        this.getInoutBoundList()

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
    .el-form{
        color: #636365;
    }

</style>
