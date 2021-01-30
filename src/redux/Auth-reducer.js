 import { stopSubmit } from 'redux-form';
import { authAPI } from '../api/api';

let SET_USER_DATA = 'network/auth/SET_USER_DATA';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = "LOGOUT";

let initialState = {
    currentUser: [],
    id: null,
    email: null,
    password: null,
    isAuth: false,
    loginSuccess: false,
    // captchaUrl: null, // Если капчи нет, то не обязательна
    //  isFetching: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginSuccess: action.loginSuccess,
                isAuth: true
            }

        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case LOGOUT:
            localStorage.removeItem('accessToken')
            localStorage.removeItem('isAuthToken')
            
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        default:
            return state;
    }

}

export const SetAuthUserData = ( password, email, isAuth) => ({ type: SET_USER_DATA, payload: { password, email, isAuth } })
export const LoginSuccessUserData = (loginSuccess) => ({type: LOGIN_SUCCESS, loginSuccess:loginSuccess})
export const logout = () => ({type: LOGOUT})

export const getAuthUserData = () =>  (dispatch) => {
        
};

// export const register = (email, password, rememberMe) => async (dispatch) => {

//     let response = await authAPI.register(email, password, rememberMe)
//     if (response.data.status === "OK") {
//          dispatch(getAuthUserData())
//         let { password, email } = response.data.data;
//         dispatch(SetAuthUserData( password, email, true));
//     }
// }
// export const getAuthUserData = () => async (dispatch) => {
//     let response = await authAPI.login()
//     if (response.data.resultCode === 0) {
//         let {  login, email } = response.data.data;
//         dispatch(SetAuthUserData( login, email, true));
//     }
// };

export const login = (email, password, rememberMe) => async (dispatch) => {
    dispatch(LoginSuccessUserData(true));
    let emailAndPassword= {email,password}
    try {
        let response = await authAPI.login(emailAndPassword.email, emailAndPassword.password, rememberMe)
        localStorage.setItem('accessToken', response.data.data.accessToken)     
    // if (response.data.status === "OK") {
   
    debugger
         dispatch(getAuthUserData())
       // let { password, email } = response.data.data;
       if (localStorage.getItem('accessToken') === "null"){
          
        let message = response.data.data.message;
        localStorage.setItem('isAuthToken', false)
        dispatch(stopSubmit("login", { _error: message }));
        
       }
       else {
           localStorage.setItem('isAuthToken', true)
        dispatch(SetAuthUserData( password, email, true));
        
        window.location.reload();
       }
           
    } catch(error){  
        let message = error.response.data.data.message;
        dispatch(stopSubmit("login", { _error: message }));
    }
}

export default authReducer;