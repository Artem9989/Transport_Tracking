import React, {memo,useEffect, useState} from 'react';
import Users from './AllUsers.jsx'
import AdminPanelCSS from './AdminAuth.module.css';

const AdminPanel = ({currentPage,onPageChanged, totalItemsCount, pageSize, users, ...props}) => {
    return <>

     <div className={AdminPanelCSS.container}>
            <p>Список зарегистрированных пользователей:</p>


             
            {/* <Paginator currentPage = {currentPage} onPageChanged={onPageChanged} totalItemsCount ={totalItemsCount} pageSize={pageSize}/> */}
      
            {/* {
                users.map(u => <Users  user={u}/>)
              
            } */}
            <Users  users={users}/>
            <button id='Exit' className="Exit"> Выйти </button>
        </div>

    </>

}
export default memo(AdminPanel)