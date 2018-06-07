<template>
    <section>
        <div @click="dialogVisible = true" class="updata">
            <i class="el-icon-plus"></i>
        </div>
        <el-dialog
            title="选择图片"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <div style="display:flex">
                <div style="width:160px;border-right:1px solid #e6e6e6;height:500px;padding-right:15px">
                    <div>
                        <el-input size='small' suffix-icon="el-icon-search"></el-input>
                    </div>
                    <ul class="team_list">
                        <li v-for="(item,index) in team" :key="index">{{item}}</li>
                    </ul>
                    <el-button type='text' @click="addteam = true">+新建分组</el-button>
                    <el-dialog
                        width="20%"
                        title="新建分组"
                        :visible.sync="addteam"
                        append-to-body>
                        <el-input v-model="text" size='small'></el-input>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="additem" size='small'>确 定</el-button>
                            <el-button @click="addteam = false" size='small'>取 消</el-button>
                        </span>
                    </el-dialog>
                </div>
                <div>
                    <div class="up_box">
                        <el-checkbox v-model="checked">开启图片水印</el-checkbox>
                        <el-upload
                            :action="upDateImgUrl"
                            :data="sentData"
                            :on-preview="handlePictureCardPreview"
                            :on-success="handleAvatarSuccess"
                            :on-remove="handleRemove">
                            本地上传
                        </el-upload>
                        <el-dialog :visible.sync="upimg">
                                <img width="100%" :src="ImageUrl" alt="">
                        </el-dialog>
                    </div>
                    <ul class="img_box">
                        <li v-for="(data,index) in img" :key='index'>
                            <!-- <img :src="data.imgurl" alt=""> -->
                            <div style='width:118px ;height:118px; background:pink' @click='opentrue($event)'></div>
                            <div class="opentrue"><i class="el-icon-check"></i></div>
                            <p>{{data.conent}}</p>
                        </li>
                    </ul>
                    <div class="progin">
                        <p>已选<span></span>个，可选100个</p>
                        <div class="block">
                            <el-pagination
                                small
                                layout="prev, pager, next"
                                :total="1000">
                            </el-pagination>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer" style="padding:0 20px">
                        <el-button type="primary" @click="dialogVisible = false" size='small'>确 定</el-button>
                        <el-button @click="dialogVisible = false" size='small'>取 消</el-button>
                    </span>
                </div>
            </div>

        </el-dialog>
    </section>
</template>
<script>
export default {
    data() {
        return {
            upDateImgUrl: process.env.API_ROOT + '/f/upload',
            sentData: {
                file: "",
                uploadType: 'cms-address'
            },
            dialogVisible: false,
            addteam: false,
            checked: false,
            text: '',
            // 分组
            team: ['全部图片', '未分组', '阿拉奶粉', '商品品牌', '阿拉分享图', '商品分类'],
            ImageUrl: '',
            upimg: false,
            img: [
                {
                    imgurl: '',
                    conent: '商品名称'
                },
                {
                    imgurl: '',
                    conent: '商品名称'
                },
                {
                    imgurl: '',
                    conent: '商品名称'
                },
                {
                    imgurl: '',
                    conent: '商品名称'
                },
                {
                    imgurl: '',
                    conent: '商品名称'
                },
                {
                    imgurl: '',
                    conent: '商品名称'
                }
            ]
        };
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        additem() {
            this.addteam = false
            this.team.push(this.text)
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.ImageUrl = file.url;
            this.upimg = true;
        },
        // 图片上传成功
        handleAvatarSuccess(file, fileList) {
            console.log(file, fileList, "图片信息")
        },
        opentrue($event) {
            var tha = $event.currentTarget

            $(tha).parent().find('.opentrue').addClass('active')
        }
    }
}
</script>
<style scoped>
.updata{
    width: 88px;
    height: 88px;
    line-height: 88px;
    border: 1px dashed #888888;
    text-align: center;
    font-size: 26px
}
.team_list{
    text-indent: 5px;
    font-size: 15px;
    margin-top: 10px
}
.team_list li{
    height: 30px;
    line-height: 30px
}
.team_list li:hover{
    background: #f5f5f5;
    cursor: pointer;
}
.up_box{
    line-height: 32px;
    display: flex;
    width: 750px;
    padding: 0 0 15px 480px;
    border-bottom: 1px solid #e4e9ea
}
.progin{
    padding: 0 15px ;
    display: flex;
    line-height: 45px;
    justify-content: space-between
}
.img_box{
    height: 360px;
    width: 730px;
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
}
.img_box li{
    width: 120px;
    border: 1px solid #dee1e1;
    margin-left: 20px;
    margin-top: 15px;
    position: relative;
}
.img_box li img{
    width: 118px;
    height: 118px;
}
.img_box li p{
    width: 118px ;
    height: 29px ;
    border-top:1px solid #dee1e1;
    line-height: 34px
}
.opentrue{
    position: absolute;
    left: 0;
    top:0;
    width: 118px;
    height: 118px;
    background: #888888;
    opacity: 0.6;
    z-index: 9;
    color:white;
    font-size: 35px;
    text-align: center;
    line-height: 118px;
    display: none
}
.active{
    display: block;
}


</style>
