<template>
    <div class="wrap">
        <div class="title_wrap">
            <div class="title">
                待入库商品清单
            </div>
            <span class="el_icon el-icon-arrow-down"></span>
        </div>
        <el-form class="myForm" :inline="true" label-position="right" :model="formData" size="small" label-width="90px">
            <div class="btn_wrap">
                <el-form-item label="入库仓库">
                    <el-select v-model="formData.inrepository" placeholder="请选择入库仓库">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="采购单位">
                    <el-select v-model="formData.purchaseCom" placeholder="请选择采购单位">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :style="{float: 'right'}">
                    <el-button @click="rukuBtnEvent" :style="{width: '90px'}" type="primary">入库</el-button>
                </el-form-item>
            </div>
            <div class="banner">
                商品信息
            </div>
            <div class="table_wrap">
                <el-table
                    :data="goodsInfoData"
                    border
                style="width: 100%">
                    <el-table-column
                    label=" "
                    type="index"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    prop="selfNum"
                    label="编号"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="barCode"
                    label="条码">
                    </el-table-column>
                    <el-table-column
                    prop="goodName"
                    label="商品">
                    </el-table-column>
                    <el-table-column
                    prop="SKU"
                    label="规格-SKU">
                    </el-table-column>
                    <el-table-column
                    prop="qualityDate"
                    label="保质期">
                    </el-table-column>
                    <el-table-column
                    prop="productData"
                    label="生产日期">
                    </el-table-column>
                    <el-table-column
                    prop="purchaseNum"
                    label="采购数">
                    </el-table-column>
                    <el-table-column
                    prop="inRepositoryNum"
                    label="已入库数">
                    </el-table-column>
                    <el-table-column
                    prop="itemRepositoryNum"
                    label="本次入库数">
                        <template slot-scope="scope">
                            <div>
                                <el-input size="small" @change.native="unitTatalEvent(scope)" @keyup.native="unitTatalEvent(scope)" v-model="scope.row.itemRepositoryNum"></el-input>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="unit"
                    label="单位">
                    </el-table-column>
                </el-table>
            </div>
            <div class="table_bottom_form">
                <el-form-item prop="inRepositoryDate" label="入库时间">
                    <el-date-picker
                    v-model="formData.inRepositoryDate"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="repositoryNo" label="入库单号">
                    <el-input v-model="formData.repositoryNo" placeholder="请输入入库单号"></el-input>
                </el-form-item><br>
                <el-form-item prop="makerMan" label="经办人">
                    <el-input v-model="formData.makerMan" placeholder="请输入经办人"></el-input>
                </el-form-item>
                <el-form-item prop="repositoryType" label="入库类型">
                    <el-input v-model="formData.repositoryType" placeholder="请输入入库类型"></el-input>
                </el-form-item><br>
                <el-form-item prop="marker" label="备注">
                    <el-input :style="{width: '490px'}" type="textarea" v-model="formData.marker" placeholder="请输入备注"></el-input>
                </el-form-item>
            </div>
            <div class="table_bottom color_gray fontWe_500">
                <div style="margin-bottom: 30px; line-height: 30px">
                    <span class="title_title">采购单号 : </span>
                    <span class="title_data">456655222222222222522</span>
                    <span class="title_title">采购员 : </span>
                    <span class="title_data">章撒</span>
                    <span class="title_title">制单人 : </span>
                    <span class="title_data">李思思</span><br>
                    <span class="title_title">采购备注 : </span>
                    <span ></span><span>我是一只小鸭子,咿呀,咿呀, 呦,, </span>
                    <!-- <span class="title_title">采购时间 : </span>
                    <span class="title_data">2018-05-18 16:34</span> -->
                </div>
            </div>

        </el-form>


        <el-dialog
            title="入库确认"
            :visible.sync="dialogVisible"
            width="30%"
            >

            <div style="line-height: 30px">
                <span class="title_title">入库仓库 : </span>
                <span class="title_data">默认仓库</span><br>
                <span class="title_title">商品种类 : </span>
                <span class="title_data">2</span><br>
                <span class="title_title">商品数量 : </span>
                <span >100</span>
            </div>


            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
       </el-dialog>


    </div>
</template>

<script>
export default {
    data(){
        return {
            dialogVisible: false,
            formData: {
                inrepository: '',
                purchaseCom: '',
                inRepositoryDate: '',
                repositoryNo: '8558558',
                makerMan: 'wwb',
                repositoryType: '',
                marker: ''

            },
            goodsInfoData: [{
                oper: '',
                selfNum: '11111',
                barCode: '',
                goodName: '',
                SKU: '',
                qualityDate: '',
                productData: '',
                purchaseNum: '',
                inRepositoryNum: '',
                itemRepositoryNum: '',
                unit: ''
            }]
        }
    },
    computed:{},
    methods:{
        unitTatalEvent (data){
            data.row.itemRepositoryNum = data.row.itemRepositoryNum.replace(/[^\d\.]/g, '')
        },
        rukuBtnEvent(){
            this.dialogVisible = true
        }
    },
    created(){},
    mounted(){

    }
}
</script>
<style scoped>
    .wrap{
        border: 1px solid #E4E7ED;
    }
    .title{
        height: 32px;
        line-height: 32px;
        color: #ffffff;
        font-weight: 600;
        padding-left: 10px;
        width: 150px;
        background: #efa738;
        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;
    }
    .title_wrap{
        height: 49px;
        border-bottom: 1px solid #E4E7ED;
        padding-top: 8px;
        position: relative;
    }
    .btn_wrap{
        height: 66px;
        padding: 10px;
    }
    .el_icon{
        display: inline-block;
        position: absolute;
        right: 20px;
        top: 20px;
        cursor: pointer;
    }
    .banner{
        height: 40px;
        background: #f5f5f5;
        line-height: 40px;
        color: #606266;
        font-weight: 600;
        padding-left: 10px;
    }
    .table_wrap{
        padding: 10px;
    }
    .table_bottom_form{
        padding: 10px;
    }
    .table_bottom{
        padding-left: 10px;
    }
    .title_data{
        margin-right: 30px;
    }
</style>
