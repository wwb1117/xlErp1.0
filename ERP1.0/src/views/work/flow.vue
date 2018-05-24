<template>
    <section :style="{height: $store.state.home.modelContentHeight + 'px'}">
        <!-- 顶部 -->
        <header class="flow_top">
            <p class='flow_title'>流程配置</p>
            <el-button type="primary" size='small' style="height:30px;margin-top:-3px" @click='addflow'>新增</el-button>
            <el-dialog
                title="新增流程"
                :visible.sync="addopen"
                width="30%">
                <div>
                    <span style="width:80px;text-align:center;display:inline-block">流程名</span>
                    <el-input v-model="addtext" size='small' style="width:388px"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addopen = false" size='small'>取 消</el-button>
                    <el-button type="primary" @click="addtrue" size='small'>确 定</el-button>
                </span>
            </el-dialog>
        </header>
        <section class="flow_conent" :style="{height: $store.state.home.modelContentHeight+54 + 'px'}">
            <div class="flow_box" :style="{height: $store.state.home.modelContentHeight-8 + 'px'}">
                <el-table
                    :data='flow'
                    :height="$store.state.home.modelContentHeight"
                    style="width:100%">
                    <el-table-column
                        prop=""
                        width="50">
                    </el-table-column>
                    <el-table-column
                        prop="id"
                        width="70">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="流程名称">
                    </el-table-column>
                    <el-table-column
                        prop="other"
                        label="操作"
                        width="200">
                        <template  slot-scope="scope">
                            <el-button type="text" size="small" @click="writeflow" style="margin-right:10px">配置</el-button>
                            <el-button type="text" size="small" @click="editflow = true" style="margin-right:10px">编辑</el-button>
                            <el-button type="text" size="small" @click='delflow = true' >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 编辑 -->
            <el-dialog
                title="编辑流程"
                :visible.sync="editflow"
                width="30%">
                <div>
                    <span style="width:80px;text-align:center;display:inline-block">流程名</span>
                    <el-input v-model="edittext" size='small' style="width:388px"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editflow = false" size='small'>取 消</el-button>
                    <el-button type="primary" @click="edittrue(scope)" size='small'>确 定</el-button>
                </span>
            </el-dialog>
            <!-- 删除 -->
            <el-dialog
                title="提示"
                :visible.sync="delflow"
                width="30%">
                <span>确定删除此项流程？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="delflow = false" size='small'>取 消</el-button>
                    <el-button type="primary" @click="deltrue(scope)" size='small'>确 定</el-button>
                </span>
            </el-dialog>
        </section>
    </section>
</template>
<script>
export default {
    data() {
        return {
            addopen: false,
            delflow: false,
            editflow: false,
            setflow: false,
            addtext: '',
            edittext: '',
            flow: [
                {
                    id: '1',
                    name: '采购订单',
                    other: ''
                },
                {
                    id: '2',
                    name: '采购退货',
                    other: ''
                }
            ]
        }
    },
    methods: {
        addflow() {
            this.addopen = true
        },
        addtrue() {
            this.addopen = false

            let obj = {
                id: this.flow.length + 1,
                name: this.addtext,
                other: ''
            }

            this.addtext = ''
            this.flow.push(obj)
        },
        deltrue(data) {
            if (this.flow.length > 1){
                this.flow.splice(data.$index, 1)
            }
            this.delflow = false
        },
        edittrue(data) {
            data.row.name = this.edittext
            this.editflow = false
            this.edittext = ''
        },
        writeflow() {
            this.$router.push('configuration')
        }
    }
}
</script>
<style scoped>
/* 顶部 */
.flow_top{
    display: flex;
    justify-content: space-between;
    height: 46px;
    padding: 10px;
    border-bottom: 1px solid #e5e8e8
}
.flow_title{
    height: 25px;
    line-height: 25px;
    margin-left: 20px;
    font-size: 15px;
    color: #5e6161;
}
.flow_top .el-input{
    width: 40%;
}
/* 内容 */
.flow_conent{
    padding: 10px;
    background: #f5f5f5
}
.flow_box{
    border: 1px solid #e6e9eb;
    color: #5e6161;
    background: white
}
</style>
