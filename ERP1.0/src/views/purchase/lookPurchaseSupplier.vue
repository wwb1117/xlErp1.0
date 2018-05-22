<template>
    <div>
        <div class="model_topcol">
            <span style="color: #409EFF">供应商</span>
            <span> - 详情</span>
        </div>
        <div class="model_content" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <div class="model_content_inner form_wrap">
                <el-form id="supplier_form" :inline="true" :disabled="true" :model="formData" label-position="right" size="small" label-width="120px">
                    <div class="banner">
                        供应商信息
                    </div>
                    <div style="margin-top: 20px">
                        <el-form-item label="公司名称">
                            <el-input style="width: 194px" v-model="formData.comName" placeholder="请输入公司名称"></el-input>
                        </el-form-item>
                        <el-form-item label="供应商编号">
                            <el-input style="width: 194px" v-model="formData.suppNo" placeholder="请输入供应商编号"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="区域">
                            <el-select style="width: 194px" v-model="formData.area" placeholder="请选择区域">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="详细地址">
                            <el-input style="width: 194px" v-model="formData.address" placeholder="请输入详细地址"></el-input>
                        </el-form-item>
                    </div>
                    <div class="banner">
                        个人信息
                    </div>
                    <div style="margin-top: 20px">
                        <el-form-item label="联系人">
                            <el-input style="width: 194px" v-model="formData.linkMan" placeholder="请输入联系人"></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式">
                            <el-input style="width: 194px" v-model="formData.telphone" placeholder="请输入联系方式"></el-input>
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
                            <el-input style="width: 194px" v-model="formData.accountBank" placeholder="请输入开户银行"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="银行账户">
                            <el-input style="width: 194px" v-model="formData.bankAccount" placeholder="请输入银行账户"></el-input>
                        </el-form-item>
                    </div>
                    <div class="banner">
                        其他信息
                    </div>
                    <div style="margin-top: 20px">
                        <el-form-item label="备注">
                            <el-input type="textarea" :rows="4" style="width: 524px" v-model="formData.maker" placeholder="请输入备注"></el-input>
                        </el-form-item>
                    </div>



                </el-form>



            </div>
        </div>
        <div class="model_footer">
            <el-button size="small" type="primary" style="width: 90px; margin-left: 25px;">保存</el-button>
            <el-button size="small" style="width: 90px; margin-left: 25px;">取消</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            formData: {
                comName: '妈妈去哪儿',
                suppNo: '12545666',
                area: '',
                address: '',
                linkMan: '',
                tlephone: '',
                accountName: '',
                accountBank: '',
                bankAccount: '',
                maker: ''

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
        }

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
