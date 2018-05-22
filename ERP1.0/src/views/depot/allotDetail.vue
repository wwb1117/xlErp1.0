<template>
    <div>
        <div class="model_topcol">
            <span class="blue">调拨单</span><span> - 详情</span>
            <div>
                <el-button size="small">打印</el-button>
            </div>
        </div>
        <div class="model_content" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <div class="tab_content">
                <div class="tab_title fontWe_600">
                    <span class="title_states">待{{$route.params.type}}</span>
                    <div>
                        <span class="title_title">{{$route.params.type}}仓库 : </span>
                        <span class="title_data">杭州仓库</span>
                    </div>
                    <div>
                        <span class="title_title">{{$route.params.type}}单号 : </span>
                        <span class="title_data">OUT-20180411-164612</span>
                    </div>
                    <div>
                        <span class="title_title">{{$route.params.type}}时间 : </span>
                        <span class="title_data">2018-05-18 16:34</span>
                    </div>
                    <div>
                        <span class="title_title">制单人 : </span>
                        <span class="title_data">产品人</span>
                    </div>
                </div>
                <div class="banner">
                    商品信息
                </div>
                <div class="table_wrap" :style="{height: $store.state.home.modelContentHeight - 125 + 'px'}">
                    <el-table
                        :data="goodsInfoData"
                        show-summary
                        border
                        :summary-method="getSummaries"
                        style="width: 100%;">
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
                            label="商品名称">
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
                            label="数量">
                        </el-table-column>
                        <el-table-column

                            prop="unit"
                            label="单位">
                        </el-table-column>
                        <el-table-column
                            prop="remark"
                            label="备注">
                        </el-table-column>
                    </el-table>
                    <div class="table_bottom">
                        <div class="table_bottom_item" :style="{marginBottom :'10px'}">
                            <span class="table_bottom_title">调入单位 : </span>
                            <span :style="{marginRight :'50px'}">联星贸易</span>
                            <span class="table_bottom_title">调出单位 : </span>
                            <span>妈妈去哪儿</span>
                        </div>
                        <div class="table_bottom_item">
                            <span class="table_bottom_title">{{$route.params.type}}备注 : </span>
                            <span>暂无</span>
                        </div>
                        <div class="table_bottom_item">
                            <span class="table_bottom_title">经办人 : </span>
                            <span>浩克</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            goodsInfoData: [
                {
                    selfNum: 's454645464',
                    barCode: '',
                    goodName: '这和商品',
                    SKU: '',
                    qualityDate: '',
                    productData: '',
                    purchaseNum: '',
                    unit: '',
                    remark: 'sdasdsadas'
                }
            ]
        }
    },
    computed:{},
    methods:{
        // 表格合计计算
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];

            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));

                if (!values.every(value => isNaN(value))) {
                    sums[7] = values.reduce((prev, curr) => {
                        let value = Number(curr);

                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);

                } else {
                    sums[index] = '';
                }
            })
            return sums;
        }
    }
}
</script>

<style scoped>
    .model_topcol .blue {
        color: #409eff;
    }
    .tab_title{
        height: 65px;
        line-height: 65px;
        font-size: 14px;
        background: #FFFFFF;
        font-weight: bold;
        display: flex;
        justify-content: space-around;
    }
    .title_states{
        color: #f66c6b;
        font-size: 16px;
    }
    .title_title{
        color: #909399;
    }
    .title_data{
        color: #666;
    }
    .banner{
        height: 45px;
        font: 14px/45px "Microsoft YaHei";
        font-weight: bold;
        text-indent: 10px;
    }
    .table_wrap{
        padding: 10px;
        background: #FFFFFF;
    }
    .table_bottom{
        padding: 15px 0 0 10px;
    }
    .table_bottom_item{
        line-height: 28px;
        font-weight: bold;
        color: #606266;
    }
    .table_bottom_title{
        color: #909399;
    }

</style>
