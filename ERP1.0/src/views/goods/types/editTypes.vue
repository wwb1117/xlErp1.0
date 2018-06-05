<template>
    <section :style="{height: $store.state.home.modelContentHeight + 'px'}">
        <header class="editTypes_header">
            <el-breadcrumb separator='-' style="line-height:45px;font-size:15px">
                <el-breadcrumb-item :to="{ path: '/goodsTypes' }">商品规格</el-breadcrumb-item>
                <el-breadcrumb-item>新增规格</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <section class="editTypes_conent" >
            <div class="editTypes_box AEgoods_box" :style="{height: $store.state.home.modelContentHeight-23 + 'px'}">
                <el-form ref="types"  label-width="100px">
                    <el-form-item label="规格名称" required >
                        <el-input v-model="from.unitMsg" style="width:338px" size='small' disabled></el-input>
                    </el-form-item>
                    <el-form-item label="规格值" required :style="{height: (from.itemSupplyPropertyVOs.length)*50 + 'px'}">
                        <el-table
                            :data='from.itemSupplyPropertyVOs'
                            border
                            style="width:658px">
                            <el-table-column
                                width='55'>
                                <template slot-scope="scope">
                                    <div class="icon_box" style="height:50px;line-height:50px;margin-left:10px">
                                        <i class="el-icon-plus" style="font-weight:700" @click="editTypesnum"></i>
                                        <!-- <i class="el-icon-minus" style="margin-left:5px;font-weight:700" @click="removeTypesnum(scope)"></i> -->
                                    </div>
                                </template>
                            </el-table-column>
                            <!-- 规格值 -->
                            <el-table-column
                                prop="supplyMsg"
                                label="规格值"
                                width="410">
                                <template slot-scope="scope">
                                    <div>
                                        <el-input  v-model="scope.row.supplyMsg" placeholder="输入规格名称" size='small' style="width:388px"></el-input>
                                    </div>
                                </template>
                            </el-table-column>
                            <!-- 商品数量 -->
                            <el-table-column
                                prop="skuNumber"
                                label="含商品数量">
                                <template slot-scope="scope">
                                    <el-input  v-model="scope.row.skuNumber" size='small'></el-input>
                                </template>
                            </el-table-column>
                            <!-- 是否启用 -->
                            <el-table-column
                                prop='isDeleted'
                                label='是否启用'
                                width="80">
                                <template slot-scope="scope">
                                    <el-switch
                                        v-model="scope.row.isDeleted">
                                    </el-switch>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                    <el-form-item label="备注" class="other_text" v-model="from">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 3, maxRows: 4}"
                            style="width:658px"
                            v-model="from.remark">
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
        </section>
        <footer class="editTypes_footer">
            <el-button type="primary" size='small' @click="trueconfim" style="width:90px">保存</el-button>
            <el-button size='small' @click='returnPrev' style="width:90px">取消</el-button>
        </footer>
    </section>
</template>
<script>
// import bus from '@/assets/eventBus.js'
import api from 'api/goods'
// import qs from 'qs'

export default {
    data() {
        return {

            // 规格值   // 规格名称、备注

            text: '',
            remark: '',
            from: [],
            goodid: ''

            // disabled: false

        }
    },
    methods: {
        editTypesnum() {
            let obj = {
                skuNumber: '',
                supplyMsg: '',
                isDeleted: '0'
            }

            this.from.itemSupplyPropertyVOs.push(obj)

        },
        // removeTypesnum(data) {
        //     if (this.from.length > 1){
        //         this.from.splice(data.$index, 1)
        //     }
        // },
        returnPrev() {
            this.from = []
            this.$router.go(-1)
        },

        trueconfim() {

            let obj = {
                unitId: this.goodid,
                remark: this.from.remark,
                itemSupplyPropertyValueForms : JSON.stringify(this.from.itemSupplyPropertyVOs)
            }

            console.log(this.from)

            api.putitemsupplyPropertyupdate(obj).then((response)=>{
                // this.$router.go(-1)
                console.log(response)
            }).catch((error)=>{
                console.log(error)
            })

        }

    },
    created() {
        var msg = this.$store.state.home.typesMsg

        this.goodid = msg
        api.getitemsupplyPropertyunitId(msg).then((response)=>{
            this.from = response.data
            // console.log(response.data)

        }).catch((error)=>{
            console.log(error)
        })

    },
    activated() {
        var msg = this.$store.state.home.typesMsg

        this.goodid = msg
        api.getitemsupplyPropertyunitId(msg).then((response)=>{
            // console.log(response)
            this.from = response.data

        }).catch((error)=>{
            console.log(error)
        })

    }


}
</script>
<style scoped>
/* 顶部 */
.editTypes_header{
    height: 45px;
    width: 100%;
    padding: 0 30px;

}
/* 内容 */
.editTypes_conent{
    padding:10px;
    background: #f5f5f5;
    border-top:1px solid #e6e9e9
}
.editTypes_box{
    border: 1px solid #e6e9eb;
    color: #5e6161;
    background: white;
    padding: 30px;
    overflow: auto
}
.editTypes_box .el-form-item{
    height: 50px
}
.editTypes_box .el-form-item:nth-child(3){
    margin-top:60px
}


/* 底部 */
.editTypes_footer{
    border-top:1px solid #e5e8e8;
    padding: 11px 30px;
    /* margin-top: -23px; */
    background: white
}

</style>
