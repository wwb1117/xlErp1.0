<template>
    <section id='add' >
        <!-- 顶部面包屑 -->
        <div class="add_top">
            <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:45px">
                <el-breadcrumb-item :to="{ path: '/goods' }">商品列表</el-breadcrumb-item>
                <el-breadcrumb-item>新增商品</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 主体内容 -->
        <section class="add_conent" >
            <div class="conent_box">
                <div class="step">
                    <bar :step-texts="testText" :step-nums="stepNums" :current-step="currentStep"></bar>
                </div>
                <ul style='margin:0' v-if='conent1'>
                    <!-- 商品title -->
                    <li class="good_title">
                        <p>商品类型</p>
                    </li>
                    <!-- 商品类型 -->
                    <li class="good_type">
                        <el-radio-group v-model="radio">
                            <el-radio-button label="1">
                                <p>实物类商品</p>
                                <p class="color">(物流发货)</p>
                            </el-radio-button>
                            <el-radio-button label="2">
                                <p>服务类商品</p>
                                <p class="color">(无需物流)</p>
                            </el-radio-button>
                            <el-radio-button label="3">
                                <p>赠 品</p>
                                <p class="color">(非售商品)</p>
                            </el-radio-button>
                        </el-radio-group>
                    </li>
                    <!-- 信息title -->
                    <li class="good_title">
                        <p>基本信息</p>
                        <input type='checkbox' style="margin-left:20px;margin-top:14px;outline:none;">
                        <span style="margin-left:10px">有无保质期</span>
                    </li>
                    <!-- 信息内容 -->
                    <li class="msg_conent">
                        <el-form ref="form" :model="form" label-width="100px">
                            <el-form-item label="商品名称" required>
                                <el-input v-model="form.name" size="small" placeholder="长度<64" style="width:688px"></el-input>
                            </el-form-item>
                            <el-form-item label="商品卖点" style="margin-bottom:35px">
                                <el-input type="textarea" v-model="form.name" size="small" placeholder="长度<300" rows='2'></el-input>
                            </el-form-item>
                            <el-form-item label="购买提醒" style="margin-bottom:35px">
                                <el-input type="textarea" v-model="form.name" size="small" placeholder="长度<300" rows='2'></el-input>
                            </el-form-item>
                            <el-col :span='24'>
                                <el-col :span='6'>
                                    <el-form-item label="商品条码" required >
                                        <el-input v-model="form.name" size="small" placeholder="长度<64" ></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='6' style="margin-left:25px">
                                    <el-form-item label="商品编码" required >
                                        <el-input v-model="form.name" size="small" placeholder="长度<64" ></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span='24'>
                                <el-col :span='6'>
                                    <el-form-item label="商品品牌" required >
                                        <el-select v-model="value" placeholder="请选择"  size='small'>
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='6' style="margin-left:25px">
                                    <el-form-item label="商品分类" required >
                                        <el-select v-model="value" placeholder="请选择"  size='small'>
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span='24'>
                                <el-col :span='6'>
                                    <el-form-item label="贸易类型" required >
                                        <el-select v-model="value" placeholder="请选择"  size='small'>
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='6' style="margin-left:25px">
                                    <el-form-item label="建议零售价"  class="money">
                                        <el-input v-model="form.name" size="small" placeholder="长度<64" ></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span='24'>
                                <el-col :span='6'>
                                    <el-form-item label="单位" >
                                        <el-select v-model="value" placeholder="请选择"  size='small'>
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='6' style="margin-left:25px">
                                    <el-form-item label="保质期" required >
                                        <el-input v-model="form.name" size="small" placeholder="长度<64" suffix="月"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                        </el-form>
                    </li>
                    <!-- 规格title -->
                    <li class="good_title">
                        <p>商品规格</p>
                    </li>
                    <!-- 商品规格 -->
                    <li class="standard">
                        <div>
                            <el-form ref="standard" :model="standard" label-width="100px">
                                <el-form-item label="商品规格" required>
                                    <div class="add_standard">
                                        <div class="add_small_standard add_standard">
                                            <el-button type="primary" size='small'>添加规格项目</el-button>
                                        </div>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </div>
                        <p class="standard_p">如有颜色、尺码等多种规格，请添加商品规格</p>
                        <div>
                            <el-form ref="standard" :model="standard" label-width="100px">
                                <el-form-item label="商品规格" required>
                                    <div class="add_standard">
                                        <div class="add_small_standard add_standard">
                                            <el-button type="primary" size='small'>添加规格项目</el-button>
                                        </div>
                                        <!-- 商品规格明细，未写 -->
                                    </div>
                                </el-form-item>
                            </el-form>
                        </div>
                    </li>
                    <!-- 商品属性title -->
                    <li class="good_title">
                        <p>商品属性</p>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>商品属性是对商品的补充说明，如材质、产地、储存方法等，最多添加50条</span>
                    </li>
                    <!-- 商品属性 -->
                    <li class="good_attr">
                        <div class="add_attr">
                            <el-form ref="attr" label-width="100px" >
                                <el-form-item label="商品规格">
                                    <el-col :span="24"  v-for='(attrnum,index) in attr' :key="index" >
                                        <el-col :span="2">
                                            <el-input size="small" placeholder="属性名" v-model="attrnum.name" ref="input"></el-input>
                                        </el-col>
                                        <el-col :span="21   " style="margin-left:10px">
                                            <el-input size="small" placeholder="属性值" v-model="attrnum.region" ></el-input>
                                        </el-col>
                                    </el-col>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="add_button">
                            <el-button type="text" @click="pushAttr">添加属性</el-button>
                        </div>
                    </li>
                    <!-- 商品主图 -->
                    <li class="good_title">
                        <p>商品主图</p>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>主图大小不能超过1MB;尺寸：700*700px;最多5张</span>
                    </li>
                    <!-- 图片上传 -->
                    <li class="pic_up">
                        <div class="updata_box">
                            <el-upload
                                action=""
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <!-- action上传地址 -->
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                    </li>
                    <!-- 商品详情title -->
                    <li class="good_title">
                        <p>商品详情</p>
                    </li>
                    <!-- 富编辑器 -->
                    <li>
                        <div style="padding:10px;background:white">
                            <tinymce></tinymce>
                        </div>
                    </li>
                    <!-- 控制步骤 -->
                    <li class="add_bottom">
                        <el-button @click="reset" size='small'>重置</el-button>
                        <el-button @click="next" size='small' type="primary">下一步</el-button>
                    </li>
                </ul>
                <ul v-if='conent2'>
                    <!-- 供货设置title -->
                    <li class="good_title">
                        <p>供货设置</p>
                    </li>
                    <!-- 供货设置 -->
                    <li class="supply">
                        <el-form ref="standard" :model="standard" label-width="100px">
                            <el-form-item label="包装类型">
                                <div class="add_standard">
                                    <div class="add_small_standard add_standard">
                                        <el-form-item label="类型名" label-width="70px">
                                            <el-select v-model="value" placeholder="选择类型" size='small'>
                                                <el-option
                                                v-for="item in goods"
                                                :key="item.num"
                                                :label="item.label"
                                                :value="item.num">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                    <div style="padding:10px;display:flex" class="supply_check">
                                        <el-form-item label="类型值" label-width="70px">
                                            <span style="position:relative;margin-right:20px" v-for="item in shu" :key="item" >
                                                <el-select v-model="value" placeholder="选择类型" size='small'>
                                                    <el-option
                                                    v-for="item in goods"
                                                    :key="item.num"
                                                    :label="item.label"
                                                    :value="item.num">
                                                    </el-option>
                                                </el-select>
                                                <i class="el-icon-circle-close" @click="delet(index)" style="position:relative;right:13px;top:-15px;font-size:16px;cursor: pointer"></i>
                                            </span>
                                        </el-form-item>
                                        <el-button type="text"  style="position: relative;z-index: 20;" @click="add">添加规格值</el-button>
                                    </div>
                                </div>
                            </el-form-item>
                        </el-form>
                    </li>
                    <!-- 分享设置title -->
                    <li class="good_title">
                        <p>分享设置</p>
                    </li>
                    <!-- 分享设置 -->
                    <li class="share">
                        <el-form ref="standard" :model="standard" label-width="100px">
                            <el-form-item label="分享图片">
                                <div class="updata_box">
                                    <el-upload
                                        action=""
                                        list-type="picture-card"
                                        :on-preview="handlePictureCardPreview"
                                        :on-remove="handleRemove">
                                        <i class="el-icon-plus" style="font-size:16px"></i>
                                    </el-upload>
                                    <!-- action上传地址 -->
                                    <el-dialog :visible.sync="dialogVisible">
                                        <img width="100%" :src="dialogImageUrl" alt="">
                                    </el-dialog>
                                </div>
                                <p style="color:#a1a4a4">最多上传9张图片，建议尺寸为：640px X 640px</p>
                            </el-form-item>
                            <el-form-item label="分享内容">
                                <div style="background:white">
                                    <tinymce></tinymce>
                                </div>
                            </el-form-item>
                        </el-form>
                    </li>
                    <!-- 其他设置title -->
                    <li class="good_title">
                        <p>其他设置</p>
                    </li>
                    <!-- 其他设置 -->
                    <li class="other">
                         <el-form ref="standard" :model="standard" label-width="100px">
                            <el-form-item label="报价设置"  style="margin:0">
                                <el-select v-model="value" placeholder="选择类型" size='small'>
                                    <el-option
                                        v-for="item in goods"
                                        :key="item.num"
                                        :label="item.label"
                                        :value="item.num">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item >
                                <el-tag size="small" closable>供应商分组</el-tag>
                            </el-form-item>
                            <el-form-item label="商品热度" >
                                <el-input v-model="goodhot" size='small' style="width:215px"></el-input>
                            </el-form-item>
                            <el-form-item label="减库存设置">
                                <el-radio v-model="delnum" label="1">下单减库存</el-radio>
                                <el-radio v-model="delnum" label="2">支付减库存</el-radio>
                            </el-form-item>
                            <el-form-item label="提成设置">
                                <el-select v-model="value" placeholder="选择类型" size='small'>
                                    <el-option
                                        v-for="item in goods"
                                        :key="item.num"
                                        :label="item.label"
                                        :value="item.num">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </li>
                    <!-- 控制步骤 -->
                    <li class="add_bottom">
                        <el-button @click="prev" size='small' type="primary">上一步</el-button>
                        <el-button @click="submit" size='small'>保存</el-button>
                    </li>
                </ul>
            </div>

        </section>
    </section>

