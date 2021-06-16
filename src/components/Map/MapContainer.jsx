import React from 'react';
import { connect } from 'react-redux';
import costOptimRouteReducer  from '../../redux/CostOptim-reducer';
import Preloader from '../Common/Preloader/Preloader';
import { withAuthRedirect } from '../HOC/withAuthRedirect'
import { compose } from 'redux';
import {  getcostOptimRouteValue, getcostOptimRoute } from '../../redux/CostOptim-reducer';
// import { Redirect } from 'react-router-dom';
// import Map from '../FirstWindow'
// import { logout } from '../../redux/Auth-reducer';
import DisplayMapClassContainer from './DisplayMapClassContainer';

class MapContainer extends React.Component {
   
    // componentDidMount() {
         
      
    // }


    // onPageChanged = (pageNumber) => {


    // }
    // refreshProfile() {
    // //     let token = localStorage.getItem('accessToken');
    // //     debugger
    // //     if (token === null){
    // //  //this.props.history.push("/login")
    // //           <Redirect to="/login" />
    // //         }
    // //     else {
    // //         <Redirect to="/main" />
    // //     }
 
    // // let token = localStorage.getItem('isAuthToken')
    // // debugger
    // // if(token === 'true') {
    // //     console.log(token) 
    // //     return  <Redirect to={'/main'} />
    // //  }

    // }


    // componentDidUpdate (prevProps, prevState, snapshot){


        
    // }

    render() {
        return <>
            { this.props.isFetching ? <Preloader /> : null}
            <DisplayMapClassContainer 
            CORV={this.props.costOptimRouteValue}
            toggleModal={this.props.toggleModal}
            ShowModal={this.props.ShowModal}
            transportType={this.props.transportType}
            setshowCostOptimRoute={this.props.setshowCostOptimRoute}
            showCostOptimRoute={this.props.showCostOptimRoute}
            getcostOptimRouteValue={this.props.getcostOptimRouteValue}
            visible={this.props.visible}
            setvisible={this.props.setvisible}
            isolineType = {this.props.isolineType}
            isolineValue ={this.props.isolineValue}
            considerTraffic ={ this.props.considerTraffic}
            locationTracking={this.props.locationTracking}
            Routing={this.props.Routing}
            RoutingArray={this.props.RoutingArray}
            valueBuffer={this.props.valueBuffer}
            showBuffer={this.props.showBuffer}
            setDeviation={this.props.setDeviation}
            />
        </>
    }

}



const mapStateToProps = (state) => {
    return {
        costOptimRouteValue: state.CostOptimValue,

        
    }
}




export default compose(connect(mapStateToProps,
    {
        getcostOptimRouteValue,
        costOptimRouteReducer,
    }), withAuthRedirect)(MapContainer);

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