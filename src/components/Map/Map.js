import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { HomeViewControl } from './HomeViewControl/index'
import { InfoControl } from './InfoControl/index'
// import { ServicesLabelControl } from './ServicesLabel/index'
// import svgMarkerImage_Line from './InfoControl/LUI-icon-pd-information-solid-24.svg';

import './app.css';
// Helpers
import { high_care_theme } from './theme/high_care_theme'
import { low_care_theme } from './theme/low_care_theme'
import { ecmo_theme } from './theme/ecmo_theme'

import overlay from '../../data/overlay.geojson'

import isoline_icon from "./icons/isoline-icon.svg"


export default class Map extends Component {

  constructor(props) {
    super (props)

    this.mapRef = React.createRef()
    
    this.state = {
      M: null,
      H: null,
      CORV: props.costOptimRouteValue,
    }

    this.createClusterLayer = this.createClusterLayer.bind(this)

    this.clusteredDataProvider = null
    this.activeLayer = null
    
  }

  async componentDidMount () {
    
    let { toggleModal,costOptimRouteValue, getcostOptimRouteValue  } = this.props


    const H = window.H

    const M = {
      // CORV: costOptimRouteValue,
      getCORV:getcostOptimRouteValue,
      // bLongClickUseForStartPoint: this.props.CORV.bLongClickUseForStartPoint,
      Platform: {},
      DefaultLayers: {},
      GeocodingService: {},
      markerGroup: {},
      RoutingService: {},
      Map: {},
      TileService: {},
      TileLayer: {},
      TileSer: {},
      TileLay: {},
      Behavior: {},
      UI: {},
      Settings: {
        center: { lat:54.00684227163969, lng: 56.00684227163969  },
        zoom: 6,
        pixelRatio: window.pixelRatio || 1,
        engineType: H.map.render.p2d,
        Localization: 'ru-RU',
        languages: 'RUS'
      },
      HomeViewControl: {},
      InfoControl: {},
      ZoomControl: {},
      MapSettingsControl: {},
      DistanceMeasurement: {},
      ZoomRectangle: {},
      ScaleBar: {},
      config: { 
        locale: 'ru-RU',
        lg: 'RUS',
        lg2: 'RUS',
        priew: 'RUS',
        pois: 'true',
      },
  
    
    }
          // toll image
        //   tollImg : document.createElement("img"),
       
        //   tollIcon : new H.map.Icon(tollImg, { anchor: new H.math.Point(0, 10) }),
        //  map.addObject(markerGroup),
        //  // enable/disable calculation of cost optimized route calculation
    var secure = (window.location.protocol === 'https:') ? true : false;

    // Initialize paltform
    M.Platform = new H.service.Platform({ apikey: this.props.apikey, useHTTPS: secure})
    
    M.DefaultLayers = M.Platform.createDefaultLayers(M.config)

  
    M.markerGroup = {};
    let group = new H.map.Group();
    let markerGroup = new window.H.map.Group();
    M.markerGroup = window.markerGroup;
    M.GeocodingService = M.Platform.getGeocodingService();
    M.RoutingService = M.Platform.getRoutingService();
    
  
  
    getcostOptimRouteValue('group',group);
    getcostOptimRouteValue('markerGroup',markerGroup);
    getcostOptimRouteValue('geocoder',M.GeocodingService);
    getcostOptimRouteValue('router',M.RoutingService);


    // Customize type of basemap
    
    M.TileService = M.Platform.getMapTileService({type: 'base'})
    
    M.TileLayer = M.TileService.createTileLayer('maptile', 'reduced.day', 256, 'png8', M.config)
    //Two map
    M.TileSer = M.Platform.getMapTileService({type: 'base'})
    M.TileLay = M.TileService.createTileLayer('basetile', 'normal.night.grey', 256, 'png8', M.config)
    
    M.TileLayer.setMin(6)

    M.Map = new H.Map( this.mapRef.current, M.TileLayer, M.Settings )
    
    
    // M.options = new H.ui.UI.options( {locale: M.options.locale})
    M.UI = new H.ui.UI(M.Map, {locale: M.config.locale})
    // Behavior // add behavior control
    M.Behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(M.Map))
    M.Behavior.disable(H.mapevents.Behavior.Feature.FRACTIONAL_ZOOM)
    
