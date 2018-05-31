<template>
    <section :style="{height: $store.state.home.modelContentHeight + 'px'}">
        <!-- 顶部 -->
        <header class="brand_top">
            <p class='brand_title'>商品品牌</p>
            <el-button type="primary" @click="openAddbrand" size='small' style="height:32px;margin-top:-3px">新增品牌</el-button>
            <!-- 新增表单内容 -->

        </header>
        <section class="brand_conent" >
            <div class="brand_box" :style="{height: $store.state.home.modelContentHeight-23 + 'px'}">
                <div class='box_top'>
                     <el-input
                        size="small"
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="input"
                        style="width:378px">
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
                        <el-button type='text'  @click="dialogFormVisible = true">编辑</el-button>
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

            // 分页
            currentPage: 2,
            totalPage: 1,
            // 搜索
            input: '',
            // 关联分类
            // 删除
            del: false,
            page: {
                pageNo: 1,
                pageSize: 10
            },

            brand: []
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
            this.page.pageSize = val
        },
        handleCurrentChange(val) {
            this.page.pageNo = val
        },
        openAddbrand() {
            this.$router.push('addBrand')
        },
        get() {

            api.getitemBrandlist(this.page).then((response)=>{
                // console.log(response.data.itemVOs)
                this.brand = response.data.itemVOs
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

