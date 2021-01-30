import React, {useEffect, useState} from 'react';
import DriverCSS from './AdminAuth.module.css'
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';


const User = ({user,FollowingInProgress}) => {
    // let numberCar = props.numberCar.map( p=> <Driver numberCar={p.numberCar} name={p.name}/>);
    // Clicked === false ? getInfo() : setClicked(false)
    return(<>
    <div  id="hider" className="driver-data"  >
        <div id = "drivers"  className= {DriverCSS.drivers}>
            {/* <img className= {DriverCSS.avatar} src= 'https://f1.upet.com/h_5JB36T9mqa_q.jpg' alt='Фото не загрузилось' /> */}
            <Avatar icon={<UserOutlined />} />
                <Avatar>U</Avatar>
                <Avatar size={40}>USER</Avatar>

                <Avatar className={DriverCSS.avatar} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            <p> Фамилия: <span className={DriverCSS.infoDriver}> {user.lastName} </span> </p>
       <p> № машины: <span className={DriverCSS.infoDriver}> {user.id} </span> </p>
        </div>
        <div id="driver-data-add" className='driver-data-add' >
        <p> Имя:  <span className={DriverCSS.infoDriver}> {user.firstName} </span> </p> 
      <p> Отчество: <span className={DriverCSS.infoDriver}> {user.middleName} </span> </p>
        <p> Номер Телефона : <span className={DriverCSS.infoDriver}> {user.lastName} </span> </p>
       
        
        </div>
        </div>
        
        
         
        
         </>
    );
}
export default User;