    //  User Interface
    // M.UI = new H.ui.UI(M.Map)
    // M.Localization = new H.ui.i18n.Localization('ru-RU')
    // M.UI = new H.ui.UI(M.Map,M.DefaultLayers, M.Localization, 'ru-RU')
    // console.log(M.Localization)
    // M.UI = new H.ui.UI.createDefault(M.Map, M.DefaultLayers, 'ru-RU');
    // console.log(H.ui)
    // Distance Measurement control
    M.ScaleBar = new H.ui.ScaleBar({alignment: "bottom-center"})
    M.UI.addControl('scalebar', M.ScaleBar)

    // M.ServicesLabelControl = new ServicesLabelControl({
    //   position:'right-bottom'
    // })

    // M.UI.addControl('service-label', M.ServicesLabelControl)


    // Zoom Control
    M.ZoomControl = new H.ui.ZoomControl({fractionalZoom: false, alignment: "right-middle"})
    M.UI.addControl('zoom', M.ZoomControl)
    // console.log(H.service.metaInfo.service.Info)
    // Home Control
    M.HomeViewControl = new HomeViewControl({
       
      map: M.Map,
      position:'right-middle',
      center: {
        lat: 54.70684227163969, lng: 56.00684227163969
      },
      zoom:10
    })
    window.map = M.Map;
    window.UI = M.UI;
    this.setState({ ...M, H: H })
    M.UI.addControl('home-control', M.HomeViewControl)


    // DZoom rectange
    M.ZoomRectangle = new H.ui.ZoomRectangle({alignment: "right-middle"})
    M.UI.addControl('zoomrectange', M.ZoomRectangle)

    // Home Control
    M.InfoControl = new InfoControl({
      position:'right-middle',
      toggleModal: toggleModal
    })
    M.UI.addControl('info-control', M.InfoControl)

    // console.log(H.ui.i18n);
    // H.ui.i18n.Localization = new H.ui.i18n.Localization('ru-RU',Object);

    // Map default layers customization 
    M.MapSettingsControl = new H.ui.MapSettingsControl({
      baseLayers: [{
        label: 'Базовая карта',
        layer: M.TileLayer,
      },
      {
        label: 'Обычная (день)',
        layer: M.DefaultLayers.raster.normal.map
      },
      {
        label: 'Спутник',
        layer: M.DefaultLayers.raster.satellite.map,
      }, 
      {
        label: 'Ночная (без надписей)',
        layer: M.DefaultLayers.raster.normal.basenight
      }, 
      {
        label: 'День (без надписей)',
        layer: M.DefaultLayers.raster.normal.base
      },
      {
        label: 'Ночь (без надписей)',
        layer: M.TileLay
      },
      {
        label: 'Движение грузовиков',
        layer: M.DefaultLayers.vector.normal.truck
      },
     
      
    ],
    layers: [
    {
        label: 'Загруженность',
        layer: M.DefaultLayers.vector.normal.traffic
      },
      {
        label: 'Происшествия',
        layer: M.DefaultLayers.vector.normal.trafficincidents
      },
    ],
      alignment: "right-bottom",
      configObj: M.config
    })

    M.UI.addControl('mapsettings', M.MapSettingsControl)

    //регулирования мест посещения
    // let bounds = new H.geo.Rect()
    
    // M.Map.getViewModel().addEventListener('sync', function() {
    //   let center = M.Map.getCenter()

    //   if (!bounds.containsPoint(center)) {
    //     M.Map.setCenter(center)
    //   }
    // })

    // Resize map on window size change
     		// add window resizing event listener
    window.addEventListener('resize', function() {
        M.Map.getViewPort().resize()
    })
      		// add long click in map event listener
    M.Map.addEventListener('longpress', evt => this.handleLongClickInMap(evt));
    M.Map.addEventListener('contextmenu', evt => this.contextMenu(evt))

    M.Map.addEventListener('tap', evt => {
      if (evt.target === M.Map) {
        M.UI.getBubbles().forEach(bubble => M.UI.removeBubble(bubble))
        
      }
    })
    
