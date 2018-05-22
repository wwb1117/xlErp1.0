<template>
    <section :style="{height: $store.state.home.modelContentHeight + 'px'}">
        <header class="edit_header">
            <el-breadcrumb separator='-' style="line-height:45px;font-size:15px">
                <el-breadcrumb-item :to="{ path: '/goodsSpec' }">商品规格</el-breadcrumb-item>
                <el-breadcrumb-item>编辑规格</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <section class="edit_conent" >
            <div class="edit_box AEgoods_box" :style="{height: $store.state.home.modelContentHeight + 'px'}">
                <el-form ref="edit" :model="edit" label-width="100px">
                    <el-form-item label="规格名称" required>
                        <el-input v-model="edit.name" style="width:338px" size='small'></el-input>
                    </el-form-item>
                    <el-form-item label="规格值" required :style="{height: (editNum.length)*50 + 'px'}">
                        <el-table
                            :data='editNum'
                            border
                            style="width:658px"
                        >
                            <el-table-column
                                width='55'
                            >
                                <template slot-scope="scope">
                                    <div class="icon_box" style="height:50px;line-height:50px;margin-left:10px">
                                        <i class="el-icon-plus" style="font-weight:700" @click="addEditnum"></i>
                                        <!-- <i class="el-icon-minus" style="margin-left:5px;font-weight:700" @click="removeTypesnum(edit)"></i> -->
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="editname"
                                label="规格值"
                                width="425">
                                <template slot-scope="scope">
                                    <div>
                                        <el-input v-model="editNum.editname" placeholder="输入规格名称" size='small' style="width:388px"></el-input>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop='bolean'
                                label='是否启用'
                            >
                            <template slot-scope="scope">
                                <el-switch
                                    v-model="editNum.value2"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949">
                                </el-switch>
                            </template>
                            </el-table-column>
                        </el-table>

                    </el-form-item>
                    <el-form-item label="备注" class="other_text">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 3, maxRows: 4}"
                            style="width:658px"
                        >
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
        </section>
        <footer class="edit_footer">
            <el-button type="primary" size='small'>保存</el-button>
            <el-button size='small' @click='returnPrev'>取消</el-button>
        </footer>
    </section>
</template>
<script>
export default {
    data() {
        return {
            // 规格、备注
            edit: {
                name: '',
                text: ''
            },
            // 规格值

            editNum: [
                {
                    editname: '',
                    bolean: '',
                    value1: true,
                    value2: true
                }
            ]

        }
    },
    methods: {
        addEditnum() {
            let obj = {
                editname: '',
                bolean: '',
                value1: true,
                value2: true
            }

            this.editNum.push(obj)
        },
        // removeEditnum(data) {
        //     if (this.editNum.length > 1){
        //         this.editNum.splice(data.$index, 1)
        //     }
        // },
        returnPrev() {
            this.$router.push('goodsSpec')
        }
    }

}
</script>
<style scoped>
/* 顶部 */
.edit_header{
    height: 45px;
    width: 100%;
    padding: 0 30px;

}
/* 内容 */
.edit_conent{
    padding:10px;
    background: #f5f5f5;
    border-top:1px solid #e6e9e9
}
.edit_box{
    border: 1px solid #e6e9eb;
    color: #5e6161;
    background: white;
    padding: 30px;
}
.edit_box .el-form-item{
    height: 50px
}
.edit_box .el-form-item:nth-child(3){
    margin-top:60px
}

/* 底部 */
.edit_footer{
    border-top:1px solid #e5e8e8;
    padding: 11px 30px;
    margin-top: -23px;
    background: white
}

</style>
