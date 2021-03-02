import React, { useState } from "react";
// import Ymaps from './Ymaps'
import { useDispatch } from "react-redux";
import DriversContainer from "./driver/driverContainer";
// import DisplayMapFC from './Map/DisplayMapClass';
import DisplayMapClassContainer from "./Map/DisplayMapClassContainer";
// import {DisplayMapClass} from './Map/DisplayMapClass';
// import ReactDOM from "react-dom";
// import HEREMap from "react-here-map"
import { Redirect } from "react-router-dom";
import { logout } from "../redux/Auth-reducer";
// import {  BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { withAuthRedirect } from "./HOC/withAuthRedirect";
// import { connect } from 'react-redux';
//import HPlatform, { HMap, HMapPolyLine } from "react-here-map";
import "./FirstWindow.css";
import Search from "./Map/Search/Search";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  RadiusSettingOutlined,
  ForkOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";
import CostOptimRoute from "./Map/CostOptimRoute/CostOptimRoute.jsx";
import { Button, Popover,Drawer } from "antd";

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
  const [transportType, setTransportType] = useState("truck");
  // const [ShowModal, setShowModal] = useState(false)
  const toggleModal = () => {
    setShowModal(!ShowModal);
  };
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
              <DriversContainer />
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
            </SubMenu>
            <Menu.Item key="4" icon={<FileOutlined />}>
              Files
            </Menu.Item>
            <Menu.Item key="5" onClick={out} icon={<FileOutlined />}>
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
            
            <DisplayMapClassContainer
              toggleModal={toggleModal}
              ShowModal={ShowModal}
              transportType={transportType}
              setshowCostOptimRoute={setshowCostOptimRoute}
              showCostOptimRoute={showCostOptimRoute}
              
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
