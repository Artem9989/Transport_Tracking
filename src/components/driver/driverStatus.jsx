import React, {useEffect, useState} from 'react';
import DriverCSS from './driver.module.css';
import { Collapse,Button,Popover } from 'antd';
// import { Modal, Button } from 'antd';
  import online from '../../icon/check.png'
  import notOnline from '../../icon/record.png'


const DriverStatus = ({
    driverId,
  Arr,

//   ArrStatus
}) => {




let statusOnlineValue;
try{
    Arr.map((item,index)=>{
    
        if (item.id == driverId)
        {
            statusOnlineValue = Arr[index].status
        }
    })
}
catch{}

 console.log(Arr)

  return (
    <>
     
     {statusOnlineValue? (
                  <img  className={DriverCSS.onlineStatus} src={online} alt="онлайн" />
                ) : <img  className={DriverCSS.onlineStatus} src={notOnline} alt="онлайн" />
                }
    </>
  );
};
export default DriverStatus;