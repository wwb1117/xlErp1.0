<template>
    <section :style="{height: $store.state.home.modelContentHeight + 'px'}">
        <!-- 顶部 -->
        <header class="spec_top">
            <p class='spec_title'>商品规格</p>
            <el-button type="primary" size='small' style="height:30px;margin-top:-3px" @click='openAddspec'>新增规格</el-button>
        </header>
        <section class="spec_conent" >
            <div class="spec_box" :style="{height: $store.state.home.modelContentHeight-23 + 'px'}">
                <div class='box_top'>
                     <el-input
                        size="small"
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="input">
                    </el-input>
                    <el-button type="primary" size='small' style="margin-left:10px">搜索</el-button>
                </div>
                <ul class="spec_list">
                    <li style="width:210px">规格名称</li>
                    <li style="width:500px">规格值</li>
                    <li style="width:300px">备注</li>
                    <li style="width:110px">操作</li>
                </ul>
                <ul class="spec_list spec_text">
                    <li style="width:210px">尺码</li>
                    <li style="width:500px">sm,xl,l</li>
                    <li style="width:300px">这是备注信息</li>
                    <li style="width:110px">
                        <el-button type='text' @click='gotoEdit'>编辑</el-button>
                        <el-button type="text" @click="del = true">删除</el-button>
                        <el-dialog
                            title="温馨提示"
                            :visible.sync="del"
                            width="30%"
                            :before-close="handleClose">
                            <span>此操作将永久删除该项</span>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="del = false">取 消</el-button>
                                <el-button type="primary" @click="del = false">确 定</el-button>
                            </span>
                        </el-dialog>
                    </li>
                </ul>
            </div>
        </section>
        <footer class="spec_footer">
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

            value1: true,
            value2: true,


            currentPage4: 1,

            input: '',
            // 关联分类
            options: [
                {
                    value: '选项1',
                    label: '黄金糕'
                },
                {
                    value: '选项2',
                    label: '双皮奶'
                },
                {
                    value: '选项3',
                    label: '蚵仔煎'
                },
                {
                    value: '选项4',
                    label: '龙须面'
                },
                {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
            value: '',
            checked: false,
            // 删除
            del: false

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
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        openAddspec() {
            this.$router.push('addSpec')
        },
        gotoEdit() {
            this.$router.push('editSpec')
        }
    }
}
</script>
<style scoped>
/* 顶部 */
.spec_top{
    display: flex;
    justify-content: space-between;
    height: 46px;
    padding: 10px;
    border-bottom: 1px solid #e5e8e8
}
.spec_title{
    height: 25px;
    line-height: 25px;
    margin-left: 20px;
    font-size: 15px;
    color: #5e6161
}
.spec_top .el-input{
    width: 40%;
}
/* 内容 */
.spec_conent{
    padding: 10px;
    background: #f5f5f5
}
.spec_box{
    border: 1px solid #e6e9eb;
    color: #5e6161;
    background: white
}
.box_top{
    display: flex;
    background:white;
    padding: 16px
}
.box_top .el-input{
    width: 35%;
}
.spec_list{
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    padding: 0 40px;
    margin: 0;
    font-weight: 600;
    border-bottom: 1px solid #e5e8e8;
    background: #f5f5f5
}
.spec_text{
    font-weight: 500;
    border-color:  #d6e3ec;
    background: white
}
/* 底部 */
.spec_footer{
    border-top:1px solid #e5e8e8;
    position: relative;
    /* margin-top: -23px; */
    background: white;
    padding: 11px 30px;
}
.spec_footer .block{
    position: absolute;
    right: 30px;
    top:0
}
</style>