    // let reader = new H.data.geojson.Reader(overlay,
    //       {
   
    //       style: mapObject => {
    //         mapObject.getObjects().forEach(feature => {
    //           feature.setStyle({
    //             fillColor: 'rgba(0,0,0,91)',
    //             strokeColor: 'rgba(0,0,0,.1)',
    //             lineWidth: 0
    //           });
    //         })
            
    //       }
    // })

    // reader.parse()
    // M.Map.addLayer(reader.getLayer())
    getcostOptimRouteValue('map',M.Map);
  }
 
  
  handleChange (field, value) {
    let { getCORV } = this.state
    let updateCORV = getCORV;
    updateCORV(field, value);
  }
    
  // ======================================================================================


  		setValuesFromUrl() {
  			let nameVal;
  			var indexOf = window.location.href.indexOf('?');
  			if (indexOf < 0) return;
  			var vars = window.location.href.slice(indexOf + 1).split('&');

  			for (var i = 0; i < vars.length; i++) {
  				nameVal = vars[i].split('=');
  				if (!nameVal[0]) continue;
  				document.getElementById(nameVal[0]).value = decodeURIComponent(nameVal[1]);
  			}

  		};

  

  	
  		// Do not draw under control panel
  		// map.getViewPort().setPadding(0, 0, 0, ('.ctrl-panel').width());

  		// add behavior control

  		// add UI
  		// var ui = H.ui.UI.createDefault(map, maptypes);



 

	// toll image
  		// var tollImg = document.createElement("img");
  		// tollImg.src = "/assets/icons/toll_20_10.png";
  		// var tollIcon = new H.map.Icon(tollImg, { anchor: new H.math.Point(0, 10) });
  		// map.addObject(markerGroup);
  		// // enable/disable calculation of cost optimized route calculation
  		// var noCostOptimizationJustCalculate = false;

  		// handleEnableCalculateOptimizedRouteClicked();

  

  

	// function handleLongClickInMap(currentEvent) {
  //   var lastClickedPos = map.screenToGeo(currentEvent.currentPointer.viewportX, currentEvent.currentPointer.viewportY);
  //   // round up decimal places as Geocoder can only provide upto 7 digits precision after decimal
  //   lastClickedPos.lat = roundUp(lastClickedPos.lat, 7);
  //   lastClickedPos.lng = roundUp(lastClickedPos.lng, 7);

  //   if (bLongClickUseForStartPoint) {
  //     clearLastRouteCalculation();
  //     var line1 = "" + lastClickedPos.lat + "," + lastClickedPos.lng;
  //     //var line2 = " ";
  //     start.value = line1;
  //     pointA = new H.geo.Point(lastClickedPos.lat, lastClickedPos.lng);
  //     if (this.props.CORV.startMarker != null) {
  //       markerGroup.removeObject(this.props.CORV.startMarker);
  //     }
  //     this.props.CORV.startMarker = new H.map.Marker(pointA,
  //       {
  //         icon: createIconMarker(line1)
  //       });
  //     markerGroup.addObject(this.props.CORV.startMarker);
  //     bLongClickUseForStartPoint = false;
  //   }
  //   else {
  //     var line1 = "" + lastClickedPos.lat + "," + lastClickedPos.lng;
  //     //var line2 = " ";
  //     dest.value = line1;
  //     pointB = new H.geo.Point(lastClickedPos.lat, lastClickedPos.lng);
  //     if (destMarker != null) {
  //       markerGroup.removeObject(destMarker);
  //     }
  //     destMarker = new H.map.Marker(pointB,
  //       {
  //         icon: createIconMarker(line1)
  //       });
  //     markerGroup.addObject(destMarker);
  //     bLongClickUseForStartPoint = true;
  //   }
  // }



  

  componentWillUnmount() {
  try{
    this.state.map.dispose()
  }
  catch{
    
  }
    
  }


  contextMenu (evt) {

    let { Map, H } = this.state

    let { 
      calculateIsoline, 
      clearIsoline,
      updateWaypoints,
      clearWaypoints,
      saveRoute
    } = this.props

    let coord  = Map.screenToGeo(evt.viewportX, evt.viewportY)
    
    evt.items.push(

        new H.util.ContextItem({
          label: [
            Math.abs(coord.lat.toFixed(4)) + ((coord.lat > 0) ? 'N' : 'S'),
            Math.abs(coord.lng.toFixed(4)) + ((coord.lng > 0) ? 'E' : 'W')
          ].join(' ')
        }),
        
        new H.util.ContextItem({
          label: 'Центр карты',
          callback: function() {
            Map.setCenter(coord, true);
          }
        }),
        
        H.util.ContextItem.SEPARATOR,
        
        new H.util.ContextItem({
          label: 'Высчитать изолинию',
          callback: () => {
            calculateIsoline(coord)
          }
        }),
        new H.util.ContextItem({
          label: 'Стереть изолинию',
          callback: () => {
           
            clearIsoline()
          }
        }),

        H.util.ContextItem.SEPARATOR,

        new H.util.ContextItem({
          label: 'Добавить путевую точку',
          callback: () => {
            updateWaypoints(coord)
          }
        }),

        new H.util.ContextItem({
          label: 'Стереть путь',
          callback: () => {
            clearWaypoints(coord)
          }
        }),
        new H.util.ContextItem({
          label: 'Сохранить путь',
          callback: () => {
            saveRoute()
          }
        }),
      )
    }


    styleRoute (linestring) {

      let { H } = this.state
        
      let routeOutline = new H.map.Polyline(linestring, {
          style: {
            lineWidth: 6,
            strokeColor: 'rgba(63, 89, 167, 0.9)',
          }
        })
        
        let routeArrows = new H.map.Polyline(linestring, {
          style: {
            lineWidth: 2,
            fillColor: 'white',
            strokeColor: 'rgba(255, 255, 255, 1)',
            // lineDash: [0, 2],
            // lineTailCap: 'arrow-tail',
            // lineHeadCap: 'arrow-head' 
            }
          }
        )

        let routeLine = new H.map.Group();
        routeLine.addObjects([routeOutline, routeArrows])

        return routeLine
    }

    createClusterLayer (features, theme) {
      let { Map, H, UI } = this.state

      let dataPoints = []

      features.forEach(feature => {
        dataPoints.push(new H.clustering.DataPoint(feature.geometry.coordinates[1], feature.geometry.coordinates[0], {}, feature.properties))
      })

      this.clusteredDataProvider = new H.clustering.Provider(dataPoints, {
        clusteringOptions: {
          strategy: H.clustering.Provider.Strategy.DYNAMICGRID,
          eps: 32,
          minWeight: 5,
        }
      })
      
      this.clusteredDataProvider.setTheme(theme(Map, UI)) 

      return new H.map.layer.ObjectLayer(this.clusteredDataProvider) 
    }

    clearLastRouteCalculation() {
      let { M, H,Map,CORV } = this.state
      // let group = new H.map.Group();
  
      this.handleChange("bErrorHappened", false);
      if (this.props.CORV.currentOpenBubble) {
        M.UI.removeBubble(this.props.CORV.currentOpenBubble);
      }
      this.props.CORV.group.removeAll();
  
    }
  
         // Function rounds up number of decimal places
    roundUp(num, places) {
      return +(Math.round(num + "e+" + places) + "e-" + places);
    }
      //--- Helper - Create Start / Destination marker
    createIconMarker (line1, line2) {
      
      let { M, H,Map,CORV } = this.state;
      
      var svgMarker = this.props.CORV.svgMarkerImage_Line;
  
      // every long address not shown 
      // correctly in marker
      if (line2 && line2.length > 42) {
        line2 = line2.substring(0, 40);
        line2 = line2 + "..";
      }
  
      svgMarker = svgMarker.replace(/__line1__/g, line1);
      svgMarker = svgMarker.replace(/__line2__/g, (line2 != undefined ? line2 : ""));
      svgMarker = svgMarker.replace(/__width__/g, (line2 != undefined ? line2.length * 4 + 10 : (line1.length * 4 + 40)));
      svgMarker = svgMarker.replace(/__widthAll__/g, (line2 != undefined ? line2.length * 4 + 40 : (line1.length * 4 + 100)));
      var icon = new H.map.Icon(svgMarker, {
        anchor: new H.math.Point(24, 57),
        size: { w: 200, h: 80 },
      });
   
      return icon;
  
    };
    handleLongClickInMap(currentEvent) {
      let { Map, H, M, getCORV,markerGroup } = this.state;
      // console.log(Map.getObjects()[0])
      let pointA;
      let pointB;
      let startMarkerValue;
      let destMarkerValue;
      let bLongClickUseForStartPointValue = this.props.CORV.bLongClickUseForStartPoint;
      console.log('this.props.CORV.bLongClickUseForStartPoint',this.props.CORV.bLongClickUseForStartPoint)
      // if (bLongClickUseForStartPointValue == null || bLongClickUseForStartPointValue == true) {
      //   bLongClickUseForStartPointValue = false;
      // }
      // else {
      //   bLongClickUseForStartPointValue = true;
      // }
  
      var lastClickedPos = Map.screenToGeo(currentEvent.currentPointer.viewportX, currentEvent.currentPointer.viewportY);
      // round up decimal places as Geocoder can only provide upto 7 digits precision after decimal
      lastClickedPos.lat = this.roundUp(lastClickedPos.lat, 7);
      lastClickedPos.lng = this.roundUp(lastClickedPos.lng, 7);
      // let markerGroup = new H.map.Group();
      
      if (bLongClickUseForStartPointValue) {
        this.clearLastRouteCalculation();
        var line1 = "" + lastClickedPos.lat + "," + lastClickedPos.lng;
        //var line2 = " ";
        this.handleChange('startValue',line1)
        pointA = new H.geo.Point(lastClickedPos.lat, lastClickedPos.lng);
        if (this.props.CORV.startMarker != null ) {
          // markerGroup.removeObject(startMarkerValue);
          Map.removeObject(Map.getObjects()[1]);
          if (this.props.BLCUSP) {
            Map.removeObject(Map.getObjects());
            // Map.removeObjects(Map.getObjects());
            this.handleChange('BLCUSP',false)
          }
        }
        startMarkerValue = new H.map.Marker(pointA,
          {
            icon: this.createIconMarker(line1)
          });
          window.map.addObject(startMarkerValue);

          this.handleChange('startMarker',startMarkerValue)
        // markerGroup.addObject(this.props.CORV.startMarker);
        
        // this.handleChange('startMarker',new H.map.Marker(pointA,
        //   {
        //     icon: this.createIconMarker(line1)
        //   }))
          // const marker = new window.H.map.Marker(pointA,
  				// 	{
  				// 		icon: this.createIconMarker(line1)
  				// 	})
          //   this.handleChange('startMarker', marker)
          
        this.handleChange('bLongClickUseForStartPoint',false)

      }
      else {
        this.clearLastRouteCalculation();
        var line1 = "" + lastClickedPos.lat + "," + lastClickedPos.lng;
        //var line2 = " ";
        // dest.value = line1;
        this.handleChange('DestinationValue', line1)
        pointB = new H.geo.Point(lastClickedPos.lat, lastClickedPos.lng);
        if (this.props.CORV.destMarker != null) {
          // window.map.removeObject(destMarker);
          Map.removeObject(Map.getObjects()[0]);
          if (this.props.BLCUSP) {
            Map.removeObject(Map.getObjects());
            // Map.removeObjects(Map.getObjects());
            this.handleChange('BLCUSP',false)
          }
        }
        destMarkerValue = new H.map.Marker(pointB,
          {
            icon: this.createIconMarker(line1)
          });
        window.map.addObject(destMarkerValue);
        this.handleChange('destMarker',destMarkerValue)
        this.handleChange('bLongClickUseForStartPoint',true)

      }
    }
    render() {

      const { options, analytics, costOptimRouteValue } = this.props
      const { Map, H, UI, CORV } = this.state
      
      
      if (Map != null) {
        
    
        // Map.removeObjects(Map.getObjects())

        if( options.isoline.geometry.length !== 0) {
          
          let marker = new H.map.Marker({lat: options.isoline.marker.lat, lng: options.isoline.marker.lng}, {
            icon: new H.map.Icon(isoline_icon,  {
              size: { w: 20, h: 20 },
            })
          })
          
          Map.addObject(marker)

          let linestring = new H.geo.LineString()
          
          options.isoline.geometry.forEach(point => {
            let coords = point.split(",")
            linestring.pushPoint({lat: Number(coords[0]), lng: Number(coords[1])})
          })

          let polygon = new H.map.Polygon(
            linestring, 
            { 
              style: { 
                lineWidth: 1,
                fillColor: 'rgba(103, 58, 147, 0.3)',
                strokeColor: '#673A93',
                lineDash: [0, 2],
              }
            })  
          Map.addObject(polygon)
        }


        options.waypoints.markers.forEach((feature, i ) => {

          let waypoint_icon = `<svg width="60" height="64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" overflow="hidden"><defs><clipPath id="clip0"><path d="M493 466 553 466 553 530 493 530Z" fill-rule="evenodd" clip-rule="evenodd"/></clipPath></defs><g clip-path="url(#clip0)" transform="translate(-493 -466)"><path d="M498.5 496C498.5 482.469 509.693 471.5 523.5 471.5 537.307 471.5 548.5 482.469 548.5 496 548.5 509.531 537.307 520.5 523.5 520.5 509.693 520.5 498.5 509.531 498.5 496Z" stroke="#3F59A7" stroke-width="8.66667" stroke-miterlimit="8" fill="#FFFFFF" fill-rule="evenodd"/><text fill="#3F59A7" font-family="FiraGO,FiraGO_MSFontService,sans-serif" font-weight="700" font-size="27" transform="translate(516.775 507)">{weight}</text></g></svg>`
          let svgString = waypoint_icon.replace(/\{weight\}/g, i+1)

          let marker = new H.map.Marker({lat: feature.lat, lng: feature.lng}, {
            icon: new H.map.Icon(svgString,  {
              size: { w: 30, h: 30 },
              anchor: { x: 15, y: 15 },
            })
          })

          
          Map.addObject(marker)
          
        })

        if (options.waypoints.geometry.length !== 0) {
            
            let lineString = new H.geo.LineString()
            
            options.waypoints.geometry.forEach(feature => {
                lineString.pushPoint({lat: feature[0], lng: feature[1]})
            })
            
            let routeLine = this.styleRoute(lineString)

            Map.addObject(routeLine)
        }
      }

        return <div id="map" className="map" ref={this.mapRef} />
    }
}

