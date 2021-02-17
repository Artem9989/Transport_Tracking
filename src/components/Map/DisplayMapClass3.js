// // import HEREMap from 'here-maps-react';
// // import  React from 'react';

// // export const Map=()=> {
// //     return ( <HEREMap
// //         appId="qUAK1IjzS6IHv9SnnvMo"
// //         appCode='sAR34-R5unCz4RhUywXkiVOV5QTf_B0OMhyhYhUnFJ8'
// //         center={{ lat: 10.998666, lng: -63.79841 }}
// //         zoom={12}
// //       />
// //     );
// //   }
//   import React from 'react';
// import { HEREMap, Marker, RouteLine } from 'here-maps-react';
// import { usePlatform } from 'here-maps-react';

// export function DisplayMapClass() {
//   const [shape, setShape] = React.useState([]);

//   const platform = usePlatform({
//     app_code: 'sAR34-R5unCz4RhUywXkiVOV5QTf_B0OMhyhYhUnFJ8',
//     app_id: "qUAK1IjzS6IHv9SnnvMo",
//     useHTTPS: true,
//   });

//   return (
//     // <HEREMap
//     //     apikey='sAR34-R5unCz4RhUywXkiVOV5QTf_B0OMhyhYhUnFJ8'
//     // //   appId="qUAK1IjzS6IHv9SnnvMo"
//     // //   appCode='sAR34-R5unCz4RhUywXkiVOV5QTf_B0OMhyhYhUnFJ8'
//     //   center={{ lat: 10.998666, lng: -63.79841 }}
//     //   zoom={12}
//     //   style={{
//     //     height: "400px",
//     //     width: "800px"
//     //   }}
//     // >
//     //   <Marker lat={10.998666} lng={-63.79841} />
//     //   <Marker lat={10.998666} lng={-63.79841} />
//     //   <RouteLine shape={shape} strokeColor="#48dad0" lineWidth={4} />
//     //  </HEREMap>
//   );
// }