// src/DisplayMapFC.js
import React from "react";
// import HPlatform, {
//   HMap,
//   HMapRoute,
//   HMapMarker,
//   HMapPolyLine,
// } from "react-here-map";

export const DisplayMapFC = () => {
  // Create a reference to the HTML element we want to put the map on
  const mapRef = React.useRef(null);

  /**
   * Create the map instance
   * While `useEffect` could also be used here, `useLayoutEffect` will render
   * the map sooner
   */
  React.useLayoutEffect(() => {
    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return;
    const H = window.H;
    const platform = new H.service.Platform({
        apikey: "{HERE-API-KEY}"
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map,       {
      center: { lng: 55.9678, lat: 54.7431},
      zoom: 14,
      pixelRatio: window.devicePixelRatio || 1
    });

  //  const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

  //  const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose();
    };
  }, [mapRef]); // This will run this hook every time this ref is updated

  return <div className="map" ref={mapRef} style={{ height: "100%", width: "100%"}} />;
};