Map.propTypes = {
  apikey: PropTypes.string,
  calculateIsoline: PropTypes.func, 
  clearIsoline: PropTypes.func,
  updateWaypoints: PropTypes.func,
  clearWaypoints: PropTypes.func
}


// handleLongClickInMap(currentEvent) {
//   let { Map, H, M, getCORV } = this.state;
//   // console.log(Map.getObjects()[0])
//   let pointA;
//   let pointB;
//   let startMarkerValue;
//   let destMarkerValue;
//   let bLongClickUseForStartPointValue = this.props.CORV.bLongClickUseForStartPoint;
//   console.log('this.props.CORV.bLongClickUseForStartPoint',this.props.CORV.bLongClickUseForStartPoint)
//   // if (bLongClickUseForStartPointValue == null || bLongClickUseForStartPointValue == true) {
//   //   bLongClickUseForStartPointValue = false;
//   // }
//   // else {
//   //   bLongClickUseForStartPointValue = true;
//   // }

//   var lastClickedPos = Map.screenToGeo(currentEvent.currentPointer.viewportX, currentEvent.currentPointer.viewportY);
//   // round up decimal places as Geocoder can only provide upto 7 digits precision after decimal
//   lastClickedPos.lat = this.roundUp(lastClickedPos.lat, 7);
//   lastClickedPos.lng = this.roundUp(lastClickedPos.lng, 7);
//   // let markerGroup = new H.map.Group();
//  let  markerGroup = this.props.CORV.markerGroup;
//   
//   console.log('Full',Map.getObjects() )
//   if (bLongClickUseForStartPointValue) {
//     this.clearLastRouteCalculation();
//     var line1 = "" + lastClickedPos.lat + "," + lastClickedPos.lng;
//     //var line2 = " ";
//     this.handleChange('startValue',line1)
//     pointA = new H.geo.Point(lastClickedPos.lat, lastClickedPos.lng);
//     if (this.props.CORV.startMarker != null) {
//       // markerGroup.removeObject(startMarkerValue);
//       console.log('START',Map.getObjects() )
//       console.log('START',markerGroup.getObjects() )
//       Map.removeObject(Map.getObjects()[0]);
//       markerGroup.removeObject(markerGroup.getObjects()[0])
//       // markerGroup.removeObject(markerGroup.getObjects()[0])
//       console.log('START-three',Map.getObjects() )
//       console.log('START-two',markerGroup.getObjects() )
//       // markerGroup.removeObject(Map.getObjects()[0]);
//      if (this.props.CORV.BLCUSP) {
//       // Map.removeAll();
//       // markerGroup.removeAll();
//       // markerGroup.removeObject(markerGroup.getObjects()[0])
//       this.handleChange('markerGroup',markerGroup)
//       this.handleChange('BLCUSP',false)
//       this.handleChange('startMarker',null)
//      }

