<template>
    <section>
        <header class="addbrand_header">
            <div>
                <el-breadcrumb separator='-' style="line-height:45px;font-size:15px">
                    <el-breadcrumb-item :to="{ path: '/goodsBrand' }">商品品牌</el-breadcrumb-item>
                    <el-breadcrumb-item>新增品牌</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </header>
        <section class="addbrand_conent">
            <div class="addbrand_box" :style="{height: $store.state.home.modelContentHeight-23 + 'px'}">
                <!-- conents -->
                <el-form ref="addbrand" :rules="rules" :model="from" >
                    <el-form-item prop="brandName"  label='品牌名称' :label-width='formLabelWidth' >
                        <el-input type='text' suffix-text='0/15'  size='small' style="width:338px" v-model="from.brandName"></el-input>
                    </el-form-item>
                    <el-form-item label="关联分类"  required :label-width="formLabelWidth">
                        <el-select
                            placeholder="请选择"
                            size='small'
                            style="width:338px"
                            v-model="list"
                            multiple
                            filterable
                            allow-create
                            default-first-option>
                            <el-option
                                v-for="item in options"
                                :key="item.categoryName"
                                :label="item.categoryName"
                                :value="item.categoryName">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label='服务费率'  required :label-width='formLabelWidth'  v-for="(date,index) in list" :key='index' v-model='text' >
                        <el-input type='text'  size='small' style="width:338px" v-model="text[index]" :placeholder='date'></el-input>
                    </el-form-item>
                    <el-form-item label="品牌LOGO" :label-width="formLabelWidth" class="img_up">
                        <el-upload
                            :action="this.upDateImgUrl"
                            :data='sentData'
                            :file-list='fileList'
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :on-success='handleAvatarSuccess'>
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <!-- action上传地址 -->
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="this.dialogImg" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="排序" prop="sort"  :label-width="formLabelWidth" >
                        <el-input  placeholder="数值越大越靠前"  size='small' style="width:338px" v-model="from.sort"></el-input>
                    </el-form-item>
                    <el-form-item  label="控货品牌" :label-width="formLabelWidth" >
                        <el-checkbox v-model="from.isControl" @change="changes">勾选为控货品牌</el-checkbox>
                    </el-form-item>
                    <el-form-item label="控货门店" :label-width="formLabelWidth"  v-if='showhiddden'>
                        <el-select
                            v-model="groupName"
                            multiple
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择控货门店"
                            size='small'
                            style="width:338px">
                            <el-option
                            v-for="item in group"
                            :key="item.id"
                            :label="item.groupName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否推荐" required :label-width="formLabelWidth" >
                        <el-switch
                            v-model="from.isRecommended">
                        </el-switch>
                    </el-form-item>
                </el-form>
            </div>
        </section>
        <footer class="addbrand_footer">
            <el-button type="primary" size='small' style="width:90px" @click='trueconfim'>保存</el-button>
            <el-button size='small' style="width:90px" @click="returnprev">返回</el-button>
        </footer>
    </section>
</template>
<script>
import api from 'api/goods'

