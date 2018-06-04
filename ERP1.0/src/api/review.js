import HttpClient from 'utils/HttpClient';
export default {
    getWaitReviewList(data){
        return HttpClient.get('/approval/auditor/findByCondition', data);
    },
    getReviewRecord(data){
        return HttpClient.get('/approval/record', data);
    },
    getILaunchedList(data){
        return HttpClient.get('/approval/creator/findByCondition', data);
    },
    getIReviewList(data){
        return HttpClient.get('/approval/audited/findByCondition', data);
    }
}
