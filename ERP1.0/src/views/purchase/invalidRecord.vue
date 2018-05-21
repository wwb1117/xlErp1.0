<template>
    <div>
        <div class="model_topcol">
            <span style="color: #409EFF">采购单</span>
            <span> - 作废记录</span>
            <div>
                <el-button style="width: 90px" size="small">导出</el-button>
                <el-button style="width: 90px" size="small">打印</el-button>
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
                        <el-form-item label="作废时间">
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

                <div class="checkBox_wrap">
                    <el-checkbox v-model="totalChecked">全选</el-checkbox>
                </div>


            </div>
        </div>
        <div class="model_footer">
            <el-button size="small" style="width: 90px; margin-left: 25px;">返 回</el-button>
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
            isExportShow: false

        }
    },
    computed:{},
    methods:{
        handleSizeChange(){

        },
        handleCurrentChange(){

        },
        inRepositoryEvent(){

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
                path: '/addPurchaseList'
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
.model_footer{
    text-align: left;
    padding-top: 10px;
}
.checkBox_wrap{
    height: 40px;
    background: #f5f5f5;
}
</style>
