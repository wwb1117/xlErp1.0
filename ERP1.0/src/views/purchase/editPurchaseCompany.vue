<template>
    <div>
        <div class="model_topcol">
            <span style="color: #409EFF">采购单位</span>
            <span> - 编辑</span>
        </div>
        <div class="model_content" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <div class="model_content_inner">
                <div class="banner">
                    编辑采购单位
                </div>
                <div class="form_wrap">
                    <el-form :inline="true" :model="purchaseComFormData" label-position="right" size="small" label-width="120px">
                        <el-form-item label="采购单位编码">
                            <el-input v-model="purchaseComFormData.purchaseList" placeholder="请输入采购单位编码"></el-input>
                        </el-form-item>
                        <el-form-item label="采购单位名称">
                            <el-input v-model="purchaseComFormData.purchaseComName" placeholder="请输入采购单位名称"></el-input>
                        </el-form-item>
                        <br>
                        <el-form-item label="法定代表人">
                            <el-input v-model="purchaseComFormData.leaderMan" placeholder="请输入法定代表人"></el-input>
                        </el-form-item>
                        <el-form-item label="注册资本">
                            <el-input v-model="purchaseComFormData.purchaseRMB" placeholder="请输入注册资本"></el-input>
                        </el-form-item>
                        <br>
                        <el-form-item label="成立时间">
                            <el-date-picker
                            v-model="purchaseComFormData.setTime"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="电话">
                            <el-input v-model="purchaseComFormData.telphone" placeholder="请输入电话"></el-input>
                        </el-form-item>
                        <br>
                        <el-form-item label="邮箱">
                            <el-input v-model="purchaseComFormData.email" placeholder="请输入邮箱"></el-input>
                        </el-form-item>
                        <br>
                        <el-form-item label="所在地区">
                            <el-select v-model="purchaseComFormData.address" placeholder="请选择所在地区">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <br>
                        <el-form-item label="详细地址">
                            <el-input :style="{width: '540px'}" v-model="purchaseComFormData.detailAddress" placeholder="请输入详细地址"></el-input>
                        </el-form-item>
                        <br>
                        <el-form-item label="状态">
                            <el-switch active-value="1" v-model="purchaseComFormData.state"></el-switch>
                        </el-form-item>
                        <br>
                        <el-form-item label="备注">
                            <el-input :style="{width: '540px'}" :rows="4" type="textarea" v-model="purchaseComFormData.maker" placeholder="请输入备注"></el-input>
                        </el-form-item>
                    </el-form>
                </div>


            </div>
        </div>
        <div class="model_footer">
            <el-button type="primary" size="small" style="width: 90px; margin-left: 25px;">保存</el-button>
            <el-button size="small" style="width: 90px; margin-left: 25px;">取消</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            purchaseComFormData: {
                purchaseComNo: 'FGG11112555',
                purchaseComName: 'FGG11112555',
                leaderMan: 'zhangsan',
                purchaseRMB: '500,000,0',
                setTime: '2018-05-22',
                telphone: '15639115673',
                email: '153634555@qq.com',
                address: '',
                detailAddress: '杭州西溪',
                state: '1',
                maker: ''
            }
        }
    },
    computed:{},
    methods:{


    },
    created(){},
    mounted(){}
}
</script>
<style scoped>
.model_content_inner{
    position: relative;
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
.form_wrap{
    padding-top: 30px;
}
.form_wrap .el-form-item__content input{
    width: 194px;
}
.form_wrap .el-date-editor{
    width: 200px;
}
</style>
