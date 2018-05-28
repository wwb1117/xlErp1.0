export default {
    state: {
        supplierId: '',
        buyerId: ''
    },
    mutations: {
        setSupplierId(state, value){
            state.supplierId = value
        },
        setBuyerId(state, value){
            state.buyerId = value
        }

    }
};
