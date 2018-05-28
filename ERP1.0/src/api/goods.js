import HttpClient from 'utils/HttpClient'

export default {
    // 商品分类！
    // 查询商品分类列表
    getcategorylist(data){
        return HttpClient.get('/item/category/list', data)
    },
    // 查看商品分类详情
    getcategoryid(id){
        return HttpClient.get(`/item/category/${id}`)
    },
    // 增加商品分类
    postitemcategoryadd(data) {
        return HttpClient.post('/item/category/add', data)
    },
    // 修改商品分类
    putitemcategoryupdate(data) {
        return HttpClient.put('/item/category/update', data)
    },
    // 显示隐藏商品分类
    putitemcategoryisDisplay(data) {
        return HttpClient.put('/item/category/isDisplay', data)
    },
    // 通过商品分类id删除商品分类
    deleteitemcategorydeleteid(id) {
        return HttpClient.delete(`/item/category/delete/${id}`)
    },

    // 商品品牌
    // 查询商品品牌列表
    getitemitemBrandlist(data) {
        return HttpClient.get('/item/itemBrand/list', data)
    },
    // 根据ID获取商品品牌详情
    getitemitemBrandid(id) {
        return HttpClient.get(`/item/itemBrand/${id}`)
    },
    // 增加商品品牌
    postitemitemBrandadd(data) {
        return HttpClient.post('/item/itemBrand/add', data)
    },
    // 修改商品品牌
    putitemitemBrandupdate(data) {
        return HttpClient.put('/item/itemBrand/update', data)
    },
    // 显示隐藏商品品牌
    putitemitemBrandisRecommended(data) {
        return HttpClient.put('/item/itemBrand/isRecommended', data)
    },
    // 通过商品品牌id删除商品品牌
    deleteitemitemBranddeleteid(id) {
        return HttpClient.delete(`/item/itemBrand/delete/${id}`)
    },
    // 通过商品品牌id查询门店分组
    getitemitemBrandShopGroupitemBrandId(itemBrandId) {
        return HttpClient.get(`/item/itemBrandShopGroup${itemBrandId}`)
    },

    // 商品规格！
    // 获取商品规格列表
    getitemskuPropertylist(data) {
        return HttpClient.get('/item/skuProperty/list', data)
    },
    // 获取商品规格详情
    getitemskupropertyid(id) {
        return HttpClient.get(`/item/skuproperty/${id}`)
    },
    // 新增商品规格
    postitemskuPropertyadd(data) {
        return HttpClient.post('/item/skuProperty/add', data)
    },
    // 批量更新商品规格选项!
    putitemskuPropertyupdate(data) {
        return HttpClient.put('/item/skuProperty/update', data)
    },

    // 商品包装类型/供货规格！
    // 商品单位列表
    getitemunitlist(data) {
        return HttpClient.get('/item/unit/list', data)
    },
    // 查询单位详情
    getitemunitid(id) {
        return HttpClient.get(`/item/unit/${id}`)
    },
    // 新增单位
    postitemunitadd(data) {
        return HttpClient.post('/item/unit/add', data)
    },
    // 新增供货规格
    postitemsupplyPropertyadd(data) {
        return HttpClient.post('/item/supplyProperty/add', data)
    },
    // 根据包装名称查询
    getitemsupplyPropertyfindByUnitMsg(data) {
        return HttpClient.get('/item/supplyProperty/findByUnitMsg', data)
    },
    // 查询包装类型列表
    getitemsupplyPropertylist(data) {
        return HttpClient.get('/item/supplyProperty/list', data)
    },
    // 更新供货规格
    putsupplyPropertyupdate(data) {
        return HttpClient.put('/item/supplyProperty/update', data)
    }
}
