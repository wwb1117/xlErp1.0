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
        <section class="add_conent" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <div class="conent_box">
                <div class="step" style="height:80px">
                    <bar :step-texts="testText" :step-nums="stepNums" :current-step="currentStep"></bar>
                </div>
                <!-- 第一步 -->
                <el-form style='margin:0' v-if='conent1' >
                    <!-- 商品title -->
                    <el-form-item class="good_title" >
                        <p class="goodtitle_p">商品类型</p>
                    </el-form-item>
                    <!-- 商品类型 -->
                    <el-form-item class="good_type">
                        <el-button
                            plain
                            @click="option($event)"
                            style="position:relative"
                            class="border">
                            <div class='goodbutton'>
                                <p>实物类商品</p>
                                <span style='color:#8f9294'>（物流发货）</span>
                                <em class="jiao active"><i class="el-icon-check" style="position:absolute;bottom:-20px;right:0"></i></em>
                            </div>
                        </el-button>
                        <el-button
                            plain
                            @click="option($event)"
                            style="position:relative">
                            <div class='goodbutton'>
                                <p>服务类商品</p>
                                <span style='color:#8f9294'>（无需物流）</span>
                                <em class="jiao"><i class="el-icon-check" style="position:absolute;bottom:-20px;right:0"></i></em>
                            </div>
                        </el-button>
                        <el-button
                            plain
                            @click="option($event)"
                            style="position:relative">
                            <div class='goodbutton'>
                                <p>赠品</p>
                                <span style='color:#8f9294'>（非售商品）</span>
                                <em class="jiao"><i class="el-icon-check" style="position:absolute;bottom:-20px;right:0"></i></em>
                            </div>
                        </el-button>
                    </el-form-item>
                    <!-- 信息title -->
                    <el-form-item class="good_title">
                        <p class="goodtitle_p">基本信息</p>
                        <el-checkbox class="position" v-model="form.expirationDateStatus"><span style="font-size:10px">有无保质期</span></el-checkbox>
                    </el-form-item>
                    <!-- 信息内容 -->
                    <el-form-item class="msg_conent" >
                        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
                            <el-form-item label="商品名称" prop='title'  style="margin-bottom:25px">
                                <el-input v-model="form.title" size="small" placeholder="长度<64" style="width:688px"></el-input>
                            </el-form-item>
                            <el-form-item label="商品卖点" style="margin-bottom:25px">
                                <el-input type="textarea" v-model="form.sellingPoint" size="small" placeholder="长度<300" rows='2'></el-input>
                            </el-form-item>
                            <el-form-item label="购买提醒" style="margin-bottom:25px">
                                <el-input type="textarea" v-model="form.buyRemind" size="small" placeholder="长度<300" rows='2'></el-input>
                            </el-form-item>
                            <el-col :span='24'  style="margin-bottom:15px">
                                <el-col :span='6'>
                                    <el-form-item label="商品条码" prop='barCode' >
                                        <el-input v-model="form.barCode" size="small" placeholder="长度<64" ></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='6' style="margin-left:35px">
                                    <el-form-item label="商品编码" prop='itemCode'>
                                        <el-input v-model="form.itemCode" size="small" placeholder="长度<64" ></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span='24'  style="margin-bottom:15px">
                                <el-col :span='6'>
                                    <el-form-item label="商品品牌" prop='brandId' >
                                        <el-select v-model="form.brandId" placeholder="请选择"  size='small'>
                                            <el-option
                                                v-for="item in brandIdoptions"
                                                :key="item.id"
                                                :label="item.brandName"
                                                :value="item.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='6' style="margin-left:35px">
                                    <el-form-item label="商品分类" prop='categoryId' >
                                        <el-select v-model="form.categoryId" placeholder="请选择"  size='small'>
                                            <el-option
                                                v-for="item in categoryIdoptions"
                                                :key="item.id"
                                                :label="item.categoryName"
                                                :value="item.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span='24'  style="margin-bottom:15px">
                                <el-col :span='6'>
                                    <el-form-item label="贸易类型" prop='sendWay' >
                                        <el-select v-model="form.sendWay" placeholder="请选择"  size='small'>
                                            <el-option
                                                v-for="item in sendWayoptions"
                                                :key="item.id"
                                                :label="item.categoryName"
                                                :value="item.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='6' style="margin-left:35px">
                                    <el-form-item label="建议零售价"  class="money">
                                        <el-input v-model="form.money" size="small" placeholder="长度<64" ></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span='24'  style="margin-bottom:15px">
                                <el-col :span='6'>
                                    <el-form-item label="单位" >
                                        <el-select v-model="form.unitId" placeholder="请选择"  size='small'>
                                            <el-option
                                                v-for="item in unitIdoptions"
                                                :key="item.id"
                                                :label="item.unit"
                                                :value="item.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='6' style="margin-left:35px">
                                    <el-form-item label="保质期" prop='expirationDateName' >
                                        <el-input v-model="form.expirationDateName" size="small" placeholder="长度<64" suffix="月"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                        </el-form>
                    </el-form-item>
                    <!-- 规格title -->
                    <el-form-item class="good_title">
                        <p class="goodtitle_p">商品规格</p>
                    </el-form-item>
                    <!-- 商品规格 -->
                    <el-form-item class="standard">
                        <el-form label-width="100px">
                            <div>
                                <!-- 商品规格 -->
                                <el-form-item label="商品规格" required v-model="skuProperty">
                                    <div class="add_standard">
                                    <div v-for="(item, index) in skuProperty" :key="index">

                                        <div class="add_small_standard" >
                                            <el-form-item label="规格名" style="margin-left:-20px" >
                                                <el-select v-model="item.skuPropertyName" @change="changeSku(item, index, skuList)" placeholder="请选择活动区域" size='small' style="width:138px">
                                                    <el-option
                                                        v-for="item2 in skuList"
                                                        :key="item2.id"
                                                        :label="item2.skuPropertyName"
                                                        :value="item2.skuPropertyName"
                                                        :disabled="item2.disabled">
                                                    </el-option>
                                                </el-select>
                                                <el-checkbox v-model="checked" style="margin-left:10px"  @change="changeupload">添加规格图片</el-checkbox>
                                            </el-form-item>
                                         </div>
                                        <el-form-item label='规格值' style="margin-left:-10px;margin-top:5px" >
                                            <el-select @change="changeSKUname(item, index)" placeholder="请选择活动区域" size='small' v-for="(itemName, i) in item.itemSkuPropertyValueDTOS" :key='i' v-model="itemName.skuPropertyValueName" style="width:138px;margin-right:20px">
                                                <el-option
                                                    v-for="item3 in item.itemSkuDTOS"
                                                    :key="item3.id"
                                                    :label="item3.skuPropertyValueName"
                                                    :value="item3.skuPropertyValueName"
                                                    :disabled="item3.disabled">
                                                </el-option>
                                            </el-select>
                                            <el-button type='text' @click="addSpec(index)">添加规格值</el-button>
                                            <div style="display:flex">
                                                <div style="width:158px" v-for='(itemImg,index) in item.itemSkuPropertyValueDTOS' :key='index'>
                                                    <updata v-if='uploadshow'></updata>
                                                </div>
                                            </div>
                                            <p style="color:#888;font-size:12px">仅支持为第一组规格设置图片（最多40张图），买家选择不同规格会看到对应图片，建议尺寸：640 X 640 像素</p>
                                        </el-form-item>
                                    </div>
                                    <el-form-item>
                                        <div>
                                            <div class="add_small_standard">
                                                <el-button type="primary" size='small' @click="addSpecItem">添加规格项目</el-button>
                                            </div>
                                        </div>
                                    </el-form-item>
                                    </div>
                                    <p class="standard_p">如有颜色、尺码等多种规格，请添加商品规格</p>
                                </el-form-item>


                                <el-form-item label="规格明细">
                                    <!-- 规格明细 -->
                                    <table class='skuTable' style="width: 100%;margin-top:10px">
                                        <tr>
                                            <th width='70%'>
                                                <div class="">
                                                    商品规格
                                                </div>
                                                <div class="tableBox">
                                                    <span :key="index" v-for="(item, index) in skuProperty">{{item.skuPropertyName}}</span>
                                                </div>
                                            </th>
                                            <th width='30%'>SKU编码</th>
                                        </tr>
                                        <tr  :key="indexTable" v-for="(itemName, indexTable) in showSkuArr">
                                            <td>
                                                <div class="tableBox2">
                                                    <span :key="i" v-for='(skuName, i) in itemName'>{{skuName}}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="tableBox2">
                                                    <span></span>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </el-form-item>
                            </div>
                        </el-form>
                    </el-form-item>
                    <!-- 商品属性title -->
                    <el-form-item class="good_title">
                        <p class="goodtitle_p">商品属性</p>
                        <span class="position" style="width:470px">商品属性是对商品的补充说明，如材质、产地、储存方法等，最多添加50条</span>
                    </el-form-item>
                    <!-- 商品属性 -->
                    <el-form-item class="good_attr">
                        <div class="add_attr" >
                            <el-form ref="attr" label-width="100px" >
                                <el-form-item label="商品规格">
                                    <el-col :span="24"  v-for='(attrnum,index) in property' :key="index" >
                                        <el-col :span="2">
                                            <el-input size="small" placeholder="属性名" v-model="attrnum.propertyName" ></el-input>
                                        </el-col>
                                        <el-col :span="18" style="margin-left:10px">
                                            <el-input size="small" placeholder="属性值" v-model="attrnum.propertyValue" ></el-input>
                                        </el-col>
                                        <i class="el-icon-close" style="margin-left:10px" @click="removeattr(index)"></i>
                                    </el-col>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="add_button">
                            <el-button type="text" @click="pushAttr">添加属性</el-button>
                        </div>
                    </el-form-item>
                    <!-- 商品主图 -->
                    <el-form-item class="good_title">
                        <p class="goodtitle_p">商品主图</p>
                        <span class="position" style="width:470px">主图大小不能超过1MB;尺寸：700*700px;最多5张</span>
                    </el-form-item>
                    <!-- 图片上传 -->
                    <el-form-item class="pic_up">
                        <div class="updata_box">
                            <el-upload
                                :action="upDateImgUrl"
                                :data='sentData'
                                :file-list='fileList1'
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove"
                                :on-success='handleAvatarSuccess'>
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <!-- action上传地址 -->
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                    </el-form-item>
                    <!-- 商品详情title -->
                    <el-form-item class="good_title">
                        <p class="goodtitle_p">商品详情</p>
                    </el-form-item>
                    <!-- 富编辑器 -->
                    <el-form-item>
                        <div style="padding:10px;background:white">
                            <div id='editor1'></div>
                        </div>
                    </el-form-item>
                </el-form>
                <!-- 第二步 -->
                <ul style='margin:0' v-if='conent2'>
                    <!-- 供货设置title -->
                    <li class="good_title">
                        <p>供货设置</p>
                    </li>
                    <!-- 供货设置 -->
                    <li class="supply">
                        <el-form  :model="nextform" label-width="100px">
                            <el-form-item label="包装类型">
                                <div class="add_standard">
                                    <div class="add_small_standard add_standard">
                                        <el-form-item label="类型名" label-width="70px">
                                            <el-select v-model="nextform.typesname" placeholder="选择类型名" size='small'  @change='gettypevalue'>
                                                <el-option
                                                v-for="item in typenameoptions"
                                                :key="item.id"
                                                :label="item.unitMsg"
                                                :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                    <div style="padding:10px;display:flex" class="supply_check">
                                        <el-form-item label="类型值" label-width="70px">
                                            <span style="position:relative;margin-right:20px" v-for="(items, index) in nextform.typesvalue" :key="index" >
                                                <el-select v-model="items.id" placeholder="选择类型值" size='small'>
                                                    <el-option
                                                    v-for="item in typevalueoptions"
                                                    :key="item.id"
                                                    :label="item.supplyMsg"
                                                    :value="item.id"
                                                    :disabled="item.disabled">
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
                        <el-form  :model="nextform" label-width="100px">
                            <el-form-item label="分享图片" style="margin-bottom:30px">
                                <div class="updata_box ">
                                    <el-upload
                                        :action="this.upDateImgUrl2"
                                        :data='sentData2'
                                        :file-list='fileList2'
                                        list-type="picture-card"
                                        :on-preview="handlePictureCardPreview2"
                                        :on-remove="handleRemove2"
                                        :on-success='handleAvatarSuccess2'>
                                        <i class="el-icon-plus" style="font-size:16px"></i>
                                    </el-upload>
                                    <!-- action上传地址 -->
                                    <el-dialog :visible.sync="otherVisible">
                                        <img width="100%" :src="otherImgUrl" alt="">
                                    </el-dialog>
                                </div>
                                <p style="color:#a1a4a4">最多上传9张图片，建议尺寸为：640px X 640px</p>
                            </el-form-item>
                            <el-form-item label="分享内容">
                                <div style="background:white">
                                    <div id='editor2'></div>
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
                         <el-form  :model="nextform" label-width="100px">
                            <el-form-item label="报价设置"  style="margin:0">
                                <el-select v-model="nextform.setmoneny" placeholder="选择类型" size='small'>
                                    <el-option
                                        v-for="item in setmonenyoptions"
                                        :key="item.id"
                                        :label="item.value"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item >
                                <el-tag size="small" closable>供应商分组</el-tag>
                            </el-form-item>
                            <el-form-item label="商品热度" >
                                <el-input v-model="nextform.goodhot" size='small' style="width:215px"></el-input>
                            </el-form-item>
                            <el-form-item label="减库存设置">
                                <el-radio v-model="nextform.delnum" label="1">下单减库存</el-radio>
                                <el-radio v-model="nextform.delnum" label="2">支付减库存</el-radio>
                            </el-form-item>
                            <el-form-item label="提成设置">
                                <el-select v-model="nextform.deduct" placeholder="选择类型" size='small'>
                                    <el-option
                                        v-for="item in deductoptions"
                                        :key="item.id"
                                        :label="item.value"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </li>
                </ul>
            </div>
        </section>
        <!-- 控制步骤 -->
        <div class="add_bottom" v-if='conent1'>
            <el-button @click="reset" size='small' style="width:90px">重置</el-button>
            <el-button @click="next" size='small' type="primary" style="width:90px">下一步</el-button>
        </div>
        <!-- 控制步骤 -->
        <div class="add_bottom" v-if='conent2'>
            <el-button @click="prev" size='small' type="primary" style="width:90px">上一步</el-button>
            <el-button @click="submit" size='small' style="width:90px">保存</el-button>
        </div>
    </section>

