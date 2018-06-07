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
    },
    // 出库类型
    deliverType: {
        0: '商城订单',
        1: '线下订单',
        2: '采购退货',
        3: '批发',
        4: '其他'
    },
    // 仓库类型
    boundType: {
        inbound: '入库',
        outbound: '出库'
    },
    bool: {
        0: false,
        1: true
    },
    notBool: {
        false: 0,
        true: 1
    },
    // 入库状态
    storeStatus: {
        0: '待入库',
        1: '部分入库',
        2: '已入库'
    }
}
