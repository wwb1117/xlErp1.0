<template>
    <section :style="{height: $store.state.home.modelContentHeight + 'px'}">
        <!-- 顶部 -->
        <header class="types_top">
            <p class='types_title'>包装类型</p>
            <el-button type="primary" size='small' style="height:30px;margin-top:-3px" @click='openAddtypes'>新增类型</el-button>
        </header>
        <section class="types_conent" >
             <div class='box_top' style="border:1px solid #e5e8e8;border-bottom:none">
                <el-input
                    size="small"
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="input"
                    style="width:378px">
                </el-input>
                <el-button type="primary" size='small' style="margin-left:10px" @click='findthat'>搜索</el-button>
            </div>
            <ul class="types_list" style="border:1px solid #e5e8e8;border-bottom:none">
                <li style="width:210px">包装名称</li>
                <li style="width:500px">规格值</li>
                <li style="width:300px">备注</li>
                <li style="width:110px">操作</li>
            </ul>
            <div class="types_box" :style="{height: $store.state.home.modelContentHeight-128 + 'px'}">
                <ul class="types_list types_text" v-for='(item,index) in this.types' :key='index'>
                    <li style="width:210px">{{item.unitMsg}}</li>
                    <li style="width:500px">{{item.skuNumber}}</li>
                    <li style="width:300px">这是备注信息</li>
                    <li style="width:110px">
                        <el-button type='text' @click='gotoEdit(item.unitMsg)'>编辑</el-button>
                        <el-button type="text" @click="del = true">删除</el-button>
                        <el-dialog
                            title="温馨提示"
                            :visible.sync="del"
                            width="30%">
                            <span>此操作将永久删除该项</span>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="del = false">取 消</el-button>
                                <el-button type="primary"  disabled>确 定</el-button>
                            </span>
                        </el-dialog>
                    </li>
                </ul>
            </div>
        </section>
        <footer class="types_footer">
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
// import bus from '@/assets/eventBus.js'

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
            value1: true,
            value2: true,
            textarea: '',

            currentPage: 2,
            totalPage: 1,

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

            page:{
                pageSize: 10,
                pageNo: 1
            },

            types:[]
        }
    },
    methods: {

        openAddtypes() {
            this.$router.push('addTypes')
        },
        gotoEdit(data) {
            // bus.$emit('editTypes', data)
            this.$store.commit('setTypes', data)
            this.$router.push('editTypes')
            // console.log(data)

        },
        handleSizeChange(val) {
            this.page.pageSize = val
        },
        handleCurrentChange(val) {
            this.page.pageNo = val
        },
        // 搜索
        findthat() {
            let obj = {
                unitMsg: this.input
            }

            api.getitemsupplyPropertyfindByUnitMsg(obj).then((response)=>{

                this.types = response.data
                console.log(response)
            }).catch((error)=>{
                console.log(error)
            })
        },

        get() {

            api.getitemsupplyPropertylist(this.page).then((response)=>{

                // console.log(response.data.list)
                this.types = response.data.list
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
.types_top{
    display: flex;
    justify-content: space-between;
    height: 46px;
    padding: 10px;
    border-bottom: 1px solid #e5e8e8
}
.types_title{
    height: 25px;
    line-height: 25px;
    margin-left: 20px;
    font-size: 15px;
    color: #5e6161
}
.types_top .el-input{
    width: 40%;
}
/* 内容 */
.types_conent{
    padding: 10px;
    background: #f5f5f5;
}
.types_box{
    border: 1px solid #e6e9eb;
    color: #5e6161;
    background: white;
    overflow: auto;
}
.box_top{
    display: flex;
    background:white;
    padding: 16px
}
.box_top .el-input{
    width: 35%;
}
.types_list{
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
.types_text{
    background: white;
    font-weight: 500;
    border-color:  #d6e3ec;
}
/* 底部 */
.types_footer{
    border-top:1px solid #e5e8e8;
    position: relative;
    padding: 11px 30px;
    /* margin-top: -23px; */
    background: white;
}
.types_footer .block{
    position: absolute;
    right: 30px;
    top:0px
}
</style>
