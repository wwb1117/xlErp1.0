import HttpClient from '../utils/HttpClient';
export default {
    /********** 仓库管理 *********/
    // 获取仓库列表
    getWarehouseList(data) {
        return HttpClient.get('/warehouse/list', data);
    },
    // 新增仓库
    addWarehouse(data) {
        return HttpClient.post('/warehouse/add', data);
    },
    // 修改仓库
    editWarehouse(data) {
        return HttpClient.put('/warehouse/update', data);
    },
    // 删除仓库
    deleteWarehouse(id) {
        return HttpClient.delete(`/warehouse/${id}`);
    },
    /********** 入库 *********/
    // 新增入库单
    addInboundOrder(data) {
        return HttpClient.post('/store/insertOrder', data);
    },
    // 查询入库单列表
    getInboundList(data) {
        return HttpClient.get('/store/findByCondition', data);
    },
    // 入库单详情
    getInboundDetail(id) {
        return HttpClient.get(`/store/${id}`);
    },
    // 删除入库单
    delInboundOrder(id) {
        return HttpClient.delete(`/store/${id}`);
    },
    // 作废入库单
    invalidInbound(data) {
        return HttpClient.put('/store/invalidOrder', data);
    },
    // 作废入库单列表
    getInvalidInboundList(data) {
        return HttpClient.get('/store/findByInvalidCondition', data);
    },
    /********** 出库 *********/
    // 新增出库单
    addOutboundOrder(data) {
        return HttpClient.post('/deliver/insertOrder', data);
    },
    // 修改出库单
    editOutboundOrder(data) {
        return HttpClient.put('/deliver/updateOrder', data);
    },
    // 出库单列表
    getOutboundList(data) {
        return HttpClient.get('/deliver/findByCondition', data);
    },
    // 出库单详情
    getOutboundDetail(id) {
        return HttpClient.get(`/deliver/${id}`);
    },
    // 删除出库单
    delOutboundOrder(id) {
        return HttpClient.delete(`/deliver/${id}`);
    },
    /********** 库存 *********/
    // 库存列表
    getInventoryList(data) {
        return HttpClient.get('/inventory/findByCondition', data);
    },
    // 修改库存
    editInventory(data) {
        return HttpClient.put('/inventory/update', data);
    },
    // 出入库记录
    inoutBound(data) {
        return HttpClient.get('/inventory/findItemByCondition', data);

    },
    // 出入库订单详情
    inoutBoundDetail(data) {
        return HttpClient.get('/inventory/findOrder', data);
    },
    /********** 调拨单*********/
    // 新增调拨单
    addAllotOrder(data) {
        return HttpClient.post('/allocation/insert', data);
    },
    // 调拨单列表
    getAllotList(data) {
        return HttpClient.get('/allocation/findByCondition', data);
    },
    // 调拨单详情
    getAllotDetail(id) {
        return HttpClient.get(`/allocation/${id}`);
    },
    // 删除调拨单
    delAllotOrder(id) {
        return HttpClient.delete(`/allocation/${id}`);
    }
}
