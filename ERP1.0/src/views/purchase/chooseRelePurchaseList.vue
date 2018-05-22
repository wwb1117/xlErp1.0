<template>
    <div>
         <div class="model_topcol">
            <span style="color: #409EFF">采购退货</span>
            <span> - 新增退货单</span>
        </div>
        <div class="head color_gray">
            选择关联采购单
            <i style="float: right; line-height: 60px" class="el-icon-close"></i>
        </div>
        <div class="banner">
            <el-form :inline="true" :model="searchData" label-position="right" size="small" label-width="80px">
                <el-form-item>
                    <el-input
                        size="small"
                        placeholder="请输入采购单号"
                        prefix-icon="el-icon-search"
                        :style="{width: '378px', marginLeft: '17px'}"
                        v-model="serchText">
                    </el-input>
                    <el-button :style="{margin: '0 10px'}" type="primary" size="small">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="content" :style="{height: $store.state.home.modelContentHeight - 126 + 'px'}">
            <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="good"
                    label="商品"
                    width="280">
                    <template slot-scope="scope">
                        <img :src="scope.row.good.img" style="float: left;">
                        <span class="color_blue" v-text="scope.row.good.text"></span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="num"
                    label="编号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="barcode"
                    label="条码">
                </el-table-column>
                <el-table-column
                    prop="size_sku"
                    label="规格-SKU">
                </el-table-column>
                <el-table-column
                    prop="qualityDate"
                    label="保质期">
                </el-table-column>
                <el-table-column
                    prop="mount"
                    width="90"
                    label="数量">
                    <template slot-scope="scope">
                        <el-input @change.native="mountFormat(scope)" @keyup.native="mountFormat(scope)" v-model="scope.row.mount" size="small"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="单位">
                </el-table-column>
            </el-table>
        </div>
        <div class="model_footer">
            <el-button @click="saveBtnEvent" style="width: 90px" type="primary" size="small">确定</el-button>
            <el-button @click="canselBtnEvent" style="width: 90px" size="small">取消</el-button>
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
            searchData: {
                goodsType: '',
                serchText: ''
            },
            currentPage: 2,
            tableData: [
                {
                    good: {
                        img: 'static/img/purchase/test.png',
                        text: '再牛逼的肖邦也弹不出老子的忧伤'
                    },
                    num : '85211414',
                    barcode: 'WSSS',
                    size_sku: '2018年1月',
                    qualityDate: '24',
                    mount: '1',
                    unit: '罐'
                },
                {
                    good: {
                        img: 'static/img/purchase/test.png',
                        text: '情缘为你画地为牢'
                    },
                    num : '456522555',
                    barcode: 'SSSs22',
                    size_sku: '2018年1月',
                    qualityDate: '24',
                    mount: '1',
                    unit: '罐'
                }
            ]
        }
    },
    computed:{},
    methods:{
        mountFormat(data){
            data.row.mount = data.row.mount.replace(/[^\d\.]/g, '')
        },
        handleSizeChange(){

        },
        handleCurrentChange(){

        },
        saveBtnEvent(){

        }


    },
    created(){},
    mounted(){}
}
</script>
<style scoped>
.head{
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    padding: 0 20px;
}
.banner{
    height: 56px;
    background: #f5f5f5;
    padding-top: 11px;
}
.model_footer{
    text-align: left;
    padding-top: 11px;
    padding-left: 20px;
}
.content{
    padding: 10px;
}
.el-table{
    border: 1px solid #E4E7ED;
}
.el-pagination{
    float: right;
}
</style>
