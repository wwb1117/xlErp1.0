<template>
    <div>
        <div class="model_topcol">
            <span style="color: #409EFF">盘点单</span>
            <span v-if="currentStep == 1"> - 上传导入文件</span>
            <span v-if="currentStep == 2"> - 导入完成</span>
        </div>
        <div class="model_content" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <div class="model_content_inner">
                <step-bar :step-texts="testText" :step-nums="stepNums" :current-step="currentStep"></step-bar>
                <div v-if="currentStep == 1" class="firstStep mt40">
                    <div class="import_wrap">
                    <p class="import_title">1.选择盘点仓库</p>
                    <div class="greyBg">
                        <el-select
                            v-model="houseId"
                            filterable
                            remote
                            reserve-keyword
                            placeholder="请输入关键词"
                            :remote-method="remoteMethod"
                            :loading="loading">
                            <el-option
                                v-for="item in houseId_option"
                                :key="item.id"
                                :label="item.warehouseName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <el-button plain style="margin-left: 10px" icon="el-icon-download" @click="exportInventory">下载商品库存数据</el-button>
                    </div>
                </div>
                    <div class="import_wrap">
                    <p class="import_title">2.添加盘点数据</p>
                    <div class="greyBg">
                        <el-upload
                            ref="upload"
                            :style="{width: '450px', display: 'inline-block'}"
                            action=""
                            :auto-upload="false">
                            <el-input style="width: 280px" slot="trigger" placeholder="添加盘点数据" readonly="true"><i style="margin-top: 13px" slot="prefix" class="fa fa-paperclip fa-lg"></i></el-input>
                            <el-button slot="trigger" style="margin-left: 10px; width: 90px" type="primary">导入</el-button>
                        </el-upload>
                    </div>
                </div>
                </div>
                <div v-if="currentStep == 2" class="secondStep mt40">
                    <div class="textCenter">
                        <h1>导入失败</h1>
                        <p style="font-size: 18px">共3条数据，成功导入1条，导入失败2条。</p>
                        <div class="mt40">
                            <h2>导入失败的原因可能有</h2>
                            <p>1、系统中没有指定商品存在</p>
                            <p>2、盘点数量不能为空</p>
                            <p>3、商品编码、商品名称、商品规格完全相同的多条商品</p>
                            <el-button plain icon="el-icon-download" style="padding: 8px 15px">下载商品库存数据</el-button>
                            <p class="grey">按上述要求检查修改后，重新上传</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="model_footer" v-if="currentStep == 1">
            <el-button style="width: 90px" type="primary" size="small" @click="nextStep">下一步</el-button>
        </div>
        <div class="model_footer" v-if="currentStep == 2">
            <el-button style="width: 90px" type="primary" size="small" @click="goBack">重新上传</el-button>
        </div>
    </div>
</template>

<script>
import stepBar from 'components/stepBar'
import 'utils/allEnumeration'
// import ME from 'utils/base'
import API from 'api/depot'
export default {
    components: {
        stepBar
    },
    data(){
        return {
            testText: ['1. 上传导入文件', '2.导入完成'],
            stepNums: 2,
            currentStep: 1,
            houseId: null,
            houseId_option: '',
            loading: true
        }
    },
    methods: {
        // 入库仓库模糊搜索
        remoteMethod(query) {
            if (query !== '') {
                this.loading = true;
                let post = {};

                post.warehouseName = query
                setTimeout(() => {
                    this.loading = false;
                    API.getWarehouseList(post).then(res => {
                        this.houseId_option = res.data.list
                    })
                    this.houseId_option = this.houseId_option.filter(item => {
                        return item.label.toLowerCase()
                            .indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
            } else {
                this.houseId_option = [];
            }

        },
        goBack() {
            this.$router.push({name: '库存盘点'})
            this.currentStep = 1
        },
        nextStep() {
            this.currentStep = 2
        },
        // 下载商品库存
        exportInventory() {
            if (!this.houseId) {
                this.$message({
                    type:'warning',
                    message:'请选择盘点仓库'
                })
                return
            }
            window.open(`/api/storage/stockCount/export/${this.houseId}`)
        }
    },
    activated() {
        this.currentStep = 1
    }
}
</script>

<style scoped>
    .model_content_inner{
        position: relative;
        padding: 10px;
    }
    .model_footer{
        line-height: 50px;
        text-align: left;
        padding-left: 40px;
    }
    .mt40{
        margin-top: 40px;
    }
    .import_wrap{
        padding-top: 25px;
    }
    .import_wrap .import_title {
        font-size: 14px;
        line-height: 25px;
    }
    .import_wrap .greyBg{
        padding: 30px 0 30px 20px;
        background: #f8f8f8;
    }
    .textCenter{
        text-align: center;
        margin-top: 140px;
    }
    .textCenter h1{
        color: #606266;
        font-size: 40px;
    }
    .textCenter h2{
        color: #606266;
        font-weight: bold;
        font-size: 18px;
    }
    .textCenter p{
        font-size: 14px;
        color: #606266;
    }
    .textCenter p.grey{
        color: #999;
        font-size: 14px;
        line-height: 40px;
    }
</style>
