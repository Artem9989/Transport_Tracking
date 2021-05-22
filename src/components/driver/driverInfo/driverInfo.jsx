import React,{useState} from 'react';
import DriverCSS from '../driver.module.css'
// import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";

import { Drawer, List, Avatar, Divider, Col, Row } from 'antd';



const DriverInfo = ({ driver, index, FollowingInProgress,visible,setVisible }) => {

    const showInformation = (content,title) => {

        return <> <div className={DriverCSS.siteDescriptionItemProfileWrapper}>
        <span className={DriverCSS.siteDescriptionItemProfilePLabel}>{title}: </span>
        {content} 
      </div> </>
    }
    
 
    const [fuel, setfuel] = useState([10,11,7,12,9,1,6,18,16,28,33,100,85,75,46,38,20,15,100,41])
    const [time, settime] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])
    const data = {
      labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
      datasets: [
        {
          label: "Бензин",
          data: fuel,
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)"
        },
        {
          label: "Время",
          data: time,
          fill: false,
          borderColor: "#742774"
        }
      ]
    };
    const legend = {
      display: true,
      position: "bottom",
      labels: {
        fontColor: "#323130",
        fontSize: 14
      }
    };
    
    const options = {
      title: {
        display: true,
        text: "Расход бензина"
      },
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMin: 0,
              suggestedMax: 31
            }
          }
        ]
      }
    };
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
            <Col span={4}>
                Нарушения водителя: 
            </Col>
            <Col span={8}>
                Сход с маршрута: 11
            </Col>
            <Col span={8}>
                 Превышение скорости: 6
            </Col>
            <Col span={8}>
                 Нарушение режима труда/отдыха: 7
            </Col>
       
            <Row>
            
            </Row>
         
           
       
          <Row>
            <Col span={24}>
             
            </Col>
          </Row>
          <Divider />
          <p className="site-description-item-profile-p">График расхода бензина</p>
          <Row>
            <Col span={20}>
            <Line height={400}  data={data} legend={legend} options={options, {maintainAspectRatio: false }}  ></Line>
            {/* <canvas id="myChart" width="400" height="400"> </canvas> */}
            </Col>
            <Col span={4}>
           
            </Col>
           
          </Row>
          <Row>
            <Col  span={24}>
            <iframe src="./User_Deviation/User_Deviation.html" ></iframe>
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