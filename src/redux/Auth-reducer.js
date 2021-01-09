// import { stopSubmit } from 'redux-form';
import { authAPI } from '../api/api';

let SET_USER_DATA = 'network/auth/SET_USER_DATA';

let initialState = {
    id: null,
    email: null,
    password: null,
    isAuth: false,
    // captchaUrl: null, // Если капчи нет, то не обязательна
    //  isFetching: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }

}

export const SetAuthUserData = ( password, email, isAuth) => ({ type: SET_USER_DATA, payload: {  password, email, isAuth } })

export const getAuthUserData = () =>  (dispatch) => {
        
};

export const register = (email, password, rememberMe) => async (dispatch) => {

    let response = await authAPI.login(email, password, rememberMe)
    if (response.data.data.status === "OK") {
         dispatch(getAuthUserData())
        let { password, email } = response.data.data;
        dispatch(SetAuthUserData( password, email, true));
    }
}

export const login = (email, password, rememberMe) => async (dispatch) => {

    let response = await authAPI.login(email, password, rememberMe)
    if (response.data.data.status === "OK") {
         dispatch(getAuthUserData())
        let { password, email } = response.data.data;
        dispatch(SetAuthUserData( password, email, true));
    }
    // } else {
    //     let message = response.data.messages.length > 0 ? response.data.messages[0] : "Ошибка"
    //     dispatch(stopSubmit("login", { _error: message }));
    // }
}

export default authReducer;