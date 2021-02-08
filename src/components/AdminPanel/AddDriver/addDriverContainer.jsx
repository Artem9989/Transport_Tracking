import React from 'react';
import { connect } from 'react-redux';
import { addDrivers } from '../../../redux/Driver-reducer';
import Preloader from '../../Common/Preloader/Preloader';
import { withAuthRedirect } from '../../HOC/withAuthRedirect'
import { compose } from 'redux';
import addDriver from './addDriver.jsx';
import { Table, Tag, Space } from 'antd';
const { Column, ColumnGroup } = Table;


class addDriverContainer extends React.Component {
   
    // componentDidMount() {
         
    //     this.props.requestDrivers(this.props.currentPage, this.props.pageSize);
    //     this.refreshProfile();
    // }


    // onPageChanged = (pageNumber) => {
    //     this.props.requestDrivers(pageNumber, this.props.pageSize);
    //     this.props.SetCurrentPage(pageNumber)

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
    //         this.refreshProfile()

        
    // }

    render() {
        debugger
        return  <addDriver id={this.props.id}/> 
    }
}
            




const mapStateToProps = (state) => {
    return {
        drivers: addDrivers(state),
        
    }
}




export default compose(connect(mapStateToProps,
    {
        addDrivers
    }))(addDriverContainer);

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