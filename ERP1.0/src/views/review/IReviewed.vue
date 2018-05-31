<template>
    <div>
        <div class="model_topcol">
            <span>我发起的</span>
        </div>
        <div class="model_content" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <div class="model_content_inner">
                <div class="purchaseList_title">
                    <el-input
                        size="small"
                        placeholder="请输入关键词"
                        prefix-icon="el-icon-search"
                        :style="{width: '378px'}"
                        v-model="tableParam.searchStr">
                    </el-input>
                    <el-button @click="getTableData" :style="{margin: '0 30px 0 10px'}" type="primary" size="small">搜索</el-button>
                    <el-date-picker
                        size="small"
                        v-model="searchTime"
                        value-format="timestamp"
                        @change="datePickerChange"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>

                    <el-select style="margin-left: 20px" size="small" v-model="tableParam.auditStatus" placeholder="审核状态">
                        <el-option v-for="key in $allEnumeration.auditStatus" :key="key" :label="$allEnumeration.auditStatus[key]" :value="key"> </el-option>
                    </el-select>

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
                            @click.native="tablePropEvent(scope.$index, 1)"
                            type="text"
                            size="small">
                            详情
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
                :total="400">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import api from 'api/review'
export default {
    data(){
        return {
            searchText: '',
            searchTime: '',
            searState: '',
            tableParam: {
                auditorId: '1',
                startTime: '',
                endTime: '',
                pageNo: 1,
                pageSize: 10,
                searchStr: '',
                auditStatus: ''
            },
            currentPage: 2,
            selectTableData: [],
            tableHeight: 500,
            tableData: []
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

        },
        datePickerChange(data){
            this.tableParam.startTime = data[0] / 1000
            this.tableParam.endTime = data[1] / 1000
        },
        getTableData(){
            api.getIReviewList(this.tableParam).then((res) => {
                console.log(res)
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
