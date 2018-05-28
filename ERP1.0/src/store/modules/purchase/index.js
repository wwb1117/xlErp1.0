export default {
    state: {
        supplierId: '',
        buyerId: '',
        purchaseId: ''
    },
    mutations: {
        setSupplierId(state, value){
            state.supplierId = value
        },
        setBuyerId(state, value){
            state.buyerId = value
        },
        setPurchaseId(state, value){
            state.purchaseId = value
        }

    }
};
