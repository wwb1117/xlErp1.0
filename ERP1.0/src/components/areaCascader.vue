<template>
    <div>
        <el-cascader
        style="width: 194px"
        :options="proviceData"
        :change-on-select="false"
        @active-item-change="change"
        :props="props"
        ></el-cascader>
    </div>
</template>

<script>
import api from 'api/common'
export default {
    data(){
        return {
            proviceData: [],
            props: {
                value: 'label'
            }
        }
    },
    computed:{},
    methods:{
        handleItemChange(val){
            console.log("123")
        },
        change(val){
            console.log(val)
        },
        getProviceData(){
            api.getProviceData().then((response) => {
                this.proviceData = []
                for (let item of response.data){
                    this.proviceData.push({
                        id: item.id,
                        provinceName: item.provinceName,
                        label: item.provinceName,
                        children: []
                    })
                }
            })
        }
    },
    created(){
        this.getProviceData()
    },
    mounted(){}
}
</script>
<style scoped>
</style>
