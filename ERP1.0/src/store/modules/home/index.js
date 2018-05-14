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
        }
    }
};
