<template>
    <div>
        <div class="model_topcol">
            <span style="color: #409EFF">采购单</span>
            <span> - 导入采购单</span>
            <div>
                <el-button type="primary" size="small">下载模板</el-button>
            </div>
        </div>
        <div class="model_content" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <div class="model_content_inner">
                <step-bar :step-texts="testText" :step-nums="stepNums" :current-step="currentStep"></step-bar>
            </div>
        </div>
        <div class="model_footer">
            <el-button size="small" style="width: 90px; margin-left: 25px;">返 回</el-button>
        </div>
    </div>
</template>

<script>
import stepBar from 'components/stepBar'
export default {
    components: {
        stepBar
    },
    data(){
        return {
            testText: ['1. 上传数据', '2. 完成'],
            stepNums: 2,
            currentStep: 1
        }
    },
    computed:{},
    methods:{


    },
    created(){},
    mounted(){
        setTimeout(() => {
            this.currentStep = 2
        }, 3000)
    }
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
</style>
