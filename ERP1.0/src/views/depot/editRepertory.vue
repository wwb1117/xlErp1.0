<template>
    <div>
        <div class="model_topcol">
            <span style="color: #409EFF">仓库管理</span>
            <span> - {{$route.params.type}}仓库</span>
        </div>
        <div class="model_content" >
            <div class="content" :style="{height: $store.state.home.modelContentHeight - 20 + 'px'}">
                <el-form :inline="true" :model="addFormData" :rules="rules" label-position="right" size="small" label-width="110px">
                    <div class="banner">
                        基本信息
                    </div>
                    <div class="baseInfoBox editRepertory">
                        <el-form-item label="仓库编码" prop="warehouseNo">
                            <el-input v-model="addFormData.warehouseNo" placeholder="请输入仓库编码" class="w50_item"></el-input>
                        </el-form-item>
                        <el-form-item label="仓库名称" prop="warehouseName">
                            <el-input v-model="addFormData.warehouseName" placeholder="请输入仓库名称" class="w50_item"></el-input>
                        </el-form-item>
                        <el-form-item prop="personResponsible" label="负责人">
                            <el-input v-model="addFormData.personResponsible" placeholder="请输入负责人" class="w50_item"></el-input>
                        </el-form-item>
                        <el-form-item prop="phone" label="负责人手机号">
                            <el-input v-model="addFormData.phone" placeholder="请输入负责人手机号" class="w50_item"></el-input>
                        </el-form-item>
                        <el-form-item prop="acreage" label="面积m²">
                            <el-input v-model="addFormData.acreage" placeholder="请输入面积" class="w50_item"></el-input>
                        </el-form-item>
                        <el-form-item prop="zone" label="所在地区">
                            <!--<el-cascader-->
                            <!--:options="options"-->
                            <!--v-model="addFormData.zone"-->
                            <!--class="w50_item"-->
                            <!--&gt;</el-cascader>-->
                        </el-form-item>
                        <el-form-item prop="warehouseAddress" label="详细地址" class="w100">
                            <el-input v-model="addFormData.warehouseAddress" placeholder="请输入详细地址" class="w100_item"></el-input>
                        </el-form-item>
                        <el-form-item prop="remark" label="备注" class="w100">
                            <el-input
                                v-model="addFormData.remark"
                                type="textarea"
                                :rows="4"
                                class="w100_item"
                                placeholder="请输入备注">
                            </el-input>
                        </el-form-item>
                    </div>

                </el-form>
            </div>
        </div>
        <div class="model_footer">
            <el-button style="width: 90px" type="primary" size="small">保存</el-button>
            <el-button style="width: 90px" size="small" v-RouterBack>取消</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            addFormData: {
                id: '',
                warehouseNo: '',
                warehouseName: '',
                activateState: '',
                personResponsible: '',
                phone: '',
                warehouseAddress: '',
                acreage: '',
                remark: '',
                provinceId: '',
                cityId: '0',
                areaId: '0',
                zone: ''
            },
            rules: {
                warehouseNo: [
                    {required: true, message: '请输入仓库编码', trigger: 'blur'}
                ],
                warehouseName: [
                    { required: true, message: '请输入仓库名称', trigger: 'blur' }
                ]
            }
        }
    },
    computed:{},
    methods:{
        getRepertoryDetail() {
            this.addFormData = this.$route.params.data
        },
        goBack() {
            this.$router.back(-1)
        }
    },
    created(){},
    activated () {
        this.getRepertoryDetail()
    },
    deactivated () {
    },
    mounted(){

    }
}
</script>
<style scoped>
    .banner{
        height: 40px;
        background: #f5f5f5;
        line-height: 40px;
        color: #606266;
        font-weight: 600;
        padding-left: 10px;
    }
    .baseInfoBox{
        padding-top: 10px;
    }
    .el-icon-more{
        cursor: pointer;
    }
    .el-date-editor{
        width: 194px;
    }
    .model_footer{
        line-height: 50px;
        text-align: left;
        padding-left: 40px;
    }
    .content{
        overflow: auto;
        background: #FFFFFF;
    }
    .goodInfoBox{
        width: 100%;
        margin-top: 20px;
    }
    .goodInfoBox .el-form-item{
        width: 400px;
    }
    .editRepertory{
        max-width: 870px;
    }
    .editRepertory .el-form-item{
        width: 400px;
    }
    .editRepertory .w100{
        width: 100%;
    }
    .editRepertory .w100_item{
        width: 675px;
    }
    .editRepertory .w50_item{
        width: 260px;
    }
    .myForm .el-form-item__content input{
        width: 300px;
    }
</style>
