import React, {useState} from 'react';
import DriverCSS from './driver.module.css';
import DriverInfo from './driverInfo/driverInfo.jsx';
import { Collapse,Button,Popover } from 'antd';
// import { Modal, Button } from 'antd';
import Icon from '@ant-design/icons';
import {
    SearchOutlined,
    EnvironmentOutlined 
  } from "@ant-design/icons";
  import online from '../../icon/check.png'
  import notOnline from '../../icon/record.png'
import DriverStatus from './driverStatus';
const { Panel } = Collapse;

const Driver = ({
  driver,
  index,
  FollowingInProgress,
  getRoute,
  Route,
  getTrackingLocation,
  statusOnline,
  setstatusTimer,
  statusTimer,
  Arr,
  driverList,
//   statusOnlineValue,
  isOnline,
//   ArrStatus
}) => {
  const [visible, setVisible] = useState(false);
  const [tracking, settracking] = useState(false);
  // const showInformation = () => {
  //     console.log(visible)
  //     return
  // }
 
  const [timer, setTimer] = useState();



  const setLocationTracking = (Route) => {
    getTrackingLocation(Route);
    settracking(!tracking);

    if (tracking) {
      setTimer(setInterval(() => getRoute(driver.id), 5000));
    } else {
      clearInterval(timer);
    }
  };

  return (
    <>
      {/* <Button type="primary" icon={<EnvironmentOutlined />}>
        Search
        </Button> */}

      <Collapse>
        <Panel
          showArrow={false}
          header={
            <>
              {" "}
              <div className={DriverCSS.viewingInformationDriver}>
                <Popover
                  placement="right"
                  content={"Информация о водителе"}
                  title="Просмотреть информацию "
                  trigger="hover"
                >
                  <Button
                    size="large"
                    onClick={() => {
                      setVisible(true);
                    }}
                    type="text"
                  >
                    <Icon
                      className={DriverCSS.viewCard}
                      component={SearchOutlined}
                    />
                  </Button>
                </Popover>
                <Popover
                  placement="right"
                  content=""
                  title="Отследить водителя"
                  trigger="hover"
                >
                  <Button
                    size="large"
                    onClick={() => {
                      getRoute(driver.id);
                      setLocationTracking(Route);
                    }}
                    type="text"
                  >
                    <Icon
                      className={DriverCSS.locationCard}
                      component={EnvironmentOutlined}
                    />
                  </Button>
                </Popover>
                {/* <Icon className={DriverCSS.locationCard}  component={EnvironmentOutlined } />  */}
              </div>
              <div id="hider" className="driver-data">
                    <DriverStatus driverList={driverList} Arr={Arr} isOnline={isOnline} setstatusTimer={setstatusTimer} statusTimer={statusTimer} driverId = {driver.id} statusOnline={statusOnline} />
                <div id="drivers" className={DriverCSS.drivers}>
                  <img
                    className={DriverCSS.avatar}
                    src="https://f1.upet.com/h_5JB36T9mqa_q.jpg"
                    alt="Фото не загрузилось"
                  />
                  <p>
                    {" "}
                    № машины:{" "}
                    <span className={DriverCSS.infoDriver}>
                      {" "}
                      {driver.id}{" "}
                    </span>{" "}
                  </p>
                </div>
              </div>
            </>
          }
          key={index}
        >
          <p>
            {" "}
            Фамилия:{" "}
            <span className={DriverCSS.infoDriver}>
              {" "}
              {driver.lastName}{" "}
            </span>{" "}
          </p>

          <p>
            {" "}
            Имя:{" "}
            <span className={DriverCSS.infoDriver}>
              {" "}
              {driver.firstName}{" "}
            </span>{" "}
          </p>
          <p>
            {" "}
            Отчество:{" "}
            <span className={DriverCSS.infoDriver}>
              {" "}
              {driver.middleName}{" "}
            </span>{" "}
          </p>
          <p>
            {" "}
            Номер Телефона :{" "}
            <span className={DriverCSS.infoDriver}>
              {" "}
              {driver.lastName}{" "}
            </span>{" "}
          </p>
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
      <DriverInfo
        driver={driver}
        index={index}
        FollowingInProgress={FollowingInProgress}
        visible={visible}
        setVisible={setVisible}
      >
        {" "}
      </DriverInfo>
      {/* </Modal> */}
    </>
  );
};
export default Driver;