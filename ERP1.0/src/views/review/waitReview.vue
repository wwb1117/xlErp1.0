<template>
    <div>
        <div class="model_topcol">
            <span>待我审批</span>
        </div>
        <div class="model_content" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <div class="model_content_inner">
                <div class="purchaseList_title">
                    <el-input
                        size="small"
                        placeholder="请输入关键词"
                        prefix-icon="el-icon-search"
                        :style="{width: '378px'}"
                        v-model="serchText">
                    </el-input>
                    <el-button :style="{margin: '0 30px 0 10px'}" type="primary" size="small">搜索</el-button>
                    <el-date-picker
                        size="small"
                        v-model="serchTime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>

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
                        prop="flowName"
                        label="流程名称"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="makeListMan"
                        label="创建人">
                    </el-table-column>
                    <el-table-column
                        prop="setTime"
                        label="创建时间">
                    </el-table-column>
                    <el-table-column
                        prop="state"
                        label="审核状态">
                    </el-table-column>
                    <el-table-column
                        prop="prop"
                        width="150"
                        label="操作">
                         <template slot-scope="scope">
                            <el-button
                            @click.native="tablePropEvent(scope.$index, 3)"
                            type="text"
                            size="small">
                            审核
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
            serchTime: '',
            currentPage: 2,
            selectTableData: [],
            tableHeight: 500,
            tableData: [
                {
                    flowName: '采购订单1',
                    makeListMan: '联星贸易',
                    setTime: '2018-05-16',
                    state: '待审核',
                    prop: ''
                },
                {
                    flowName: '采购订单1',
                    makeListMan: '联星贸易',
                    setTime: '2018-05-16',
                    state: '待审核',
                    prop: ''
                },
                {
                    flowName: '采购订单1',
                    makeListMan: '联星贸易',
                    setTime: '2018-05-16',
                    state: '待审核',
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
            this.$router.push({
                path: '/waitReviewRe'
            })
        },

        handleSelectionChange(val){

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
