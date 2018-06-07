export default {
    state: {
        showAddGoods: {
            id: 0
        },
        goodsInfoBound: []

    },
    mutations: {
        hideChooseGoods(state, value){
            state.showAddGoods.id = 0
        },
        setGoodsInfoBound(state, value){
            state.goodsInfoBound = value
        },
        showAddGoods(state){
            state.showAddGoods.id = 1
        }
    }
};
