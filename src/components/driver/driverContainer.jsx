import React from 'react';
import { connect } from 'react-redux';
import { SetCurrentPage, requestDrivers } from '../../redux/Driver-reducer';
import Drivers from './drivers';
import Preloader from '../Common/Preloader/Preloader';
import { withAuthRedirect } from '../HOC/withAuthRedirect'
import { compose } from 'redux';
import { getDrivers, getPageSize, getTotalDriversCount, getCurrentPage, getIsFetching, getFollowingInProgress, getIsAuth } from '../../redux/Driver-selector';
import { Redirect } from 'react-router-dom';
import Map from '../FirstWindow'
import { logout } from '../../redux/Auth-reducer';

class DriversContainer extends React.Component {
   
    componentDidMount() {
         
        this.props.requestDrivers(this.props.currentPage, this.props.pageSize);
        this.refreshProfile();
    }


    onPageChanged = (pageNumber) => {
        this.props.requestDrivers(pageNumber, this.props.pageSize);
        this.props.SetCurrentPage(pageNumber)

    }
    refreshProfile() {
    //     let token = localStorage.getItem('accessToken');
    //     debugger
    //     if (token === null){
    //  //this.props.history.push("/login")
    //           <Redirect to="/login" />
    //         }
    //     else {
    //         <Redirect to="/main" />
    //     }
 
    // let token = localStorage.getItem('isAuthToken')
    // debugger
    // if(token === 'true') {
    //     console.log(token) 
    //     return  <Redirect to={'/main'} />
    //  }

    }


    componentDidUpdate (prevProps, prevState, snapshot){
            this.refreshProfile()

        
    }

    render() {
        return <>
            { this.props.isFetching ? <Preloader /> : null}
            <Drivers totalItemsCount={this.props.totalItemsCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                // UnFollow={this.props.UnFollow}
                // Follow={this.props.Follow}
                drivers={this.props.drivers}
                FollowingInProgress={this.props.FollowingInProgress}
            />
        </>
    }

}



const mapStateToProps = (state) => {
    return {
        drivers: getDrivers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalDriversCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        FollowingInProgress: getFollowingInProgress(state),
        isAuth: getIsAuth(state),
        
    }
}




export default compose(connect(mapStateToProps,
    {
        // Follow,
        // UnFollow,
        // setUsers,
        logout,
        SetCurrentPage,
        // SetTotalUsersCount,
        // ToggleIsFetching,
        // ToggleFollowingProgress,
        requestDrivers
    }), withAuthRedirect)(DriversContainer);

// connect(mapStateToProps,
//     {
//         Follow,
//         UnFollow,
//         // setUsers,
//         SetCurrentPage,
//         // SetTotalUsersCount,
//         // ToggleIsFetching,
//         ToggleFollowingProgress,
//         getUsers
//     })(AuthRedurectComponent);