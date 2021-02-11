import { stopSubmit } from 'redux-form';
import { authAPI,usersAPI,rolesAPI } from '../api/api';

const SET_USER_DATA = 'network/auth/SET_USER_DATA';
const ADMIN_AUTH_SUCCESS = 'ADMIN_AUTH_SUCCESS';
const LOGOUT = "LOGOUT";
const GET_USERS_SUCCESS = 'SET_USERS';
const SET_ALL_ROLES = 'SET_ALL_ROLES';
const GET_USERS_ERROR = 'GET_USERS_ERROR';
const GET_USERS_REQUEST = 'GET_USERS_REQUEST';

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
    loader: false,
}

const adminAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_AUTH_SUCCESS:
            return {
                ...state,
                adminAuthSuccess: action.adminAuthSuccess
            }
        case GET_USERS_SUCCESS:
            return{
                ...state,
                loader:false,
                users: action.users
            }
        case GET_USERS_ERROR:
            return{
                ...state,
                loader: false
            }
        case GET_USERS_REQUEST:
            return{
                ...state,
                loader:true
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
export const getAllRoles = (roles) => ({ type: SET_ALL_ROLES, roles });

export const getUsersRequest = () => ({ type: GET_USERS_REQUEST });
export const getUsersSuccess = (users) => ({ type: GET_USERS_SUCCESS, users });
export const getUsersError = () => ({ type: GET_USERS_ERROR });


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
    dispatch(getUsersRequest());
    try{
   let data = await usersAPI.getUsers(currentPage, pageSize)
            let items = data.data
            dispatch(getUsersSuccess(items))
    }
    catch (_error){
        if (_error.response.status = 403)
        {
        alert('Войдите через админа')
        }
        console.log(_error)
        
        dispatch(getUsersError())
    }
    
}
}
export const requestAllRoles = () => {
    return async (dispatch) => {
    // dispatch(ToggleIsFetching(true));
let data = await rolesAPI.getAllRoles()
        let items = data.data
        dispatch(getAllRoles(items));
        //   dispatch(login());
        
        
            // dispatch( ToggleIsFetching(false));
            // dispatch(setDrivers(response.id));
            // dispatch(SetTotalDriversCount(data.totalCount));
}
}

export default adminAuthReducer;