import React, {memo,useEffect, useState} from 'react';
import Users from './AllUsers.jsx'

const AdminPanel = ({currentPage,onPageChanged, totalItemsCount, pageSize, users, ...props}) => {
    debugger
    return <>
        <input type="checkbox" id="side-checkbox" />
        <div className="side-panel">
            <label id='side-button-2' className="side-button-2" htmlFor="side-checkbox">+</label>
            <div className="side-title">Меню:</div>
            <p>Водители:</p>
            <div>

             
            {/* <Paginator currentPage = {currentPage} onPageChanged={onPageChanged} totalItemsCount ={totalItemsCount} pageSize={pageSize}/> */}
      
            {
                users.map(u => <Users  user={u}/>)
              
            }
            </div>
        </div>
        <div className="side-button-1-wr">
            <label className="side-button-1" htmlFor="side-checkbox">
                <div id='side-open' className="side-b side-open">Меню</div>
            </label>
            <button id='Exit' className="Exit"> Выйти </button>
        </div>
        
    </>

}
export default memo(AdminPanel)