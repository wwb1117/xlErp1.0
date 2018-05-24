<template>
    <section :style="{height: $store.state.home.modelContentHeight + 'px'}">
        <!-- 顶部 -->
        <header class="configuration_top">
            <p class='configuration_title'>权限管理</p>
        </header>
        <section class="configuration_conent" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <div class="configuration_box" :style="{height: $store.state.home.modelContentHeight-20 + 'px'}">
                <div class="box_title">采购订单</div>
                <div class="add_box" v-for="(item,index) in num" :key="index">
                    <el-button icon="el-icon-plus" circle @click='addbox'></el-button>
                    <el-select
                        v-model="namelist"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        size='small'
                        style="width:388px;margin-left:20px">
                        <el-option
                            v-for="item in name"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </section>
        <footer class="configuration_bottom">
            <el-button type="primary" size='small' style="margin:10px 0 0 30px">保存</el-button>
            <el-button  size='small' style="margin:10px 0 0 10px">取消</el-button>
        </footer>
    </section>
</template>
<script>
export default {
    name: 'configuration',
    data() {
        return {
            name: [
                {
                    value: 'HTML',
                    label: 'HTML'
                },
                {
                    value: 'CSS',
                    label: 'CSS'
                },
                {
                    value: 'JavaScript',
                    label: 'JavaScript'
                }
            ],
            namelist: [],
            num: ['1', '1']
        }
    },
    methods: {
        addbox() {
            this.num.push('1')
        }
    }
}
</script>
<style scoped>
/* 顶部 */
.configuration_top{
    display: flex;
    justify-content: space-between;
    height: 46px;
    padding: 10px;
    border-bottom: 1px solid #e5e8e8
}
.configuration_title{
    height: 25px;
    line-height: 25px;
    margin-left: 20px;
    font-size: 15px;
    color: #5e6161
}

/* 内容 */
.configuration_conent{
    padding: 10px;
    background: #f5f5f5
}
.configuration_box{
    border: 1px solid #e6e9eb;
    color: #5e6161;
    background: white
}
.box_title{
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    font-weight: 600;
    border-bottom: 1px solid #e5e8e8;
    background: #f5f5f5
}
.add_box{
    padding: 20px
}


/* 底部 */
.configuration_bottom{
    border-top:1px solid #e5e8e8;
    position: relative;

    background: white;
}
</style>
