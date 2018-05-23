<template>
    <section :style="{height: $store.state.home.modelContentHeight + 'px'}">
        <!-- 顶部 -->
        <header class="authority_top">
            <p class='authority_title'>权限管理</p>
        </header>
        <section class="authority_conent" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <div class="authority_box" :style="{height: $store.state.home.modelContentHeight-20 + 'px'}">

            </div>
        </section>
        <footer class="authority_bottom">
            <el-button type="primary" size='small' style="margin:10px 0 0 30px">完成</el-button>
        </footer>
    </section>
</template>
<script>
export default {

}
</script>
<style scoped>
/* 顶部 */
.authority_top{
    display: flex;
    justify-content: space-between;
    height: 46px;
    padding: 10px;
    border-bottom: 1px solid #e5e8e8
}
.authority_title{
    height: 25px;
    line-height: 25px;
    margin-left: 20px;
    font-size: 15px;
    color: #5e6161
}

/* 内容 */
.authority_conent{
    padding: 10px;
    background: #f5f5f5
}
.authority_box{
    border: 1px solid #e6e9eb;
    color: #5e6161;
    background: white
}
/* 底部 */
.authority_bottom{
    border-top:1px solid #e5e8e8;
    position: relative;

    background: white;
}
</style>
