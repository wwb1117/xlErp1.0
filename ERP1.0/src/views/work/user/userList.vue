<template>
    <section  class="userlist_conent" :style="{height: $store.state.home.modelContentHeight+53 + 'px'}">
        <div class="userlist_box" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <el-table
                :data='user'
                style="width:100%">
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
                    prop="userName"
                    label='用户名'>
                </el-table-column>
                <el-table-column
                    prop='roleName'
                    label='权限组名'>
                </el-table-column>
                <el-table-column
                    prop="created"
                    label='创建时间'
                    width="200">
                    <template  slot-scope="scope">
                        <span>{{scope.row.created | time_m}}</span>
                    </template>
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
                                    :key="item.id"
                                    :label="item.roleName"
                                    :value="item.id">
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
                // {
                //     value: 'HTML',
                //     label: 'HTML'
                // },
                // {
                //     value: 'CSS',
                //     label: 'CSS'
                // },
                // {
                //     value: 'JavaScript',
                //     label: 'JavaScript'
                // }
            ],

            editlist: [],
            name: '',
            index: '',

            page: {
                pageNo: 1,
                pageSize: 20
            },
            userId: ''
            // list: []
        }
    },
    methods: {
        resulttrue(data) {
            this.resultpass = false
            this.$router.push('')
        },
        edituesrtrue(data) {

            this.name = ''
            this.edituesr = true
            this.name = data.row.userName

            // console.log(data)
            this.list = this.editlist

            let arr = data.row.roleName.split(",")

            this.editlist = []

            for (var i in arr){
                this.editlist[i] = arr[i]
            }
            for (var k in this.editlist){

                for (var y in this.edit){

                    if (this.edit[y].roleName == this.editlist[k]){

                        this.editlist[k] = this.edit[k].id
                    }
                }

            }

            this.index = data.row.id

        },
        editconfirm() {

            this.edituesr = false
            for (var i in this.user){
                if (this.user[i].id == this.index){

                    let obj = {
                        id: this.index,
                        userName: this.name,
                        roleIds: this.editlist.toString()
                    }

                    api.putuserchangeusername(obj).then((response)=>{
                        // console.log(response)
                        this.get()
                        this.editlist = []
                        this.index = ''
                        this.name = ''
                    }).catch((error)=>{
                        console.log(error)
                    })

                }
            }

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

                        this.userId = this.user[i].id

                        api.deleteuserdeleteuserId(this.userId).then((response)=>{
                            this.get()
                        }).catch((error)=>{
                            console.log(error)
                        })

                    }
                }
            }
            this.index = ''

        },
        get() {
            api.getuserlist(this.page).then((response) => {

                this.user = response.data.list
            })
            api.getrolelist().then((response) => {

                this.edit = response.data.list

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
    background: white;
    overflow: auto
}
</style>
