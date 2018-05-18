<template>
    <section :style="{height: $store.state.home.modelContentHeight + 'px'}">
        <!-- 顶部 -->
        <header class="items_top">
            <p class='items_title'>商品分类</p>
            <el-button type="primary" @click="dialogFormVisible = true" size='small' style="height:30px;margin-top:-3px">新增表单</el-button>
            <!-- 新增表单内容 -->
            <el-dialog title="新增分类" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="分类名称" required :label-width="formLabelWidth">
                        <el-input v-model="form.name" type='text' suffix-text='0/15'></el-input>
                    </el-form-item>
                    <el-form-item label="分类图片" :label-width="formLabelWidth">
                        <el-upload
                            action=""
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <!-- action上传地址 -->
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="排序" required :label-width="formLabelWidth">
                        <el-input v-model="form.name" placeholder="数值越大越靠前"></el-input>
                    </el-form-item>
                    <el-form-item label="是否显示" required :label-width="formLabelWidth">
                        <el-switch
                            v-model="value2"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false" size='medium'>取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false" size='medium'>保 存</el-button>
                </div>
            </el-dialog>
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
        <footer class="item_footer">
            <div class="block">
                <el-pagination
                    :current-page="currentPage4"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                </el-pagination>
                <!-- @size-change="handleSizeChange"
                @current-change="handleCurrentChange" -->
            </div>
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
            value2: true,
            currentPage4: 1,
            // 新增
            msg: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            dialogFormVisible: false,
            formLabelWidth: '120px',
            // 上传
            dialogImageUrl: '',
            dialogVisible: false
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
        },
        // 上传
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
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
/* 底部分页 */
.item_footer{
    border-top:1px solid #e5e8e8;
    position: relative;
}
.item_footer .block{
    position: absolute;
    right: 30px;
}
/* 弹出框 */
.items_top .el-input{
    width: 40%;
}

</style>