//     }
//     startMarkerValue = new H.map.Marker(pointA,
//       {
//         icon: this.createIconMarker(line1)
//       });
//       markerGroup.addObject(startMarkerValue);
//       console.log('START-three',markerGroup.getObjects() )

//       console.log('START-three',Map.getObjects() )
    
//       this.handleChange('startMarker',startMarkerValue)
//     // markerGroup.addObject(this.props.CORV.startMarker);
    
//     // this.handleChange('startMarker',new H.map.Marker(pointA,
//     //   {
//     //     icon: this.createIconMarker(line1)
//     //   }))
//       // const marker = new window.H.map.Marker(pointA,
//       // 	{
//       // 		icon: this.createIconMarker(line1)
//       // 	})
//       //   this.handleChange('startMarker', marker)
      
//       this.handleChange('markerGroup',markerGroup)
//     this.handleChange('bLongClickUseForStartPoint',false)

//   }
//   else {
//     var line1 = "" + lastClickedPos.lat + "," + lastClickedPos.lng;

//     this.handleChange('DestinationValue', line1)
//     pointB = new H.geo.Point(lastClickedPos.lat, lastClickedPos.lng);
//     if (this.props.CORV.destMarker != null) {

//       console.log('DEST',Map.getObjects() )
//       console.log('DEST',markerGroup.getObjects() )
//       Map.removeObject(Map.getObjects()[1]);
//       markerGroup.removeObject(markerGroup.getObjects()[1])
//       console.log('DEST-TWO',Map.getObjects() )
//       console.log('DEST-TWO',markerGroup.getObjects() )
//       // markerGroup.removeObject(markerGroup.getObjects()[0])
//       // markerGroup.removeObject(Map.getObjects()[1]);
//       if (this.props.CORV.BLCUSP) {
//         // markerGroup.removeAll();
//         markerGroup.removeObject(markerGroup.getObjects()[1])
//         this.handleChange('markerGroup',markerGroup)
//         this.handleChange('BLCUSP',false)
//         this.handleChange('destMarker',null)
//        }
//     }
//     destMarkerValue = new H.map.Marker(pointB,
//       {
//         icon: this.createIconMarker(line1)
//       });
//       console.log('DEST-three',Map.getObjects() )
//       console.log('DEST-three',markerGroup.getObjects() )
//       markerGroup.addObject(destMarkerValue)
//       console.log('DEST-four',Map.getObjects() )
//       console.log('DEST-four',markerGroup.getObjects() )
//       this.handleChange('markerGroup',markerGroup)
//     this.handleChange('destMarker',destMarkerValue)
//     this.handleChange('bLongClickUseForStartPoint',true)

//   }
//   window.map.addObject(markerGroup)
//   console.log('Full END',Map.getObjects() )
//   console.log('Full END',markerGroup.getObjects() )
// }