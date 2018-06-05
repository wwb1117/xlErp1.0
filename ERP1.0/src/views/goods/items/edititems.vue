<template>
    <section>
        <header class="edititems_header">
            <div>
                <el-breadcrumb separator='-' style="line-height:45px;font-size:15px">
                    <el-breadcrumb-item :to="{ path: '/goodsItems' }">商品分类</el-breadcrumb-item>
                    <el-breadcrumb-item>编辑分类</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </header>
        <section class="edititems_conent">
            <div class="edititems_box" :style="{height: $store.state.home.modelContentHeight-23 + 'px'}">
                <!-- conents -->
                <el-form :model="msg">
                    <el-form-item label="分类名称" required :label-width="formLabelWidth">
                        <el-input v-model="msg.categoryName" type='text' suffix-text='0/15' size='small' style="width:338px"></el-input>
                    </el-form-item>
                    <el-form-item label="分类图片" :label-width="formLabelWidth" >
                        <el-upload
                            action=""
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <!-- action上传地址 -->
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="msg.categoryImg" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="排序" required :label-width="formLabelWidth"  >
                        <el-input v-model="msg.sort" placeholder="数值越大越靠前"  size='small' style="width:338px"></el-input>
                    </el-form-item>
                    <el-form-item label="是否显示" required :label-width="formLabelWidth"  >
                        <el-switch
                            v-model="msg.isDisplay">
                        </el-switch>
                    </el-form-item>
                </el-form>
            </div>
        </section>
        <footer class="edititems_footer">
            <el-button size='small' type='primary' style="width:90px" @click="trueconfim">保存</el-button>
            <el-button size='small' style="width:90px" @click='returnitems'>返回</el-button>
        </footer>
    </section>
</template>
<script>
import api from 'api/goods'

export default {
    data() {
        return {
            msg: {},
            formLabelWidth: '120px',
            // 上传
            dialogVisible: false

        }
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.msg.categoryImg = file.url;
            this.dialogVisible = true;
        },
        returnitems() {
            this.$router.go(-1)
        },
        trueconfim() {
            if (this.msg.isDisplay == true){
                this.msg.isDisplay = 1
            } else {
                this.msg.isDisplay = 0
            }

            let obj = {
                id: this.msg.id,
                parentId: this.msg.parentId,
                categoryImg: this.msg.categoryImg,
                categoryName: this.msg.categoryName,
                isDisplay: this.msg.isDisplay,
                sort: this.msg.sort
            }

            api.putitemcategoryupdate(obj).then((response)=>{
                this.msg = {}
                this.$router.go(-1)
            }).catch((error)=>{
                console.log(error)
            })
        }


    },
    created() {
        var id = this.$store.state.home.itemId

        api.getcategoryid(id).then((response)=>{
            console.log(response.data[0])
            this.msg = response.data[0]
            if (this.msg.isDisplay == 1){
                this.msg.isDisplay = true
            } else {
                this.msg.isDisplay = false
            }
        }).catch((error)=>{
            console.log(error)
        })

    },
    activated() {
        var id = this.$store.state.home.itemId

        api.getcategoryid(id).then((response)=>{
            console.log(response.data[0])
            this.msg = response.data[0]
            if (this.msg.isDisplay == 1){
                this.msg.isDisplay = true
            } else {
                this.msg.isDisplay = false
            }
        }).catch((error)=>{
            console.log(error)
        })

    }
}
</script>
<style scoped>
/* 顶部 */
.edititems_header{
    height: 45px;
    width: 100%;
    padding: 0 30px;
    display: flex;
    justify-content: space-between
}
.edititems_conent{
    padding:10px;
    background: #f5f5f5;
    border-top:1px solid #e6e9e9
}
.edititems_box{
    border: 1px solid #e6e9eb;
    color: #5e6161;
    background: white;
    padding: 48px 20px 0 20px;
    overflow: auto
}

/* 底部 */
.edititems_footer{
    border-top:1px solid #e5e8e8;
    padding: 12px 30px;
    background: white
}
</style>
