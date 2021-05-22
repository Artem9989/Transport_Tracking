import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DriversContainer from "./driver/driverContainer";
import MapContainer from "./Map/MapContainer";
import { Redirect } from "react-router-dom";
import { logout } from "../redux/Auth-reducer";
import { withAuthRedirect } from "./HOC/withAuthRedirect";
import "./FirstWindow.css";
import Search from "./Map/Search/Search";
import { Layout, Menu, Breadcrumb,Input,Switch,Button, Popover,Drawer, Alert } from "antd";
import { DesktopOutlined, PieChartOutlined, FileOutlined,TeamOutlined,
  UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined, RadiusSettingOutlined,
   ForkOutlined, RadarChartOutlined,GatewayOutlined, CheckOutlined,
  CloseOutlined

} from "@ant-design/icons";
import CostOptimRoute from "./Map/CostOptimRoute/CostOptimRoute.jsx";
// Requests library
import axios from 'axios';

// Config
import { config } from '../assets/config';

const FirstWindow = () => {
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;

  const [SiderVisible, setSider] = useState(false);

  const dispatch = useDispatch();

  const out = () => {
    dispatch(logout());
    window.location.reload();
  };

  // points = [
  //   { lat: 52.5309825, lng: 13.3845921 },
  //   { lat: 52.5311923, lng: 13.3853495 },
  //   { lat: 52.5313532, lng: 13.3861756 },
  //   { lat: 52.5315142, lng: 13.3872163 },
  //   { lat: 52.5316215, lng: 13.3885574 },
  //   { lat: 52.5320399, lng: 13.3925807 },
  //   { lat: 52.5321472, lng: 13.3935785 },
  // ];
  //show Modal memo
  const [showCostOptimRoute, setshowCostOptimRoute] = useState(false);

  const [ShowModal, setShowModal] = useState(false);
  // Выбор построения маршрута
  const [transportType, setTransportType] = useState("truck");
  // Выбор построения изолинии
  const [isolineType, setisolineType] = useState("time");
  // const [ShowModal, setShowModal] = useState(false)
  // Добавления значения для расчета изолинии

  const [isolineValue, setIsolineValue] = useState(10);
  // const calculationIsoline = (value ) => {
  //   if (value == null) {
  //     setIsolineValue ( isolineValue - value );
  //   }
  //   else {
  //     setIsolineValue ( isolineValue + value );
  //   }
  // };
  // Учитывать ли дорожные события при расчете
  const [considerTraffic, setconsiderTraffic] = useState('enabled')
  const [notRoute, setnotRoute] = useState(false)
  //  Открытие окна добавления водителей
  const [visible, setvisible] = useState(false)
  const [Routing, setRouting] = useState()
  const toggleModal = () => {
    setShowModal(!ShowModal);
  };
  const [locationTracking, setLocationTracking] = useState()
  const getTrackingLocation = async (Route) => {
    
    if (Route != null) {
      const LocationDriver = Route.points[Route.points.length - 1]
      setLocationTracking(LocationDriver)
      setRouting(Route)
      
      await calculateRoute(Route,LocationDriver)
      
     
    }
    else {
      setnotRoute(true)
      setTimeout( ()=> setnotRoute(false),3500)
    }
    console.log(Route,"Route")
 
}

const [RoutingArray, setRoutingArray] = useState(null)
async function calculateRoute (Route,LocationDriver) {
  

  const routeBaseUrl = "https://route.ls.hereapi.com/routing/7.2/calculateroute.json?"
  if (Route == null && LocationDriver == null) {
    return
  }
  
  let optimalMarkersOrder;
  if (RoutingArray == null){
    optimalMarkersOrder = await waypointElementGet(Route,LocationDriver)
    // Form url to calculate route based on waypoint sequence
  
  let routeToString = optimalMarkersOrder.map( (point, i) => {
    return `waypoint${i}=geo!${point.lat},${point.lng}`
  }).join("&")

  let routeRequest = `${routeBaseUrl}apikey=${config.apikey}&mode=fastest;${transportType};traffic:enabled&routeattributes=sh&${routeToString}`
  
  let res_route = await axios.get(routeRequest)
  
  let polylineArray = res_route.data.response.route[0].shape.map((coords, i) => {
    return coords.split(',').map(Number);
  })

  // let hereWeGoLink = __createWeGoLink() 
  setRoutingArray(polylineArray)

  }
  else{

  }
  


}

async function waypointElementGet (Route,LocationDriver){
  
  // const { transport, markers } = state.options.waypoints
  const waypointBaseUrl = "https://wse.ls.hereapi.com/2/findsequence.json?"
  let one;
  let two;
  let optimalMarkersOrder;
  if (Route == null || LocationDriver == null) {
    return
  }
    let RoutingEnd = Route.end;
    let RoutingStart = Route.start;

    
    if ( Route != null) {

      
    if( RoutingStart != null || LocationDriver.lat != null)
    {
      one = `start=${0};${LocationDriver.lat},${LocationDriver.lng}&`
    }
    else if (RoutingStart != null){
      one = `start=${0};${RoutingStart.lat},${RoutingStart.lng}&`
    }
    if (RoutingEnd != null) 
    {
      two = `end=${1};${RoutingEnd.lat},${RoutingEnd.lng}&`
    }
    let waypointsRequest = `${waypointBaseUrl}apikey=${config.apikey}&mode=fastest;${transportType}&${one}${two}`

    let res = await axios.get(waypointsRequest)
  
    optimalMarkersOrder = res.data.results[0].waypoints.map( (point, i) => {
      return {lat: point.lat, lng: point.lng}
    })
  }
  

// status online
 
 
  return optimalMarkersOrder;
}

// let timerOnline;
// // const [statusTimer, setstatusTimer] = useState(true)
// let token = localStorage.getItem('accessToken')

// // let statusOnlineValue;

// const setStatusTimerStart = async () => {
//   // console.log(statusOnline)
// //   ArrStatus.push(statusOnline)
// //   console.log(ArrStatus)

//   if (statusTimer )
//   {
 
//         timerOnline = setInterval(() => isOnline(driver.id), 10000);
        
   
      
//       setstatusTimer( false)
//   }
//   else if (token === "false" || token === null || token === 'null') {
//       clearInterval(timerOnline);
//   }
//   else {
    
//   }
  

// }
// setStatusTimerStart()

// // let statusOnlineValue;
// // console.log(statusOnline)
// // try{
// //     debugger
// // statusOnline.map((item)=> {
// //     debugger
// //     if (item.id = driver.id )
// //     {
// //         statusOnlineValue = item.status
// //     }  
// // })
// // }
// // catch{}
// let Arr = [statusOnline]
// let statusOnlineValue;
// console.log(statusOnline)

//     if (statusOnline.id = driver.id )
//     {

//         statusOnlineValue = statusOnline.status
//     }  
// const [Arr, setArr] = useState([])

const [statusTimer, setstatusTimer] = useState(true)
let Arr = [];
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
  return (
    <>
     
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
          }}
          width={280}
          theme="dark"
          collapsible
          collapsed={SiderVisible}
          onCollapse={() => setSider(!SiderVisible)}
        >
          <div className="logo">
            <img src="../../favicon.ico" alt="" className="logo" />{" "}
          </div>
          <Menu
            trigger={null}
            theme="dark"
            // defaultSelectedKeys={["1"]}
            mode="inline"
          >
            <Menu.Item
              key="1"
              onClick={() => setShowModal(true)}
              icon={<PieChartOutlined />}
            >
              Памятка
            </Menu.Item>
            {/* <Menu.Item key="2" icon={<DesktopOutlined />}> */}

            {/* </Menu.Item> */}
            <SubMenu key="sub1" icon={<UserOutlined />} title="Водители">
            
              <DriversContainer   Arr={Arr} setstatusTimer={setstatusTimer} statusTimer={statusTimer} getTrackingLocation={getTrackingLocation}/>
              
            </SubMenu>
            <SubMenu
              key="sub2"
              icon={<TeamOutlined />}
              title="Выбор транспорта"
            >
              <Menu.Item key="2" onClick={() => setTransportType("truck")}>
                Грузовые
              </Menu.Item>
              <Menu.Item key="3" onClick={() => setTransportType("car")}>
                Автомобили
              </Menu.Item>
              <Menu.Item disabled='true'  key="7">
                {/* <Input onChange={(value) => setcalculationIsoline(value)} placeholder="Время (мин) дистанция (КМ)" value={calculationIsoline}/> */}
                {'Анализировать трафик  '}
                <Switch
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                      defaultChecked
                      onChange={(value) => setconsiderTraffic(value)}
                    />
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              icon={<GatewayOutlined />}
              title="Вычислить изолинию"
            >
              <Menu.Item key="4" onClick={() => setisolineType("distance")}>
                Дистанция (км)
              </Menu.Item>
              <Menu.Item key="5" onClick={() => setisolineType("time")}>
                Время (мин)
              </Menu.Item>
              <Menu.Item   disabled='true' key="6" onClick={() => setTransportType("time")}>
                <Input maxLength= '4'  onChange={(value) => setIsolineValue(value.target.value)} placeholder="Время (мин) дистанция (КМ)" value={isolineValue}/>
              </Menu.Item>
              <Menu.Item disabled='true'  key="7" >
                {/* <Input onChange={(value) => setcalculationIsoline(value)} placeholder="Время (мин) дистанция (КМ)" value={calculationIsoline}/> */}
                {'Анализировать трафик  '}
                <Switch
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                      defaultChecked
                      onChange={(value) => setconsiderTraffic(value)}
                    />
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="8" icon={<FileOutlined />}>
              Files
            </Menu.Item>
            <Menu.Item key="9" onClick={out} icon={<FileOutlined />}>
              Выход
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            theme="dark"
            className="site-layout-background"
            style={{ padding: 0, zIndex: 1 }}
          >
            {/* <Menu theme="dark" 
                  mode="horizontal" 
               //  defaultSelectedKeys={["2"]}
             > */}
            {React.createElement(
              SiderVisible ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                key: "sub6",

                onClick: () => {
                  setSider(!SiderVisible);
                },
              }
            )}
            <Popover
              content={"Расчитать затраты от пункта А до Б"}
              title="Расчитать стоимость"
              trigger="hover"
            >
              <Button
                ghost
                style={{ margin: "0 5px", border: "none" }}
                size={"large"}
                icon={<RadiusSettingOutlined />}
                onClick={() => setshowCostOptimRoute(!showCostOptimRoute)}
              ></Button>
            </Popover>
            <Popover
              content={"Расчитать затраты от пункта А до Б"}
              title="Расчитать стоимость"
              trigger="hover"
            >
              <Button
                ghost
                style={{ margin: "0 5px", border: "none" }}
                size={"large"}
                icon={<ForkOutlined />}
                onClick={() => showCostOptimRoute()}
              ></Button>
            </Popover>
            <Popover
              content={"Расчитать затраты от пункта А до Б"}
              title="Расчитать стоимость"
              trigger="hover"
            >
              <Button
                ghost
                style={{ margin: "0 5px", border: "none" }}
                size={"large"}
                icon={<RadarChartOutlined />}
                onClick={() => showCostOptimRoute()}
              ></Button>
            </Popover>

            {/* </Menu> */}

            <Search />
          </Header>
          <Content>
            {notRoute?  <Alert message="Водитель не на маршруте, или данные не загрузились" type="error" /> : null }
            <MapContainer
              toggleModal={toggleModal}
              ShowModal={ShowModal}
              setvisible={setvisible}
              visible={visible}
              transportType={transportType}
              setshowCostOptimRoute={setshowCostOptimRoute}
              showCostOptimRoute={showCostOptimRoute}
              isolineType = {isolineType}
              isolineValue ={isolineValue}
              considerTraffic = {considerTraffic}
              locationTracking = {locationTracking}
              Routing= {Routing}
              RoutingArray={RoutingArray}
            />
          </Content>
        </Layout>
      </Layout>
      {/* <div className='header'>
        
        
        
        
        
       
      
         </div> */}

      {/* <div id = "YMapsID"><DisplayMapFC /> </div> */}
      {/* <div id = "YMapsID"><DisplayMapClass /> </div> */}
      {/* <div id="YMapsID"><DisplayMapClassContainer toggleModal={toggleModal}
          ShowModal={ShowModal}/></div> */}

      {/* < HEREMap  
                appId = "{your app_id}" 
                appCode = "{your app_code}" 
                center = { center} 
                zoom = { 14 } 
            />  */}
    </>
  );
};

export default withAuthRedirect(FirstWindow);
