export default {
    state: {
        version: '1.0',
        langIsOpen:false,
        userCustomIsOpen:false,
        orgTreeIsHide:false,
        orgTreeWidth: 192,
        baseUrl: '',
        isFreshCarTree: false,
        timerArr: [],
        isNextMenuShow: false, //二级菜单是否显示
        device: {
            width: null,
            height: null
        },
        modelContentHeight: null,
        nextMenuMap: {
            home: [
                {
                    name: '首页',
                    path: '/main'
                }
            ],
            goods: [
                {
                    name: '商品列表',
                    path: '/goodsList'
                },
                {
                    name: '商品分类',
                    path: '/goodsItems'
                },
                {
                    name: '商品品牌',
                    path: '/goodsBrand'
                },
                {
                    name: '商品规格',
                    path: '/goodsSpec'
                },
                {
                    name: '商品类型',
                    path: '/goodsTypes'
                }
            ],
            purchase: [
                {
                    name: '采购单',
                    path: '/purchaseList'
                },
                {
                    name: '采购退货',
                    path: '/purchaseReject'
                },
                {
                    name: '供应商',
                    path: '/supplier'
                },
                {
                    name: '采购单位',
                    path: '/purchaseCompany'
                }
            ],
            depot: [
                {
                    name: '入库列表',
                    path: '/inboundList'
                },
                {
                    name: '入库列表',
                    path: '/outboundList'
                },
                {
                    name: '库存列表',
                    path: '/repertoryList'
                },
                {
                    name: '库存调拨',
                    path: '/repertoryAllot'
                },
                {
                    name: '库存盘点',
                    path: '/repertoryCheck'
                },
                {
                    name: '仓库管理',
                    path: '/repertoryManage'
                }
            ],
            review: [
                {
                    name: '待我审批',
                    path: '/waitReview'
                },
                {
                    name: '我发起的',
                    path: '/Ilaunched'
                },
                {
                    name: '我已审批',
                    path: '/IReviewed'
                }
            ],
            system: [
                {
                    name: '流程配置',
                    path: '/workflowConfig'
                },
                {
                    name: '权限管理',
                    path: '/permissionManage'
                },
                {
                    name: '用户管理',
                    path: '/userManage'
                }
            ]


        }
    },
    mutations: {
        setDevice(state, value){
            state.device.width = value.width
            state.device.height = value.height
            window.localStorage.setItem("device", JSON.stringify(state.device))
        },
        setNextMenuShow(state, value){
            state.isNextMenuShow = value
        },
        setModelContentHeight(state, value){
            state.modelContentHeight = value
            console.log(state.modelContentHeight)
        }

    }
};
