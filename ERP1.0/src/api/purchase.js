import HttpClient from 'utils/HttpClient';

export default {
    /************************供应商****************************** */
    getSupplierSelectData(){
        return HttpClient.get('/seller/findAll');
    },
    getSupplierList(data){
        return HttpClient.get('/seller/findByCondition', data);
    },
    addSupplier(data){
        return HttpClient.post('/seller/insertSeller', data);
    },
    editSupplier(data){
        return HttpClient.put('/seller/updateSeller', data);
    },
    deleteSupplier(data){
        return HttpClient.delete('/seller/' + data);
    },
    getItemSupplierData(data){
        return HttpClient.get('/seller/' + data);
    },
    /************************采购单****************************** */
    getPurchaseList(data){
        return HttpClient.get('/purchase/findByCondition', data);
    },
    addPurchaseList(data){
        return HttpClient.post('/purchase/insertOrder', data);
    }

}
