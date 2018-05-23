import Vue from 'vue'
Vue.prototype.$allEnumeration = { //仓库枚举类型
    // 仓库管理
    activateState:{
        0: '停用',
        1: '启用'
    },
    // 入库类型
    storeType: {
        1: '采购',
        2: '销售退货',
        3: '其他'
    },
    // 入库单审核状态
    auditStatus: {
        0: '待审核',
        1: '审核中',
        2: '通过',
        3: '不通过',
        4: '撤销'
    }

}
