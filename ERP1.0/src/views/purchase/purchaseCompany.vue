<template>
    <div>
        <div class="model_topcol">
            <span>采购单位</span>
        </div>
        <div class="model_content" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <div class="model_content_inner">
                <div class="purchaseList_title">
                    <el-input
                        size="small"
                        placeholder="请输入要查询的关键词"
                        prefix-icon="el-icon-search"
                        :style="{width: '378px'}"
                        v-model="this.tableParam.serchText">
                    </el-input>
                    <el-button :style="{margin: '0 10px'}" type="primary" size="small">搜索</el-button>
                    <el-button @click="addPurchaseComEvent" :style="{float: 'right', marginRight: '20px', width: '90px', marginTop: '15px'}" type="primary" size="small">新增</el-button>

                </div>
                <el-table
                    :data="tableData"
                    :height="$store.state.home.modelContentHeight - 83"
                    ref="purchaseListTable"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <el-table-column
                    type="index"
                    label=" "
                    width="50">
                    </el-table-column>
                    <el-table-column
                        prop="buyerCompanyNo"
                        label="采购单位编号"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="buyerCompanyName"
                        label="采购单位名称">
                    </el-table-column>
                    <el-table-column
                        prop="legalRepresentative"
                        label="法定代表人">
                    </el-table-column>
                    <el-table-column
                        prop="registeredCapital"
                        label="注册资本">
                    </el-table-column>
                    <el-table-column
                        prop="foundingTime"
                        label="成立时间">
                        <template slot-scope="scope">
                            <div>
                                <span>{{scope.row.foundingTime | time}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="电话">
                    </el-table-column>
                    <el-table-column
                        prop="mailBox"
                        label="邮箱">
                    </el-table-column>
                    <el-table-column
                        prop="buyerCompanyAddress"
                        label="详细地址">
                    </el-table-column>
                    <el-table-column
                        prop="remark"
                        label="备注">
                    </el-table-column>
                    <el-table-column
                        prop="enableStatus"
                        label="状态">
                        <template slot-scope="scope">
                            <el-switch :inactive-value="0" :active-value="1" v-model="scope.row.enableStatus"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="prop"
                        width="150"
                        label="操作">
                         <template slot-scope="scope">
                            <el-button
                            @click.native="tablePropEvent(scope.row.id, 1)"
                            type="text"
                            size="small">
                            详情
                            </el-button>
                            <el-button
                            @click.native="tablePropEvent(scope.row.id, 2)"
                            type="text"
                            size="small">
                            编辑
                            </el-button>
                            <el-button
                            @click.native="tablePropEvent(scope.row.id, 3)"
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
                :current-page="1"
                :page-sizes="[10, 30, 50, 100]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalPage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import api from 'api/purchase'
export default {
    data(){
        return {
            serchText: '',
            tableParam: {
                serchText: '',
                pageSize: 10,
                pageNo: 1
            },
            totalPage: 1,
            selectTableData: [],
            tableHeight: 500,
            tableData: [
                {
                    purchaseCompanyNo: 'GG7758521',
                    purchaseCompanyName: '联星贸易',
                    leadMan: '李明珠',
                    purchaseRMB: '888,000,00',
                    makeListTime: '2018-05-16',
                    tlephone: '15639115673',
                    email: '153634555@qq.com',
                    address: '杭州西溪',
                    maker: '备注就是备注',
                    state: '1',
                    prop: ''
                },
                {
                    purchaseCompanyNo: 'GG7758521',
                    purchaseCompanyName: '联星贸易',
                    leadMan: '李明珠',
                    purchaseRMB: '888,000,00',
                    makeListTime: '2018-05-16',
                    tlephone: '15639115673',
                    email: '153634555@qq.com',
                    address: '杭州西溪',
                    maker: '备注就是备注',
                    state: '0',
                    prop: ''
                },
                {
                    purchaseCompanyNo: 'GG7758521',
                    purchaseCompanyName: '联星贸易',
                    leadMan: '李明珠',
                    purchaseRMB: '888,000,00',
                    makeListTime: '2018-05-16',
                    tlephone: '15639115673',
                    email: '153634555@qq.com',
                    address: '杭州西溪',
                    maker: '备注就是备注',
                    state: '0',
                    prop: ''
                }
            ]
        }
    },
    computed:{},
    methods:{
        handleSizeChange(val){
            this.tableParam.pageSize = val
        },
        handleCurrentChange(val){
            this.tableParam.pageNo = val
        },
        tablePropEvent(rowid, type){
            if (type == 1){
                this.$store.commit('setBuyerId', rowid)
                this.$router.push({
                    path: '/lookPurchaseCompany'
                })
            }
            if (type == 2){
                this.$store.commit('setBuyerId', rowid)
                this.$router.push({
                    path: '/editPurchaseCompany'
                })
            }
            if (type == 3){
                this.myBase.confirmDelet('你确定要永久删除此采购单位信息?', () => {
                    api.deleteSupplier(rowid).then((response) => {
                        this.$message({
                            type: 'success',
                            duration: 1500,
                            showClose: true,
                            message: '删除成功'
                        })

                        this.tableParam.pageSize = 15
                        this.tableParam.pageNo = 1
                        this.getTableData()

                    })
                })
            }
        },
        handleSelectionChange(val){

        },
        addPurchaseComEvent(){
            this.$router.push({
                path: '/addPurchaseCompany'
            })
        },
        getTableData(){
            return api.getPurchaseComList(this.tableParam).then((response) => {
                this.tableData = response.data.list
                this.totalPage = response.data.total
            })
        }

    },
    created(){},
    activated(){
        this.getTableData()
    },
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
    width: 390px;
}
.el-form{
    color: #636365;
}

</style>
