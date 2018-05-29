<template>
    <section>
        <!-- 列表内容 -->
        <div id='k'  class="conent" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <div style="border: 1px solid #dcdfe6;background:white;overflow:hidden" :style="{height: $store.state.home.modelContentHeight-20 + 'px'}">
                <div>
                    <el-card :style="{width: '98.8%'}" v-show="dialogFormVisible" class="box_card">
                        <div slot="header" class="clearfix">
                            <span :style="{fontSize: '16px'}">高级搜索</span>
                            <i @click="dialogFormVisible = false" class="el-icon-close" style="float: right; padding: 3px 0; cursor: pointer"></i>
                        </div>
                        <el-form class="myForm" :inline="true" :model="form" label-position="right" size="small" label-width="80px">
                            <el-form-item label="商品名称">
                                <el-input v-model="form.name1" placeholder="请输入商品名称"></el-input>
                            </el-form-item>
                            <el-form-item label="商品编号">
                                <el-input v-model="form.name2" placeholder="请输入商品编号"></el-input>
                            </el-form-item>
                            <el-form-item label="商品条码">
                                <el-input v-model="form.name3" placeholder="请输入商品条码"></el-input>
                            </el-form-item>
                            <br>
                            <el-form-item label="商品分类">
                                <el-select  v-model="form.name4" placeholder="全部">
                                    <el-option label="母婴类" value="12"></el-option>
                                    <el-option label="服务类" value="123"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="商品品牌">
                                <el-select  v-model="form.name5" placeholder="全部">
                                    <el-option label="母婴类" value="123"></el-option>
                                    <el-option label="服务类" value="12312"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="商品类型">
                                <el-select  v-model="form.name6" placeholder="全部">
                                    <el-option label="母婴类" value="324"></el-option>
                                    <el-option label="服务类" value="145"></el-option>
                                </el-select>
                            </el-form-item>
                            <br>
                            <el-form-item label="贸易类型">
                                <el-select v-model="form.name7" placeholder="全部">
                                    <el-option label="母婴类" value="145"></el-option>
                                    <el-option label="服务类" value="1345"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="提成方式">
                                <el-select v-model="form.name8" placeholder="全部">
                                    <el-option label="母婴类" value="13451"></el-option>
                                    <el-option label="服务类" value="1435143"></el-option>
                                </el-select>
                            </el-form-item>
                            <br>
                            <el-form-item>
                                <el-button @click="dialogFormVisible = false" style="padding:9px 15px;width: 90px" type="primary" >确定</el-button>
                                <el-button @click="dialogFormVisible = false" style="padding:9px 15px;width: 90px">取消</el-button>
                                <el-button class="color_hover" @click="clear" type="text" style="padding:9px 15px;width: 40px; color: #636365">清空</el-button>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </div>
                <!-- 列表搜索框 -->
                <div>
                    <ul class="conent_list">
                        <li class="input">
                            <el-input
                                size="small"
                                placeholder="请输入采购单号/供应商名称/采购单位"
                                prefix-icon="el-icon-search"
                                :style="{width: '378px'}"
                                v-model="serchText">
                            </el-input>
                        </li>
                        <li class="find">
                            <el-button  type="primary" style='padding:9px 15px; margin-left:10px' size='small'>搜索</el-button>
                        </li>
                        <!-- 高级搜索表单 -->
                        <li class="morefind">
                            <el-button type="text" @click="dialogFormVisible = true">高级搜索</el-button>
                        </li>
                        <!-- 高级搜索表单内容 -->
                        <li style="width: 100%">
                        </li>
                    </ul>
                </div>
                <!-- 列表顶部隐藏对话框   有问题需要改动/消失隐藏没有判断 -->
                <ul class="conent_hidden" v-show="hidden_show">
                    <li @click='isHidden'><i class="el-icon-close"></i></li>
                    <li >已选择 <span style="color:#3f9fff" v-text="selectTableData.length">1</span> 项</li>
                    <li>
                        <el-button type="text" @click="open">停止报价</el-button>
                    </li>
                    <li>
                        <el-button type="text" @click="dialogVisible = true">更改报价供应商</el-button>
                    </li>
                </ul>
                <!-- 列表顶部隐藏谈出框 -->
                <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" >
                    <el-form :model="form">
                        <el-form-item label="供应商分组" size='small'>
                            <el-select v-model="form.get" placeholder="选择允许报价的供应商分组" width='300'>
                                <el-option label="妈妈去哪了" value="12312"></el-option>
                                <el-option label="爸爸去哪了" value="1243123"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false" size='small'>取 消</el-button>
                        <el-button type="primary" @click="dialogVisible = false" size='small'>确 定</el-button>
                    </span>
                </el-dialog>
                <!-- 商品列表内容 -->
                <div class="center">
                    <el-table
                        :data="goodData"
                        :height="$store.state.home.modelContentHeight"
                        ref="goodTable"
                        @selection-change="handleSelectionChange">
                        <!-- check -->
                        <el-table-column
                            type="selection"
                            width="30">
                        </el-table-column>
                        <!-- 商品图片 -->
                        <el-table-column
                            prop="mainImg"
                            label="商品"
                            >
                            <template slot-scope="scope" >
                                <!-- <div style="width:60px;height:60px;background: black;"></div> -->
                                <div class="goodimgbox">
                                    <img :src="scope.row.mainImg" alt="">
                                </div>
                            </template>
                        </el-table-column>
                        <!-- 商品内容 -->
                        <el-table-column
                            prop='title'
                            width="300">
                            <template slot-scope="scope">
                                <div @click="openGoods(scope)">{{ scope.row.title }}</div>
                            </template>
                        </el-table-column>
                        <!-- 条码 -->
                        <el-table-column
                            prop="barCode"
                            label="条码">
                        </el-table-column>
                        <!-- 编号 -->
                        <el-table-column
                            prop="itemCode"
                            label="编号">
                        </el-table-column>
                        <!-- 规格 -->
                        <el-table-column
                            label="规格-SKU">
                            <template slot-scope="scope">
                                <el-button type="text" @click="lookgoodsku(scope)">查看</el-button>
                                <el-dialog title="规格明细" :visible.sync="dialogTableVisible">
                                    <el-table :data="gridData">
                                        <el-table-column property="specification" label="规格" width="320"></el-table-column>
                                        <el-table-column property="coding" label="SKU编码" width="600"></el-table-column>
                                    </el-table>
                                    <div class="small_pagination">
                                        <el-pagination small layout="prev, pager, next" :total="50"></el-pagination>
                                    </div>
                                </el-dialog>
                            </template>
                        </el-table-column>
                        <!-- 分类 -->
                        <el-table-column
                            prop="categoryName"
                            label="分类"
                            width='200'>
                        </el-table-column>
                        <!-- 品牌 -->
                        <el-table-column
                            prop="brandName"
                            label="品牌">
                        </el-table-column>
                        <!-- 操作 -->
                        <el-table-column
                            label="操作">
                            <template slot-scope="scope">
                                <el-button type="text">编辑</el-button>
                                <el-button type="text">删除</el-button>
                                <el-button type="text">更多 <i class="el-icon-caret-bottom"></i> </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 查看弹出框 -->

                </div>
            </div>
        </div>

        <!-- 商品分页 -->
        <footer class="bottom" >
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
import api from 'api/goodslist'

