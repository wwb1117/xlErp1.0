<template>
    <section :style="{height: $store.state.home.modelContentHeight + 'px'}">
        <header class="addTypes_header">
            <el-breadcrumb separator='-' style="line-height:45px;font-size:15px">
                <el-breadcrumb-item :to="{ path: '/goodsTypes' }">商品规格</el-breadcrumb-item>
                <el-breadcrumb-item>新增规格</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <section class="addTypes_conent" >
            <div class="addTypes_box AEgoods_box" :style="{height: $store.state.home.modelContentHeight-23 + 'px'}">
                <el-form ref="types"  label-width="100px">
                    <el-form-item label="规格名称" required v-model="unitId">
                        <el-select v-model="unitId" placeholder="请选择" style="width:338px" size='small'>
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="规格值" required :style="{height: (typesNum.length)*50 + 'px'}">
                        <el-table
                            :data='typesNum'
                            border
                            style="width:658px">
                            <el-table-column
                                width='55'>
                                <template slot-scope="scope">
                                    <div class="icon_box" style="height:50px;line-height:50px">
                                        <i class="el-icon-plus" style="font-weight:700" @click="addTypesnum(scope)"></i>
                                        <i class="el-icon-minus" style="margin-left:5px;font-weight:700" @click="removeTypesnum(scope)"></i>
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
                                        <el-input v-model="scope.row.supplyMsg" placeholder="输入规格名称" size='small' style="width:388px"></el-input>
                                    </div>
                                </template>
                            </el-table-column>
                            <!-- 商品数量 -->
                            <el-table-column
                                prop="skuNumber"
                                label="含商品数量">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.skuNumber" size='small'></el-input>
                                </template>
                            </el-table-column>
                            <!-- 是否启用 -->
                            <el-table-column
                                prop='isDeleted'
                                label='是否启用'
                                width="80">
                                <template slot-scope="scope">
                                    <el-switch
                                        v-model="scope.row.isDeleted"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949">
                                    </el-switch>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                    <el-form-item label="备注" class="other_text" >
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 3, maxRows: 4}"
                            style="width:658px"
                            v-model="text">
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
        </section>
        <footer class="addTypes_footer">
            <el-button type="primary" size='small' @click='trueconfim' style="width:90px">保存</el-button>
            <el-button size='small' @click='returnPrev' style="width:90px">取消</el-button>
        </footer>
    </section>
</template>
<script>
import api from 'api/goods'

export default {
    data() {
        return {
            // 规格值
            typesNum: [

                {
                    skuNumber: '',
                    supplyMsg: '',
                    isDeleted: false,
                    id:''
                }
            ],
            options: [
                {
                    value: '1',
                    label: '灌装'
                },
                {
                    value: '2',
                    label: '袋装'
                },
                {
                    value: '3',
                    label: '包装'
                },
                {
                    value: '4',
                    label: '盒装'
                },
                {
                    value: '5',
                    label: '瓶装'
                },
                {
                    value: '6',
                    label: '箱'
                },
                {
                    value: '7',
                    label: '组'
                },
                {
                    value: '8',
                    label: '套'
                },
                {
                    value: '9',
                    label: '个'
                },
                {
                    value: '10',
                    label: '条'
                },
                {
                    value: '11',
                    label: '支'
                },
                {
                    value: '12',
                    label: '本'
                },
                {
                    value: '13',
                    label: '把'
                },
                {
                    value: '14',
                    label: '枚'
                },
                {
                    value: '15',
                    label: '根'
                },
                {
                    value: '16',
                    label: '双'
                }
            ],
            value: '',
            text: '',
            unitId: []
        }
    },
    methods: {
        addTypesnum() {
            let obj = {
                skuNumber: '',
                supplyMsg: '',
                isDeleted: false
            }

            this.typesNum.push(obj)
        },
        removeTypesnum(data) {
            if (this.typesNum.length > 1){
                this.typesNum.splice(data.$index, 1)
            }
        },
        returnPrev() {
            this.typesNum = [
                {
                    skuNumber: '',
                    unitMsg: '',
                    isDeleted: false
                }
            ]
            this.typesNum.unitId = ''
            this.typesNum.remark = ''
            this.value = ''
            this.$router.go(-1)
        },
        trueconfim() {
            var num = ''

            for (var k in this.unitId){
                num = this.unitId[k]
            }

            for (var i in this.typesNum){
                this.typesNum[i].id = num
            }

            console.log(num)
            let obj = {
                unitId: num,
                remark: this.text,
                itemSupplyPropertyValueForms: JSON.stringify(this.typesNum)
            }

            api.postitemsupplyPropertyadd(obj).then((response)=>{
                this.typesNum = [
                    {
                        skuNumber: '',
                        supplyMsg: '',
                        isDeleted: false,
                        id:''
                    }
                ]
                this.text = ''
                this.value = ''
                this.$router.go(-1)
            }).catch((error)=>{
                console.log(error)
            })
            // this.$router.go(-1)
        }
    }

}
</script>
<style scoped>
/* 顶部 */
.addTypes_header{
    height: 45px;
    width: 100%;
    padding: 0 30px;

}
/* 内容 */
.addTypes_conent{
    padding:10px;
    background: #f5f5f5;
    border-top:1px solid #e6e9e9
}
.addTypes_box{
    border: 1px solid #e6e9eb;
    color: #5e6161;
    background: white;
    padding: 30px;
}
.addTypes_box .el-form-item{
    height: 50px
}
.addTypes_box .el-form-item:nth-child(3){
    margin-top:60px
}


/* 底部 */
.addTypes_footer{
    border-top:1px solid #e5e8e8;
    padding: 11px 30px;
    /* margin-top: -23px; */
    background: white
}

</style>