export default {
    data() {
        return {
            // 上传
            dialogVisible: false,
            formLabelWidth: '120px',

            from: {
                id: '',
                brandName: '',
                isControl: 0,
                rateList: '',
                brandImg: [],
                sort: '',
                isRecommended: 0,
                shopGroupIds: ''
            },

            list: [],
            text: [],

            uplist: [
                {
                    itemCategoryId: '',
                    rate: ''
                }
            ],

            options: [],

            showhiddden: false,

            group: [],

            groupName: [],

            page :{
                pageNo: 1,
                pageSize: 10
            },

            rules: {
                brandName: [
                    { required: true, message: '请输入品牌名称', trigger: 'blur' }
                ],
                sort: [
                    { required: true, message: '请输入排序', trigger: 'blur' }
                ]
            },

            upDateImgUrl: process.env.API_ROOT + '/f/upload',
            sentData: {
                file: '',
                uploadType: 'erp'
            },
            fileList:[],
            dialogImg:''
        }
    },

    methods: {
        // 上传
        handleRemove(file, fileList) {
            for (var i in this.fileList){
                if (this.fileList[i].url == file.url){

                    this.fileList.splice(i, 1)
                }
            }
            // console.log(file)
        },
        handlePictureCardPreview(file) {
            this.dialogImg = file.url;
            this.dialogVisible = true;
        },
        handleAvatarSuccess(file, fileList) {
            this.fileList.push(fileList.response.data)
        },
        trueconfim() {
            this.$refs['addbrand'].validate((valid) => {

                if (valid) {
                    for (var w in this.list){
                        for (var e in this.options){
                            if (this.list[w] == this.options[e].categoryName){
                                this.list[w] = this.options[e].id
                            }
                        }
                    }

                    // 遍历传输的数据结构出来
                    if (this.list.length >= this.uplist.length){

                        for (var a = 0 ; a < this.list.length - 1 ; a++){

                            let obj = {
                                itemCategoryId: '',
                                rate: ''
                            }

                            this.uplist.push(obj)
                        }

                        for (var i in this.list){

                            this.uplist[i].itemCategoryId = this.list[i]
                        }

                        for (var k in this.text){

                            this.uplist[k].rate = this.text[k]
                        }

                    }

                    this.from.rateList = JSON.stringify(this.uplist)
                    this.from.shopGroupIds = this.groupName.toString()

                    if (this.from.isControl == true){
                        this.from.isControl = 1
                    } else {
                        this.from.isControl = 0
                    }

                    if (this.from.isRecommended == true){
                        this.from.isRecommended = 1
                    } else {
                        this.from.isRecommended = 0
                    }

                    var imgurl = []

                    for (var b in this.fileList){
                        imgurl.push(this.fileList[b].url)
                    }
                    this.from.brandImg = imgurl.toString()

                    api.postitemBrandadd(this.from).then((response)=>{
                        this.$message({
                            type: 'success',
                            message: '新增商品品牌成功！'
                        });

                        this.from = {
                            id: '',
                            brandName: '',
                            isControl: '',
                            rateList: [],
                            brandImg: [],
                            sort: '',
                            isRecommended: '',
                            shopGroupIds: ''
                        }
                        this.value = ''
                        this.$router.go(-1)
                    }).catch((error)=>{
                        console.log(error)
                    })
                }
            })

        },
        returnprev() {
            this.from = {
                id: '',
                brandName: '',
                isControl: '',
                rateList: [],
                brandImg: '',
                sort: '',
                isRecommended: '',
                shopGroupIds: ''
            }
            this.value = ''
            this.$refs['addbrand'].resetFields();
            this.$router.go(-1)
        },
        changes() {
            if (this.from.isControl == true){
                this.showhiddden = true
            } else {
                this.showhiddden = false
            }
        },
        get() {
            this.list = []
            this.text = []

            this.from = {
                id: '',
                brandName: '',
                isControl: 0,
                rateList: '',
                brandImg: '',
                sort: '',
                isRecommended: 0,
                shopGroupIds: ''
            }
            this.fileList = []
            api.getcategorylist().then((response)=>{
                this.options = response.data.list
                console.log(response)
            }).catch((error)=>{
                console.log(error)
            })

            api.getshopgrouplist(this.page).then((response)=>{
                this.group = response.data.list
                // console.log(response)
            }).catch((error)=>{
                console.log(error)
            })
        }
    },
    created() {
        this.get()
    },
    activated() {
        this.get()
    }
}
</script>
<style scoped>
/* 顶部 */
.addbrand_header{
    height: 45px;
    width: 100%;
    padding: 0 30px;
    display: flex;
    justify-content: space-between
}
.addbrand_conent{
    padding:10px;
    background: #f5f5f5;
    border-top:1px solid #e6e9e9
}
.addbrand_box{
    border: 1px solid #e6e9eb;
    color: #5e6161;
    background: white;
    padding: 48px 20px 0 20px;
    overflow: auto
}

/* 底部 */
.addbrand_footer{
    border-top:1px solid #e5e8e8;
    padding: 12px 30px;
    background: white
}
</style>
