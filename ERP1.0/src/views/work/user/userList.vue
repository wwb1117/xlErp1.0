<template>
    <section  class="userlist_conent" :style="{height: $store.state.home.modelContentHeight+53 + 'px'}">
        <div class="userlist_box" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <el-table
                :data='user'
                style="width:100%"
                >
                <!-- :span-method="objectSpanMethod" -->
                <el-table-column
                    prop=""
                    width="30">
                </el-table-column>
                <el-table-column
                    prop="id"
                    width="70">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label='用户名'>
                </el-table-column>
                <el-table-column
                    prop="username"
                    label='权限组名'
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="time"
                    label='创建时间'
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="other"
                    label='操作'
                    width="200">
                    <template  slot-scope="scope">
                        <el-button type='text' v-show="admin" @click="resultpass = true" style="margin-right:10px">重置密码</el-button>
                            <el-dialog
                                title="提示"
                                :visible.sync="resultpass"
                                width="30%"
                                append-to-body>
                                <span>确定重置用户密码？</span>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="resultpass = false" size='small' style="margin-right:10px">取 消</el-button>
                                    <el-button type="primary" @click="resulttrue(scope)" size='small' style="margin-right:10px">确 定</el-button>
                                </span>
                            </el-dialog>
                        <el-button type='text' >编辑</el-button>

                        <el-button type='text' v-show='admin' @click='deluser = true'>删除</el-button>
                            <el-dialog
                                title="提示"
                                :visible.sync="deluser"
                                width="30%"
                                append-to-body>
                                <span>确定删除该用户？</span>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="deluser = false" size='small' style="margin-right:10px">取 消</el-button>
                                    <el-button type="primary" @click="delusertrue(scope)" size='small' style="margin-right:10px">确 定</el-button>
                                </span>
                            </el-dialog>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </section>
</template>
<script>
export default {
    name: 'userList',
    data() {
        return {
            user: [
                {
                    id: '1',
                    name: 'admin',
                    username: '超级管理员',
                    time: '2018-01-12 10:16',
                    other: ''
                },
                {
                    id: '2',
                    name: '商品部',
                    username: '仓储',
                    time: '2018-01-12 10:12',
                    other: ''
                },
                {
                    id: '3',
                    name: '商品部',
                    username: '产品',
                    time: '2018-01-12 10:19',
                    other: ''
                },
                {
                    id: '4',
                    name: '商品部',
                    username: '采购',
                    time: '2018-01-12 10:11',
                    other: ''
                }
            ],
            admin: true,
            resultpass: false,
            deluser: false
        }
    },
    methods: {
        // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        //     if (row.id == 1){
        //         this.admin = false
        //         return this.admin
        //     } else {
        //         this.admin = true
        //         return this.admin
        //     }

        // },
        resulttrue(data) {
            this.resultpass = false
            this.$router.push('')
        },
        delusertrue(data) {
            this.deluser = false
            if (this.user.length > 1){
                this.user.splice(data.$index, 1)
            }
        }
    }

}
</script>
<style scoped>
.userlist_conent{
    padding: 10px;
    background: #f5f5f5;
    width: 100%;
}
.userlist_box{
    border: 1px solid #e6e9eb;
    color: #5e6161;
    background: white
}
</style>
