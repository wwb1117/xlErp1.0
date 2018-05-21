<template>
    <section class="nav" id='k_'>
        <div style="width:100%" class="navdiv" >
            <el-tabs v-model="activeName">
                <!-- @tab-click="handleClick"  -->
                <el-tab-pane label="实物类商品" name="first" >
                    <first></first>
                </el-tab-pane>
                <el-tab-pane label="服务类商品" name="second">
                    <second></second>
                </el-tab-pane>
                <el-tab-pane label="赠 品" name="third">
                    <third></third>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div>
            <el-button size="small">导出商品</el-button>
            <el-button type="primary" size="small" @click='add'>新增商品</el-button>
        </div>
    </section>
</template>
<script>
import first from "views/goods/list/first";
import second from "views/goods/list/second";
import third from "views/goods/list/third";


export default {
    name: "goods",
    data() {
        return {
            activeName: 'first'
        };
    },
    components: {
        first,
        second,
        third
    },
    methods: {
        // handleClick(tab,event) {
        // }
        add() {
            this.$router.push('addGoods')
        }
    }
}
</script>
<style>
#k_ {
    display: flex;
    justify-content: space-between;
    position: relative;
}
#k_>div:nth-child(2){
    position: absolute;
    right: 10px;
    top:8px
}
#k_ .navdiv .el-tabs__nav{
    height: 46px;
    line-height: 46px;
}
#k_ .navdiv .el-tabs__header{
    margin: 0;
}
#k_ .navdiv .el-tabs__nav-wrap{
    padding-left: 30px
}
#k_ .navdiv .el-tabs__nav-wrap::after {
    height: 1px;
}
</style>

