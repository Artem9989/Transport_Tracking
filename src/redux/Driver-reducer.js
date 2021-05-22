import { driversAPI  } from '../api/api';
// import {updateObjectInArray } from './utils/validators/objects-helpers'


let SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
let SET_DRIVERS = 'SET_DRIVERS';
let SET_TOTAL_DRIVERS_COUNT = 'SET_TOTAL_DRIVERS_COUNT';
let SET_ADD_DRIVERS = 'SET_ADD_DRIVERS';
let SET_ADD_INSERT_END_POINT = 'SET_ADD_INSERT_END_POINT';
let SET_INSET_START_POINT = 'SET_INSET_START_POINT';
let SET_ADD_INSERT_ROUTE = 'SET_ADD_INSERT_ROUTE';
let SET_ADD_INSERT_POINT = 'SET_ADD_INSERT_POINT';
let SET_GET_ROUTE = 'SET_GET_ROUTE';
let SET_IS_ONLINE = 'SET_IS_ONLINE';
// let TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
// let TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS"

let initialState = {
    drivers: [],
    routeCoord: [],
    totalDriversCount: 0,
    currentPage: 1,
    isFetching: false,
    FollowingInProgress: [],
    newDriver: [{
        id: null,
        vehicleNumber: null,
        vehicleType: null
    }],
    newRoute: [{
        id: null,
    }],
    newEndPoint:[{
        idDriver: null,
        routeId: null,
        lat: null,
        lng: null,
    }],
    newstartPoint:[{
        idDriver: null,
        routeId: null,
        lat: null,
        lng: null,
    }],
    newInsertPoint:[{
        idDriver: null,
        routeId: null,
        lat: null,
        lng: null,
    }],
    newInsertRoute:[{
        driverId: null,
    }],
    Route: null,
    statusOnline: [{
        id: null,
        status: null,

    }],

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
        // case SET_ADD_ROUTE: {
        //     return {...state, newRoute: action.newRoute}
        // }
        case SET_ADD_INSERT_END_POINT: {
            return {...state, newEndPoint: action.newEndPoint}
        }
        case SET_INSET_START_POINT: {
            return {...state, newstartPoint: action.newstartPoint}
        }
        case SET_ADD_INSERT_ROUTE: {
            return {...state, newInsertRoute: action.newInsertRoute}
        }
        case SET_ADD_INSERT_POINT: {
            return {...state, newInsertPoint: action.newInsertPoint}
        }
        case SET_GET_ROUTE: {
            return {...state, Route: action.Route}
        }
        case SET_IS_ONLINE: {
            return {...state, statusOnline: action.statusOnline }
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

export const SetCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
export const SetTotalDriversCount = (totalDriversCount) => ({
  type: SET_TOTAL_DRIVERS_COUNT,
  count: totalDriversCount,
});
export const getDriversSuccess = (drivers) => ({ type: SET_DRIVERS, drivers });
export const SetAddDrivers = (id, vehicleNumber, vehicleType) => ({
  type: SET_ADD_DRIVERS,
  newDriver: { id, vehicleNumber, vehicleType },
});
// export const SetAddRoute = (id) => ({ type: SET_ADD_ROUTE, newRoute:{ id} });
export const SetInsertendpoint = (idDriver, id, lat, lng) => ({
  type: SET_ADD_INSERT_END_POINT,
  newEndPoint: { idDriver, id, lat, lng },
});
export const SetinsertRoute = (id) => ({
  type: SET_ADD_INSERT_ROUTE,
  newInsertRoute: { id },
});
export const Setinsertpoint = (idDriver, id, lat, lng) => ({
  type: SET_ADD_INSERT_POINT,
  newInsertPoint: { idDriver, id, lat, lng },
});
export const SetGetRoute = (Route) => ({ type: SET_GET_ROUTE, Route });
export const SetInsertstartpoint = (idDriver, id, lat, lng) => ({
  type: SET_INSET_START_POINT,
  newstartPoint: { idDriver, id, lat, lng },
});
export const SetisOnline = (id, status) => ({
  type: SET_IS_ONLINE,
  statusOnline: { id, status },
});



export const getRoute = (id) => {
    return async (dispatch) => {
   let data = await driversAPI.getRoute(id)
        try{
        let Route = data.data
          dispatch(SetGetRoute(Route));
          
        }
        catch(_error){
            console.log(_error)
            console.log(data)
        }

}
}
// export const addRoute = (id) => {
//     return async (dispatch) => {
//    let data = await driversAPI.addRoute(id)
//         try{
//           dispatch(SetAddRoute(id));
//         }
//         catch(_error){
//             console.log(_error)
//             console.log(data)
//         }

// }
// }
export const insertRoute = (id) => {
    return async (dispatch) => {
   let data = await driversAPI.insertRoute(id)
        try{
          dispatch(SetinsertRoute(id));
        }
        catch(_error){
            console.log(_error)
            console.log(data)
        }

}
}
export const isOnline = (id) => {
    return async (dispatch) => {
   let data = await driversAPI.isOnline(id)
        let status = data.data;
        // debugger
        try{
            
          dispatch(SetisOnline(id,status));
          
        }
        catch(_error){
            console.log(_error)
            console.log(data)
        }

}
}
export const insertpoint = (idDriver,id,lat,lng) => {
    return async (dispatch) => {
   let data = await driversAPI.insertpoint(idDriver,id,lat,lng)
        try{
          dispatch(Setinsertpoint(idDriver,id,lat,lng));
        }
        catch(_error){
            console.log(_error)
            console.log(data)
        }

}
}
export const insertstartpoint = (idDriver,id,lat,lng) => {
    return async (dispatch) => {
   let data = await driversAPI.insertstartpoint(idDriver,id,lat,lng)
        try{
          dispatch(SetInsertstartpoint(idDriver,id,lat,lng));
        }
        catch(_error){
            console.log(_error)
            console.log(data)
        }

}
}
export const insertendpoint = (idDriver,id,lat,lng) => {
    return async (dispatch) => {
   let data = await driversAPI.insertendpoint(idDriver,id,lat,lng)
        try{
          dispatch(SetInsertendpoint(idDriver,id,lat,lng));
        }
        catch(_error){
            console.log(_error)
            console.log(data)
        }

}
}

export const requestDrivers = (currentPage,pageSize) => {
    return async (dispatch) => {
    // dispatch(ToggleIsFetching(true));
    try {
   let data = await driversAPI.getDrivers(currentPage, pageSize)
            let items = data.data
          dispatch(getDriversSuccess(items));
    }
    catch (_error) {
        // dispatch(getDriversError())
        console.log(_error)
        
    }
}
}

export const addDrivers = (id,vehicleNumber,vehicleType) => {
    return async (dispatch) => {
   let data = await driversAPI.addDrivers(id,vehicleNumber,vehicleType)
        try{
          dispatch(SetAddDrivers(id,vehicleNumber,vehicleType));
        }
        catch(_error){
            console.log(_error)
            console.log(data)
        }

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