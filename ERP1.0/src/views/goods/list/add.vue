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
        <section class="add_conent">
            <ul style="border:1px solid #e6e9e9;border-top:none">
                <!-- 步骤 -->
                <li class="step">
                    <el-steps :active="active" finish-status="success" simple style="background:#f5f5f5">
                        <el-step title="1.编辑基本信息" ></el-step>
                        <el-step title="2.设置商品参数" ></el-step>
                    </el-steps>
                </li>
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
                            <el-input v-model="form.name" size="small" placeholder="长度<64" style="width:700px"></el-input>
                        </el-form-item>
                        <el-form-item label="商品卖点" style="margin-bottom:35px">
                            <el-input type="textarea" v-model="form.name" size="small" placeholder="长度<300" rows='2'></el-input>
                        </el-form-item>
                        <el-form-item label="购买提醒" style="margin-bottom:35px">
                            <el-input type="textarea" v-model="form.name" size="small" placeholder="长度<300" rows='2'></el-input>
                        </el-form-item>
                        <el-col :span='10'>
                            <el-form-item label="商品条码" required >
                                <el-input v-model="form.name" size="small" placeholder="长度<64" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='10'>
                            <el-form-item label="商品条码" required >
                                <el-input v-model="form.name" size="small" placeholder="长度<64" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='10'>
                            <el-form-item label="商品品牌" required >
                                <el-select v-model="value" placeholder="请选择"  size='small'>
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span='10'>
                            <el-form-item label="商品分类" required >
                                <el-select v-model="value" placeholder="请选择"  size='small'>
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span='10'>
                            <el-form-item label="贸易类型" required >
                                <el-select v-model="value" placeholder="请选择"  size='small'>
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span='10'>
                            <el-form-item label="建议零售价"  class="money">
                                <el-input v-model="form.name" size="small" placeholder="长度<64" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='10'>
                            <el-form-item label="单位" >
                                <el-select v-model="value" placeholder="请选择"  size='small'>
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span='10'>
                            <el-form-item label="保质期" required >
                                <el-input v-model="form.name" size="small" placeholder="长度<64" suffix="月"></el-input>
                            </el-form-item>
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
                        <el-form ref="attr" :model="attr" label-width="100px" >
                            <el-form-item label="商品规格">
                                <el-col :span="6">
                                    <el-input v-model="attr.name" size="small" placeholder="长度<64" style="width:700px"></el-input>
                                </el-col>
                                <el-col :span="18">
                                    <el-input v-model="attr.name" size="small" placeholder="长度<64" style="width:700px"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="add_button">
                        <el-button type="text">添加属性</el-button>
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
        </section>

    </section>

</template>
<script>
import tinymce from '@/components/tinymce'
export default {
    data () {
        return {
            // 步骤
            active: 1,
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
            attr: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            // 商品主图
            dialogImageUrl: '',
            dialogVisible: false
            // 编辑器内容

        }
    },
    methods:{
        // 下一步
        next() {
            if (this.active++ > 1) {
                this.active = 1
            }
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
            this.$root.reload()
        }

    },
    components: {
        tinymce
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
    padding: 0 10px;
    background: #f5f5f5;
    border-top:1px solid #e6e9e9
}
/* 步骤 */
.step{
    padding: 20px 10px;
    background: white
}
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
.el-form-item{
    height: 40px;
}
.el-textarea{
    width: 620px;
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
    background: #f5f5f5
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


</style>

