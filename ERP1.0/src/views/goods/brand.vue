<template>
    <section :style="{height: $store.state.home.modelContentHeight + 'px'}">
        <!-- 顶部 -->
        <header class="brand_top">
            <p class='brand_title'>商品品牌</p>
            <el-button type="primary" @click="dialogFormVisible = true" size='small' style="height:32px;margin-top:-3px">新增品牌</el-button>
            <!-- 新增表单内容 -->
            <el-dialog title="新增品牌" :visible.sync="dialogFormVisible">
                <el-form :model="msg">
                    <el-form-item label="品牌名称" required :label-width="formLabelWidth">
                        <el-input v-model="msg.name" type='text' suffix-text='0/15'  size='small'></el-input>
                    </el-form-item>
                    <el-form-item label="关联分类" required :label-width="formLabelWidth">
                        <el-select v-model="value" placeholder="请选择"  size='small' style="width:320px">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="品牌LOGO" :label-width="formLabelWidth">
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
                        <el-input v-model="msg.name" placeholder="数值越大越靠前"  size='small' ></el-input>
                    </el-form-item>
                    <el-form-item  label="控货品牌" :label-width="formLabelWidth">
                        <el-checkbox v-model="checked">勾选为控货品牌</el-checkbox>
                    </el-form-item>
                    <el-form-item label="是否推荐" required :label-width="formLabelWidth">
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
        <section class="brand_conent" >
            <div class="brand_box" :style="{height: $store.state.home.modelContentHeight-23 + 'px'}">
                <div class='box_top'>
                     <el-input
                        size="small"
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="input">
                    </el-input>
                    <el-button type="primary" size='small' style="margin-left:10px">搜索</el-button>
                </div>
                <ul class="brand_list">
                    <li style="width:200px">品牌名称</li>
                    <li style="width:170px">分类</li>
                    <li style="width:150px">技术服务费率</li>
                    <li style="width:190px">品牌LOGO</li>
                    <li style="width:180px">是否推荐</li>
                    <li style="width:110px">排序</li>
                    <li style="width:130px">操作</li>
                </ul>
                <ul class="brand_list brand_text" v-for='(item,index) in this.brand' :key='index'>
                    <li style="width:200px">{{item.brandName}}</li>
                    <li style="width:170px"><span v-for="(date,index) in item.itemBrandCategories" :key='index' style="margin-right:5px">{{date.categoryName}}</span></li>
                    <li style="width:150px">40%</li>
                    <li style="width:190px" class="brand_list_img">
                        <img :src="item.brandImg" alt="">
                    </li>
                    <li style="width:180px">
                        <el-switch
                            v-model="item.isRecommended"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </li>
                    <li style="width:110px">{{item.sort}}</li>
                    <li style="width:130px">
                        <el-button type='text'>编辑</el-button>
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
        <footer class="brand_footer">
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
            dialogVisible: false,
            value2: true,
            // 分页
            currentPage: 2,
            totalPage: 1,
            // 搜索
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
            del: false,
            page: {
                pageNo: 1,
                pageSize: 10,
                brandName: '天使芬'
            },

            brand: []
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
        handleSizeChange(val) {
            this.page.pageSize = val
        },
        handleCurrentChange(val) {
            this.page.pageNo = val
        },
        get() {

            api.getitemitemBrandlist(this.page).then((response)=>{
                // console.log(response.data)
                this.brand = response.data.itemVOs
            }).catch((error)=>{

                console.log(error)

            })
        }
    },
    created(){
        // console.log(this.form)
        this.get()

    },
    activated() {
        this.get()
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
.brand_top .el-input{
    width: 40%;
}
/* 内容 */
.brand_conent{
    padding: 10px;
    background: #f5f5f5
}
.brand_box{
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
.brand_list{
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
.brand_text{
    font-weight: 500;
    border-color:  #d6e3ec;
    background: white
}
/* 底部 */
.brand_footer{
    border-top:1px solid #e5e8e8;
    position: relative;
    /* margin-top: -23px; */
    background: white;
    padding: 11px 30px;
}
.brand_footer .block{
    position: absolute;
    right: 30px;
    top:0
}
.brand_list_img img{
    width: 30px;
    height: 30px;
}
</style>

