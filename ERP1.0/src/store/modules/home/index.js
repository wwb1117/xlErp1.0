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
        iconArr: ["fa fa-cog", "fa fa-user-circle-o", "fa fa-pie-chart"]
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
