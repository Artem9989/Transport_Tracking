import React, {memo, useState} from 'react';
import './Leftpanel.css'
import Driver from './driver'
// import driverContainer from './driverContainer';
// import Paginator from '../Common/Paginator/Paginator';
// import DriverCSS from './driver.module.css'

// import { logout } from '../../redux/Auth-reducer';

const Drivers = ({currentPage,onPageChanged, totalItemsCount, pageSize, drivers, ...props}) => {



    const [Visible, setVisible] = useState(false)
 
    const changingPage = () => {
        setVisible(!Visible)
    }

 
    return <>
      

        {/* <Space>
          <Button 
          style={{fontSize: '20px', 
          padding: '8px 15px',
          width:'100px',
           margin:'0px',
           fontWeight: 'bold',
            height: '5vh',
            textTransform: 'uppercase',
            fontFamily: `'Roboto Condensed', Тahoma, sans-serif`
             }} type="primary" onClick={setVisible}>
            Меню
          </Button>
        </Space>
        <Drawer
        width={360}
          title="Водители:"
          placement={'left'}
        //   closable={true}
          onClose={changingPage}
          visible={Visible}
          key={'left'}
          getContainer={false}
          zIndex={10}
        > */}
             {/* <p> */}
             
              {  drivers.map((driver,index) => <Driver driver={driver} index={index}/>)}
        {/* </p> */}
        {/* </Drawer> */}



  
        {/* <input type="checkbox" id="side-checkbox" />
        <div className="side-panel">
            <label id='side-button-2' className="side-button-2" htmlFor="side-checkbox">+</label>
            <div className="side-title">Меню:</div>
            <p>Водители:</p>
            <div>
  

                  {  drivers.map((driver,index) => <Driver driver={driver} index={index}/>)}
       
            
            </div>
        </div>
        <div className="side-button-1-wr">
            <label className="side-button-1" htmlFor="side-checkbox">
                <div id='side-open' className="side-b side-open">Меню</div>
            </label>

        </div> */}
        
    </>

}
export default memo(Drivers)