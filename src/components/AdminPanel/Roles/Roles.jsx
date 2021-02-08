import React, {memo, useState} from 'react';
import Users from './AllUsers.jsx'
import AdminPanelCSS from './AdminAuth.module.css';
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/AuthAdmin-reducer';
import { Route } from 'react-router-dom';
// import { withAuthRedirect } from '../HOC/withAuthRedirectwithAuthRedirect'
import { connect } from 'react-redux';
import { withAuthRedirect } from '../HOC/withAuthRedirect'
import { Redirect } from 'react-router-dom';

const AdminPanel = ({currentPage,onPageChanged, totalItemsCount, pageSize, users, ...props}) => {
    const dispatch = useDispatch();



  
    return <>

     <div className={AdminPanelCSS.container}>
         <div className={AdminPanelCSS.header_container}>
            <h3>Список зарегистрированных пользователей:</h3>
        </div>

             
            {/* <Paginator currentPage = {currentPage} onPageChanged={onPageChanged} totalItemsCount ={totalItemsCount} pageSize={pageSize}/> */}
      
            {/* {
                users.map(u => <Users  user={u}/>)
              
            } */}
            <Users  users={users}/>
            
        </div>

    </>

}
// export default connect(withAuthRedirect)(AdminPanel);
export default memo(AdminPanel);
// export default connect(withAuthRedirect)(AdminPanel);