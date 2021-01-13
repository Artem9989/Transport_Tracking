import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'http://www.webapiroads.somee.com/',
    headers: {
       
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "replacecredentials": "same-origin"
    }
    // headers: {
    //     //'API-KEY': '8c22e4e3-27db-4208-b0f3-9e32e145fb57'
    //     'API-KEY': '8c22e4e3-27db-4208-b0f3-9e32e145fb57'
    // }
});
instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // // Do something with response error
    // if (error.response && error.response.data){

    //     return Promise.reject(error.response);
    // }
    return Promise.reject(error);
  });

export const authAPI = {
    register(email, login, password, firstName, lastName, middleName) {
        return instance.post(`api/account/register`, { email,login, password, firstName, lastName, middleName })
    },
    login(email, password, rememberMe = false) {
        
        return (instance.post(`api/account/login`, { email, password })
        )}
}