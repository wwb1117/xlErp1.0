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
                    <el-form class="myForm" :inline="true" :model="superFormData" label-position="right" size="small" label-width="80px">
                        <el-form-item label="采购单号">
                            <el-input v-model="superFormData.purchaseList" placeholder="请输入采购单号"></el-input>
                        </el-form-item>
                        <el-form-item label="制单人">
                            <el-input v-model="superFormData.makeListMan" placeholder="请输入制单人"></el-input>
                        </el-form-item>
                        <el-form-item label="采购员">
                            <el-input v-model="superFormData.purchaseMan" placeholder="请输入采购员"></el-input>
                        </el-form-item>
                        <br>
                        <el-form-item label="供应商">
                            <el-select v-model="superFormData.supplier" placeholder="请输入采购员">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="采购单位">
                            <el-select v-model="superFormData.purchaseCompany" placeholder="请输入采购单位">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="入库仓库">
                            <el-select v-model="superFormData.inRepository" placeholder="请输入入库仓库">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <br>
                        <el-form-item label="入库状态">
                            <el-select v-model="superFormData.inState" placeholder="请输入入库状态">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="审核状态">
                            <el-select v-model="superFormData.reviewState" placeholder="请输入审核状态">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="采购时间">
                            <el-date-picker
                                v-model="superFormData.purchaseDate"
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
                        placeholder="请输入采购单号/供应商名称/采购单位"
                        prefix-icon="el-icon-search"
                        :style="{width: '378px'}"
                        v-model="serchText">
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
                        prop="purchaseList"
                        label="入库单号"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="supplier"
                        label="入库时间"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="purchaseCompany"
                        label="采购单位">
                    </el-table-column>
                    <el-table-column
                        prop="purchaseCompany"
                        label="入库仓库">
                    </el-table-column>
                    <el-table-column
                        prop="inRepository"
                        label="入库类型">
                    </el-table-column>
                    <el-table-column
                        prop="makeListMan"
                        label="制单人">
                    </el-table-column>
                    <el-table-column
                        prop="purchaseMan"
                        label="经办人">
                    </el-table-column>
                    <el-table-column
                        prop="reviewState"
                        label="审核状态">
                    </el-table-column>
                    <el-table-column
                        prop="prop"
                        width="150"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button
                                @click.native.prevent="inRepositoryEvent(scope.$index, tableData)"
                                type="text"
                                size="small">
                                详情
                            </el-button>
                            <el-button
                                :style="{marginRight: '10px'}"
                                @click.native.prevent="editTable(scope.$index, tableData)"
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
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            serchText: '',
            currentPage: 2,
            selectTableData: [],
            isSupperBoxShow: false,
            tableHeight: 500,
            superFormData: {
                purchaseList: '7758521',
                supplier: '',
                purchaseCompany: '',
                inRepository: '402',
                purchaseRMB: '888,000,00',
                makeListMan: '李明珠',
                purchaseMan: '官人',
                purchaseDate: '2018-05-16',
                inState: '已入库',
                reviewState: '已审核',
                prop: ''
            },
            isExportShow: false,
            tableData: [
                {
                    purchaseList: '7758521',
                    supplier: '布加迪',
                    purchaseCompany: '联星贸易',
                    inRepository: '402',
                    purchaseRMB: '888,000,00',
                    makeListMan: '李明珠',
                    purchaseMan: '官人',
                    purchaseDate: '2018-05-16',
                    inState: '已入库',
                    reviewState: '已审核',
                    prop: ''
                },
                {
                    purchaseList: '6969996',
                    supplier: '迈巴赫',
                    purchaseCompany: '联星贸易',
                    inRepository: '402',
                    purchaseRMB: '874,000,00',
                    makeListMan: '张作霖',
                    purchaseMan: '客官',
                    purchaseDate: '2018-05-16',
                    inState: '已入库',
                    reviewState: '已审核',
                    prop: ''
                },
                {
                    purchaseList: '5555587',
                    supplier: '法拉利',
                    purchaseCompany: '联星贸易',
                    inRepository: '402',
                    purchaseRMB: '562,000,00',
                    makeListMan: '段祺瑞',
                    purchaseMan: '小二',
                    purchaseDate: '2018-05-16',
                    inState: '已入库',
                    reviewState: '已审核',
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
        inRepositoryEvent(){
            this.$router.push({name: '出入库详情', params: {id:12314654, type: '入库'}})
        },
        editTable() {

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
    mounted(){}
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
