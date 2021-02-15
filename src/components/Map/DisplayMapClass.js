// src/DisplayMapFC.js
// import React from "react";
// import ReactDOM from "react-dom";
import HPlatform, { HMap, HMapPlaces } from "react-here-map";
import React, { Component } from 'react';
// export const DisplayMapFC = () => {
//   const appCode = "hn8nc_2Y3gsr7XMtPw4XwB3Gv4TbmmaQeD1xNOgCSGU";
//   const apikey = "hn8nc_2Y3gsr7XMtPw4XwB3Gv4TbmmaQeD1xNOgCSGU";
//   const appId = "qUAK1IjzS6IHv9SnnvMo";
//   const points = [
//   { lat: 52.5309825, lng: 13.3845921 },
//   { lat: 52.5311923, lng: 13.3853495 },
//   { lat: 52.5313532, lng: 13.3861756 },
//   { lat: 52.5315142, lng: 13.3872163 },
//   { lat: 52.5316215, lng: 13.3885574 },
//   { lat: 52.5320399, lng: 13.3925807 },
//   { lat: 52.5321472, lng: 13.3935785 },
// ];
// // const platform = new H.service.Platform({
// //   apikey: "{HERE-API-KEY}"
// // });
//   return    <HPlatform
//     app_id={appCode}
//     app_code={appId}
//     apikey={apikey}
//     useCIT
//     useHTTPS
//     includePlaces
//     interactive
//   >
//     <HMapPlaces library="search" />
//   </HPlatform>
// }



export default class DisplayMapFC extends Component {

    render() {
        return (
            <HPlatform 
            app_id="{qUAK1IjzS6IHv9SnnvMo}"
            app_code="{hn8nc_2Y3gsr7XMtPw4XwB3Gv4TbmmaQeD1xNOgCSGU}"
            apikey='{hn8nc_2Y3gsr7XMtPw4XwB3Gv4TbmmaQeD1xNOgCSGU}'
                useCIT
    useHTTPS
    includePlaces
    interactive
            
         >
            <HMapPlaces library="search" />
              </HPlatform>
        )
    }
}