import * as React from 'react';


export class DisplayMapClass extends React.Component {
  mapRef = React.createRef();

  state = {
    // The map instance to use during cleanup
    map: null
  };

  componentDidMount() {

    const H = window.H;
    const platform = new H.service.Platform({
      'apikey': 'sAR34-R5unCz4RhUywXkiVOV5QTf_B0OMhyhYhUnFJ8'
    });

    const defaultLayers = platform.createDefaultLayers();
    // const routeArrows = new H.map.Polyline(linestring, {
    //   style: {
    //     lineWidth: 10,
    //     fillColor: 'white',
    //     strokeColor: 'rgba(255, 255, 255, 1)',
    //     lineDash: [0, 2],
    //     lineTailCap: 'arrow-tail',
    //     lineHeadCap: 'arrow-head'
    //   }
    // });
    // Create an instance of the map
    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        center: { lng: 55.9678, lat: 54.7431},
        zoom: 14,
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    // This variable is unused and is present for explanatory purposes
    // const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // // Create the default UI components to allow the user to interact with them
    // // This variable is unused
    // const ui = H.ui.UI.createDefault(map, defaultLayers);

    this.setState({ map });
  }

  // componentWillUnmount() {
  //   this.state.map.dispose();
  // }


  render() {
    return (
      // Set a height on the map so it will display
      <div ref={this.mapRef} style={{ height: "100%", width: "100%"}} />
    );
  }
}