</template>
<script>
import tinymce from '@/components/tinymce'
import bar from '@/components/stepBar'

let goodAttr =

{
    name: '',
    region: ''
}

export default {
    data () {
        return {

            // 步骤条
            testText: ['1. 编辑基本信息', '2. 设置商品参数'],
            stepNums: 2,
            currentStep: 1,

            // 内容
            conent1: true,
            conent2: false,
            // 步骤
            active: 1,

            // 内容1

            // 类型选择
            radio:0,
            // 保质期
            radio1:0,
            // 信息内容
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            // 信息表单选项
            options: [
                {
                    value: '选项1',
                    label: '妈妈去哪了'
                },
                {
                    value: '选项2',
                    label: '爸爸去哪了'
                }
            ],
            value : '',
            // 规格表单
            standard: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            // 属性表单
            attr: [
                {
                    name: '',
                    region: ''
                }
            ],
            // 商品主图
            dialogImageUrl: '',
            dialogVisible: false,

            // 内容2

            // 商品选择类型
            goods: [
                {
                    num: '选项1',
                    label: '黄金糕'
                },
                {
                    num: '选项2',
                    label: '双皮奶'
                }
            ],
            num: '',
            // 规格数
            shu: ['1'],
            goodhot: '',
            delnum: '1'
        }
    },
    methods:{
        // 下一步
        next() {
            this.currentStep = 2
            this.conent1 = false
            this.conent2 = true
            window.scroll(0, 0)
        },
        prev() {
            this.currentStep = 1
            this.conent1 = true
            this.conent2 = false
            window.scroll(0, 0)
        },
        submit() {
            console.log(1)
        },
        // 商品主图
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        reset() {
            this.$router.reload()
        },
        add() {
            this.shu.push('1')
        },
        delet(index){
            if (this.shu.length != 1) {
                this.shu.splice(index, 1)
            }

        },
        pushAttr() {
            this.attr.push(goodAttr);
        }

    },
    components: {
        tinymce,
        bar
    }

}
</script>
<style scoped>
#add{
    position: relative;
    height: 949px
}
/* 商品通用标题 */
.good_title{
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: #5f6264;
    display: flex
}
.good_title>p{
    text-indent: 10px;
    font-weight: 600;
    font-size: 15px
}
/* 面包屑 */
.add_top{
    height: 45px;
    width: 100%;
    padding: 0 15px;
}
/* 主体 */
.add_conent{
    padding:10px;
    background: #f5f5f5;
    border-top:1px solid #e6e9e9
}
.conent_box{
    border: 1px solid #e6e9e9
}
/* 步骤 */
.step{
    padding: 20px 10px;
    background: white;
}

