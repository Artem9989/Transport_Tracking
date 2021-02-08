import { stopSubmit } from 'redux-form';
import { authAPI,usersAPI,rolesAPI } from '../api/api';

const SET_USER_DATA = 'network/auth/SET_USER_DATA';
const ADMIN_AUTH_SUCCESS = 'ADMIN_AUTH_SUCCESS';
const LOGOUT = "LOGOUT";
const SET_USERS = 'SET_USERS';
const SET_ALL_ROLES = 'SET_ALL_ROLES';

let initialState = {
    currentUser: [],
    pageSize: 25,
    totalDriversCount: 0,
    currentPage: 1,
    id: null,
    email: null,
    password: null,
    isAuth: false,
    adminAuthSuccess: false,
    users: [],
    roles: [],
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
        case SET_USERS:
            return{
                ...state,
                users: action.users
            }
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case SET_ALL_ROLES:
            return{
                ...state,
                roles: action.roles
            }
        case LOGOUT:
            localStorage.removeItem('token')
            localStorage.removeItem('isAuthAdminToken')
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
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setAllRoles = (roles) => ({ type: SET_ALL_ROLES, roles });

export const getAuthUserData = () =>  (dispatch) => {
        
};


export const adminAuth = (email, password) => async (dispatch) => {
    dispatch(AdminAuthSuccessUserData());
    let emailAndPassword= {email,password}
    try {
        let response = await authAPI.login(emailAndPassword.email, emailAndPassword.password)

        localStorage.setItem('accessToken', response.data.data.accessToken)  
        dispatch(getAuthUserData())

        if (localStorage.getItem('accessToken') === "null"){
          
            let message = response.data.data.message;
            localStorage.setItem('isAuthAdminToken', false)
            dispatch(stopSubmit("adminAuth", { _error: message }));
            
           }
        else {
            localStorage.setItem('isAuthAdminToken', true)
            dispatch(SetAuthUserData( password, email, true));
            
            window.location.reload();
        }
                     
    } catch(error){  
        let message = error.response.data.data.message;
        dispatch(stopSubmit("adminAuth", { _error: message }));
    }
}

export const requestUsers = (currentPage,pageSize) => {
    return async (dispatch) => {
    // dispatch(ToggleIsFetching(true));
   let data = await usersAPI.getUsers(currentPage, pageSize)
            let items = data.data
          dispatch(setUsers(items));
        //   dispatch(login());
        
          
            // dispatch( ToggleIsFetching(false));
            // dispatch(setDrivers(response.id));
            // dispatch(SetTotalDriversCount(data.totalCount));
}
}
export const requestAllRoles = () => {
    return async (dispatch) => {
    // dispatch(ToggleIsFetching(true));
let data = await rolesAPI.getAllRoles()
        let items = data.data
        dispatch(setAllRoles(items));
        //   dispatch(login());
        
        
            // dispatch( ToggleIsFetching(false));
            // dispatch(setDrivers(response.id));
            // dispatch(SetTotalDriversCount(data.totalCount));
}
}

export default adminAuthReducer;