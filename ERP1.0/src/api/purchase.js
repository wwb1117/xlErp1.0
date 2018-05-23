import HttpClient from 'utils/HttpClient';

export default {
    /************************供应商****************************** */
    getSupplierSelectData(){
        return HttpClient.get('/seller/findAll');
    },
    getSupplierList(data){
        return HttpClient.get('/seller/findByCondition', data);
    }

}
