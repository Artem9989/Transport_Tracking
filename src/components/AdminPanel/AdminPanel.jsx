import React, {memo} from 'react';
import Users from './AllUsers.jsx'
import AdminPanelCSS from './AdminAuth.module.css';
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/AuthAdmin-reducer';
// import { Route } from 'react-router-dom';
// // import { withAuthRedirect } from '../HOC/withAuthRedirectwithAuthRedirect'
// import { connect } from 'react-redux';
// import { withAuthRedirect } from '../HOC/withAuthRedirect'
import { Redirect } from 'react-router-dom';

const AdminPanel = ({currentPage,onPageChanged,addDrivers , totalItemsCount, pageSize, users, roles, ...props}) => {
    const dispatch = useDispatch();

    const out = () => {    
        dispatch(logout());
        window.location.reload();
      }

   

    let token = localStorage.getItem('isAuthAdminToken')
    if(token === null) {
        return  <Redirect to={'/admin'} />
    }

  
    return <>

     <div className={AdminPanelCSS.container}>
         <div className={AdminPanelCSS.header_container}>
            <h3>Список зарегистрированных пользователей:</h3>
            <button id='Exit' className="Exit" onClick={out}> Выйти </button>
        </div>

             
            {/* <Paginator currentPage = {currentPage} onPageChanged={onPageChanged} totalItemsCount ={totalItemsCount} pageSize={pageSize}/> */}
      
            {/* {
                users.map(u => <Users  user={u}/>)
              
            } */}
            <Users  users={users} roles={roles} addDrivers={addDrivers}/>
            
        </div>

    </>

}
// export default connect(withAuthRedirect)(AdminPanel);
export default memo(AdminPanel);
// export default connect(withAuthRedirect)(AdminPanel);