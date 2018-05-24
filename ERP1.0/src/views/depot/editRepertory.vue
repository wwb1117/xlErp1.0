<template>
    <div>
        <div class="model_topcol">
            <span style="color: #409EFF">仓库管理</span>
            <span> - {{$route.params.type}}仓库</span>
        </div>
        <div class="model_content" >
            <div class="content" :style="{height: $store.state.home.modelContentHeight - 20 + 'px'}">
                <el-form :inline="true" :model="addFormData" :rules="rules" label-position="right" size="small" label-width="110px">
                    <div class="banner">
                        基本信息
                    </div>
                    <div class="baseInfoBox editRepertory">
                        <el-form-item label="仓库编码" prop="warehouseNo">
                            <el-input v-model="addFormData.warehouseNo" placeholder="请输入仓库编码" class="w50_item"></el-input>
                        </el-form-item>
                        <el-form-item label="仓库名称" prop="warehouseName">
                            <el-input v-model="addFormData.warehouseName" placeholder="请输入仓库名称" class="w50_item"></el-input>
                        </el-form-item>
                        <el-form-item prop="personResponsible" label="负责人">
                            <el-input v-model="addFormData.personResponsible" placeholder="请输入负责人" class="w50_item"></el-input>
                        </el-form-item>
                        <el-form-item prop="phone" label="负责人手机号">
                            <el-input v-model="addFormData.phone" placeholder="请输入负责人手机号" class="w50_item"></el-input>
                        </el-form-item>
                        <el-form-item prop="acreage" label="面积m²">
                            <el-input v-model="addFormData.acreage" placeholder="请输入面积" class="w50_item"></el-input>
                        </el-form-item>
                        <el-form-item prop="zone" label="所在地区">
                            <!--<el-cascader-->
                            <!--:options="options"-->
                            <!--v-model="addFormData.zone"-->
                            <!--class="w50_item"-->
                            <!--&gt;</el-cascader>-->
                        </el-form-item>
                        <el-form-item prop="warehouseAddress" label="详细地址" class="w100">
                            <el-input v-model="addFormData.warehouseAddress" placeholder="请输入详细地址" class="w100_item"></el-input>
                        </el-form-item>
                        <el-form-item prop="remark" label="备注" class="w100">
                            <el-input
                                v-model="addFormData.remark"
                                type="textarea"
                                :rows="4"
                                class="w100_item"
                                placeholder="请输入备注">
                            </el-input>
                        </el-form-item>
                    </div>

                </el-form>
            </div>
        </div>
        <div class="model_footer">
            <el-button style="width: 90px" type="primary" size="small">保存</el-button>
            <el-button style="width: 90px" size="small" @click="goBack">取消</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            addFormData: {
                id: '',
                warehouseNo: '',
                warehouseName: '',
                activateState: '',
                personResponsible: '',
                phone: '',
                warehouseAddress: '',
                acreage: '',
                remark: '',
                provinceId: '',
                cityId: '0',
                areaId: '0',
                zone: ''
            },
            rules: {
                warehouseNo: [
                    {required: true, message: '请输入仓库编码', trigger: 'blur'}
                ],
                warehouseName: [
                    { required: true, message: '请输入仓库名称', trigger: 'blur' }
                ]
            },
            options: [{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                        value: 'yizhi',
                        label: '一致'
                    }, {
                        value: 'fankui',
                        label: '反馈'
                    }, {
                        value: 'xiaolv',
                        label: '效率'
                    }, {
                        value: 'kekong',
                        label: '可控'
                    }]
                }, {
                    value: 'daohang',
                    label: '导航',
                    children: [{
                        value: 'cexiangdaohang',
                        label: '侧向导航'
                    }, {
                        value: 'dingbudaohang',
                        label: '顶部导航'
                    }]
                }]
            }, {
                value: 'zujian',
                label: '组件',
                children: [{
                    value: 'basic',
                    label: 'Basic',
                    children: [{
                        value: 'layout',
                        label: 'Layout 布局'
                    }, {
                        value: 'color',
                        label: 'Color 色彩'
                    }, {
                        value: 'typography',
                        label: 'Typography 字体'
                    }, {
                        value: 'icon',
                        label: 'Icon 图标'
                    }, {
                        value: 'button',
                        label: 'Button 按钮'
                    }]
                }, {
                    value: 'form',
                    label: 'Form',
                    children: [{
                        value: 'radio',
                        label: 'Radio 单选框'
                    }, {
                        value: 'checkbox',
                        label: 'Checkbox 多选框'
                    }, {
                        value: 'input',
                        label: 'Input 输入框'
                    }, {
                        value: 'input-number',
                        label: 'InputNumber 计数器'
                    }, {
                        value: 'select',
                        label: 'Select 选择器'
                    }, {
                        value: 'cascader',
                        label: 'Cascader 级联选择器'
                    }, {
                        value: 'switch',
                        label: 'Switch 开关'
                    }, {
                        value: 'slider',
                        label: 'Slider 滑块'
                    }, {
                        value: 'time-picker',
                        label: 'TimePicker 时间选择器'
                    }, {
                        value: 'date-picker',
                        label: 'DatePicker 日期选择器'
                    }, {
                        value: 'datetime-picker',
                        label: 'DateTimePicker 日期时间选择器'
                    }, {
                        value: 'upload',
                        label: 'Upload 上传'
                    }, {
                        value: 'rate',
                        label: 'Rate 评分'
                    }, {
                        value: 'form',
                        label: 'Form 表单'
                    }]
                }, {
                    value: 'data',
                    label: 'Data',
                    children: [{
                        value: 'table',
                        label: 'Table 表格'
                    }, {
                        value: 'tag',
                        label: 'Tag 标签'
                    }, {
                        value: 'progress',
                        label: 'Progress 进度条'
                    }, {
                        value: 'tree',
                        label: 'Tree 树形控件'
                    }, {
                        value: 'pagination',
                        label: 'Pagination 分页'
                    }, {
                        value: 'badge',
                        label: 'Badge 标记'
                    }]
                }, {
                    value: 'notice',
                    label: 'Notice',
                    children: [{
                        value: 'alert',
                        label: 'Alert 警告'
                    }, {
                        value: 'loading',
                        label: 'Loading 加载'
                    }, {
                        value: 'message',
                        label: 'Message 消息提示'
                    }, {
                        value: 'message-box',
                        label: 'MessageBox 弹框'
                    }, {
                        value: 'notification',
                        label: 'Notification 通知'
                    }]
                }, {
                    value: 'navigation',
                    label: 'Navigation',
                    children: [{
                        value: 'menu',
                        label: 'NavMenu 导航菜单'
                    }, {
                        value: 'tabs',
                        label: 'Tabs 标签页'
                    }, {
                        value: 'breadcrumb',
                        label: 'Breadcrumb 面包屑'
                    }, {
                        value: 'dropdown',
                        label: 'Dropdown 下拉菜单'
                    }, {
                        value: 'steps',
                        label: 'Steps 步骤条'
                    }]
                }, {
                    value: 'others',
                    label: 'Others',
                    children: [{
                        value: 'dialog',
                        label: 'Dialog 对话框'
                    }, {
                        value: 'tooltip',
                        label: 'Tooltip 文字提示'
                    }, {
                        value: 'popover',
                        label: 'Popover 弹出框'
                    }, {
                        value: 'card',
                        label: 'Card 卡片'
                    }, {
                        value: 'carousel',
                        label: 'Carousel 走马灯'
                    }, {
                        value: 'collapse',
                        label: 'Collapse 折叠面板'
                    }]
                }]
            }, {
                value: 'ziyuan',
                label: '资源',
                children: [{
                    value: 'axure',
                    label: 'Axure Components'
                }, {
                    value: 'sketch',
                    label: 'Sketch Templates'
                }, {
                    value: 'jiaohu',
                    label: '组件交互文档'
                }]
            }],
            selectedOptions: ['zujian', 'data', 'tag']

        }
    },
    computed:{},
    methods:{
        getRepertoryDetail() {
            this.addFormData = this.$route.params.data
        },
        goBack() {
            this.$router.back(-1)
        }
    },
    created(){},
    activated () {
        this.getRepertoryDetail()
    },
    deactivated () {
    },
    mounted(){

    }
}
</script>
<style scoped>
    .banner{
        height: 40px;
        background: #f5f5f5;
        line-height: 40px;
        color: #606266;
        font-weight: 600;
        padding-left: 10px;
    }
    .baseInfoBox{
        padding-top: 10px;
    }
    .el-icon-more{
        cursor: pointer;
    }
    .el-date-editor{
        width: 194px;
    }
    .model_footer{
        line-height: 50px;
        text-align: left;
        padding-left: 40px;
    }
    .content{
        overflow: auto;
        background: #FFFFFF;
    }
    .goodInfoBox{
        width: 100%;
        margin-top: 20px;
    }
    .goodInfoBox .el-form-item{
        width: 400px;
    }
    .editRepertory{
        max-width: 870px;
    }
    .editRepertory .el-form-item{
        width: 400px;
    }
    .editRepertory .w100{
        width: 100%;
    }
    .editRepertory .w100_item{
        width: 675px;
    }
    .editRepertory .w50_item{
        width: 260px;
    }
    .myForm .el-form-item__content input{
        width: 300px;
    }
</style>
