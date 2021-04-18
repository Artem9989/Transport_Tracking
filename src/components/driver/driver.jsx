import React, {useState} from 'react';
import DriverCSS from './driver.module.css';
import DriverInfo from './driverInfo/driverInfo.jsx';
import { Collapse } from 'antd';
// import { Modal, Button } from 'antd';
import Icon from '@ant-design/icons';
import {
    SearchOutlined
  } from "@ant-design/icons";
const { Panel } = Collapse;

const Driver = ({ driver, index, FollowingInProgress }) => {

    const [visible, setVisible] = useState(false)

    // const showInformation = () => {
    //     console.log(visible)
    //     return 
    // }

    return (        
        <>
    <Collapse  >

        <Panel showArrow={false} header={       <>        <div className={DriverCSS.viewingInformationDriver} onClick={()=> {setVisible(true)}} > 
        <Icon className={DriverCSS.viewCard}  component={SearchOutlined} /> 
        </div> 
            <div id="hider" className="driver-data"  >
        <div id="drivers" className={DriverCSS.drivers}>
            <img className={DriverCSS.avatar} src='https://f1.upet.com/h_5JB36T9mqa_q.jpg' alt='Фото не загрузилось' />
            <p> № машины: <span className={DriverCSS.infoDriver}> {driver.id} </span> </p>
            </div>
    
        </div>
        </>
     } key={index}>

                <p> Фамилия: <span className={DriverCSS.infoDriver}> {driver.lastName} </span> </p>
    
        
                <p> Имя:  <span className={DriverCSS.infoDriver}> {driver.firstName} </span> </p>
                <p> Отчество: <span className={DriverCSS.infoDriver}> {driver.middleName} </span> </p>
                <p> Номер Телефона : <span className={DriverCSS.infoDriver}> {driver.lastName} </span> </p>
        </Panel>
    </Collapse>
    {/* <Modal
            title="Памятка пользования картой" 
            visible={visible} 
            onOk={ () => setVisible(false)} 
            okText='Ознакомлен'
            onCancel={() => setVisible(false)}
            style={{ top: 20}}
            width= {'80%'}
            cancelButtonProps={{ style: { display: 'none' } }}> */}
    <DriverInfo driver={driver} index={index} FollowingInProgress={FollowingInProgress} visible={visible} setVisible={setVisible}> </DriverInfo>
    {/* </Modal> */}
    </>

    );
}
export default Driver;