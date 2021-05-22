// import { createSelector } from "reselect";

export const getDrivers = (state) => {
    return state.DriversPage.drivers;
}
export const getRoutes = (state) => {
    return state.DriversPage.Route;
}
export const getStatusOnline = (state) => {
    // let status = [];
    // if (state.DriversPage.drivers == state.DriversPage.statusOnline.id)
    // {
    //     status = [...state.DriversPage.statusOnline]
    // }
    return state.DriversPage.statusOnline;
}
export const insertendpoint = (state) => {
    return state.DriversPage.newEndPoint;
}
export const insertstartpoint = (state) => {
    return state.DriversPage.newstartPoint;
}
export const insertpoint = (state) => {
    return state.DriversPage.newinsertpoint;
}
export const insertRoute = (state) => {
    return state.DriversPage.newInsertPoint;
}

// export const getDriversSelector = (state) => {
//     return getDrivers(state).filter(u => true);
// }

// export const getDriversSuperSelector =  createSelector(getDrivers, (drivers) => {
//    return drivers.filter(u => true);
// });


export const getPageSize = (state) => {
    return state.DriversPage.pageSize;
}

export const getTotalDriversCount = (state) => {
    return state.DriversPage.totalDriversCount;
}

export const getCurrentPage = (state) => {
    return state.DriversPage.currentPage;
}
export const getIsFetching= (state) => {
    return state.DriversPage.isFetching;
}
export const getFollowingInProgress = (state) => {
    return state.DriversPage.FollowingInProgress;
}
export const getIsAuth = (state) => {
    return state.auth.isAuth;
}

// сложный селектор с for, math m большие массивы. каунт ретурн