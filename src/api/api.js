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

export const authAPI = {
    register(email, password, FirstName, LastName, MiddleName, Email) {
        return instance.post(`api/account/register`, { email, password, FirstName, LastName, MiddleName, Email })
            .then(response => {
                console.log(response);
            })
            .catch(response => {
                alert(response.response.data.data.message);
            });
    },
    login(email, password, rememberMe = false) {
        return (instance.post(`api/account/login`, { email, password }));
    }
}
