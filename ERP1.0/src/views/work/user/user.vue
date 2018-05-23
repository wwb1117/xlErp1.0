<template>
    <section :style="{height: $store.state.home.modelContentHeight + 'px'}">
        <!-- 顶部 -->
        <header class="user_top">
             <el-tabs v-model="activeName" >
                <el-tab-pane label="用户列表" name="first">
                    <userlist></userlist>
                </el-tab-pane>
                <el-tab-pane label="权限组" name="second">
                    <autohority></autohority>
                </el-tab-pane>
            </el-tabs>
            <el-button type='primary' size='small'>新增用户</el-button>
        </header>

    </section>
</template>
<script>
import userlist from 'views/work/user/userList'
import autohority from 'views/work/user/authorityList'

export default {
    name: 'user',
    data() {
        return {
            activeName: 'first'
        }
    },
    methods: {

    },
    components: {
        userlist,
        autohority
    }
}
</script>
<style scoped>
/* 顶部 */
.user_top{
    display: flex;
    justify-content: space-between;
    height: 46px;
    padding: 8px 10px;
    border-bottom: 1px solid #e5e8e8
}
.user_title{
    height: 25px;
    line-height: 25px;
    margin-left: 20px;
    font-size: 15px;
    color: #5e6161
}


</style>
