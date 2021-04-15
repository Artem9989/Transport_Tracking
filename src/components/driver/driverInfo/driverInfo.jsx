import React,{useState} from 'react';
import DriverCSS from '../driver.module.css'

import { Drawer, List, Avatar, Divider, Col, Row } from 'antd';


const DriverInfo = ({ driver, index, FollowingInProgress,visible,setVisible }) => {

console.log(driver)

    const showInformation = (content,title) => {

        return <> <div className={DriverCSS.siteDescriptionItemProfileWrapper}>
        <span className={DriverCSS.siteDescriptionItemProfilePLabel}>{title}: </span>
        {content} 
      </div> </>
    }


    return (      
        <>
        
        <Drawer
          width={"80%"}
          placement="right"
          closable={true}
          onClose={()=> setVisible(false)}
          visible={visible}
        >
          <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
            Профиль (Карточка) пользователя: {driver.id}
          </p>
          <p className="site-description-item-profile-p">Персональная информация:</p>
          <Row>
      
          <Col span={24}>
          <Row >
          <Col span={4}>
            <img className={DriverCSS.avatarInCard} src='https://f1.upet.com/h_5JB36T9mqa_q.jpg' alt='Фото не загрузилось' />
            </Col>
            <Row  >
            <Col span={20}>
            {showInformation(driver.firstName,"Имя")}
            </Col>
            <Col span={20}>
            {showInformation(driver.lastName,"Фамилия")}
            </Col>
            <Col span={20}>
            {showInformation(driver.middleName,"Отчество")}
            </Col>
            <Col span={8}>
            {showInformation(driver.email,"Почта")}
            </Col>
            <Col span={8}>
            {showInformation(driver.login,"Логин")}
            </Col>
            <Col span={8}>
           
            </Col>
            </Row>
            </Row>
            </Col>
          </Row>

          <Row>
          <Col span={4}>
       
            </Col>
            <Col span={5}>
            {showInformation(driver.vehicleNumber,"Номер машины")}
            </Col>
            <Col span={5}>
            {showInformation(driver.vehicleType,"Тип машины")}
            </Col>
            {/* <Col span={5}>
            {showInformation(driver.email,"Почта")}
            </Col> */}
            </Row>
            <Row>
            
            </Row>
         
           
       
          <Row>
            <Col span={24}>
             
            </Col>
          </Row>
          <Divider />
          <p className="site-description-item-profile-p">График расхода бензина</p>
          <Row>
            <Col span={24}>
             
             
            </Col>
           
          </Row>
          <Row>
            <Col span={12}>
            
            </Col>
            <Col span={12}>
            
            </Col>
          </Row>
          <Row>
            <Col span={24}>
            
            </Col>
          </Row>
          <Divider />
          <p className="site-description-item-profile-p">Contacts</p>
          <Row>
            <Col span={12}>
       
            </Col>
            <Col span={12}>
            
            </Col>
          </Row>
          <Row>
            <Col span={24}>
            
            </Col>
          </Row>
          </Drawer>
       
      </>

    // <Collapse  >

    //     <Panel  showArrow={false} header={                    <div id="hider" className="driver-data"  >
    //     <div id="drivers" className={DriverCSS.drivers}>
    //         <img className={DriverCSS.avatar} src='https://f1.upet.com/h_5JB36T9mqa_q.jpg' alt='Фото не загрузилось' />
    //         <p> № машины: <span className={DriverCSS.infoDriver}> {driver.id} </span> </p>
    //         </div>
    
    //     </div>
    //  } key={index}>

    //             <p> Фамилия: <span className={DriverCSS.infoDriver}> {driver.lastName} </span> </p>
    
        
    //             <p> Имя:  <span className={DriverCSS.infoDriver}> {driver.firstName} </span> </p>
    //             <p> Отчество: <span className={DriverCSS.infoDriver}> {driver.middleName} </span> </p>
    //             <p> Номер Телефона : <span className={DriverCSS.infoDriver}> {driver.lastName} </span> </p>
    //     </Panel>
    // </Collapse>


    );
}
export default DriverInfo;