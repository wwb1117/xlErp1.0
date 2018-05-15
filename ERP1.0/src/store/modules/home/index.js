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
        nextMenuMap: {
            home: [],
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
        }

    }
};
