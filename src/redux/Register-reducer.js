import { stopSubmit } from 'redux-form';
import { authAPI } from '../api/api';

const REGISTRATION_USER_DATA = 'network/auth/REGISTRATION_USER_DATA';


let initialState = {
    id: null,
    email: null,
    login: null,
    password: null,
    //    Password: pass_two,
    firstName: null,
    lastName: null,
    middleName: null,
     // Если капчи нет, то не обязательна
    //  isFetching: false,
}

const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTRATION_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }

}

export const RegistrationUserData = (id, login, email, password, firstName, lastName, middleName) => ({ type: REGISTRATION_USER_DATA, payload: { id, login, email, password, firstName, lastName, middleName } })

// export const getAuthUserData = () => async (dispatch) => {
//     let response = await authAPI.me()
//     if (response.data.resultCode === 0) {
//         let { id, login, email } = response.data.data;
//         dispatch(SetAuthUserData(id, login, email, true));
//     }
// };


export const register = (id, login, email, password, firstName, lastName, middleName) => async (dispatch) => {

    let response = await authAPI.register(id, login, email, password, firstName, lastName, middleName)

    if (response.data.resultCode === 0) {
        // dispatch(getAuthUserData())
    } else {

        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Ошибка"
        dispatch(stopSubmit("login", { _error: message }));
    }
}


// export const logout = () => async (dispatch) => {
//     let response = await authAPI.logout()

//     if (response.data.resultCode === 0) {
//         dispatch(SetAuthUserData(null, null, null, false))
//     }
// }

export default registerReducer;