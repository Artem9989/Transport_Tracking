import React, {useState} from 'react'
// import Ymaps from './Ymaps'
import { useDispatch} from 'react-redux'
import DriversContainer from './driver/driverContainer'
// import DisplayMapFC from './Map/DisplayMapClass';
import DisplayMapClassContainer from './Map/DisplayMapClassContainer';
// import {DisplayMapClass} from './Map/DisplayMapClass';
// import ReactDOM from "react-dom";
// import HEREMap from "react-here-map"
import { logout } from '../redux/Auth-reducer';
// import {  BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { withAuthRedirect } from './HOC/withAuthRedirect'
import { connect } from 'react-redux';
 //import HPlatform, { HMap, HMapPolyLine } from "react-here-map";
 import './FirstWindow.css';
 import  Search   from './Map/Search/Search'
 import { Layout, Menu, Breadcrumb } from 'antd';
 import {
   DesktopOutlined,
   PieChartOutlined,
   FileOutlined,
   TeamOutlined,
   UserOutlined,
   MenuUnfoldOutlined,
   MenuFoldOutlined,
 } from '@ant-design/icons';

const FirstWindow = () => {
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const [SiderVisible, setSider] = useState(false)

  const dispatch = useDispatch();

  const out = () => {
   
    dispatch(logout())
    window.location.reload();
  }

    
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
  const [ShowModal, setShowModal] = useState(false)
  const toggleModal = () => {
    setShowModal(!ShowModal);
  }
    return (<> 

<Layout  style={{ minHeight: '100vh' }}>

        <Sider style={{
        overflow: 'auto',
        height: '100vh',
      }}
      width={280}
       theme="dark"
        collapsible 
        collapsed={SiderVisible} 
        onCollapse={()=>setSider(!SiderVisible)}
        >
          <div className="logo" ><img src='../../favicon.ico' alt="" className="logo"/> </div>
          <Menu trigger={null} theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
             Памятка
            </Menu.Item>
            {/* <Menu.Item key="2" icon={<DesktopOutlined />}> */}
            
            {/* </Menu.Item> */}
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <DriversContainer />
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
            <button id='memo' className="Exit" onClick={toggleModal}> Памятка </button>
            <button id='Exit' className="Exit" onClick={out}> Выход </button>
          </Menu>
        </Sider>
        <Layout className="site-layout">
        <Header theme="dark" className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(SiderVisible ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
       
              onClick: () => {setSider(!SiderVisible)},
            })}
            <Search />
          </Header>
          <Content >

            <div id="YMapsID"><DisplayMapClassContainer toggleModal={toggleModal}
              ShowModal={ShowModal}/></div>
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
    )
  }


export default connect(withAuthRedirect)(FirstWindow);
