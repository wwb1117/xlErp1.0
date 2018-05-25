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
                    prop="roleName"
                    label='用户名'>
                </el-table-column>
                <el-table-column
                    label='权限组名'
                    width="150">
                    <template  slot-scope="scope">
                        <span v-for='(item,index) in scope.row.username' :key="index" style="margin-left:5px">{{item}}</span>
                    </template>
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
                        <el-button type='text' @click="resultpass = true"  size='small'>重置密码</el-button>
                        <el-button type='text' @click='edituesrtrue(scope)' size='small' >编辑</el-button>
                        <el-button type='text' @click='delusertrue(scope)' size='small' >删除</el-button>
                    </template>
                    <!-- 重置密码 -->
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
                    <!-- 编辑 -->
                    <el-dialog
                        title="编辑用户"
                        :visible.sync="edituesr"
                        width="30%"
                        append-to-body>
                        <div>
                            <span style="width:80px;text-align:center;display:inline-block">用户名</span>
                            <el-input v-model="name" size='small' style="width:388px"></el-input>
                        </div>
                        <div style="margin-top:20px">
                            <span style="width:80px;text-align:center;display:inline-block">权限组</span>
                            <el-select
                                v-model="editlist"
                                multiple
                                filterable
                                allow-create
                                default-first-option
                                size='small'
                                style="width:388px">
                                <el-option
                                    v-for="item in edit"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="edituesr = false" size='small' style="margin-right:10px">取 消</el-button>
                            <el-button type="primary" @click="editconfirm" size='small' style="margin-right:10px">确 定</el-button>
                        </span>
                    </el-dialog>
                    <!-- 删除 -->
                    <el-dialog
                        title="提示"
                        :visible.sync="deluser"
                        width="30%"
                        append-to-body>
                        <span>确定删除该用户？</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="deluser = false" size='small' style="margin-right:10px">取 消</el-button>
                            <el-button type="primary" @click="delconfirm" size='small' style="margin-right:10px">确 定</el-button>
                        </span>
                    </el-dialog>
                </el-table-column>
            </el-table>
        </div>



    </section>
</template>
<script>
import api from 'api/work'

export default {
    name: 'userList',
    data() {
        return {
            user: [
                // {
                //     id: '1',
                //     name: 'admin',
                //     username: ['超级管理员'],
                //     time: '2018-01-12 10:16',
                //     other: ''
                // },
                // {
                //     id: '2',
                //     name: '商品部',
                //     username: ['仓储'],
                //     time: '2018-01-12 10:12',
                //     other: ''
                // },
                // {
                //     id: '3',
                //     name: '商品部',
                //     username: ['产品'],
                //     time: '2018-01-12 10:19',
                //     other: ''
                // },
                // {
                //     id: '4',
                //     name: '商品部',
                //     username: ['采购'],
                //     time: '2018-01-12 10:11',
                //     other: ''
                // }
            ],
            resultpass: false,
            deluser: false,
            edituesr: false,
            edit: [
                {
                    value: 'HTML',
                    label: 'HTML'
                },
                {
                    value: 'CSS',
                    label: 'CSS'
                },
                {
                    value: 'JavaScript',
                    label: 'JavaScript'
                }
            ],
            editlist: [],
            name: '',
            index: ''

        }
    },
    methods: {
        resulttrue(data) {
            this.resultpass = false
            this.$router.push('')
        },
        edituesrtrue(data) {
            this.edituesr = true
            this.name = data.row.name
            this.index = data.row.id
        },
        editconfirm() {
            this.edituesr = false
            for (var i in this.user){
                if (this.user[i].id == this.index){
                    // this.user[i].username = this.editlist
                    console.log(this.index, this.name)
                    let obj = {
                        roleId: this.index,
                        roleName: this.name
                    }

                    api.putroleupdate(obj).then((response)=>{
                        console.log(response)
                    }).catch((error)=>{
                        console.log(error)
                    })
                    this.get()
                }
            }

            this.name = ''
            this.index = ''
        },
        delusertrue(data) {
            this.deluser = true
            this.index = data.row.id
        },
        delconfirm() {
            this.deluser = false
            for (var i in this.user){

                if (this.user[i].id == this.index){
                    if (this.user.length > 1){
                        // this.user.splice(i, 1)
                        api.deleteroleid(this.user[i].id).then((response)=>{
                            console.log(response)
                        }).catch((error)=>{
                            console.log(error)
                        })
                        this.get()
                    }
                }
            }
            this.index = ''

        },
        get() {
            api.getrolelist().then((response) => {
                // console.log(response.data.list)
                this.user = response.data.list
            })
        }
    },
    created() {
        this.get()
    },
    activated() {
        this.get()
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
