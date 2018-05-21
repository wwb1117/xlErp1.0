<template>
    <div>
        <bar :step-texts="testText" :step-nums="stepNums" :current-step="currentStep"></bar>
    </div>
</template>
<script>
import bar from '@/components/stepBar'
export default {
    data() {
        return {
            testText: ['1. 上传数据', '2. 完成'],
            stepNums: 2,
            currentStep: 1
        }
    },
    components: {
        bar
    }
}
</script>
<style scoped>

</style>
