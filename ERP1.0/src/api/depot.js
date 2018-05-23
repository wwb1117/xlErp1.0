import HttpClient from '../utils/HttpClient';
export default {
    /********** 仓库管理 *********/
    // 获取仓库列表
    getWarehouseList() {
        return HttpClient.get('/warehouse/list');
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
    addInsertOrder(data) {
        return HttpClient.post('/store/insertOrder', data);
    }
}
