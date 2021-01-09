import React from 'react';
import DriverCSS from './driver.module.css'

const Driver = (props) => {
    return(
        <div className= {DriverCSS.drivers}>
            <img className= {DriverCSS.avatar} src= 'https://f1.upet.com/h_5JB36T9mqa_q.jpg' alt='Фото не загрузилось' />
            <p> Имя:  <span className={DriverCSS.infoDriver}> {props.name} </span> </p>
            <p> Номер Машины: <span className={DriverCSS.infoDriver}> {props.numberCar} </span> </p>
        </div>
    );
}
export default Driver;