<template>
    <div id="waitReview_Wrap">
        <div class="model_topcol">
            <span style="color: #409EFF">待我审批</span>
            <span> - 审核</span>
            <div>
                <el-button @click="lookBtnEvent" type="primary" size="small">查看订单</el-button>
            </div>
        </div>
        <div class="model_content" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <div class="model_content_inner">
                <div class="content_title">
                    采购订单审核
                </div>
                <div class="banner">
                    当前审核状态
                </div>
                <div class="base_info">
                    <span>提交人 : </span>
                    <span v-text="$store.state.home.currentModelId.creator"></span>
                    <br>
                    <span>提交时间 : </span>
                    <span>{{$store.state.home.currentModelId.created | time_m}}</span>
                </div>
                <div class="banner">

                </div>
                <div class="maincontent">
                    <div v-for="item in reviewRecordData" :key="item.id" class="item_wrap">
                        <span class="item_state_pass"></span>
                        <span style="margin-left: 15px">审核通过</span><br>
                        <span style="margin-left: 15px">审核人 : </span>
                        <span> wwb </span><br>
                        <span>审核时间 : </span>
                        <span>2018-05-22</span><br>
                        <span>审核意见 : </span>
                        <span>审核通过</span>
                    </div>
                    <div class="item_wrap item_wrap_curr">
                        <span class="item_state_curr"></span>
                        <span class="color_brown" style="margin-left: 15px">审核中</span><br>
                        <span style="margin-left: 15px">审核人 : </span>
                        <span> wwb </span><br>
                        <span>审核时间 : </span>
                        <span>{{Date.parse(new Date()) / 1000 | time_m}}</span><br>
                        <el-form :inline="true" :rules="rules" :model="formData" label-position="left" size="small" label-width="80px">
                            <el-form-item prop="maker" label="审核意见">
                                <el-input type="textarea" :rows="4" style="width: 404px" v-model="formData.maker" placeholder="请输入审核意见"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
        <div class="model_footer">
            <el-button type="primary" @click="reviewOperEvent(2)" size="small" style="width: 90px; margin-left: 25px;">审核通过</el-button>
            <el-button size="small" @click="reviewOperEvent(1)" style="width: 90px; margin-left: 25px;">审核未通过</el-button>
            <el-button v-RouterBack size="small" style="width: 90px; margin-left: 25px;">返 回</el-button>
            <el-button type="primary" @click="talkWindowEvent" size="small" style="width: 90px; margin-left: 25px; float: right">沟通反馈</el-button>
        </div>

        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="750px"
            >
            <div class="dialog_wrap" style="height: 500px">
                <div>
                    <el-input type="textarea" :rows="4" style="width: 100%" v-model="talkText" placeholder="请输入沟通反馈意见"></el-input>
                    <el-button style="width: 90px; float: right; margin-top: 20px" size="small" type="primary">发送</el-button>
                </div>

                <div class="talkRecord">
                    <div class="talkItem">
                        <div class="talkItem_title">
                            <el-badge value="2018-05-22"></el-badge>
                            <span class="badge_circle"></span>
                        </div>
                        <div class="talkItem_item">
                            <span class="talkItem_item_circle"></span>
                            <span style="width: 50px">14:20</span>
                            <span style="width: 60px">丹阳: </span>
                            <span>好的 </span>
                        </div>
                        <div class="talkItem_item">
                            <span class="talkItem_item_circle"></span>
                            <span style="width: 50px">11:20</span>
                            <span style="width: 60px">陈杰: </span>
                            <span>下次在修改 </span>
                        </div>
                        <div class="talkItem_item">
                            <span class="talkItem_item_circle"></span>
                            <span style="width: 50px">9:20</span>
                            <span style="width: 60px">锋哥: </span>
                            <span>意见已经反馈 </span>
                        </div>
                    </div>
                    <div class="talkItem">
                        <div class="talkItem_title">
                            <el-badge value="2018-05-22"></el-badge>
                            <span class="badge_circle"></span>
                        </div>
                        <div class="talkItem_item">
                            <span class="talkItem_item_circle"></span>
                            <span style="width: 50px">14:20</span>
                            <span style="width: 60px">丹阳: </span>
                            <span>好的 </span>
                        </div>
                        <div class="talkItem_item">
                            <span class="talkItem_item_circle"></span>
                            <span style="width: 50px">11:20</span>
                            <span style="width: 60px">陈杰: </span>
                            <span>下次在修改 </span>
                        </div>
                        <div class="talkItem_item">
                            <span class="talkItem_item_circle"></span>
                            <span style="width: 50px">9:20</span>
                            <span style="width: 60px">锋哥: </span>
                            <span>意见已经反馈 </span>
                        </div>
                    </div>
                </div>

            </div>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
            </span> -->
        </el-dialog>


    </div>
