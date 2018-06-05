<template>
    <section :style="{height: $store.state.home.modelContentHeight + 'px'}">
        <!-- 顶部 -->
        <header class="items_top">
            <p class='items_title'>商品分类</p>
            <el-button type="primary" size='small' style="height:30px;margin-top:-3px"  @click="additems">新增分类</el-button>
            <!-- 新增表单内容 -->
            <!-- <el-dialog title="新增分类" :visible.sync="dialogFormVisible">
                <el-form :model="msg">
                    <el-form-item label="分类名称" required :label-width="formLabelWidth">
                        <el-input v-model="msg.name" type='text' suffix-text='0/15' size='small'></el-input>
                    </el-form-item>
                    <el-form-item label="分类图片" :label-width="formLabelWidth">
                        <el-upload
                            action=""
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        action上传地址
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="排序" required :label-width="formLabelWidth">
                        <el-input v-model="msg.name" placeholder="数值越大越靠前"  size='small'></el-input>
                    </el-form-item>
                    <el-form-item label="是否显示" required :label-width="formLabelWidth">
                        <el-switch
                            v-model="value2">
                        </el-switch>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false" size='medium'>取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false" size='medium'>保 存</el-button>
                </div>
            </el-dialog> -->
        </header>
        <!-- 内容 -->
        <section class="item_conent" >
            <ul class="item_box_list">
                <li style="width:540px;">分类名称</li>
                <li style="width:180px;">分类图片</li>
                <li style="width:180px;">是否显示</li>
                <li style="width:110px;">排序</li>
                <li style="width:170px">操作</li>
            </ul>
            <div class="item_box" :style="{height: $store.state.home.modelContentHeight-63 + 'px'}">
                <el-tree
                    :data="items"
                    show-checkbox
                    default-expand-all
                    :props="defaultProps"
                    :expand-on-click-node="false">
                    <ul class="item_box_conent"  slot-scope="{ node, data }" >
                        <li >
                            <el-button type='text' @click="editconfim">编辑</el-button>
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
                        <li>{{ data.sort }}</li>
                        <li >
                            <el-switch
                                v-model="data.isDisplay">
                            </el-switch>
                        </li>
                        <li>
                            <div style='width:28px;height:28px;background:black;margin-top:6px'></div>
                            <!-- <img :src="date.categoryImg" alt=""> -->
                        </li>
                        <li>{{ data.categoryName }}</li>
                    </ul>
                </el-tree>
            </div>
        </section>
        <!-- 分页 -->
        <footer class="item_footer">
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 30, 50, 100]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalPage">
                </el-pagination>
            </div>
        </footer>
    </section>
</template>
<script>
import api from 'api/goods'

export default {
    data() {
        return {
            currentPage: 2,
            totalPage: 1,
            items:[],
            // 新增
            del: false,
            defaultProps: {
                children: 'itemCategories',
                label: 'categoryName'
            }

        }
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },

        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            console.log(this.items)
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        editconfim() {
            this.$router.push('edititems')
        },
        additems() {
            this.$router.push('additems')
        },

        get() {
            api.getcategorylist().then((response)=>{
                // console.log(response.data.list)
                this.items = response.data.list


            }).catch((error)=>{
                console.log(error)
            })
        }
    },
    created(){
        // console.log(this.form)
        this.get()

    }
    // activated() {
    //     this.get()
    // }

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
    color: #5e6161;
    background: white
}
/* .item_box ul{
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin: 0;
} */

/* 底部分页 */
.item_footer{
    border-top:1px solid #e5e8e8;
    position: relative;
    /* margin-top: -23px; */
    background: white;
    padding: 11px 30px;
}
.item_footer .block{
    position: absolute;
    right: 30px;
    top:0
}
/* 弹出框 */
.items_top .el-input{
    width: 40%;
}
.item_box {
    overflow: auto;
}
.item_box_list{
    display: flex;
    justify-content: space-between;
    /* padding: 0 30px; */
    padding: 0 30px 0  50px;
    height: 40px;
    background: #f5f5f5;
    font-weight: 600;
    font-size: 14px;
    line-height: 40px;
    margin: 0;
    border: 1px solid #e6e9eb;
    border-bottom: none
}
.item_box_conent{
    padding: 0 20px;
}
.item_box_conent{
    width: 100%;
    margin: 0;
    height: 40px;
    line-height: 40px
}
.item_box_conent li{
    float: right;
}
.item_box_conent li:nth-child(1){
    margin-right: 90px
}
.item_box_conent li:nth-child(2){
    width: 20px;
    margin-right: 190px
}
.item_box_conent li:nth-child(3){
    margin-right: 250px
}
.item_box_conent li:nth-child(4){
    margin-right: 250px
}
.item_box_conent li:nth-child(5){
    float: left;
}
@media only screen and (max-width: 1850px) {
    .item_box_conent li:nth-child(2){
        width: 20px;
        margin-right: 170px
    }
    .item_box_conent li:nth-child(3){
        margin-right: 230px
    }
    .item_box_conent li:nth-child(4){
        margin-right: 230px
    }
}
@media only screen and (max-width: 1700px) {
    .item_box_conent li:nth-child(2){
        width: 20px;
        margin-right: 120px
    }
    .item_box_conent li:nth-child(3){
        margin-right: 170px
    }
    .item_box_conent li:nth-child(4){
        margin-right: 180px
    }
}
@media only screen and (max-width: 1400px) {
    .item_box_conent li:nth-child(2){
        width: 20px;
        margin-right: 50px
    }
    .item_box_conent li:nth-child(3){
        margin-right: 130px
    }
    .item_box_conent li:nth-child(4){
        margin-right: 130px
    }
}

</style>
