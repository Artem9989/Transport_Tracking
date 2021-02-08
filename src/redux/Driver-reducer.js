import { driversAPI , authAPI } from '../api/api';
import {updateObjectInArray } from './utils/validators/objects-helpers'


let SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
let SET_DRIVERS = 'SET_DRIVERS';
let SET_TOTAL_DRIVERS_COUNT = 'SET_TOTAL_DRIVERS_COUNT';
let SET_ADD_DRIVERS = 'SET_ADD_DRIVERS';
// let TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
// let TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS"

let initialState = {
    drivers: [],
    pageSize: 25,
    totalDriversCount: 0,
    currentPage: 1,
    isFetching: false,
    FollowingInProgress: [],
    newDriver: [{
        id: null,
        vehicleNumber: null,
        vehicleType: null
    }]
}

const driversReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DRIVERS: {
            return { ...state, drivers: action.drivers}// users: action.users [...state.users, action.users]
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage };
        }
        case SET_TOTAL_DRIVERS_COUNT: {
            return { ...state, totalDriversCount: action.count }
        }
        case SET_ADD_DRIVERS: {
            return {...state, newDriver: action.newDriver}
        }
        // case TOGGLE_IS_FETCHING: {
        //     return { ...state, isFetching: action.isFetching }
        // }
        // case TOGGLE_IS_FOLLOWING_PROGRESS:
        //     return {
        //         ...state,
        //         FollowingInProgress: action.isFetching
        //             ? [...state.FollowingInProgress, action.userId]
        //             : state.FollowingInProgress.filter(id => id !== action.userId)
        //     }

        default:
            return state;
    }

}

export const SetCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const SetTotalDriversCount = (totalDriversCount) => ({ type: SET_TOTAL_DRIVERS_COUNT, count: totalDriversCount })
export const setDrivers = (drivers) => ({ type: SET_DRIVERS, drivers });
export const SetAddDrivers = (id,vehicleNumber,vehicleType) => ({ type: SET_ADD_DRIVERS, newDriver:{ id,vehicleNumber,vehicleType} });
// export const ToggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
// export const ToggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })


// export const getUserData = () =>  (dispatch) => {
//     let response = await driversAPI.getUsers()
//     if (response.data.resultCode === 0) {
//         dispatch((id, login, email, true));
//     }
// };
// export const login = (email, password, rememberMe) => async (dispatch) => {

//     let emailAndPassword= {email,password}
//     try {
//         let response = await authAPI.login(emailAndPassword.email, emailAndPassword.password, rememberMe)
//         localStorage.setItem('accessToken', response.data.data.accessToken)     
           
//     } catch(error){  
//         let message = error.response.data.data.message;

//     }
// }


export const requestDrivers = (currentPage,pageSize) => {
    return async (dispatch) => {
    // dispatch(ToggleIsFetching(true));
   let data = await driversAPI.getDrivers(currentPage, pageSize)
            let items = data.data
          dispatch(setDrivers(items));
        //   dispatch(login());
        
          
            // dispatch( ToggleIsFetching(false));
            // dispatch(setDrivers(response.id));
            // dispatch(SetTotalDriversCount(data.totalCount));
}
}

export const addDrivers = (id,vehicleNumber,vehicleType) => {
    return async (dispatch) => {
   let data = await driversAPI.addDrivers(id,vehicleNumber,vehicleType)

          dispatch(SetAddDrivers(id,vehicleNumber,vehicleType));

}
}


// const followUnFollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
//     dispatch(ToggleFollowingProgress(true, userId));
//     let response = await apiMethod(userId)
//     if (response.data.resultCode === 0) {
//         dispatch(actionCreator(userId));
//     }
//     dispatch(ToggleFollowingProgress(false, userId));
// }

// export const Follow = (userId) => {
//     return async (dispatch) => {
//         followUnFollowFlow(dispatch, userId, driversAPI.Follow.bind(driversAPI), FollowSuccess);
//     }
// }

// export const UnFollow = (userId) => {
//     return async (dispatch) => {
//         followUnFollowFlow(dispatch, userId, driversAPI.UnFollow.bind(driversAPI), UnFollowSuccess);

//         // dispatch(ToggleFollowingProgress(true, userId));
//         // let response = apiMethod(userId)
//         // if (response.data.resultCode === 0) {
//         //     dispatch(actionCreator(userId));
//         // }
//         // dispatch(ToggleFollowingProgress(false, userId));
//     }
// }
export default driversReducer;