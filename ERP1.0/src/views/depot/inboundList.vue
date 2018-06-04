<template>
    <div>
        <div class="model_topcol">
            <span>入库单</span>
            <div>
                <el-button size="small">导入入库单</el-button>
                <el-button size="small">导出入库单</el-button>
                <el-button type="primary" @click="inAddEvent" size="small">新增入库单</el-button>
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
                        <el-form-item label="入库仓库">
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
                        <el-form-item label="入库类型">
                            <el-select v-model="searchFormData.storeType" placeholder="请选择" >
                                <el-option label="采购" value="1"></el-option>
                                <el-option label="销售退货" value="2"></el-option>
                                <el-option label="其他" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="经办人" >
                            <el-input v-model="searchFormData.operator" placeholder="请输入经办人"></el-input>
                        </el-form-item>
                        <br>
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
                        <el-form-item label="制单人">
                            <el-input v-model="searchFormData.creator" placeholder="请输入制单人"></el-input>
                        </el-form-item>
                        <el-form-item label="入库时间">
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
                            <el-button style="width: 90px" type="primary" @click="search">确定</el-button>
                            <el-button @click="supperBoxShow" style="width: 90px">取消</el-button>
                            <el-button type="text" style="width: 40px; color: #636365" @click="clear">清空</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
                <div v-show="!isExportShow" class="purchaseList_title">
                    <el-input
                        size="small"
                        placeholder="请输入入库单号"
                        prefix-icon="el-icon-search"
                        :style="{width: '378px'}"
                        v-model="searchFormData.storeNo">
                    </el-input>
                    <el-button :style="{margin: '0 10px'}" type="primary" size="small" @click="search">搜索</el-button>
                    <span @click="supperBoxShow">高级搜索</span>
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
                        prop="storeNo"
                        label="入库单号"
                    >
                    </el-table-column>
                    <el-table-column
                        label="入库时间"
                    >
                        <template slot-scope="scope">
                            <span>{{scope.row.storeTime | time_s}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="buyerName"
                        label="采购单位">
                    </el-table-column>
                    <el-table-column
                        prop="storeHouseName"
                        label="入库仓库">
                    </el-table-column>
                    <el-table-column
                        prop="storeType"
                        label="入库类型">
                        <template slot-scope="scope">
                            <span v-if="scope.row.storeType == 1" >{{$allEnumeration.storeType[1]}}</span>
                            <span v-if="scope.row.storeType == 2" >{{$allEnumeration.storeType[2]}}</span>
                            <span v-if="scope.row.storeType == 3" >{{$allEnumeration.storeType[3]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="creator"
                        label="制单人">
                    </el-table-column>
                    <el-table-column
                        prop="operator"
                        label="经办人">
                    </el-table-column>
                    <el-table-column
                        label="审核状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.auditStatus == 0" class="auditStatus_0">{{$allEnumeration.auditStatus[0]}}</span>
                            <span v-if="scope.row.auditStatus == 1" class="auditStatus_1">{{$allEnumeration.auditStatus[1]}}</span>
                            <span v-if="scope.row.auditStatus == 2" class="auditStatus_2">{{$allEnumeration.auditStatus[2]}}</span>
                            <span v-if="scope.row.auditStatus == 3" class="auditStatus_3">{{$allEnumeration.auditStatus[3]}}</span>
                            <span v-if="scope.row.auditStatus == 4" class="auditStatus_4">{{$allEnumeration.auditStatus[4]}}</span>
                        </template>
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
                            <div v-if="scope.row.auditStatus == 0" style="display: inline-block">
                                <!--待审核-->
                                <el-button
                                    :style="{marginLeft: '12px'}"
                                    @click.native.prevent="editTable(scope.$index, scope.row)"
                                    type="text"
                                    size="small">
                                    修改
                                </el-button>
                                <el-button
                                    @click.native.prevent="deleteTable(scope.$index, scope.row)"
                                    type="text"
                                    size="small">
                                    删除
                                </el-button>
                            </div>
                            <div v-if="scope.row.auditStatus == 1" style="display: inline-block">
                                <!--审核中-->
                                <el-button
                                    :style="{marginLeft: '12px'}"
                                    @click.native.prevent="inBoundDetail(scope.$index, scope.row)"
                                    type="text"
                                    size="small">
                                    撤回
                                </el-button>
                            </div>
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
            loading: false,
            timeout:  null,
            serchText: '',
            currentPage: 1,
            total: 0,
            selectTableData: [],
            isSupperBoxShow: false,
            tableHeight: 500,
            houseId_option: [],
            buyerId_option: [],
            searchFormData: {
                houseId: null,
                buyerId: null,
                storeType: null,
                storeNo: null,
                startTime: null,
                endTime: null,
                pageNo: null,
                pageSize: null,
                creator: null,
                operator: null,
                date: null
            },
            postData: {},
            isExportShow: false,
            tableData: [
                {
                    audiStatus: '',
                    storeNo: '',
                    buyerId: '',
                    houseId: '',
                    startTime: '',
                    endTime: '',
                    storeType: '',
                    operator: '',
                    creator: '',
                    storeHouseName: '',
                    buyerName: ''
                }
            ]
        }
    },
    computed:{},
    methods:{
        handleSizeChange(){

        },
        handleCurrentChange(){

        },
        // 获取列表数据
        getInboundList(data) {
            API.getInboundList(data).then(res => {
                console.log(data, '入库单请求数据')
                this.tableData = res.data.list
                this.total = res.data.total || 0
            })
        },
        // 获取采购列表
        getPurchaseList() {
            API.getPurchaseAll().then(res => {
                this.buyerId_option = res.data
                console.log(this.buyerId_option, "采购列表")
            })
        },
        // 跳转详情页
        inBoundDetail(index, data) {
            this.$router.push({name: '出入库详情', params: {id: data.id || 123, type: 'inbound'}})
        },
        // 修改
        editTable(index, data) {
            this.$router.push({
                name: '编辑出入库',
                params: {type: 'inbound', id: data.id}
            })
        },
        // 删除
        deleteTable(index, data) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                API.delInboundOrder(data.id).then(res => {
                    if (res.result == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.tableData.splice(index, 1)
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            })
        },
        // 搜索清空
        clear() {
            for (let key in this.searchFormData) {
                this.searchFormData[key] = null
            }
        },
        // 搜索
        search() {
            if (this.searchFormData.date) {
                this.searchFormData.startTime = Date.parse(this.searchFormData.date[0]) / 1000
                this.searchFormData.endTime = Date.parse(this.searchFormData.date[1]) / 1000
            }
            this.postData = ME.deepCopy(this.searchFormData)
            this.$delete(this.postData, 'date')
            console.log(this.postData)
            this.getInboundList(this.postData)
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
        // 搜索选中后
        handleSelect(item) {
            console.log(item);
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
        inAddEvent(){
            this.$router.push({
                name: '新增入库',
                params: {type: '入库'}
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
        this.getInboundList()
        this.getPurchaseList()

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
