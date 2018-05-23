import HttpClient from 'utils/HttpClient';
export default {
    saveData(data){
        return HttpClient.post('/login', data);
    }
}
