<template>
    <section :style="{height: $store.state.home.modelContentHeight + 'px'}">
        <header class="brand_top">
            <p class='brand_title'>商品分类</p>
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
        <section></section>
        <footer class="brand_footer">
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
.brand_top{
    display: flex;
    justify-content: space-between;
    height: 46px;
    padding: 10px;
    border-bottom: 1px solid #e5e8e8
}
.brand_title{
    height: 25px;
    line-height: 25px;
    margin-left: 20px;
    font-size: 15px;
    color: #5e6161
}
/* 底部分页 */
.brand_footer{
    border-top:1px solid #e5e8e8;
    position: relative;
}
.brand_footer .block{
    position: absolute;
    right: 30px;
}
/* 弹出框 */
.brand_top .el-input{
    width: 40%;
}

</style>
