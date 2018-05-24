<template>
    <div>
        <div class="model_topcol">
            <span>入库单</span>
            <div>
                <el-button size="small">导入入库单</el-button>
                <el-button size="small">导出入库单</el-button>
                <el-button type="primary" @click="purchaseAddEvent" size="small">新增入库单</el-button>
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
                            <el-select v-model="searchFormData.houseId" placeholder="请选择">
                                <el-option label="全部" value="123"></el-option>
                                <el-option label="区域一" value="456"></el-option>
                                <el-option label="区域二" value="789"></el-option>
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
                                <el-option label="全部" value="555"></el-option>
                                <el-option label="区域一" value="666"></el-option>
                                <el-option label="区域二" value="777"></el-option>
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
                            <el-button style="width: 90px" type="primary" >确定</el-button>
                            <el-button @click="supperBoxShow" style="width: 90px">取消</el-button>
                            <el-button type="text" style="width: 40px; color: #636365">清空</el-button>
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
                    <el-button :style="{margin: '0 10px'}" type="primary" size="small">搜索</el-button>
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
                        prop="storeTime"
                        label="入库时间"
                    >
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
                        prop="auditStatus"
                        label="审核状态">
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
                                :style="{marginRight: '10px'}"
                                @click.native.prevent="editTable(scope.$index, scope.row)"
                                type="text"
                                size="small">
                                修改
                            </el-button>
                            <el-dropdown :hide-timeout="50" @command="dropdownSelectEvent" trigger="click">
                                <span class="el-dropdown-link">
                                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="1">查看</el-dropdown-item>
                                    <el-dropdown-item command="4">打印</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
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
                :page-size="1"
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
            serchText: '',
            currentPage: 1,
            selectTableData: [],
            isSupperBoxShow: false,
            tableHeight: 500,
            searchFormData: {
                houseId: '',
                buyerId: '',
                storeType: '',
                storeNo: '',
                startTime: '',
                endTime: '',
                pageNo: '',
                pageSize: '',
                creator: '',
                operator: '',
                date: ''
            },
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
        getInboundList() {
            API.getInboundList().then(res => {
                this.tableData = res.data.list
            })
        },
        // 跳转详情页
        inBoundDetail(index, data) {
            this.$router.push({name: '出入库详情', params: {id: data.storeNo || 123, type: '入库'}})
        },
        editTable(index, data) {

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
