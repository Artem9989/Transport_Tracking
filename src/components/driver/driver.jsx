import React from 'react';
import DriverCSS from './driver.module.css'

import { Collapse } from 'antd'

const { Panel } = Collapse;

const Driver = ({ driver, index, FollowingInProgress }) => {


    return (        
    <Collapse >

        <Panel  showArrow={false} header={                    <div id="hider" className="driver-data"  >
        <div id="drivers" className={DriverCSS.drivers}>
            <img className={DriverCSS.avatar} src='https://f1.upet.com/h_5JB36T9mqa_q.jpg' alt='Фото не загрузилось' />
            <p> № машины: <span className={DriverCSS.infoDriver}> {driver.id} </span> </p>
            </div>
    
        </div>
     } key={index}>

                <p> Фамилия: <span className={DriverCSS.infoDriver}> {driver.lastName} </span> </p>
    
        
                <p> Имя:  <span className={DriverCSS.infoDriver}> {driver.firstName} </span> </p>
                <p> Отчество: <span className={DriverCSS.infoDriver}> {driver.middleName} </span> </p>
                <p> Номер Телефона : <span className={DriverCSS.infoDriver}> {driver.lastName} </span> </p>
        </Panel>
    </Collapse>


    );
}
export default Driver;