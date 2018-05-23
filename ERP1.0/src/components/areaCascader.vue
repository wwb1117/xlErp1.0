<template>
    <div>
        <el-cascader
        style="width: 194px"
        :options="proviceData"
        :change-on-select="false"
        @change="change"
        @active-item-change="handleItemChange"
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
            selectedOptions3: [],
            props: {
                value: 'id'
            }
        }
    },
    computed:{},
    methods:{
        handleItemChange(val){
            if (val){
                var leng = val.length
                var proItemData = null

                if (leng == 1){
                    var proid = val[leng - 1]

                    proItemData = this.findProData(proid)
                    api.getCityData(proid).then((response) => {
                        if (response.data.length > 0){
                            proItemData.children = []
                            for (var city of response.data){
                                proItemData.children.push({
                                    id: city.id,
                                    label: city.cityName,
                                    children: []
                                })
                            }
                        }
                    })
                } else if (leng == 2){
                    var cityid = val[leng - 1]

                    proItemData = this.findProData(val[0]).children
                    var cityItemData = this.findCityData(proItemData, cityid)

                    api.getAreaData(cityid).then((response) => {

                        if (response.data.length > 0){
                            cityItemData.children = []
                            for (var area of response.data){
                                cityItemData.children.push({
                                    id: area.id,
                                    label: area.areaName
                                })
                            }
                        }
                    })

                } else {
                }
            }
        },
        change(val){
            this.$emit("areaFromChild", val)
        },
        getProviceData(){
            api.getProviceData().then((response) => {
                this.proviceData = []
                for (let item of response.data){
                    this.proviceData.push({
                        id: item.id,
                        label: item.provinceName,
                        children: []
                    })
                }
            })
        },
        findProData(id){
            for (var item of this.proviceData){
                if (item.id == id){
                    return item
                }
            }
        },
        findCityData(proArr, id){
            for (var item of proArr){
                if (item.id == id){
                    return item
                }
            }
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
