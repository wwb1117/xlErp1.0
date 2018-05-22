<template>
    <section id='add' >
        <!-- 顶部面包屑 -->
        <header class="add_top">
            <el-breadcrumb separator='-' style="line-height:45px;font-size:15px">
                <el-breadcrumb-item :to="{ path: '/goodsList' }">商品列表</el-breadcrumb-item>
                <el-breadcrumb-item>新增商品</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <!-- 主体内容 -->
        <section class="add_conent" >
            <div class="conent_box">
                <div class="step" style="height:80px">
                    <bar :step-texts="testText" :step-nums="stepNums" :current-step="currentStep"></bar>
                </div>
                <ul style='margin:0' v-if='conent1'>
                    <!-- 商品title -->
                    <li class="good_title">
                        <p>商品类型</p>
                    </li>
                    <!-- 商品类型 -->
                    <li class="good_type">
                        <el-button
                            plain
                            @click="option($event)"
                            style="position:relative">
                            <div id='goodbutton'>
                                <p>实物类商品</p>
                                <span style='color:#8f9294'>（物流发货）</span>
                                <em class="jiao"><i class="el-icon-check" style="position:absolute;bottom:-20px;right:0"></i></em>
                            </div>
                        </el-button>
                        <el-button
                            plain
                            @click="option($event)"
                            style="position:relative">
                            <div id='goodbutton'>
                                <p>服务类商品</p>
                                <span style='color:#8f9294'>（无需物流）</span>
                                <em class="jiao"><i class="el-icon-check" style="position:absolute;bottom:-20px;right:0"></i></em>
                            </div>
                        </el-button>
                        <el-button
                            plain
                            @click="option($event)"
                            style="position:relative">
                            <div id='goodbutton'>
                                <p>赠品</p>
                                <span style='color:#8f9294'>（非售商品）</span>
                                <em class="jiao"><i class="el-icon-check" style="position:absolute;bottom:-20px;right:0"></i></em>
                            </div>
                        </el-button>
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
                        <el-form ref="standard" label-width="100px">
                            <el-form-item label="商品规格" required>
                                <div class="add_standard">
                                    <div class="add_small_standard add_standard">
                                        <el-button type="primary" size='small'>添加规格项目</el-button>
                                    </div>
                                </div>
                            </el-form-item>
                            <p class="standard_p">如有颜色、尺码等多种规格，请添加商品规格</p>
                            <el-form-item label="商品规格" required v-model="spec">
                                <div class="add_standard">
                                    <div class="add_small_standard">
                                        <el-form-item label="规格名" style="margin-left:-80px" >
                                            <el-select v-model="spec.data" placeholder="请选择活动区域" size='small' style="width:138px">
                                                <el-option label="区域一" value="shanghai"></el-option>
                                                <el-option label="区域二" value="beijing"></el-option>
                                            </el-select>
                                            <el-checkbox v-model="checked" style="margin-left:10px">添加规格图片</el-checkbox>
                                        </el-form-item>
                                    </div>
                                    <el-form-item label='规格值' style="margin-left:-10px;margin-top:5px" >
                                        <el-select  placeholder="请选择活动区域" size='small' v-for="(item,index) in spec" :key='index' v-model="item.age" style="width:138px;margin-right:20px">
                                            <el-option label="蓝色" value="shanghai"></el-option>
                                            <el-option label="红色" value="beijing"></el-option>
                                        </el-select>
                                        <el-button type='text' @click="addSpec">添加规格值</el-button>
                                        <div style="display:flex">
                                            <div style="width:158px" v-for='(item,index) in spec.length' :key='index'>
                                                <div class="updata" @click="updata = true">
                                                    <i class="el-icon-plus"></i>
                                                </div>
                                            </div>
                                            <!-- 弹出信息 -->
                                            <el-dialog
                                                title="选择图片"
                                                :visible.sync="updata"
                                                width="30%"
                                                >
                                                <!-- :before-close="handleClose" -->
                                                <el-button type="primary" @click="updata = false">确 定</el-button>
                                                <el-button @click="updata = false">取 消</el-button>
                                            </el-dialog>
                                        </div>
                                        <p style="color:#888;font-size:12px">仅支持为第一组规格设置图片（最多40张图），买家选择不同规格会看到对应图片，建议尺寸：640 X 640 像素</p>
                                    </el-form-item>
                                </div>
                            </el-form-item>
                            <p style="margin-left:100px;margin-top:-10px">如有颜色、尺码等多种规格，请添加商品规格</p>
                            <!-- 规格明细 -->
                            <el-form-item label="规格明细">
                                <el-table
                                :data="specmore"
                                :span-method="objectSpanMethod"
                                border>
                                <el-table-column
                                    prop="color"
                                    label="颜色"
                                    width='100'>
                                </el-table-column>
                                <el-table-column
                                    prop="size"
                                    label="尺码"
                                    width='100'>
                                </el-table-column>
                                </el-table>
                            </el-form-item>
                        </el-form>
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

            // 商品规格
            checked: true,
            // 规格值
            spec:[
                {
                    name: '蓝色',
                    age: '',
                    region: '',
                    data: ''
                },
                {
                    name: '红色',
                    age: '',
                    region: '',
                    data: ''
                }
            ],
            specmore:[
                {
                    id: '',
                    color: 'blue',
                    size: 'xl'
                },
                {
                    id: '',
                    color: 'red',
                    size: 'xl'
                },
                {
                    id: '',
                    color: 'blue',
                    size: 'xll'
                },
                {
                    id: '',
                    color: 'yellow',
                    size: 'xlll'
                },
                {
                    id: '',
                    color: 'yellow',
                    size: 'xlll'
                }
            ],
            updata: false,

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
        // submit() {
        //     console.log(1)
        // },
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
        },
        option($event) {
            var type = $event.currentTarget

            $(type).siblings().find('.jiao').removeClass('active')
            $(type).find('.jiao').addClass('active')
        },
        // 添加规格值
        addSpec() {
            let obj = {
                name: '红色',
                age: '',
                region: '',
                data: '',
                color: 'blue'
            }

            // // 添加规格的时候，循环添加的对象，如果有和当前已经有的对象相同熟悉。那么添加到当前已经有的对象后面。如果没有直接添

            this.spec.push(obj)
        },
        // 规格明细
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            console.log(row.color)

        }
    },
    components: {
        tinymce,
        bar
    }


}
</script>
<style scoped>
.jiao{
  position: absolute;
  height: 0px;
  width: 0px;
  border-top: 0px solid transparent;
  border-right: 0px solid #3ea0fc;
  border-bottom: 20px solid #3ea0fc;
  border-left: 20px solid transparent;
  right: 0;
  bottom: 0;
  color: white;
  display: none
}
.active{
    display: block
}
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
    padding: 0 30px;
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
}
.add_standard{
    border: 1px solid #dce0e6;
    width: 100%;
    padding: 10px;
}
.add_small_standard{
    background: #f5f5f5;
    height: 50px;
    padding: 3px 10px;
}
.el-upload__input{
    display: none
}
.standard_p{
    margin: -10px 0 30px 100px;
    color: #5f6264;
}
.updata{
    width: 88px;
    height: 88px;
    line-height: 88px;
    border: 1px dashed #888888;
    text-align: center;
    font-size: 26px
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

