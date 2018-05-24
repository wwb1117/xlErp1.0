<template>
    <div>
        <div class="model_topcol">
            <span style="color: #409EFF">供应商</span>
            <span> - 新增</span>
        </div>
        <div class="model_content" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <div class="model_content_inner form_wrap">
                <el-form id="supplier_form" :inline="true" ref="addSupplierForm" :rules="rules" :model="formData" label-position="right" size="small" label-width="120px">
                    <div class="banner">
                        供应商信息
                    </div>
                    <div style="margin-top: 20px">
                        <el-form-item prop="sellerCompanyName" label="公司名称">
                            <el-input style="width: 194px" v-model="formData.sellerCompanyName" placeholder="请输入公司名称"></el-input>
                        </el-form-item>
                        <el-form-item prop="sellerCompanyNo" label="供应商编号">
                            <el-input style="width: 194px" v-model="formData.sellerCompanyNo" placeholder="请输入供应商编号"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item prop="provinceId" label="区域">
                            <area-cader :fatherValue="fatherValue" v-on:areaFromChild="areaCallBack"></area-cader>
                        </el-form-item>
                        <el-form-item label="详细地址">
                            <el-input style="width: 194px" v-model="formData.sellerCompanyAddress" placeholder="请输入详细地址"></el-input>
                        </el-form-item>
                    </div>
                    <div class="banner">
                        个人信息
                    </div>
                    <div style="margin-top: 20px">
                        <el-form-item prop="contactPerson" label="联系人">
                            <el-input style="width: 194px" v-model="formData.contactPerson" placeholder="请输入联系人"></el-input>
                        </el-form-item>
                        <el-form-item prop="phone" label="联系方式">
                            <el-input style="width: 194px" v-model="formData.phone" placeholder="请输入联系方式"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="身份证">
                            <div style="display: inline-block">
                                <el-upload
                                action=""
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                                </el-upload>
                                <span class="card_tip">经营者身份证<br>正面照</span>
                                <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                            <div style="display: inline-block; margin-left: 30px;">
                                <el-upload
                                action=""
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                                </el-upload>
                                <span class="card_tip">经营者身份证<br>反面照</span>
                                <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="经营许可类证书">
                            <span slot="label">
                                经营许可<br>类证书
                            </span>
                            <div style="display: inline-block">
                                <el-upload
                                action=""
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                                </el-upload>
                                <span class="card_tip">经营者身份证<br>正面照</span>
                                <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                        </el-form-item>
                    </div>
                    <div class="banner">
                        银行信息
                    </div>
                    <div style="margin-top: 20px">
                        <el-form-item label="开户名称">
                            <el-input style="width: 194px" v-model="formData.accountName" placeholder="请输入开户名称"></el-input>
                        </el-form-item>
                        <el-form-item label="开户银行">
                            <el-input style="width: 194px" v-model="formData.bankName" placeholder="请输入开户银行"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="银行账户">
                            <el-input style="width: 194px" v-model="formData.accountNumber" placeholder="请输入银行账户"></el-input>
                        </el-form-item>
                    </div>
                    <div class="banner">
                        其他信息
                    </div>
                    <div style="margin-top: 20px">
                        <el-form-item label="备注">
                            <el-input type="textarea" :rows="4" style="width: 524px" v-model="formData.remark" placeholder="请输入备注"></el-input>
                        </el-form-item>
                    </div>

                </el-form>

            </div>
        </div>
        <div class="model_footer">
            <el-button size="small" @click="saveBtnEvent" type="primary" style="width: 90px; margin-left: 25px;">保存</el-button>
            <el-button v-RouterBack size="small" style="width: 90px; margin-left: 25px;">取消</el-button>
        </div>
    </div>
</template>

<script>
import areaCader from 'components/areaCascader'
import api from 'api/purchase'
export default {
    components: {
        areaCader
    },
    data(){
        return {
            fatherValue: [130000, 130100, 130102],
            formData: {
                sellerCompanyName: '',
                sellerCompanyNo: '',
                provinceId: '',
                cityId: '',
                areaId: '',
                sellerCompanyAddress: '',
                contactPerson: '',
                phone: '',
                faceIdcard: 'test',
                frontIdcard: 'test',
                imgLicense: 'test',
                accountName: '',
                bankName: '',
                accountNumber: '',
                remark: ''

            },
            rules: {
                sellerCompanyName: [
                    { required: true, message: '请输入公司名称', trigger: 'blur' }
                ],
                sellerCompanyNo: [
                    { required: true, message: '请输入供应商编号', trigger: 'blur' }
                ],
                provinceId: [
                    { required: true, message: '请选择区域', trigger: 'blur' }
                ],
                contactPerson: [
                    { required: true, message: '请输入联系人', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入联系方式', trigger: 'blur' },
                    { validator: this.phoneValidate, trigger: 'blur' }
                ]
            },
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    computed:{},
    methods:{
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        areaCallBack(data){
            this.formData.provinceId = data[0]
            this.formData.cityId = data[1]
            this.formData.areaId = data[2]
        },
        phoneValidate(rule, value, callback){
            if (/^1[34578]\d{9}$/.test(value) || /^0\d{2,3}-?\d{7,8}$/.test(value)){
                callback()
            } else {
                callback(new Error('请正确输入电话号码或者手机号码'))
            }
        },
        saveBtnEvent(){
            this.$refs['addSupplierForm'].validate((valid) => {
                if (valid) {
                    api.addSupplier(this.formData).then((response) => {
                        this.$message({
                            type: 'success',
                            duration: 1500,
                            showClose: true,
                            message: '新增成功'
                        });
                        this.$router.go(-1)
                    })
                }
            })
        }


    },
    activated(){

    },
    created(){},
    mounted(){}
}
</script>
<style scoped>
.model_content_inner{
    position: relative;
    overflow: auto;
}

.model_footer{
    text-align: left;
    padding-top: 10px;
}
.banner{
    height: 40px;
    background: #f5f5f5;
    line-height: 40px;
    color: #606266;
    font-weight: 600;
    padding-left: 10px;
}
.card_tip{
    display: inline-block;
    text-align: center;
    width: 88px;
}
</style>
