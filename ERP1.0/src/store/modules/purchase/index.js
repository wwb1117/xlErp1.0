export default {
    state: {
        supplierId: '',
        buyerId: '',
        purchaseId: '',
        goodsInfoData: [{
            oper: '',
            selfNum: '',
            barCode: '',
            goodName: '',
            SKU: '',
            qualityDate: '',
            productData: '',
            purchaseNum: '',
            unit: '',
            unitPrice: '',
            unitTotal: ''
        }]
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
