import React, {memo,useState,useEffect} from 'react';
import DriverCSS from './driver.module.css';
import DriverInfo from './driverInfo/driverInfo.jsx';
import { Collapse,Button,Popover, Space,Modal } from 'antd';
// import { Modal, Button } from 'antd';
import Icon from '@ant-design/icons';
import {
    SearchOutlined,
    EnvironmentOutlined ,
    PhoneOutlined,
    AlertOutlined,
    FieldTimeOutlined
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
  valueBuffer,
  deviation,
  setDeviation,
//   statusOnlineValue,
  isOnline,
//   ArrStatus
}) => {
  const [visible, setVisible] = useState(false);
  const [tracking, settracking] = useState(false);
const [StatusTime, setstatusTime] = useState(true)
  useEffect(() => {
    // if(driver.timeSeconds > 7200){
    //     info();
    // }

    if(driver.status === 'call me'){
        success();
    }
    if(driver.status === 'sos'){
        error();
    }
    if(driver.status === 'unexpected'){
        warning();
    }

  }, [driver.status]);
  useEffect(() => {
    // if(driver.timeSeconds > 7200){
    //     info();
    // }
    console.log(deviation)
    if(driver.status === 'On the way' && deviation) {
      warningDeviation();
    }

  }, [deviation]);

  useEffect(() => {
      console.log(StatusTime)
    if(driver.timeSeconds > 30 && driver.status == 'On the way' && StatusTime){
        
        workAndRestTest();
    }
    if(driver.timeSeconds > 7200){
        workAndRest2();
    }
    if(driver.timeSeconds > 28800){
        workAndRest8();
    }
    
  }, [driver.status,driver.timeSeconds ]);

  // const showInformation = () => {
  //     console.log(visible)
  //     return
  // }
//  console.log(driver)
  const [timer, setTimer] = useState();
  const driverStatusArr = { Break:'Перерыв', 'On the way': 'В пути', sos:'Происшествие', unexpected:'Непредвиденный случай', 'call me': 'Запрашивает звонок'};
  let driverStatus;
  for (var key in driverStatusArr) {
      if(key == driver.status){
        driverStatus = driverStatusArr[key]
       break; 
      }
    // console.log(key, ':', driverStatusArr[key]);
  }
  
  
  const setLocationTracking = (Route) => {
    getTrackingLocation(Route);
    settracking(!tracking);

    if (tracking) {
      setTimer(setInterval(() => getRoute(driver.id), 5000));
    } else {
      clearInterval(timer);
    }
  };

  
  
  function success() {
    Modal.success({
        icon: <PhoneOutlined />,
    title: `Водитель транспорта: ${driver.id} запрашивает звонок диспетчера`,
      content: (
        <div>
        <p>Данные водителя: </p>
        <p>{`Номер машины: ${driver.id} `}</p>
        <p>{`ФИО: ${driver.lastName}  ${driver.firstName}`}</p>
        Телефон:  <a href="tel:+79874975296" className="">+79874975296</a>
      </div>
      ),

    });
  }
  
  function error() {
    Modal.error({
        bodyStyle: {width: 500, height: 100},
        icon: <AlertOutlined />,
        className: 'sos',
        title: `У водителя транспорта: ${driver.id}, происшествие!!!`,
      content: (
        <div>
        <p>Данные водителя: </p>
        <p>{`Номер машины: ${driver.id} `}</p>
        <p>{`ФИО: ${driver.lastName}  ${driver.firstName}`}</p>
        Телефон:  <a href="tel:+79874975296" className="">+79874975296</a>
      </div>
      ),
    });
  }
  
  function warning() {
    Modal.warning({
        title: `У водителя транспорта: ${driver.id} непредвиденные обстоятельства`,
        content: (
          <div>
          <p>Данные водителя: </p>
          <p>{`Номер машины: ${driver.id} `}</p>
          <p>{`ФИО: ${driver.lastName}  ${driver.firstName}`}</p>
          Телефон:  <a href="tel:+79874975296" className="">+79874975296</a>
        </div>
        ),
    });
  }
  function warningDeviation() {
    setTimeout (()=> {
      setDeviation(false);
    },60000) 
    Modal.warning({
        title: `Водителя транспорта: ${driver.id} отклонился от маршрута больше чем на ${valueBuffer} метров`,
        content: (
          <div>
          <p>Данные водителя: </p>
          <p>{`Номер машины: ${driver.id} `}</p>
          <p>{`ФИО: ${driver.lastName}  ${driver.firstName}`}</p>
          Телефон:  <a href="tel:+79874975296" className="">+79874975296</a>
        </div>
        ),
    });
  }

// const now = driver.timeSeconds;

const distance = driver.timeSeconds;
const OneDay = 60*60*24;
const OneHour =  60 * 60;
const OneMinute = 60;
const OneSecond = 1;

const Day = Math.floor( distance / OneDay);
const Hour = Math.floor( (distance % OneDay) / OneHour);
const Minute = Math.floor( (distance % OneHour) / OneMinute);
const Second = Math.floor( (distance % OneMinute) / OneSecond);

// let values = [Day, Hour, Minute, Second]
const setStatusTimeout = () => {

    setstatusTime(true)
}
function workAndRestTest() {
    Modal.info({
        icon: <FieldTimeOutlined />,
      title: `Водитель транспорта: ${driver.id} находится за рулем больше чем 30 секунд (${distance})`,
      content: (
        <div>
          <p>Данные водителя: </p>
          <p>{`Номер транспорта: ${driver.id} `}</p>
          <p>{`ФИО: ${driver.lastName}  ${driver.firstName}`}</p>
          Телефон:  <a href="tel:+79874975296" className="">+79874975296</a>
        </div>
      ),
      onOk() {setstatusTime(false); setTimeout(setStatusTimeout,60000)},
    });
  }
  function workAndRest2() {
    Modal.info({
        icon: <FieldTimeOutlined />,
      title: `Водитель транспорта: ${driver.id} находится за рулем больше 2-х часов`,
      content: (
        <div>
          <p>Данные водителя: </p>
          <p>{`Номер транспорта: ${driver.id} `}</p>
          <p>{`ФИО: ${driver.lastName}  ${driver.firstName}`}</p>
          Телефон:  <a href="tel:+79874975296" className="">+79874975296</a>
        </div>
      ),
      onOk() {StatusTime = false},
    });
  }
  function workAndRest8() {
    Modal.info({
        icon: <FieldTimeOutlined />,
      title: `Водитель транспорта: ${driver.id} находится за рулем более 8-х часов`,
      content: (
        <div>
          <p>Данные водителя: </p>
          <p>{`Номер транспорта: ${driver.id} `}</p>
          <p>{`ФИО: ${driver.lastName}  ${driver.firstName}`}</p>
          Телефон:  <a href="tel:+79874975296" className="">+79874975296</a>
        </div>
      ),
      onOk() {},
    });
  }
  return (
    <>
      {/* <Button type="primary" icon={<EnvironmentOutlined />}>
        Search
        </Button> */}
        {/* {driver.status?   info() : null} */}
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
                    <div className={DriverCSS.statusDriver}>
                    <DriverStatus driverList={driverList} Arr={Arr} isOnline={isOnline} setstatusTimer={setstatusTimer} statusTimer={statusTimer} driverId = {driver.id} statusOnline={statusOnline} />
                    <span className={DriverCSS.drivingTime}>  {`${Day}:${Hour}:${Minute}:${Second}`}</span>
                    <span className={DriverCSS.drivingTime}>  {driver.status? driverStatus: null}</span>
                    <span className={DriverCSS.drivingTime}>  {driver.status == 'On the way'? '0км/ч': null}</span>
                    {/* <span className={DriverCSS.drivingTime}>  {driver.status == 'On the way'? 'В пути' : null}</span>
                    <span className={DriverCSS.drivingTime}>  {driver.status == 'sos'? 'Происшествие': null}</span>
                    <span className={DriverCSS.drivingTime}>  {driver.status == 'unexpected'? 'Непредвиденные случай': null}</span>
                    <span className={DriverCSS.drivingTime}>  {driver.status == 'call me'? 'Запрашивает звонок': null}</span> */}
                    
                    </div>
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
export default memo(Driver);