export default {
    name : 'first',

    data(){
        return {
            // 搜索框内容
            serchText: '',
            // 隐藏商品顶部弹出框
            hidden_show:false,

            // 商品列表全选及数量
            checkAll: false,
            checkedCities: [],
            isIndeterminate: true,

            // 弹出框状态  查看规格/高级搜索表单/更改供应商
            dialogTableVisible: false,
            dialogFormVisible: false,
            dialogVisible: false,

            // 高级搜索表单内容
            form: {
                // 更改供应商内容
                get : '',
                // 高级搜索表单内容
                name1 : '',
                name2 : '',
                name3 : '',
                name4 : '',
                name5 : '',
                name6 : '',
                name7 : '',
                name8 : '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            // 查看规格弹出框内容
            gridData: [
                {
                    specification: '2016-05-02',
                    coding: '02010001'
                },
                {
                    specification: '2016-05-04',
                    coding: '02010001'
                },
                {
                    specification: '2016-05-01',
                    coding: '02010001'
                },
                {
                    specification: '2016-05-03',
                    coding: '02010001'
                }
            ],
            // 底部分页数
            currentPage: 2,
            totalPage: 1,

            // 商品列表内容
            goodData: [],
            selectTableData: [],

            page: {
                pageNo: 1,
                pageSize: 11
            }
        }
    },
    methods: {
        isHidden() {
            this.hidden_show = false;
            this.$refs.goodTable.clearSelection()
        },
        // 高级搜索表单清除选项
        clear() {
            for (let i in this.form){
                this.form[i] = ''
            }
        },
        // 停止报价弹出框
        open() {
            this.$confirm('此操作将会停止商品报价, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '已停止报价!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            });
        },
        // 底部分页函数
        handleSizeChange(val) {
            this.page.pageSize = val
        },
        handleCurrentChange(val) {
            this.page.pageNo = val
        },
        handleSelectionChange(val){
            this.selectTableData = val
            if (this.selectTableData.length > 0){
                this.hidden_show = true
            } else {
                this.hidden_show = false
            }
        },
        // 查看规格    异常
        lookgoodsku(scope) {
            this.dialogTableVisible = true
            // console.log(scope.row.id)
            let obj = {
                itemId: scope.row.id
            }

            console.log(obj)
            api.getitemskuProperty(obj).then((response)=>{
                console.log(response.data)
            }).catch((error)=>{
                console.log(error)
            })
        },

        openGoods(data) {
            this.$router.push('goodsDetails')
        },

        get() {
            api.getitemlist(this.page).then((response) => {
                console.log(response.data.itemVOs)
                this.goodData = response.data.itemVOs
            }).catch((error)=>{
                console.log(error)
            })
        }
    },
    // created() {
    //     this.get()
    // },
    activated() {
        this.get()
    }
}
</script>
<style scoped>
*{
   list-style: none;
}
#k {
    padding: 10px;
    background: #f5f5f5;
    position: relative;
}
/* 顶部样式 */
 .conent_list{
    display: flex;
    padding: 15px;
    background: white;
    margin: 0;
    height: 60px;
}
 .conent_hidden{
    display: flex;
    background: white;
    margin: 0;
    height: 60px;
    position: absolute;
    left: 11px;
    top:11px;
    z-index: 10;
    width: 98%;
    line-height: 60px;
}
.conent_hidden>li{
    margin-left: 30px
}
.morefind{
    margin-left: 20px;
    height: 32px;
    line-height: 32px;
}
.morefind>button{
    padding: 0
}
/* 商品内容样式 */
.center .el-checkbox{
    display: block;
    margin: 0
}
.display{
    display: flex;
    justify-content: space-around;
}
.display>li{
    width: 150px;
}
.text_color{
    color: #409EFF
}
.goods_conent{
   border-top:1px solid #e4e7ed;
   height: 70px;
   padding: 5px 0;
   margin: 0
}
.goods_list{
    background: #f5f5f5;
    height: 40px;
    line-height: 40px;
    margin: 0
}
/* 商品弹出框样式 */

.navdiv>.el-tabs .el-tabs__nav-wrap{
    margin-left: 10px
}
.text_color>.el-button{
    padding: 0
}
.small_pagination{
    margin-left: 700px;
    margin-top:30px;
}
.bottom{
    border-top:1px solid #e5e8e8;
    position: relative;
    /* margin-top: -23px; */
    background: white;
    padding: 27px 30px;
}
.bottom .block{
    position: absolute;
    right: 30px;
    top:12px
}

.el-form input{
    width: 240px
}

.el-icon-close:hover{
    font-size: 14px
}
.goodimgbox img{
    height: 60px;
    width: 60px
}

.box_card{
    position: absolute;
    left: 0;
    top: 0;
    height: 300px;
    z-index: 9;
    margin: 10px
}
.model_content_inner{
    position: relative;
}
.el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
    width: 390px;
}
.el-form{
    color: #636365;
}
</style>

