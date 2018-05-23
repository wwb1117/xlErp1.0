<template>
    <div>
        <div class="model_topcol">
            <span>供应商</span>
        </div>
        <div class="model_content" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <div class="model_content_inner">
                <div class="purchaseList_title">
                    <el-input
                        size="small"
                        placeholder="请输入供应商名称"
                        prefix-icon="el-icon-search"
                        :style="{width: '378px'}"
                        v-model="serchText">
                    </el-input>
                    <el-button @click="getTableData" :style="{margin: '0 10px'}" type="primary" size="small">搜索</el-button>
                    <el-button @click="addPurchaseSupplierEvent" :style="{float: 'right', marginRight: '20px', width: '90px', marginTop: '15px'}" type="primary" size="small">新增</el-button>

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
                        label="供应商编号"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="purchaseCompanyName"
                        label="供应商名称">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="地址">
                    </el-table-column>
                    <el-table-column
                        prop="leadMan"
                        label="联系人">
                    </el-table-column>
                    <el-table-column
                        prop="tlephone"
                        label="联系方式">
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
                :page-sizes="[15, 20, 30, 50]"
                :page-size="100"
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
            currentPage: 2,
            selectTableData: [],
            tableHeight: 500,
            totalPage: 1,
            tableParam: {
                pageNo: 1,
                pageSize: 15,
                sellerName: this.serchText
            },
            tableData: []
        }
    },
    computed:{},
    methods:{
        handleSizeChange(val){
            this.tableParam.pageSize = val
            this.getTableData()
        },
        handleCurrentChange(val){
            this.tableParam.pageNo = val
            this.getTableData()
        },
        getTableData(){
            api.getSupplierList(this.tableParam).then((response) => {
                this.totalPage = response.data.total
                this.tableData = response.data.list

            })
        },
        tablePropEvent(index, type){
            if (type == 1){
                this.$router.push({
                    path: '/lookPurchaseSupplier'
                })
            }
            if (type == 2){
                this.$router.push({
                    path: '/editPurchaseSupplier'
                })
            }
        },

        handleSelectionChange(val){
        },
        addPurchaseSupplierEvent(){
            this.$router.push({
                path: '/addPurchaseSupplier'
            })
        }

    },
    created(){
        this.getTableData()
        api.getSupplierSelectData().then((response) => {
            console.log(response)
        })
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
