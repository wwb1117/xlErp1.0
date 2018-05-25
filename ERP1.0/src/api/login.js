import HttpClient from 'utils/HttpClient';

export default {
    login(data){
        return HttpClient.post('/user/login', data);
    }
}