</template>
<script>
import bar from '@/components/stepBar'
import updata from '@/components/updata'
import api from 'api/goods'
import WangEditor from 'wangeditor'

export default {
    name: 'addGoods',
    data () {
        return {

            // 验证
            rules: {
                title: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' }
                ],
                barCode: [
                    { required: true, message: '请输入商品条码', trigger: 'blur' }
                ],
                itemCode: [
                    { required: true, message: '请输入商品编号', trigger: 'blur' }
                ],
                brandId: [
                    { required: true, message: '请选择商品品牌', trigger: 'blur' }
                ],
                categoryId: [
                    { required: true, message: '请选择商品分类', trigger: 'blur' }
                ],
                sendWay: [
                    { required: true, message: '请选择贸易类型', trigger: 'blur' }
                ]
            },

            // 商品主图
            dialogImageUrl: '',
            dialogVisible: false,

            // 分享图片
            otherImgUrl: '',
            otherVisible: false,

            upDateImgUrl: process.env.API_ROOT + '/f/upload',
            sentData: {
                file: '',
                uploadType: 'erp'
            },
            fileList1:[],

            upDateImgUrl2: process.env.API_ROOT + '/f/upload',
            sentData2: {
                file: '',
                uploadType: 'erp'
            },
            fileList2:[],

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

            // 信息内容
            form: {
                itemType: 1,
                isPresent: 0,
                title: '',
                sellingPoint: '',
                buyRemind: '',
                barCode: '',
                itemCode: '',
                brandId: [],
                categoryId: [],
                sendWay: [],
                money: '',
                unitId: [],
                expirationDateName: '',
                expirationDateStatus: false
            },
            // 信息表单选项
            brandIdoptions:[],
            categoryIdoptions:[],
            sendWayoptions:[
                {
                    id:'1',
                    categoryName: '国内贸易'
                },
                {
                    id:'2',
                    categoryName: '保税区直供'
                },
                {
                    id:'3',
                    categoryName: '海外直邮'
                }
            ],
            unitIdoptions:[],
            itemImgs1:[
                {
                    imgUrl:''
                }
            ],

            // 商品规格
            checked: false,
            // 规格值
            uploadshow: false,
            skuList: [],
            showSkuArr: [],
            allList_0: [],
            allList_1: [],
            allList_2: [],
            skuProperty: [],

            // 属性表单
            property: [
                {
                    propertyName: '',
                    propertyValue: ''
                }
            ],

            // 内容2
            // 商品选择包装类型
            nextform: {
                typesname: [],
                typesvalue: [
                    {
                        id:''
                    }
                ],
                setmoneny:[],
                goodhot:'',
                delnum: '1',
                deduct: []
            },
            itemImgs2:[
                {
                    imgUrl:''
                }
            ],

            // 包装类型
            typenameoptions:[],
            typevalueoptions:[],

            // 报价提成
            setmonenyoptions: [],
            deductoptions:[]

        }
    },
    methods:{
        // 下一步保存数据请求接口
        next() {
            if (this.form.expirationDateStatus == true){
                this.rules.expirationDateName = [
                    { required: true, message: '请输入保质期限', trigger: 'blur' }
                ]
            }
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.currentStep = 2
                    this.conent1 = false
                    this.conent2 = true

                    this.$nextTick(() => {
                        this.editor2 = new WangEditor('#editor2')
                        this.editor2.create()
                    })
                    // 判断商品类型
                    var that = this

                    $(".goodbutton").each(function(i){
                        if ($(".goodbutton").eq(i).find('.jiao').hasClass('active')){
                            if ($(".goodbutton").eq(i).find('p').text() == '实物类商品'){
                                // alert(1)
                                that.form.itemType = 1
                                that.form.isPresent = 0
                            }
                            if ($(".goodbutton").eq(i).find('p').text() == '服务类商品'){
                                // alert(2)
                                that.form.itemType = 0
                                that.form.isPresent = 0
                            }
                            if ($(".goodbutton").eq(i).find('p').text() == '赠品'){
                                // alert(3)
                                that.form.itemType = 1
                                that.form.isPresent = 1
                            }
                        }
                    });

                    if (this.fileList1.length >= this.itemImgs1.length){
                        for (var s = 0 ; s < this.fileList1.length - 1 ; s ++){
                            let obj = [
                                {
                                    imgUrl:''
                                }
                            ]

                            this.itemImgs1.push(obj)
                        }
                    }
                    for (var d in this.itemImgs1){
                        for (var g in this.fileList1){
                            this.itemImgs1[d].imgUrl = this.fileList1[g].url
                        }
                    }

                    var skuProperty = [
                        {
                            id: '',
                            skuPropertyName: '',
                            itemSkuPropertyValueDTOS: [
                                {
                                    skuPropertyValueName: ''
                                }
                            ]
                        }
                    ]

                    if (this.skuProperty.length >= skuProperty.length){
                        for (var v = 0 ; v < this.skuProperty.length - 1 ; v ++){
                            let obj = {
                                id: '',
                                skuPropertyName: '',
                                itemSkuPropertyValueDTOS: [
                                    {
                                        skuPropertyValueName: ''
                                    }
                                ]
                            }

                            skuProperty.push(obj)
                        }
                    }

                    for (var t in skuProperty){
                        skuProperty[t].skuPropertyName = this.skuProperty[t].skuPropertyName
                        for (var c in skuProperty[t].itemSkuPropertyValueDTOS){
                            skuProperty[t].itemSkuPropertyValueDTOS[c].skuPropertyValueName = this.skuProperty[t].itemSkuPropertyValueDTOS[c].skuPropertyValueName
                        }
                    }

                    for (var m in this.skuList){
                        for (var l in skuProperty){
                            if (skuProperty[l].skuPropertyName == this.skuList[m].skuPropertyName){
                                skuProperty[l].id = this.skuList[m].id
                            }
                        }
                    }

                    if (this.form.expirationDateStatus == false){
                        this.form.expirationDateStatus = 0
                    } else {
                        this.form.expirationDateStatus = 1
                    }
                    // console.log(skuProperty)
                    let obj = {
                        // 商品信息
                        itemType: this.form.itemType,
                        isPresent: this.form.isPresent,
                        title: this.form.title,
                        sellingPoint: this.form.sellingPoint,
                        buyRemind: this.form.buyRemind,
                        barCode: this.form.barCode,
                        itemCode: this.form.itemCode,
                        brandId: this.form.brandId,
                        categoryId: this.form.categoryId,
                        sendWay: this.form.sendWay,
                        money: this.form.money,
                        unitId: this.form.unitId,
                        expirationDateStatus: this.form.expirationDateStatus,
                        expirationDateName: this.form.expirationDateName,
                        // 商品规格
                        skuProperty: JSON.stringify(skuProperty),
                        // 商品属性
                        property: JSON.stringify(this.property),
                        // 商品图片
                        itemImgs: JSON.stringify(this.itemImgs1),
                        // 商品描述
                        description: this.editor1.txt.text()
                    }

                    console.log(obj)
                    // console.log(this.skuProperty)
                    api.postitemaddItemFirstStep(obj).then((response)=>{
                        // alert(1)
                    }).catch((error)=>{
                        console.log(error)
                    })

                }
            })
        },
        prev() {
            this.currentStep = 1
            this.conent1 = true
            this.conent2 = false

            this.$nextTick(() => {
                this.editor1 = new WangEditor('#editor1')
                this.editor1.create()
            })

        },
        submit() {
            if (this.fileList2.length >= this.itemImgs2.length){
                for (var s = 0 ; s < this.fileList2.length - 1 ; s ++){
                    let obj = [
                        {
                            imgUrl:''
                        }
                    ]

                    this.itemImgs2.push(obj)
                }
            }
            for (var d in this.itemImgs2){
                for (var g in this.fileList2){
                    this.itemImgs2[d].imgUrl = this.fileList2[g].url
                }
            }

            let arr = []

            for (var r in this.nextform.typesvalue){
                arr.push(this.nextform.typesvalue[r].id)
            }

            let obj = {
                typesname: this.nextform.typesname.toString(),
                typesvalue: arr.toString(),
                setmoneny:this.nextform.setmoneny.toString(),
                goodhot:this.nextform.setmoneny,
                delnum: this.nextform.setmoneny,
                deduct: this.nextform.deduct.toString(),
                shareImg:JSON.stringify(this.itemImgs2),
                sharetext:this.editor2.txt.text()
            }

            console.log(obj)
            api.postitemaddItemSecondStep(obj).then((response)=>{
                // alert(1)
            }).catch((error)=>{
                console.log(error)
            })
        },
        // 上传图片
        // 移除
        handleRemove(file, fileList) {
            // console.log(file, fileList);
            for (var i in this.fileList1){
                if (this.fileList1[i].url == file.url){

                    this.fileList1.splice(i, 1)
                }
            }
        },
        // 变大查看
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 成功回调
        handleAvatarSuccess(file, fileList) {
            this.fileList1.push(fileList.response.data)
        },
        // 分享图片
        handleRemove2(file, fileList) {
            // console.log(file, fileList);
            for (var i in this.fileList2){
                if (this.fileList2[i].url == file.url){

                    this.fileList2.splice(i, 1)
                }
            }
        },
        handlePictureCardPreview2(file) {
            this.otherImgUrl = file.url;
            this.otherVisible = true;
        },
        handleAvatarSuccess2(file, fileList) {
            this.fileList2.push(fileList.response.data)
        },
        // 重置
        reset() {
            this.$refs['form'].resetFields();
        },

        // 第二页添加规格
        add() {
            let obj = {
                id:''
            }

            for (var e in this.typevalueoptions){
                this.typevalueoptions[e].disabled = false
            }

            for (var i in this.nextform.typesvalue){
                for (var j in this.typevalueoptions){
                    if (this.nextform.typesvalue[i].id == this.typevalueoptions[j].id){

                        this.typevalueoptions[j].disabled = true
                    }
                }
            }

            this.nextform.typesvalue.push(obj)
        },
        // 第二页删除规格
        delet(index){
            if (this.nextform.typesvalue.length != 1) {
                this.nextform.typesvalue.splice(index, 1)
            }
            this.typevalueoptions[index].disabled = false
        },

        // 第一页添加属性
        pushAttr() {
            let obj = {
                propertyName: '',
                propertyValue: ''
            }

            this.property.push(obj)
        },
        // 第一页移除属性
        removeattr(data) {
            if (this.property.length > 1){
                this.property.splice(data, 1)
            }
        },
        // 第一页分类样式
        option($event) {
            var type = $event.currentTarget

            $(type).siblings().removeClass('border').find('.jiao').removeClass('active')
            $(type).addClass('border').find('.jiao').addClass('active')
        },
        // 第一页添加规格
        addSpec(index) {
            let obj = {
                skuPropertyValueName: '',
                skuImg: '',
                id: ''
            }

            // 添加规格的时候，循环添加的对象，如果有和当前已经有的对象相同熟悉。那么添加到当前已经有的对象后面。如果没有直接添
            this.skuProperty[index].itemSkuPropertyValueDTOS.push(obj)
        },
        // 第一页修改规格值
        changeSKUname(data, index) {
            data.itemSkuDTOS.forEach((obj) => {
                obj.disabled = false
            })
            // 已经选择的规格值
            data.itemSkuPropertyValueDTOS.forEach((res) => {
                data.itemSkuDTOS.forEach((obj, i) => {
                    if (res.skuPropertyValueName == obj.skuPropertyValueName) {
                        // parentItem.itemSkuDTOS.splice(i, 1)
                        obj.disabled = true
                        // console.log(obj, "ces ")
                    }
                })
            })
            if (index == 0) {
                this.allList_0 = []
                data.itemSkuPropertyValueDTOS.forEach((res, i) => {
                    this.allList_0.push(res.skuPropertyValueName)
                })
            } else if (index == 1) {
                this.allList_1 = []
                data.itemSkuPropertyValueDTOS.forEach((res) => {
                    this.allList_1.push(res.skuPropertyValueName)
                })
            } else if (index == 2) {
                this.allList_2 = []
                data.itemSkuPropertyValueDTOS.forEach((res) => {
                    this.allList_2.push(res.skuPropertyValueName)
                })
            }
            let len1 = this.allList_0.length == 0 ? 1 : this.allList_0.length
            let len2 = this.allList_1.length == 0 ? 1 : this.allList_1.length
            let len3 = this.allList_2.length == 0 ? 1 : this.allList_2.length
            let length = len1 * len2 * len3

            this.showSkuArr = new Array(length)
            for (let i = 0; i < length; i++) {
                let j = i % this.allList_0.length
                let k = i % this.allList_1.length
                let m = i % this.allList_2.length
                let arr = []

                if (this.allList_0[j]) {
                    arr.push(this.allList_0[j])
                }
                if (this.allList_1[k]) {
                    arr.push(this.allList_1[k])
                }
                if (this.allList_2[m]) {
                    arr.push(this.allList_2[m])
                }
                this.showSkuArr[i] = arr
            }

            // console.log(this.showSkuArr, 'sku总列表展示')
            // console.log(this.skuProperty, 'sku传递给后台数据')
        },
        // 第一页修改规格名去重
        changeSku(data, index, skuList) {
            this.skuList.forEach((res) => {
                res.disabled = false
            })
            this.skuList.forEach((res) => {
                if (res.skuPropertyName == data.skuPropertyName) {
                    res.disabled = true
                }
            })
            data.itemSkuPropertyValueDTOS = [{
                id: '',
                skuImg: '',
                skuPropertyValueName: ''
            }]
            this.$set(data, 'itemSkuDTOS', [])
            api.getitemskuPropertylist({skuPropertyName: data.skuPropertyName}).then((res) => {
                // console.log(res)
                res.data.list[0].propertyValueList.forEach(re => {
                    let obj = {
                        skuPropertyValueName: re.skuPropertyValueName,
                        skuImg: '',
                        id: re.id
                    }

                    data.itemSkuDTOS.push(obj)
                })
            })

            // console.log(data, index, '修改规格名')
        },
        // 第一页获取规格列表
        getSkuList() {
            api.getitemskuPropertylist().then((res) => {
                this.skuList = res.data.list
                // console.log(this.skuList, "商品规格")
            })
        },
        // 第一页添加规格项目
        addSpecItem() {
            let obj = {
                skuPropertyName: "",
                itemSkuPropertyValueDTOS :[
                    {
                        skuPropertyValueName: "",
                        skuImg: '',
                        id: ''
                    }
                ]
            }

            this.skuProperty.push(obj)
        },
        changeupload() {
            this.uploadshow = !this.uploadshow
        },

        // 第一页
        // 获取商品品牌选项
        getbrandId() {
            let obj = {
                pageNo: 1,
                pageSize: 999999
            }

            api.getitemBrandlist(obj).then((response)=>{
                // console.log(response)
                this.brandIdoptions = response.data.list
            }).catch((error)=>{
                console.log(error)
            })
        },
        // 获取商品分类选项
        getcategoryId() {
            api.getcategorylist().then((response)=>{
                // console.log(response)
                this.categoryIdoptions = response.data

            }).catch((error)=>{
                console.log(error)
            })
        },
        // 获取单位选项
        getunitId() {
            api.getitemunitlist().then((response)=>{
                this.unitIdoptions = response.data.list
                // console.log(response)
            }).catch((error)=>{
                console.log(error)
            })
        },

        // 第二页
        // 获取包装类型规格
        gettypename() {
            let obj = {
                pageNo: 1,
                pageSize: 999999
            }

            api.getitemsupplyPropertylist(obj).then((response)=>{
                // console.log(response)
                this.typenameoptions = response.data.list
            }).catch((error)=>{
                console.log(error)
            })
        },
        gettypevalue() {

            api.getitemsupplyPropertyunitId(this.nextform.typesname.toString()).then((response)=>{
                // console.log(response)
                this.typevalueoptions = response.data.itemSupplyPropertyVOs
            }).catch((error)=>{
                console.log(error)
            })
        },
        clear() {
            this.form = {
                itemType: 1,
                isPresent: 0,
                title: '',
                sellingPoint: '',
                buyRemind: '',
                barCode: '',
                itemCode: '',
                money: '',
                expirationDateName: '',
                expirationDateStatus: false
            }
            this.nextform = {
                typesname: [],
                typesvalue: [
                    {
                        id:''
                    }
                ],
                setmoneny:[],
                goodhot:'',
                delnum: '1',
                deduct: []
            }
            this.conent1 = true
            this.conent2 = false
            this.active = 1
            this.currentStep = 1
            this.property = [
                {
                    propertyName: '',
                    propertyValue: ''
                }
            ]
            this.skuProperty = []
            this.fileList1 = []
            this.fileList2 = []
            this.checked = false
            this.uploadshow = false
            this.skuList = []
            this.showSkuArr = []
            this.allList_0 = []
            this.allList_1 = []
            this.allList_2 = []
        },
        get() {
            this.getbrandId()
            this.getcategoryId()
            this.gettypename()
            this.getunitId()
        }

    },
    components: {
        bar,
        updata
    },
    created() {
        this.get()
    },
    activated() {
        this.clear()
        this.get()
    },
    mounted() {
        this.getSkuList()
        this.editor1 = new WangEditor('#editor1')
        this.editor1.create()
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
    display: block;
}
.border{
    border: 1px solid #3ea0fc;
    color: #3ea0fc
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
    display: flex;
    margin: 0
}
.position{
    position: absolute;
    left: 100px;
    top:0;
    font-size: 12px
}
.goodtitle_p{
    margin-left: 10px;
    font-weight: 600
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
    border-top:1px solid #e6e9e9;
    overflow: auto
}
.conent_box{
    border: 1px solid #e6e9e9
}
.conent_box .el-form-item{
    margin: 0
}
/* 步骤 */
.step{
    padding: 20px 10px;
    background: white;
}

/* 第一步 */

/* 商品类型 */
.good_type{
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
    margin-left: 10px;
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
    margin:0 0 0 100px
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
    background: white;
    border-top:1px solid #e5e8e8;
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
.skuTable {
    text-align: center;
    font-size: 14px;
    margin-top: 20px;
    margin-bottom: 20px;
    border: 1px solid #eee;
    width: 100%;
}
.skuTable .el-input__inner {
    width: 80%;
    height: 30px;
    margin: 5%;
}
.skuTable .tableBox {
    display: flex;
    border-top: 1px solid #eee;
}
.skuTable .tableBox span {

    flex: 1;
    display: inline-block;
}
.skuTable .tableBox tr {
    text-align: center;
    border: 1px solid #eee;
}
.skuTable div {
    text-align: center;
    line-height: 50px;
    height: 50px
}
.skuTable td {
    border: 1px solid #eee;
    font-weight: 400;
}
.skuTable .tableBox2 {
    display: flex;
}
.skuTable .tableBox2 span {
    flex: 1;
}
.skuTable th {
    text-align: center;
    font-weight: 400;
    height: 50px;
    border: 1px solid #eee;
}

</style>

