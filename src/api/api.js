import * as axios from 'axios';
import { Redirect } from 'react-router-dom';

const instance = axios.create({
    baseURL: 'http://www.webapiroads.somee.com/',
    headers: {
       
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "replacecredentials": "same-origin",
        
    }

});
instance.interceptors.response.use(function (response) {
    // if( localStorage.getItem('accessToken'))
    return response;
  }, function (error) {
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

export const driversAPI = {

    getDrivers(currentPage = 1, pageSize = 25) {
        let token = localStorage.getItem('accessToken')

        return (instance.get(`/api/driver/getalldrivers`, {
            headers: {'Authorization':'Bearer ' + token}
        
        })

        
        )}
}

export const usersAPI = {

    getUsers(currentPage = 1, pageSize = 25) {
        let token = localStorage.getItem('accessToken')

        return (instance.get(`/api/account/getusers`, {
            headers: {'Authorization':'Bearer ' + token}
        
        })

        
        )}
}
