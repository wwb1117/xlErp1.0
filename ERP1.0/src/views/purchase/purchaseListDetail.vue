<template>
    <div id="purchaseDetail_wrap">
        <div class="tab_wrap">
            <el-tabs v-model="tabActive" @tab-click="tabHandleClick">
                <el-tab-pane class="model_content" :style="{height: $store.state.home.modelContentHeight + 'px'}" label="采购单详情" name="detail">
                    <div class="tab_content">
                        <div class="tab_title fontWe_600">
                            <span class="title_states">待入库</span>
                            <span style="margin-left: 70px" class="title_title">采购单号 : </span>
                            <span class="title_data">456655222222222222522</span>
                            <span class="title_title">供应商 : </span>
                            <span class="title_data">杭州苏雅诗贸易有限公司</span>
                            <span class="title_title">采购单位 : </span>
                            <span class="title_data">妈妈去哪儿</span>
                            <span class="title_title">入库仓库 : </span>
                            <span class="title_data">默认仓库</span>
                            <span class="title_title">采购时间 : </span>
                            <span class="title_data">2018-05-18 16:34</span>
                        </div>
                        <div class="banner">
                            商品信息
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane class="model_content" :style="{height: $store.state.home.modelContentHeight + 'px'}" label="入库记录" name="inrepos">
                    入库记录
                </el-tab-pane>
            </el-tabs>
            <div style="position: absolute; right: 10px; top: 7px">
                <el-button size="small" style="width: 90px">导出</el-button>
                <el-button size="small" style="width: 90px">编辑</el-button>
                <el-button size="small" style="width: 90px">删除</el-button>
                <el-button size="small" style="width: 90px">打印</el-button>
                <el-button size="small" type="primary" style="width: 90px">入库</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tabActive: 'detail'
        }
    },
    computed:{},
    methods:{
        tabHandleClick(tab){
            console.log(tab)
        }
    },
    created(){},
    mounted(){}
}
</script>
<style scoped>
.tab_title{
    height: 65px;
    line-height: 65px;
    padding-left: 20px;
    font-size: 15px;
}
.tab_title span{
    display: inline-block;
}
.title_states{
    color: #ec706b;
    font-size: 18px;
}
.tab_content{
    background: #ffffff;
    height: 100%;
}
.title_title{
    color: #929597;
}
.title_data{
    color: #5f6264;
    margin-right: 40px;
}
.banner{
    background: #f5f5f5;
    height: 40px;
    line-height: 40px;

}
</style>
