import React, { Component } from 'react'
// import Ymaps from './Ymaps'
import Leftpanel from './Leftpanel'
import {DisplayMapFC} from './Map/DisplayMapClass';
// import ReactDOM from "react-dom";
import HEREMap from "react-here-map"
 //import HPlatform, { HMap, HMapPolyLine } from "react-here-map";

export default class FirstWindow extends Component {
  // componentDidUpdate (){
  //   <Ymaps/>
  // }
  // points = [
  //   { lat: 52.5309825, lng: 13.3845921 },
  //   { lat: 52.5311923, lng: 13.3853495 },
  //   { lat: 52.5313532, lng: 13.3861756 },
  //   { lat: 52.5315142, lng: 13.3872163 },
  //   { lat: 52.5316215, lng: 13.3885574 },
  //   { lat: 52.5320399, lng: 13.3925807 },
  //   { lat: 52.5321472, lng: 13.3935785 },
  // ];
  render() {
    return (
      <div id = "YMapsID">
        <DisplayMapFC points={this.points}/>
        {/* < HEREMap  
                appId = "{your app_id}" 
                appCode = "{your app_code}" 
                center = { center} 
                zoom = { 14 } 
            />  */}
      <Leftpanel />
      </div>
    )
  }
}