</template>

<script>
import api from 'api/review'
export default {
    data(){
        return {
            dialogVisible: false,
            reviewRecordData: [],
            formData: {
                maker: ''
            },
            rules: {
                maker: [
                    { required: true, message: '请输入审核意见', trigger: 'blur' }
                ]
            },
            talkText: ''
        }
    },
    computed:{},
    methods:{
        talkWindowEvent(){
            this.dialogVisible = true
        },
        lookBtnEvent(){
            this.$router.push({
                path: '/lookWaitReviewRe'
            })
        },
        getReviewRecord(){
            var idObj = this.$store.state.home.currentModelId
            var orderId = idObj.orderId
            var reviewProcessId = idObj.reviewProcessId
            var paramobj = {
                orderId: orderId,
                reviewProcessId: reviewProcessId
            }

            api.getReviewRecord(paramobj).then((response) => {
                this.reviewRecordData = response.list
            })
        },
        reviewOperEvent(type){
            var paramobj = {

                orderId: this.$store.state.home.currentModelId.orderId,
                reviewProcessId: this.$store.state.home.currentModelId.reviewProcessId,
                reviewProcessUserName: this.$store.state.home.userInfo.user.userName,
                reviewProcessStatus: type,
                reviewProcessUserId: this.$store.state.home.userInfo.user.id,
                reviewProcessTime: Date.parse(new Date()) / 1000,
                reviewProcessRemark: this.formData.maker

            }

            api.auditorReview(paramobj).then((response) => {

                this.$message({
                    type: 'success',
                    duration: 1500,
                    showClose: true,
                    message: '操作成功'
                });

                this.$router.go(-1)
            })
        }

    },
    activated(){
        this.getReviewRecord()
        this.formData.maker = ""
    },
    created(){},
    mounted(){}
}
</script>
<style scoped>
.model_content_inner{
    position: relative;
}

.model_footer{
    text-align: left;
    padding-top: 10px;
}
.content_title{
    height: 64px;
    color: #ff333f;
    line-height: 64px;
    font-weight: 600;
    padding-left: 20px;
}
.banner{
    height: 40px;
    background: #f5f5f5;
    line-height: 40px;
    color: #606266;
    font-weight: 600;
    padding-left: 10px;
}
.base_info{
    padding-left: 40px;
    padding-top: 10px;
    padding-bottom: 10px;
}
.base_info span{
    height: 30px;
    line-height: 30px;
}
.maincontent{
    padding-left: 40px;
    padding-top: 30px;
}
.maincontent .item_wrap{
    padding-left: 15px;
    border-left: 1px solid #E4E7ED;
    position: relative;
    padding-bottom: 40px;
}
.item_wrap span{
    display: inline-block;
    height: 27px;
    line-height: 27px;
}
.item_wrap .item_state_pass{
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #606266;
    position: absolute;
    top: 2px;
    left: -8px;
}
.item_wrap .item_state_curr{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    position: absolute;
    background: #ff8625;
    top: 2px;
    left: -8px;
}
.maincontent .item_wrap_curr{
    border-left: none;
}
.talkItem{
    border-left: 1px solid #E4E7ED;
    margin-bottom: 5px;
    padding-bottom: 10px;
}
.talkItem>div{
    /* border-left: 1px solid #E4E7ED; */
    margin-left: -9px;
}
.talkItem_title{
    position: relative;
}
.talkItem_title .badge_circle{
    display: inline-block;
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #606266;
    z-index: 9999;
    left: 3px;
}
.talkRecord{
    margin-top: 50px;
}
.talkItem_item{
    height: 27px;
    line-height: 27px;
    padding-left: 40px;
    position: relative;
}
.talkItem_item span{
    display: inline-block;
}
.talkItem_item_circle{
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #606266;
    position: absolute;
    top: 9px;
    left: 5px;
}
.dialog_wrap{
    padding: 10px;
    overflow-y: auto;
}
</style>
