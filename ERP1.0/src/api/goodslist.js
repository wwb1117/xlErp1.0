import HttpClient from 'utils/HttpClient'

export default {
    // 商品列表
    // 根据条件查询商品列表
    getitemlist(data){
        return HttpClient.get('/item/list', data)
    },
    // 查询sku属性列表
    getitemskuProperty(data) {
        return HttpClient.get('/item/skuProperty', data)
    },
    // 添加商品
    postitemadd(data) {
        return HttpClient.post('/item/add', data)
    },
    // 编辑商品
    putitemupdate(data) {
        return HttpClient.put('/item/update', data)
    },
    // 根据商品id获取商品信息
    getitemitemId(itemId) {
        return HttpClient.get(`/item/${itemId}`)
    },
    // 批量更新
    putitembatchUpdate(data) {
        return HttpClient.put('/item/batchUpdate', data)
    },
    // 商品提成设置
    getitempromotes(data) {
        return HttpClient.get('/item/promotes', data)
    }
}
