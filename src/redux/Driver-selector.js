// import { createSelector } from "reselect";

export const getDrivers = (state) => {
    return state.DriversPage.drivers;
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