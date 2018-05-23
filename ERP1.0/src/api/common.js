import HttpClient from 'utils/HttpClient';

export default {
    /************************获取区域地区数据****************************** */
    getProviceData(){
        return HttpClient.get('/address/province');
    }

}
