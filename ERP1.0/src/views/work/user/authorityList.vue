<template>
    <section class="authorityList_conent" :style="{height: $store.state.home.modelContentHeight+53 + 'px'}">
        <div class="authorityList_box" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <el-table
                :data='authority'
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
                    label="权限组名">
                </el-table-column>
                <el-table-column
                    prop="other"
                    label="操作"
                    width="200">
                    <template  slot-scope="scope">
                        <el-button type="text" size="small" @click="gotoAuthority">权限管理</el-button>
                        <el-button type="text" size="small" @click="edittrue(scope)" >编辑</el-button>
                        <el-button type="text" size="small" @click='deltrue(scope)' >删除</el-button>
                    </template>
                    <!-- 编辑 -->
                    <el-dialog
                        title="编辑权限组名"
                        :visible.sync="editauthorit"
                        width="30%"
                        append-to-body>
                        <div>
                            <span style="width:80px;text-align:center;display:inline-block">权限组名</span>
                            <el-input v-model="text" size='small' style="width:388px"></el-input>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="editauthorit = false" size='small'>取 消</el-button>
                            <el-button type="primary" @click="editconfirm" size='small'>确 定</el-button>
                        </span>
                    </el-dialog>
                    <!-- 删除 -->
                    <el-dialog
                        title="提示"
                        :visible.sync="delauthorit"
                        width="30%"
                        append-to-body>
                        <span>确定删除该权限组？</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="delauthorit = false" size='small'>取 消</el-button>
                            <el-button type="primary" @click="delconfirm" size='small'>确 定</el-button>
                        </span>
                    </el-dialog>
                </el-table-column>
            </el-table>
        </div>

    </section>
</template>
<script>
export default {
    name: 'authorityList',
    data() {
        return {
            authority: [
                {
                    id: '1',
                    name: '超级管理员',
                    oteher: ''
                },
                {
                    id: '2',
                    name: '产品',
                    oteher: ''
                },
                {
                    id: '3',
                    name: '采购',
                    oteher: ''
                }
            ],
            editauthorit: false,
            delauthorit: false,
            text: '',
            index: ''
        }
    },
    methods: {
        edittrue(data) {
            this.editauthorit = true
            this.text = data.row.name
            this.index = data.$index
        },
        editconfirm() {
            this.editauthorit = false
            for (var i in this.authority){

                if (i == this.index){
                    this.authority[i].name = this.text
                }
            }
            this.index = ''
            this.text = ''
        },
        deltrue(data) {
            this.delauthorit = true
            this.index = data.$index
        },
        delconfirm() {
            this.delauthorit = false
            for (var i in this.authority){

                if (i == this.index){
                    if (this.authority.length > 1){
                        this.authority.splice(i, 1)
                    }
                }
            }
            this.index = ''
        },
        gotoAuthority() {
            this.$router.push('permissionManage')
        }
    }
}
</script>
<style scoped>
.authorityList_conent{
    padding: 10px;
    background: #f5f5f5;
    width: 100%;
}
.authorityList_box{
    border: 1px solid #e6e9eb;
    color: #5e6161;
    background: white
}
</style>

