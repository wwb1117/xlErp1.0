<template>
    <div>
         <div class="model_topcol">
            <span style="color: #409EFF">采购单</span>
            <span> - 新增采购单</span>
        </div>
        <div class="head color_gray">
            选择商品
            <i style="float: right; line-height: 60px" class="el-icon-close"></i>
        </div>
        <div class="banner">
            <el-form :inline="true" :model="tableParam" label-position="right" size="small" label-width="80px">
                <el-form-item label="商品分类">
                    <el-select v-model="tableParam.categoryName" placeholder="请输入商品分类">
                        <el-option v-for="item in goodsItemSelectData" :key="item.id" :label="item.categoryName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input
                        size="small"
                        placeholder="请输入采购单号/供应商名称/采购单位"
                        prefix-icon="el-icon-search"
                        :style="{width: '378px'}"
                        v-model="tableParam.serchText">
                    </el-input>
                    <el-button :style="{margin: '0 10px'}" type="primary" size="small">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="content">
            <el-table
            :height="$store.state.home.modelContentHeight - 136"
            @selection-change="tableChangeEvent"
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
                        <img src="static/img/purchase/test.png" style="float: left;">
                        <span class="color_blue" v-text="scope.row.title"></span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="itemCode"
                    label="编号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="barCode"
                    label="条码">
                </el-table-column>
                <el-table-column
                    prop="size_sku"
                    label="规格-SKU">
                    <template slot-scope="scope">
                        <el-popover
                        placement="bottom"
                        width="240"
                        popper-class="goods_popover"
                        trigger="click"
                        >
                        <el-select
                            v-model="value11"
                            @change="skuSelectChange"
                            multiple
                            size="small"
                            collapse-tags
                            placeholder="请选择规格">
                            <el-option
                            v-for="item in SKUSelectData"
                            :key="item.id"
                            :label="item.skuPropertieyNames"
                            :value="item.id">
                            </el-option>
                        </el-select>
                        <span @click="getPopoverData(scope.row.id)" slot="reference" class="color_blue myCur">查看</span>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="expirationDate"
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
                    prop="unit"
                    label="单位">
                </el-table-column>
            </el-table>
        </div>
        <div class="model_footer">
            <el-button style="width: 90px" type="primary" size="small">确定</el-button>
            <el-button style="width: 90px" size="small">取消</el-button>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="tableParam.pageNo"
                :page-sizes="[10, 30, 50, 100]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalPage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import api from 'api/purchase'
export default {
    data(){
        return {
            value11: [],
            totalPage: 1,
            goodsItemSelectData: [],
            SKUSelectData: [
                {
                    value: '1',
                    label: '黄金糕'
                },
                {
                    value: '2',
                    label: '双皮奶'
                }

            ],
            tableParam: {
                serchText: '',
                pageSize: 10,
                pageNo: 1,
                mainImg: '',
                title: '',
                itemCode: '',
                categoryName: '',
                brandName: '',
                barCode: ''
            },
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
        handleCurrentChange(val){
            this.tableParam.pageNo = val
        },
        handleSizeChange(val){
            this.tableParam.pageSize = val
        },
        mountFormat(data){
            data.row.mount = data.row.mount.replace(/[^\d\.]/g, '')
        },
        getTableData(){
            return api.getChooseGoodsList(this.tableParam).then((response) => {
                this.totalPage = response.data.total
                this.tableData = response.data.list
            })
        },
        getGoodsItemSelect(){
            var param = {
                pageNo: 1,
                pageSize: 1000
            }

            api.getGoodSItemSelectData(param).then((response) => {
                this.goodsItemSelectData = response.data.list
            })
        },
        skuSelectChange(val){
            console.log(val)
        },
        getPopoverData(itemid){
            var param = {
                itemId: itemid,
                skuProperties: ''
            }

            api.getSKUData(param).then((response) => {
                this.SKUSelectData = response.data.list
            })
        },
        tableChangeEvent(val){
            console.log(val)
        }
    },
    activated(){
        this.getTableData()
        this.getGoodsItemSelect()
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
    padding-top: 0;
}
</style>
