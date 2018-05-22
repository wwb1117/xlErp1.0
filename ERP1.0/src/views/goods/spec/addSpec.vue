<template>
    <section :style="{height: $store.state.home.modelContentHeight + 'px'}">
        <header class="addSpec_header">
            <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:45px;font-size:15px">
                <el-breadcrumb-item :to="{ path: '/goodsSpec' }">商品规格</el-breadcrumb-item>
                <el-breadcrumb-item>新增规格</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <section class="addSpec_conent" >
            <div class="addSpec_box" :style="{height: $store.state.home.modelContentHeight + 'px'}">
                <el-form ref="spec" :model="spec" label-width="100px">
                    <el-form-item label="规格名称" required>
                        <el-input v-model="spec.name" style="width:338px" size='small'></el-input>
                    </el-form-item>
                    <el-form-item label="规格值" required>
                        <el-table
                            :data='specNum'
                            border
                            style="width:658px"
                        >
                            <el-table-column
                                prop="specname"
                                label="规格值"
                                width="500"
                            >
                                <template slot-scope="scope">
                                    <div style="display:flex" >
                                        <div class="icon_box" style="margin-left:-10px">
                                            <i class="el-icon-plus" style="font-weight:700" @click="addSpecnum(spec)"></i>
                                            <i class="el-icon-minus" style="margin-left:5px;font-weight:700" @click="removeSpecnum(spec)"></i>
                                        </div>
                                        <div>
                                            <el-input v-model="specNum.specname" placeholder="输入规格名称" size='small' style="margin:8px 0 0 8px;width:388px"></el-input>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop='bolean'
                                label='是否启用'
                            >
                            <template slot-scope="scope">
                                <el-switch
                                    v-model="specNum.value2"
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
        <footer class="addSpec_footer">
            <el-button type="primary" size='small'>保存</el-button>
            <el-button size='small'>取消</el-button>
        </footer>
    </section>
</template>
<script>
export default {
    data() {
        return {
            // 规格、备注
            spec: {
                name: '',
                text: ''
            },
            // 规格值

            specNum: [
                {
                    specname: '',
                    bolean: '',
                    value1: true,
                    value2: true
                }
            ]

        }
    },
    methods: {
        addSpecnum() {
            let obj = {
                specname: '',
                bolean: '',
                value1: true,
                value2: true
            }

            this.specNum.push(obj)
            console.log(this.specNum.length)
        },
        removeSpecnum(data) {
            if (this.specNum.length > 1){
                this.specNum.splice(data.$index, 1)
            }
        }
    }

}
</script>
<style scoped>
/* 顶部 */
.addSpec_header{
    height: 45px;
    width: 100%;
    padding: 0 30px;

}
/* 内容 */
.addSpec_conent{
    padding:10px;
    background: #f5f5f5;
    border-top:1px solid #e6e9e9
}
.addSpec_box{
    border: 1px solid #e6e9eb;
    color: #5e6161;
    background: white;
    padding: 30px;
}
.addSpec_box .el-form-item{
    height: 50px
}
.addSpec_box .el-form-item:nth-child(3){
    margin-top:60px
}

.icon_box{
    width: 57px;
    height: 49px;
    text-align: center;
    line-height: 49px;
    border-right: 1px solid #ebeef5;

}
/* 底部 */
.addSpec_footer{
    border-top:1px solid #e5e8e8;
    padding: 11px 30px;
    margin-top: -23px;
    background: white
}

</style>
