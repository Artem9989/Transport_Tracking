import { stopSubmit } from 'redux-form';
import { authAPI } from '../api/api';

let SET_USER_DATA = 'network/auth/SET_USER_DATA';
const ADMIN_AUTH_SUCCESS = 'ADMIN_AUTH_SUCCESS';
const LOGOUT = "LOGOUT";

let initialState = {
    currentUser: [],
    id: null,
    email: null,
    password: null,
    isAuth: false,
    adminAuthSuccess: false,
    // captchaUrl: null, // Если капчи нет, то не обязательна
    //  isFetching: false,
}

const adminAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_AUTH_SUCCESS:
            return {
                ...state,
                adminAuthSuccess: action.adminAuthSuccess
            }

        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case LOGOUT:
            localStorage.removeItem('token')
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
export const AdminAuthSuccessUserData = (adminAuthSuccess) => ({type: ADMIN_AUTH_SUCCESS, adminAuthSuccess:adminAuthSuccess})
export const logout = () => ({type: LOGOUT})

export const getAuthUserData = () =>  (dispatch) => {
        
};


export const adminAuth = (email, password, rememberMe) => async (dispatch) => {
    dispatch(AdminAuthSuccessUserData());
    let emailAndPassword= {email,password}
    try {
        let response = await authAPI.login(emailAndPassword.email, emailAndPassword.password, rememberMe)
    // if (response.data.status === "OK") {
         dispatch(getAuthUserData())
       // let { password, email } = response.data.data;
        dispatch(SetAuthUserData( password, email, true));
       
        localStorage.setItem('accessToken', response.data.data.accessToken)        
    } catch(error){  
        let message = error.response.data.data.message;
        dispatch(stopSubmit("adminAuth", { _error: message }));
    }
}

export default adminAuthReducer;