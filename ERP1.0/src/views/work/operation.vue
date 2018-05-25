<template>
    <section :style="{height: $store.state.home.modelContentHeight + 'px'}">
        <!-- 顶部 -->
        <header class="operation_top">
            <p class='operation_title'>操作日志</p>
        </header>
        <section class="operation_conent" >
            <div class="operation_box" :style="{height: $store.state.home.modelContentHeight-23 + 'px'}">
                <div class='box_top'>
                     <el-input
                        size="small"
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="input">
                    </el-input>
                    <el-button type="primary" size='small' style="margin-left:10px">搜索</el-button>
                </div>
                <el-table
                    :data='date'
                    :height='$store.state.home.modelContentHeight-78'>
                    <el-table-column
                        prop=""
                        width='30'>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label='操作人'
                        width='150'>
                    </el-table-column>
                    <el-table-column
                        prop="obj"
                        label='操作对象'
                        width='150'>
                    </el-table-column>
                    <el-table-column
                        label='ID'
                        width='200'>
                        <template slot-scope="scope">
                            <span style="color:#3f9ffe">{{scope.row.id}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="explain"
                        label='操作说明'
                        width='200'>
                    </el-table-column>
                    <el-table-column
                        prop="state"
                        label='操作状态'>
                    </el-table-column>
                    <el-table-column
                        label='操作时间'
                        width='250'>
                        <template slot-scope="scope">
                            <span style="color:#3f9ffe">{{scope.row.time}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="ip"
                        label='IP'
                        width='200'>
                    </el-table-column>
                </el-table>
            </div>
        </section>
        <footer class="operation_footer">
            <div class="block">
                <el-pagination
                    :current-page="currentPage4"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                </el-pagination>
                <!-- @size-change="handleSizeChange"
                @current-change="handleCurrentChange" -->
            </div>
        </footer>
    </section>
</template>
<script>
export default {
    name:'operation',
    data() {
        return {
            date: [
                {
                    name: 'admin',
                    obj: '商品',
                    id: '54651',
                    explain: '添加商品',
                    state: '添加商品66055，删除商品',
                    time: '2018-5-24',
                    ip: '183.134.176.25'
                },
                {
                    name: 'ssd',
                    obj: '采购',
                    id: '8121',
                    explain: '采购商品',
                    state: '审批采购单',
                    time: '2018-6-24',
                    ip: '183.134.176.29'
                },
                {
                    name: '旺旺',
                    obj: '盘点单',
                    id: '7551',
                    explain: '修改',
                    state: '盘点单导入成功',
                    time: '2018-5-31',
                    ip: '183.134.178.27'
                }
            ],
            currentPage4: 1,
            input: ''
        }
    }
}
</script>
<style scoped>
/* 顶部 */
.operation_top{
    display: flex;
    justify-content: space-between;
    height: 46px;
    padding: 10px;
    border-bottom: 1px solid #e5e8e8
}
.operation_title{
    height: 25px;
    line-height: 25px;
    margin-left: 20px;
    font-size: 15px;
    color: #5e6161
}
.operation_top .el-input{
    width: 40%;
}
/* 内容 */
.operation_conent{
    padding: 10px;
    background: #f5f5f5;
}
.operation_box{
    border: 1px solid #e6e9eb;
    color: #5e6161;
    background: white
}
.box_top{
    display: flex;
    background:white;
    padding: 16px
}
.box_top .el-input{
    width: 35%;
}

/* 底部 */
.operation_footer{
    border-top:1px solid #e5e8e8;
    position: relative;
    padding: 11px 30px;
    /* margin-top: -23px; */
    background: white;
}
.operation_footer .block{
    position: absolute;
    right: 30px;
    top:0px
}
</style>
