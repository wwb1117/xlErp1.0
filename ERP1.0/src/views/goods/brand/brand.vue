<template>
    <section :style="{height: $store.state.home.modelContentHeight + 'px'}">
        <!-- 顶部 -->
        <header class="brand_top">
            <p class='brand_title'>商品品牌</p>
            <el-button type="primary" @click="openAddbrand" size='small' style="height:32px;margin-top:-3px" v-perss="'增加商品品牌'">新增品牌</el-button>

        </header>
        <section class="brand_conent" >
            <div class="brand_box" :style="{height: $store.state.home.modelContentHeight-23 + 'px'}">
                <div class='box_top'>
                     <el-input
                        size="small"
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="page.brandName"
                        style="width:378px">
                    </el-input>
                    <el-button type="primary" size='small' style="margin-left:10px" @click="findthat">搜索</el-button>
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
                <ul class="brand_list brand_text" v-for='(item,index) in this.brand' :key='index' style="font-size:12px">
                    <li style="width:200px">{{item.brandName}}</li>
                    <li style="width:170px"><span v-for="(date,index) in item.itemBrandCategories" :key='index' style="margin-right:5px">{{date.categoryName}}</span></li>
                    <li style="width:150px"><span v-for="(date,index) in item.itemBrandCategories" :key='index' style="margin-right:5px">{{date.rate}}%</span></li>
                    <li style="width:190px" class="brand_list_img">
                        <img :src="item.brandImg" alt="">
                    </li>
                    <li style="width:180px">
                        <el-switch
                            v-model="item.isRecommended"
                            @change='change(item.isRecommended, item.id)'>
                        </el-switch>
                    </li>
                    <li style="width:110px">{{item.sort}}</li>
                    <li style="width:130px">
                        <el-button type='text'  @click="openedit(item.id)" v-perss="'修改商品品牌'"><span style="font-size:12px">编辑</span></el-button>
                        <el-button type="text" disabled  v-perss="'删除商品品牌'"><span style="font-size:12px">删除</span></el-button>
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
            // 关联分类

            page: {
                pageNo: 1,
                pageSize: 30,
                brandName: ''
            },

            brand: [],

            brandtext:{}
        }
    },
    methods: {
        handleSizeChange(val) {
            this.page.pageSize = val
        },
        handleCurrentChange(val) {
            this.page.pageNo = val
        },
        openAddbrand() {
            this.$router.push('addBrand')
        },
        openedit(data) {
            this.$store.commit('setBrand', data)
            this.$router.push('editBrand')
        },
        findthat() {
            api.getitemBrandlist(this.page).then((response)=>{
                // console.log(response.data.itemVOs)
                this.brand = response.data.itemVOs
            }).catch((error)=>{

                console.log(error)

            })
        },
        change(data, item){
            api.getitemBrandid(item).then((response)=>{
                // console.log(response.data.list)
                this.brandtext = response.data.list

                var arr = []

                for (var i in this.brandtext.itemBrandShopGroups){
                    arr[i] = this.brandtext.itemBrandShopGroups[i].groupId
                }

                let obj = {
                    id: this.brandtext.id,
                    brandName: this.brandtext.brandName,
                    isControl: this.brandtext.isControl,
                    rateList: JSON.stringify(this.brandtext.itemBrandCategories),
                    brandImg: this.brandtext.brandImg,
                    sort: this.brandtext.sort,
                    isRecommended: data,
                    shopGroupIds: arr.toString()
                }

                if (obj.isRecommended == true){
                    obj.isRecommended = 1
                } else {
                    obj.isRecommended = 0
                }

                api.putitemitemBrandupdate(obj).then((responses)=>{

                }).catch((error)=>{
                    console.log(error)
                })

            }).catch((error)=>{
                console.log(error)
            })
        },
        get() {

            api.getitemBrandlist(this.page).then((response)=>{
                // console.log(response.data.itemVOs)
                this.brand = response.data.list

                for (var i in this.brand){
                    if (this.brand[i].isRecommended == 1){
                        this.brand[i].isRecommended = true
                    } else {
                        this.brand[i].isRecommended = false
                    }
                }

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
    background: white;
    overflow: auto
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

