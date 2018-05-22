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
                        v-model="serchText">
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
                        prop="purchaseCompanyNo"
                        label="采购单位编号"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="purchaseCompanyName"
                        label="采购单位名称">
                    </el-table-column>
                    <el-table-column
                        prop="leadMan"
                        label="法定代表人">
                    </el-table-column>
                    <el-table-column
                        prop="purchaseRMB"
                        label="注册资本">
                    </el-table-column>
                    <el-table-column
                        prop="makeListTime"
                        label="成立时间">
                    </el-table-column>
                    <el-table-column
                        prop="tlephone"
                        label="电话">
                    </el-table-column>
                    <el-table-column
                        prop="email"
                        label="邮箱">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="详细地址">
                    </el-table-column>
                    <el-table-column
                        prop="maker"
                        label="备注">
                    </el-table-column>
                    <el-table-column
                        prop="state"
                        label="状态">
                        <template slot-scope="scope">
                            <el-switch active-value="1" v-model="scope.row.state"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="prop"
                        width="150"
                        label="操作">
                         <template slot-scope="scope">
                            <el-button
                            @click.native="tablePropEvent(scope.$index, 1)"
                            type="text"
                            size="small">
                            详情
                            </el-button>
                            <el-button
                            @click.native="tablePropEvent(scope.$index, 2)"
                            type="text"
                            size="small">
                            编辑
                            </el-button>
                            <el-button
                            @click.native="tablePropEvent(scope.$index, 3)"
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
export default {
    data(){
        return {
            serchText: '',
            currentPage: 2,
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
        handleSizeChange(){

        },
        handleCurrentChange(){

        },
        tablePropEvent(index, type){
            if (type == 1){
                this.$router.push({
                    path: '/lookPurchaseCompany'
                })
            }
            if (type == 2){
                this.$router.push({
                    path: '/editPurchaseCompany'
                })
            }
        },

        handleSelectionChange(val){
        },
        addPurchaseComEvent(){
            this.$router.push({
                path: '/addPurchaseCompany'
            })
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
    width: 390px;
}
.el-form{
    color: #636365;
}

</style>
