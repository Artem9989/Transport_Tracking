import React, {useEffect, useState} from 'react';
import DriverCSS from './driver.module.css'
import DropDown from './dropdown'
const Driver = ({driver,FollowingInProgress}) => {
    // let numberCar = props.numberCar.map( p=> <Driver numberCar={p.numberCar} name={p.name}/>);
    // Clicked === false ? getInfo() : setClicked(false)
    return(<>
    <div  id="hider" className="driver-data"  >
        <div id = "drivers"  className= {DriverCSS.drivers}>
            <img className= {DriverCSS.avatar} src= 'https://f1.upet.com/h_5JB36T9mqa_q.jpg' alt='Фото не загрузилось' />
           
            <p> Фамилия: <span className={DriverCSS.infoDriver}> {driver.lastName} </span> </p>
       <p> № машины: <span className={DriverCSS.infoDriver}> {driver.id} </span> </p>
        </div>
        <div id="driver-data-add" className='driver-data-add' >
        <p> Имя:  <span className={DriverCSS.infoDriver}> {driver.firstName} </span> </p> 
      <p> Отчество: <span className={DriverCSS.infoDriver}> {driver.middleName} </span> </p>
        <p> Номер Телефона : <span className={DriverCSS.infoDriver}> {driver.lastName} </span> </p>
       
        
        </div>
        </div>
        
        
         
        
         </>
    );
}
export default Driver;