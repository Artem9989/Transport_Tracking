import React, { Component } from 'react'
// import Ymaps from './Ymaps'
import { useDispatch} from 'react-redux'
import DriversContainer from './driver/driverContainer'
import {DisplayMapFC} from './Map/DisplayMapClass';
import {DisplayMapClass} from './Map/DisplayMapClass';
// import ReactDOM from "react-dom";
import HEREMap from "react-here-map"
import { logout } from '../redux/Auth-reducer';

 //import HPlatform, { HMap, HMapPolyLine } from "react-here-map";

const FirstWindow = () => {
  const dispatch = useDispatch();

  const out = () => {

    dispatch(logout())
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
    return (
      <div id = "YMapsID">
        <DisplayMapClass />
        {/* < HEREMap  
                appId = "{your app_id}" 
                appCode = "{your app_code}" 
                center = { center} 
                zoom = { 14 } 
            />  */}
      <DriversContainer />
      <button id='Exit' className="Exit" onClick={out}> Выход </button>
      </div>
    )
  }


export default FirstWindow;