/* 第一步 */

/* 商品类型 */
.good_type{
    height: 100px;
    width: 100%;
    background: white;
    padding: 15px 20px;
    position: relative
}
.color{
    color: #5f6264
}
/* 信息内容 */
.msg_conent{
    background: white;
    padding: 10px 40px;
    height: 480px
}
.msg_conent .el-form-item{
    height: 40px;
}
.msg_conent .el-textarea{
    width: 688px;
}
.msg_conent .el-input{
    width: 258px;
}
.msg_conent .el-select{
    width: 258px;
}
/* 商品规格 */
.standard{
    background: white;
    padding: 10px 40px;
    height: 550px
}
.add_standard{
    border: 1px solid #dce0e6;
    width: 100%;
    padding: 10px;
}
.add_small_standard{
    background: #f5f5f5;
    height: 65px
}
.el-upload__input{
    display: none
}
.standard_p{
    margin: 50px 0 30px 100px;
    color: #5f6264;
}

/* 商品属性 */
.good_attr{
    background: white;
    padding: 10px 40px;
}
.add_button{
    margin:-20px 0 0 100px
}
/* 商品主图 */
.pic_up{
    background: white;
    padding: 10px 40px;
}
/* 控制步骤 */
.add_bottom{
    height: 50px;
    padding: 10px 25px;
    background: white
}

/* 内容2 */

/* 供货设置 */
.supply{
    background: white;
    padding: 10px 40px;
    height: 300px
}
.supply_check .el-tag{
    background: none;
    border: none;
    padding: 0;
}
/* 分享 */
.share{
    background: white;
    padding: 10px 40px;
    height: 600px
}
/* 其他 */
.other{
    background: white;
    padding: 10px 40px;
    height: 400px
}
.share .el-upload--picture-card{
    width: 78px;
    height: 78px;
    line-height: 78px;
}
.other .el-tag{
    background: none;
    color: black;
    border: none;
    font-size: 14px
}
.other .el-icon-close{
    background: #c0c4ca;
    color: white;
    width: 18px;
    height: 18px;
    line-height: 18px
}
.other .el-icon-close:hover{
    font-size: 6px;
    background: #c0c4ca;
}
.share .el-form-item {
    margin-bottom: 0;
    height: 140px;
}

</style>

