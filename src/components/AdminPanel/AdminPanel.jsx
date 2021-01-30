import React, {memo,useEffect, useState} from 'react';

import Paginator from '../Common/Paginator/Paginator';


const AdminPanel = ({currentPage,onPageChanged, totalItemsCount, pageSize, drivers, ...props}) => {

    
    useEffect(() => {
        document.getElementById('side-open').onclick = function () {
            document.getElementById('side-open').hidden = true;
        }
        document.getElementById('side-button-2').onclick = function () {
            document.getElementById('side-open').hidden = false;
        }
    }, []);

    return <>
        <input type="checkbox" id="side-checkbox" />
        <div className="side-panel">
            <label id='side-button-2' className="side-button-2" htmlFor="side-checkbox">+</label>
            <div className="side-title">Меню:</div>
            <p>Водители:</p>
            <div>
            {/* <Paginator currentPage = {currentPage} onPageChanged={onPageChanged} totalItemsCount ={totalItemsCount} pageSize={pageSize}/> */}
      
            {
                // drivers.map(d => <User  />)
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