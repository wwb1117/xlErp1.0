<template>
    <section :style="{height: $store.state.home.modelContentHeight + 'px'}">
        <!-- 顶部 -->
        <header class="authority_top">
            <p class='authority_title'>权限管理</p>
        </header>
        <section class="authority_conent" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <div class="authority_box" :style="{height: $store.state.home.modelContentHeight-20 + 'px'}">
                <div class="box_title">系统按钮</div>
                <div style="display:flex">
                    <div class="small_title">权限组名</div>
                    <div>
                        <p class="small_name">库管</p>
                        <el-tree
                            :data="item"
                            show-checkbox
                            node-key="id"
                            :props="defaultProps"
                            :default-expanded-keys="[31, 32]">
                        </el-tree>
                    </div>
                </div>
            </div>
        </section>
        <footer class="authority_bottom">
            <el-button type="primary" size='small' style="margin:10px 0 0 30px">保存</el-button>
            <el-button size='small' style="margin:10px 0 0 10px">取消</el-button>
        </footer>
    </section>
</template>
<script>
export default {
    data() {
        return {
            item: [
                {
                    id: 1,
                    label: '权限设置（全选）',
                    children: [
                        {
                            id: 21,
                            label: '商品'
                        },
                        {
                            id: 22,
                            label: '采购',
                            children: [
                                {
                                    id: 31,
                                    label: '采购列表',
                                    children: [
                                        {
                                            id: 41,
                                            label: '导入'
                                        },
                                        {
                                            id: 42,
                                            label: '新建'
                                        },
                                        {
                                            id: 43,
                                            label: '删除'
                                        },
                                        {
                                            id: 44,
                                            label: '修改'
                                        },
                                        {
                                            id: 45,
                                            label: '查看'
                                        },
                                        {
                                            id: 46,
                                            label: '入库'
                                        }
                                    ]
                                },
                                {
                                    id: 32,
                                    label: '采购退货列表',
                                    children: [
                                        {
                                            id: 47,
                                            label: '导入'
                                        },
                                        {
                                            id: 48,
                                            label: '新建'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 23,
                            label: '仓储'
                        },
                        {
                            id: 24,
                            label: '审批'
                        },
                        {
                            id: 25,
                            label: '系统'
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };
    }
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
.box_title{
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    font-weight: 600;
    border-bottom: 1px solid #e5e8e8;
    background: #f5f5f5
}
.small_title{
    height: 40px;
    line-height: 40px;
    padding:0 20px;
    margin-top:15px;
}
.small_name{
    height: 40px;
    line-height: 40px;
    padding:0 20px;
    margin-top:15px;
    font-size: 15px;
    font-weight: 600

}
/* 底部 */
.authority_bottom{
    border-top:1px solid #e5e8e8;
    position: relative;

    background: white;
}
</style>
