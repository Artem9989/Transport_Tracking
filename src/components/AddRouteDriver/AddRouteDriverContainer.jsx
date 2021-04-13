import React from 'react';
import { connect } from 'react-redux';
import { SetCurrentPage, requestDrivers } from '../../redux/Driver-reducer';
import Preloader from '../Common/Preloader/Preloader';
import { withAuthRedirect } from '../HOC/withAuthRedirect'
import { compose } from 'redux';
import { getDrivers, getPageSize, getTotalDriversCount, getCurrentPage, getIsFetching, getFollowingInProgress, getIsAuth } from '../../redux/Driver-selector';
import {AddRouteDriver } from './AddRouteDriver';
import { logout } from '../../redux/Auth-reducer';

class AddRouteDriverContainer extends React.Component {
  
    componentDidMount() {


    }




    componentDidUpdate (prevProps, prevState, snapshot){

    }

    render() {
        return <>
            { this.props.isFetching ? <Preloader /> : null}
            <AddRouteDriver 
            totalItemsCount={this.props.totalItemsCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            // UnFollow={this.props.UnFollow}
            // Follow={this.props.Follow}
            drivers={this.props.drivers}
            FollowingInProgress={this.props.FollowingInProgress}
            setvisible= {this.props.setvisible}
            visible={this.props.visible}
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
            logout,
            SetCurrentPage,
            requestDrivers
        }), withAuthRedirect)(AddRouteDriverContainer);
    
 