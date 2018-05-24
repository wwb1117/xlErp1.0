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
                    label="流程名称">
                </el-table-column>
                <el-table-column
                    prop="other"
                    label="操作"
                    width="200">
                    <template  slot-scope="scope">
                        <el-button type="text" size="small" @click="gotoAuthority">权限管理</el-button>
                        <el-button type="text" size="small" @click="editauthorit = true" >编辑</el-button>
                        <el-button type="text" size="small" @click='delauthorit = true' >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 权限管理 -->
        <el-dialog
            title="编辑权限组名"
            :visible.sync="editauthorit"
            width="30%"
            append-to-body>
            <div>
                <span style="width:80px;text-align:center;display:inline-block">权限组名</span>
                <el-input v-model="authoritytext" size='small' style="width:388px"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editauthorit = false" size='small'>取 消</el-button>
                <el-button type="primary" @click="edittrue(scope.$index, scope.row)" size='small'>确 定</el-button>
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
                <el-button type="primary" @click="deltrue(scope)" size='small'>确 定</el-button>
            </span>
        </el-dialog>
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
            authoritytext: ''
        }
    },
    methods: {
        edittrue(index, row) {
            // data.row.name = this.authoritytext
            this.editauthorit = false
            this.authoritytext = ''
            console.log(index, row)
        },
        deltrue(data) {
            if (this.authority.length > 1){
                this.authority.splice(data.$index, 1)
            }
            this.delauthorit = false
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

