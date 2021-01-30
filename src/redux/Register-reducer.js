import { stopSubmit } from 'redux-form';
import { authAPI } from '../api/api';

const REGISTRATION_USER_DATA = 'network/auth/REGISTRATION_USER_DATA';
const REGISTERED_SUCCESSFULLY = 'REGISTERED_SUCCESSFULLY';


let initialState = {
    id: null,
    email: null,
    login: null,
    password: null,
    //    Password: pass_two,
    firstName: null,
    lastName: null,
    middleName: null,
    registeredSuccess: false,

 
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
        case REGISTERED_SUCCESSFULLY:
            return {
                ...state, 
                registeredSuccess: action.registeredSuccess
            }

        default:
            return state;
    }

}

export const RegistrationUserData = ( login, email, password, firstName, lastName, middleName) => ({ type: REGISTRATION_USER_DATA, payload: { login, email, password, firstName, lastName, middleName } })
export const RegisteredSuccessfully = (registeredSuccess) => ({type: REGISTERED_SUCCESSFULLY, registeredSuccess:registeredSuccess})



export const register = (login, email, password, firstName, lastName, middleName) => async (dispatch) => {
    try {
        let response = await authAPI.register( login, email, password, firstName, lastName, middleName)
        
   
            dispatch(RegisteredSuccessfully(true))
            dispatch(RegisteredSuccessfully(false))
           let regmessage = response.data.data.message
           dispatch(stopSubmit("register", { _error: regmessage }));

    }
    catch (error){
        let message = error.response.data.data.message
         dispatch(stopSubmit("register", { _error: message }));
    }
}


// export const logout = () => async (dispatch) => {
//     let response = await authAPI.logout()

//     if (response.data.resultCode === 0) {
//         dispatch(SetAuthUserData(null, null, null, false))
//     }
// }

export default registerReducer;