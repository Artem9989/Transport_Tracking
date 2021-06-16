import React,{useState} from 'react';
import DriverCSS from '../driver.module.css'
// import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import Iframe  from  '@trendmicro/react-iframe' ;
import { Drawer, List, Avatar, Divider, Col, Row } from 'antd';
import ChartFuel from './ChartFuel/ChartFuel.jsx';


const DriverInfo = ({ driver, index, FollowingInProgress,visible,setVisible }) => {
 
    const showInformation = (content,title) => {

        return <> <div className={DriverCSS.siteDescriptionItemProfileWrapper}>
        <span className={DriverCSS.siteDescriptionItemProfilePLabel}>{title}: </span>
        {content} 
      </div> </>
    }
    
    const [warningArr, setWarningArr] = useState();
  const [refuelingArr, setRefuelingArr] = useState();

  
    return (
      <>
        <Drawer
          width={"80%"}
          placement="right"
          closable={true}
          onClose={() => setVisible(false)}
          visible={visible}
        >
          <p
            className="site-description-item-profile-p"
            style={{ marginBottom: 24 }}
          >
            Профиль (Карточка) пользователя: {driver.id}
          </p>
          <p className="site-description-item-profile-p">
            Персональная информация:
          </p>
          <Row>
            <Col span={24}>
              <Row>
                <Col span={4}>
                  <img
                    className={DriverCSS.avatarInCard}
                    src="https://f1.upet.com/h_5JB36T9mqa_q.jpg"
                    alt="Фото не загрузилось"
                  />
                </Col>
                <Row>
                  <Col span={20}>
                    {showInformation(driver.firstName, "Имя")}
                  </Col>
                  <Col span={20}>
                    {showInformation(driver.lastName, "Фамилия")}
                  </Col>
                  <Col span={20}>
                    {showInformation(driver.middleName, "Отчество")}
                  </Col>
                  <Col span={8}>{showInformation(driver.email, "Почта")}</Col>
                  <Col span={8}>{showInformation(driver.login, "Логин")}</Col>
                </Row>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col span={4}></Col>
            <Col span={5}>
              {showInformation(driver.vehicleNumber, "Номер машины")}
            </Col>
            <Col span={5}>
              {showInformation(driver.vehicleType, "Тип машины")}
            </Col>
            {/* <Col span={5}>
            {showInformation(driver.email,"Почта")}
            </Col> */}
          </Row>
          <Col span={4}>Нарушения водителя:</Col>
          <Col span={8}>Сход с маршрута: 11</Col>
          <Col span={8}>Превышение скорости: 6</Col>
          <Col span={8}>Нарушение режима труда/отдыха: 7</Col>

          <Row></Row>

          <Row>
            <Col span={24}></Col>
          </Row>
          <Divider />
          <p className="site-description-item-profile-p">
            График расхода бензина
          </p>
            <ChartFuel    warningArr = {warningArr} setWarningArr={setWarningArr}
 refuelingArr = {refuelingArr} setRefuelingArr={setRefuelingArr}> </ChartFuel>
          <Row>
            <Col span={24}>
              <Iframe src="https://artem9989.github.io/User_Deviation/"></Iframe>
            </Col>
          </Row>
          <Row>
            <Col span={24}></Col>
          </Row>
          <Divider />
          <p className="site-description-item-profile-p">Contacts</p>
          <Row>
            <Col span={12}></Col>
            <Col span={12}></Col>
          </Row>
          <Row>
            <Col span={24}></Col>
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