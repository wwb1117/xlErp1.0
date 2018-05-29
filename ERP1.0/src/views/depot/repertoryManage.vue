<template>
    <div>
        <div class="model_topcol">
            <span>仓库管理</span>
            <div>
                <el-button type="primary" @click="purchaseAddEvent" size="small">新建仓库</el-button>
            </div>
        </div>
        <div class="model_content" :style="{height: $store.state.home.modelContentHeight + 50  + 'px'}">
            <div class="model_content_inner">
                <div class="purchaseList_title">
                    <el-input
                        size="small"
                        placeholder="请输入要查询的关键词"
                        prefix-icon="el-icon-search"
                        :style="{width: '378px'}"
                        v-model="searchText">
                    </el-input>
                    <el-button :style="{margin: '0 10px'}" type="primary" size="small" @click="search">搜索</el-button>
                </div>
                <el-table
                    :data="warehouseList"
                    :height="$store.state.home.modelContentHeight - 33"
                    ref="purchaseListTable"
                    style="width: 100%">
                    <el-table-column
                        width="100"
                        prop="warehouseNo"
                        label="编码"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="warehouseName"
                        label="名称"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="activateState"
                        label="状态">
                    </el-table-column>
                    <el-table-column
                        prop="personResponsible"
                        label="负责人">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="负责人手机号">
                    </el-table-column>
                    <el-table-column
                        prop="warehouseAddress"
                        label="详细地址">
                    </el-table-column>
                    <el-table-column
                        prop="acreage"
                        label="面积(㎡)">
                    </el-table-column>
                    <el-table-column
                        prop="remark"
                        label="备注">
                    </el-table-column>
                    <el-table-column
                        width="150"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button
                                @click.native.prevent="inRepDetail(scope.$index, scope.row)"
                                type="text"
                                size="small">
                                详情
                            </el-button>
                            <el-button
                                @click.native.prevent="editTable(scope.$index, scope.row)"
                                type="text"
                                size="small">
                                编辑
                            </el-button>
                            <el-button
                                @click.native.prevent="delDep(scope.$index, scope.row)"
                                type="text"
                                size="small">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import 'utils/allEnumeration'
import API from 'api/depot'
export default {
    data(){
        return {
            warnState: '',
            searchText: '',
            currentPage: 2,
            selectTableData: [],
            isSupperBoxShow: false,
            tableHeight: 500,
            isExportShow: false,
            warehouseList: [
                {
                    acreage: '面积',
                    warehouseNo: '仓库编码',
                    warehouseName: '仓库名字',
                    activateState: 0,
                    personResponsible: '负责人',
                    phone: '负责人手机号',
                    warehouseAddress: '详细地址',
                    remark: '备注',
                    enableStatus: 0,
                    provinceId: '省份id',
                    cityId: '城市id',
                    areaId: '地区id',
                    prop: ''
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
        // 进入详情
        inRepDetail(){
            this.$router.push({name: '出入库详情', params: {id:12314654, type: '出库'}})
        },
        // 获取列表数据
        getWarehouseList(data) {
            API.getWarehouseList(data).then(res => {
                this.warehouseList = res.data.list
                this.warehouseList.forEach((rs) => {
                    rs.activateState = this.$allEnumeration.activateState[rs.activateState]
                })
            })
        },
        // 编辑数据
        editTable(index, data) {
            this.$router.push({
                name: '编辑仓库',
                params: {type: '编辑', data: data, id: data.id}
            })
        },
        // 删除仓库
        delDep(index, data) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                API.deleteWarehouse(data.id).then(res => {
                    if (res.data.result == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getWarehouseList()
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 搜索仓库
        search() {
            this.getWarehouseList({warehouseName: this.searchText})
        },
        supperBoxShow(){
            this.isSupperBoxShow = !this.isSupperBoxShow
        },
        purchaseAddEvent(){
            this.$router.push({
                name: '新增仓库',
                params: {type: '新增'}
            })
        }
    },
    created(){},
    mounted(){
        this.getWarehouseList()
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
        width: 390px;
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
