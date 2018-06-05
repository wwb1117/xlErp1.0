<template>
    <section>
        <header class="additems_header">
            <div>
                <el-breadcrumb separator='-' style="line-height:45px;font-size:15px">
                    <el-breadcrumb-item :to="{ path: '/goodsItems' }">商品分类</el-breadcrumb-item>
                    <el-breadcrumb-item>新增分类</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </header>
        <section class="additems_conent">
            <div class="additems_box" :style="{height: $store.state.home.modelContentHeight-23 + 'px'}">
                <!-- conents -->
                <el-form :model="msg">
                    <el-form-item label="分类名称" required :label-width="formLabelWidth" style="height:50px">
                        <el-input v-model="msg.name" type='text' suffix-text='0/15' size='small' style="width:338px"></el-input>
                    </el-form-item>
                    <el-form-item label="分类图片" :label-width="formLabelWidth"  style="height:100px">
                        <el-upload
                            action=""
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <!-- action上传地址 -->
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="msg.dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="排序" required :label-width="formLabelWidth"  style="height:50px">
                        <el-input v-model="msg.sort" placeholder="数值越大越靠前"  size='small' style="width:338px"></el-input>
                    </el-form-item>
                    <el-form-item label="是否显示" required :label-width="formLabelWidth"  style="height:50px">
                        <el-switch
                            v-model="msg.value">
                        </el-switch>
                    </el-form-item>
                </el-form>
            </div>
        </section>
        <footer class="additems_footer">
            <el-button size='small' type='primary' style="width:90px" @click="tryeconfim">保存</el-button>
            <el-button size='small' style="width:90px" @click='returnitems'>返回</el-button>
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
                dialogImageUrl: '',
                sort:'',
                value: true
            },

            formLabelWidth: '120px',
            // 上传

            dialogVisible: false,

            parentid : ''

        }
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        tryeconfim() {

            if (this.msg.value == true){
                this.msg.value = 1
            } else {
                this.msg.value = 0
            }

            let obj = {
                parentId: this.parentid,
                categoryImg: this.msg.dialogImageUrl,
                categoryName: this.msg.name,
                isDisplay: this.msg.value,
                sort: this.msg.sort
            }

            console.log(obj.categoryImg)
            api.postitemcategoryadd(obj).then((response)=>{
                this.msg = {
                    name: '',
                    dialogImageUrl: '',
                    sort:'',
                    value: true
                }
                this.parentid = ''
                // this.$router.go(-1)
            }).catch((error)=>{
                console.log(error)
            })
        },
        returnitems() {
            this.msg = {
                name: '',
                dialogImageUrl: '',
                sort:'',
                value: true
            }
            this.parentid = ''
            this.$router.go(-1)
        }

    },
    // created() {
    //     var parent = this.$store.state.home.parentId

    //     this.parentid = parent

    // },
    activated() {
        var parent = this.$store.state.home.parentId

        this.parentid = parent
    }
}
</script>
<style scoped>
/* 顶部 */
.additems_header{
    height: 45px;
    width: 100%;
    padding: 0 30px;
    display: flex;
    justify-content: space-between
}
.additems_conent{
    padding:10px;
    background: #f5f5f5;
    border-top:1px solid #e6e9e9
}
.additems_box{
    border: 1px solid #e6e9eb;
    color: #5e6161;
    background: white;
    padding: 48px 20px 0 20px;
}

/* 底部 */
.additems_footer{
    border-top:1px solid #e5e8e8;
    padding: 12px 30px;
    background: white
}
</style>
