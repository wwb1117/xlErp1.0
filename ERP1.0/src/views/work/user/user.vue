<template>
    <section class="uesr_box">
        <!-- 顶部 -->
        <header class="user_top" >
            <el-tabs v-model="activeName" @tab-click="clickTab">
                <el-tab-pane label="用户列表" name="first" >
                    <userlist></userlist>
                </el-tab-pane>
                <el-tab-pane label="权限组" name="second"  >
                    <autohority></autohority>
                </el-tab-pane>
            </el-tabs>

        </header>
        <div class="button_box">
            <el-button type='primary' size='small' style="margin-right:10px" v-if='first' @click='adduser = true'>新增用户</el-button>
            <el-button type='primary' size='small' style="margin-right:10px" v-if="second" @click="addautohority = true">新增权限组</el-button>
        </div>

        <!-- 新增用户 -->
        <el-dialog
            title="新增用户"
            :visible.sync="adduser"
            width="30%"
            append-to-body>
            <div>
                <span style="width:80px;text-align:center;display:inline-block">用户名</span>
                <el-input v-model="addautohoritytext" size='small' style="width:388px"></el-input>
            </div>
            <div style="margin-top:20px">
                <span style="width:80px;text-align:center;display:inline-block">权限组</span>
                <el-select
                    v-model="addlist"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    size='small'
                    style="width:388px">
                    <el-option
                        v-for="item in add"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="adduser = false" size='small' style="margin-right:10px">取 消</el-button>
                <el-button type="primary" @click="adduser = false" size='small' style="margin-right:10px">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新增权限组 -->
        <el-dialog
            title="新增权限组"
            :visible.sync="addautohority"
            width="30%"
            append-to-body>
            <div>
                <span style="width:80px;text-align:center;display:inline-block">权限组名</span>
                <el-input v-model="addautohoritytext" size='small' style="width:388px"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addautohority = false" size='small'>取 消</el-button>
                <el-button type="primary" @click="addautohority = false" size='small'>确 定</el-button>
            </span>
        </el-dialog>

    </section>
</template>
<script>
import userlist from 'views/work/user/userList'
import autohority from 'views/work/user/authorityList'

export default {
    name: 'user',
    data() {
        return {
            activeName: 'first',
            first: true,
            second: false,
            addautohoritytext: '',
            addautohority: false,
            adduser: false,
            add: [
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
            addlist: []
        }
    },
    methods: {
        clickTab(data) {
            if (data.name == 'first'){
                this.first = true
                this.second = false
            }
            if (data.name == 'second'){
                this.second = true
                this.first = false
            }
        }
    },
    components: {
        userlist,
        autohority
    }

}
</script>
<style scoped>
/* 顶部 */
.uesr_box{
    display: flex;
    justify-content: space-between;
    position: relative;
    border-bottom: 1px solid #e5e8e8;
    z-index: 10
}
.button_box{
    position: absolute;
    right: 0px;
    top:6px
}
.user_top{
    height: 46px;
    padding: 8px 0;

    width: 100%;
}
.user_title{
    height: 25px;
    line-height: 25px;
    margin-left: 20px;
    font-size: 15px;
    color: #5e6161
}


</style>
