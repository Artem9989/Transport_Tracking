import React from 'react';
import { connect } from 'react-redux';
import {  requestUsers} from '../../redux/AuthAdmin-reducer';
import AdminPanel from './AdminPanel';
import Preloader from '../Common/Preloader/Preloader';
import { withAuthRedirect } from '../HOC/withAuthRedirect'
import { compose } from 'redux';
// import { getDrivers, getPageSize, getTotalDriversCount, getCurrentPage, getIsFetching, getFollowingInProgress, getIsAuth } from '../../redux/Driver-selector';


class AllUsersContainer extends React.Component {
  
    componentDidMount() {

        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
        this.refreshProfile();
    }


    onPageChanged = (pageNumber) => {
        this.props.requestUsers(pageNumber, this.props.pageSize);
        // this.props.SetCurrentPage(pageNumber)

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
            <AdminPanel totalItemsCount={this.props.totalItemsCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                // UnFollow={this.props.UnFollow}
                // Follow={this.props.Follow}
                users={this.props.users}
                FollowingInProgress={this.props.FollowingInProgress}
            />
        </>
    }

}



const mapStateToProps = (state) => {
    return {
        users: state.adminAuth.users
        
    }
}




export default compose(connect(mapStateToProps,
    {
        // Follow,
        // UnFollow,
        // setUsers,
        // SetCurrentPage,
        // SetTotalUsersCount,
        // ToggleIsFetching,
        // ToggleFollowingProgress,
        requestUsers
    }))(AllUsersContainer);

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