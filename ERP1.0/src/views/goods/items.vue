<template>
    <section :style="{height: $store.state.home.modelContentHeight + 'px'}">
        <!-- 顶部 -->
        <header class="items_top">
            <p class='items_title'>商品分类</p>
            <el-button type="primary" size='small' style="height:30px;margin-top:-2px">新增分类</el-button>
        </header>
        <!-- 内容 -->
        <section class="item_conent" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <div class="item_box">
                <ul class="item_box_list">
                    <li style="width:540px;text-indent:15px">分类名称</li>
                    <li style="width:180px;text-indent:12px">分类图片</li>
                    <li style="width:180px;text-indent:9px">是否显示</li>
                    <li style="width:110px;text-indent:9px">排序</li>
                    <li style="width:170px;text-indent:9px">操作</li>
                </ul>
                <el-tree
                    :data="form"
                    :props="defaultProps"
                    default-expand-all
                    :expand-on-click-node="false"
                    :render-content="renderContent">
                </el-tree>

            </div>
        </section>
        <!-- 分页 -->
        <footer>

        </footer>
    </section>
</template>
<script>
export default {
    data() {
        return {
            form: [
                {
                    label: '一级 1',
                    children: [
                        {
                            label: '二级 1-1',
                            children: [
                                {
                                    label: '三级 1-1-1'
                                },
                                {
                                    label: '三级 1-1-2'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '一级 2',
                    children: [
                        {
                            label: '二级 2-1'
                        },
                        {
                            label: '二级 2-2'
                        }
                    ]
                },
                {
                    label: '一级 3',
                    children: [
                        {
                            label: '二级 3-1'
                        },
                        {
                            label: '二级 3-2'
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            name: '124',
            value1: true,
            value2: true
        }
    },
    methods: {
        renderContent(h, { node, data, store }) {
            let that = this;

            // <Image v-model=''></Image>
            return (
                <ul class="item_box_conent">
                    <li style="width:540px">{that.name}</li>
                    <li style="width:180px;">
                        <div style='width:28px;height:28px;background:black;margin-top:6px'></div>
                    </li>
                    <li style="width:180px">
                        <el-switch
                            v-model="value2"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </li>
                    <li style="width:110px">12</li>
                    <li style="width:170px">操作</li>
                </ul>
            )
        }
    }

}
</script>
<style scoped>
/* 顶部 */
.items_top{
    display: flex;
    justify-content: space-between;
    height: 46px;
    padding: 10px;
    border-bottom: 1px solid #e5e8e8
}
.items_title{
    height: 25px;
    line-height: 25px;
    margin-left: 20px;
    font-size: 15px;
    color: #5e6161
}
/* 内容 */
.item_conent{
    padding: 10px;
    background: #f5f5f5
}
.item_box{
    border: 1px solid #e6e9eb;
    color: #5e6161
}
.item_box ul{
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin: 0;
}
.item_box_list{
    height: 40px;
    background: #f5f5f5;
    font-weight: 600;
    font-size: 15px;
    line-height: 40px
}
.item_box .item_box_conent{
    display: flex
}
</style>
