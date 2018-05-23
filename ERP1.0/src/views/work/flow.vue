<template>
    <section :style="{height: $store.state.home.modelContentHeight + 'px'}">
        <!-- 顶部 -->
        <header class="flow_top">
            <p class='flow_title'>流程配置</p>
            <el-button type="primary" size='small' style="height:30px;margin-top:-3px">新增</el-button>
        </header>
        <section class="flow_conent" :style="{height: $store.state.home.modelContentHeight+54 + 'px'}">
            <div class="flow_box" :style="{height: $store.state.home.modelContentHeight-8 + 'px'}">

            </div>
        </section>
    </section>
</template>
<script>
export default {

}
</script>
<style scoped>
/* 顶部 */
.flow_top{
    display: flex;
    justify-content: space-between;
    height: 46px;
    padding: 10px;
    border-bottom: 1px solid #e5e8e8
}
.flow_title{
    height: 25px;
    line-height: 25px;
    margin-left: 20px;
    font-size: 15px;
    color: #5e6161
}
.flow_top .el-input{
    width: 40%;
}
/* 内容 */
.flow_conent{
    padding: 10px;
    background: #f5f5f5
}
.flow_box{
    border: 1px solid #e6e9eb;
    color: #5e6161;
    background: white
}
</style>
