<template>
    <section>
        <header class="addbrand_header">
            <div>
                <el-breadcrumb separator='-' style="line-height:45px;font-size:15px">
                    <el-breadcrumb-item :to="{ path: '/goodsBrand' }">商品品牌</el-breadcrumb-item>
                    <el-breadcrumb-item>编辑品牌</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </header>
        <section class="addbrand_conent">
            <div class="addbrand_box" :style="{height: $store.state.home.modelContentHeight-23 + 'px'}">
                <!-- conents -->
                <el-form ref="addbrand" :rules="rules" :model="from" >
                    <el-form-item prop='brandName' label='品牌名称' :label-width='formLabelWidth' >
                        <el-input type='text' suffix-text='0/15'  size='small' style="width:338px" v-model="from.brandName"></el-input>
                    </el-form-item>
                    <el-form-item label="关联分类" required :label-width="formLabelWidth"  >
                        <el-select
                            placeholder="请选择"
                            size='small'
                            style="width:338px"
                            v-model="from.itemBrandCategories"
                            multiple
                            filterable
                            allow-create
                            default-first-option>
                            <el-option
                                v-for="item in options"
                                :key="item.itemCategoryId"
                                :label="item.categoryName"
                                :value="item.categoryName">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label='服务费率' required :label-width='formLabelWidth'  v-for="(date,index) in from.itemBrandCategories" :key='index' v-model='text' >
                        <el-input type='text'  size='small' style="width:338px" v-model="text[index]" :placeholder='date'></el-input>
                    </el-form-item>
                    <el-form-item label="品牌LOGO" :label-width="formLabelWidth" >
                        <el-upload
                            action=""
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <!-- action上传地址 -->
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="from.brandImg" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="排序" prop='sort' :label-width="formLabelWidth" >
                        <el-input  placeholder="数值越大越靠前"  size='small' style="width:338px" v-model="from.sort"></el-input>
                    </el-form-item>
                    <el-form-item  label="控货品牌" :label-width="formLabelWidth" >
                        <el-checkbox v-model="from.isControl" @change="changes">勾选为控货品牌</el-checkbox>
                    </el-form-item>
                    <el-form-item label="控货门店" :label-width="formLabelWidth" v-if='showhiddden'>
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
                            :key="item.groupId"
                            :label="item.groupName"
                            :value="item.groupId">
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
            <el-button type="primary" size='small' style="width:90px" @click='trueconfim' v-perss="'修改商品品牌'">保存</el-button>
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

            from: {},

            value: '',
            options: [],
            text:[],

            // 是否出现门店
            showhiddden: false,

            group: [],
            groupName: [],

            rules: {
                brandName: [
                    { required: true, message: '请输入品牌名称', trigger: 'blur' }
                ],
                sort: [
                    { required: true, message: '请输入排序', trigger: 'blur' }
                ]
            }

        }
    },
    methods: {
        // 上传
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.from.brandImg = file.url;
            this.dialogVisible = true;
        },
        trueconfim() {
            this.$refs['addbrand'].validate((valid)=>{
                if (valid){
                    for (var w in this.from.itemBrandCategories){
                        for (var e in this.options){
                            if (this.from.itemBrandCategories[w] == this.options[e].categoryName){
                                this.from.itemBrandCategories[w] = this.options[e].id
                            }
                        }
                    }

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

                    let obj = {
                        id: this.from.id,
                        brandName: this.from.brandName,
                        isControl: this.from.isControl,
                        rateList: JSON.stringify(this.from.itemBrandCategories),
                        brandImg: this.from.brandImg,
                        sort: this.from.sort,
                        isRecommended: this.from.isRecommended,
                        shopGroupIds:this.groupName.toString()
                    }

                    api.putitemitemBrandupdate(obj).then((response)=>{
                        this.group = []
                        this.groupName = []
                        this.options = []
                        this.from = {}
                        this.$message({
                            type: 'success',
                            message: '更新商品品牌成功！'
                        });
                        this.$router.go(-1)
                    }).catch((error)=>{
                        console.log(error)
                    })
                }

            })

        },
        returnprev() {
            this.$refs['addbrand'].resetFields();
            this.$router.go(-1)
        },
        changes() {
            if (this.from.isControl == true){
                this.showhiddden = true
            } else {
                this.showhiddden = false
            }
        }
    },
    created() {

        var id = this.$store.state.home.brandId

        api.getcategorylist().then((response)=>{
            this.options = []
            this.options = response.data.list
            // console.log(response)
        }).catch((error)=>{
            console.log(error)
        })

        api.getitemBrandid(id).then((response)=>{
            // console.log(response.data.list)
            this.from = {}
            this.from = response.data.list
            for (var i in this.from.itemBrandCategories){
                this.text[i] = this.from.itemBrandCategories[i].rate
                this.from.itemBrandCategories[i] = this.from.itemBrandCategories[i].categoryName
            }

            if (this.from.isControl == 1){
                this.from.isControl = true
                this.showhiddden = true
            } else {
                this.from.isControl = false
            }
        }).catch((error)=>{
            console.log(error)
        })

        api.getitemitemBrandShopGroupitemBrandId(id).then((response)=>{
            this.group = []
            this.group = response.data
            this.groupName = this.from.itemBrandShopGroups
            // console.log(response)
        }).catch((error)=>{
            console.log(error)
        })


    },
    activated() {

        var id = this.$store.state.home.brandId

        api.getcategorylist().then((response)=>{
            this.options = response.data.list
            // console.log(response.data.list)

        }).catch((error)=>{
            console.log(error)
        })

        api.getitemBrandid(id).then((response)=>{

            this.from = response.data
            console.log(response.data)
            for (var i in this.from.itemBrandCategories){
                this.text[i] = this.from.itemBrandCategories[i].rate
                this.from.itemBrandCategories[i] = this.from.itemBrandCategories[i].categoryName
            }

            if (this.from.isControl == 1){
                this.from.isControl = true
                this.showhiddden = true
            } else {
                this.from.isControl = false
            }

        }).catch((error)=>{
            console.log(error)
        })

        api.getitemitemBrandShopGroupitemBrandId(id).then((response)=>{
            this.group = []
            this.group = response.data
            this.groupName = this.from.itemBrandShopGroups
            // console.log(response)
        }).catch((error)=>{
            console.log(error)
        })

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
