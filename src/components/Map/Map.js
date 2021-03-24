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
    }

    this.createClusterLayer = this.createClusterLayer.bind(this)

    this.clusteredDataProvider = null
    this.activeLayer = null
    
  }

  async componentDidMount () {
    
    let { toggleModal,costOptimRouteValue, getcostOptimRouteValue  } = this.props


    const H = window.H

    const M = {
      CORV: costOptimRouteValue,
      getCORV:getcostOptimRouteValue,
      Platform: {},
      DefaultLayers: {},
      GeocodingService: {},
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

  

    let group = new H.map.Group();
    let markerGroup = new H.map.Group();
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

  		/************************************

  		Geocoding and routing methods

  		************************************/

  		/***/

  // 		/************************************
  // 		Start Route Calculation
  // 		************************************/
  // var startRouteCalculation = function () {
  //   clearLastRouteCalculation();
  //   // geocode(CORV.start, true);
  // };


  // 		/********************************************************
  // 		Start/Destination selectin via LongClick in map
  // 		********************************************************/
  // 		function handleLongClickInMap(currentEvent) {
  // 			var lastClickedPos = map.screenToGeo(currentEvent.currentPointer.viewportX, currentEvent.currentPointer.viewportY);
  // 			// round up decimal places as Geocoder can only provide upto 7 digits precision after decimal
  // 			lastClickedPos.lat = roundUp(lastClickedPos.lat, 7);
  // 			lastClickedPos.lng = roundUp(lastClickedPos.lng, 7);

  // 			if (bLongClickUseForStartPoint) {
  // 				clearLastRouteCalculation();
  // 				var line1 = "" + lastClickedPos.lat + "," + lastClickedPos.lng;
  // 				//var line2 = " ";
  // 				start.value = line1;
  // 				pointA = new H.geo.Point(lastClickedPos.lat, lastClickedPos.lng);
  // 				if (startMarker != null) {
  // 					markerGroup.removeObject(startMarker);
  // 				}
  // 				startMarker = new H.map.Marker(pointA,
  // 					{
  // 						icon: createIconMarker(line1)
  // 					});
  // 				markerGroup.addObject(startMarker);
  // 				bLongClickUseForStartPoint = false;
  // 			}
  // 			else {
  // 				var line1 = "" + lastClickedPos.lat + "," + lastClickedPos.lng;
  // 				//var line2 = " ";
  // 				dest.value = line1;
  // 				pointB = new H.geo.Point(lastClickedPos.lat, lastClickedPos.lng);
  // 				if (destMarker != null) {
  // 					markerGroup.removeObject(destMarker);
  // 				}
  // 				destMarker = new H.map.Marker(pointB,
  // 					{
  // 						icon: createIconMarker(line1)
  // 					});
  // 				markerGroup.addObject(destMarker);
  // 				bLongClickUseForStartPoint = true;
  // 			}
  // 		}

  // 		/************************************
  // 		Geocode start/destination
  // 		************************************/
  // 		var isStartGlobal;
  // 		var geocode = function (searchTerm, isStart) {
  // 			isStartGlobal = isStart;
  // 			//add Geocoder Release information if not already done
  // 			if (releaseGeocoderShown == false) {
  // 				// loadGeocoderVersionTxt();
  // 				releaseGeocoderShown = true;
  // 			}

  // 			// check if coordinates , use search end point for coordinates
  // 			var query = searchTerm.split(",");
  // 			var regex = /[0-9]+[.]?[0-9]*/;
  // 			if (query.length == 2 && regex.test(query[0]) && regex.test(query[1])) {
  // 				geocoder.search(
  // 					{
  // 						searchText: searchTerm
  // 					},
  // 					onResult,
  // 					onError
  // 				);
  // 			} else {
  // 				geocoder.geocode(
  // 					{
  // 						searchText: searchTerm
  // 					},
  // 					onResult,
  // 					onError
  // 				);
  // 			}
  // 		}
  // 		function onError(error) {
  // 			alert(error);
  // 		}

  // 		function onResult(result) {
  // 			// return if no results
  // 			if (!result.Response.View[0]) {
  // 				onError("Input could not be geocoded");
  // 				return;
  // 			}

  // 			if (result.Response.View[0].Result[0].Location != null) {
  // 				pos = result.Response.View[0].Result[0].Location.DisplayPosition;
  // 			}
  // 			else {
  // 				pos = result.Response.View[0].Result[0].Place.Locations[0].DisplayPosition;
  // 			}

  // 			if (isStartGlobal)
  // 				pointA = new H.geo.Point(pos.Latitude, pos.Longitude);
  // 			else
  // 				pointB = new H.geo.Point(pos.Latitude, pos.Longitude);

  // 			if (result.Response.View[0].Result[0].Location != null) {
  // 				address = result.Response.View[0].Result[0].Location.Address;
  // 			}
  // 			else {
  // 				address = result.Response.View[0].Result[0].Place.Locations[0].Address;
  // 			}

  // 			line1 = pos.Latitude + " " + pos.Longitude;
  // 			line2 = address.Label;

  // 			if (isStartGlobal) {
  // 				if (startMarker != null) {
  // 					markerGroup.removeObject(startMarker);
  // 				}
  // 				startMarker = new H.map.Marker(pointA,
  // 					{
  // 						icon: createIconMarker(line1, line2)
  // 					});
  // 				markerGroup.addObject(startMarker);

  // 			}
  // 			else {
  // 				if (destMarker != null) {
  // 					markerGroup.removeObject(destMarker);
  // 				}
  // 				destMarker = new H.map.Marker(pointB,
  // 					{
  // 						icon: createIconMarker(line1, line2)
  // 					});
  // 				markerGroup.addObject(destMarker);
  // 				map.getViewModel().setLookAtData({
  // 					bounds: markerGroup.getBoundingBox()
  // 				});
  // 			}

  // 			if (isStartGlobal)
  // 				geocode(dest.value, false);
  // 			else
  // 				calculateRoute(pointA, pointB);
  // 		}

  // 		/************************************
  // 		Actual Route Calculation
  // 		************************************/

  // 		var calculateRoute = function (start, destination) {

  // 			// generate routing request
  // 			var transportMode = "car";
  // 			if (vehicles == "3" || vehicles == "9") {
  // 				transportMode = "truck"
  // 			}

  // 			var hasTrailer = null;
  // 			var shippedHazardousGoods = null;
  // 			var limitedWeight = null;
  // 			var trailerWeight = null;
  // 			var height = null;
  // 			var width = null;
  // 			var length = null;
  // 			var heightAbove1stAxle = null;

  // 			if (parseInt(trailerType) > 0) {
  // 				hasTrailer = "&trailersCount=1";
  // 			}

  // 			if (parseInt(hazardousType) == 1) {
  // 				shippedHazardousGoods = "&shippedHazardousGoods=explosive";
  // 			}
  // 			else if (parseInt(hazardousType) == 2) {
  // 				shippedHazardousGoods = "&shippedHazardousGoods=other";
  // 			}

  // 			if (parseInt(vehWeight) > 0) {
  // 				if (parseInt(vehWeight) > parseInt(totalWeight)) {
  // 					alert("Total Weight cannot be smaller than Vehicle Weight");
  // 					return;
  // 				}
  // 				limitedWeight = "&limitedWeight=" + (totalWeight / 1000) + "t";// router 7.2 used by TCE includes trailer weight
  // 			}

  // 			if (parseInt(vehHeight) > 0 || parseInt(trailerHeight) > 0) {
  // 				height = "&height=" + ((parseInt(vehHeight) > parseInt(trailerHeight) ? parseInt(vehHeight) : parseInt(trailerHeight)) / 100) + "m";
  // 			}

  // 			if (parseInt(totalWidth) > 0) {
  // 				width = "&width=" + (totalWidth / 100) + 'm';
  // 			}

  // 			if (parseInt(totalLength) > 0) {
  // 				length = "&length=" + (totalLength / 100) + 'm';
  // 			}

  // 			if (document.getElementById("heightAbove1stAxle").value != 0) {
  // 				heightAbove1stAxle = (document.getElementById("heightAbove1stAxle").value / 100) + "m";
  // 			}

  // 			var vspec = "";
  // 			vspec += "&tollVehicleType=" + vehicles;
  // 			vspec += "&trailerType=" + trailerType;
  // 			vspec += "&trailersCount=" + trailerNr;
  // 			vspec += "&vehicleNumberAxles=" + nrOfAxlesVehicle;
  // 			vspec += "&trailerNumberAxles=" + nrOfAxlesTrailer;
  // 			vspec += "&hybrid=" + hybrid;
  // 			vspec += "&emissionType=" + emissionType;
  // 			vspec += "&fuelType=" + fuelType;
  // 			if (height != null && height.length > 0) vspec += height;
  // 			vspec += "&trailerHeight=" + trailerHeight;
  // 			vspec += "&vehicleWeight=" + vehWeight;
  // 			if (limitedWeight != null && limitedWeight.length > 0) vspec += limitedWeight;
  // 			vspec += "&disabledEquipped=" + disabledEquipped;
  // 			vspec += "&minimalPollution=" + minPollution;
  // 			vspec += "&hov=" + hov;
  // 			vspec += "&passengersCount=" + nrPassengers;
  // 			vspec += "&tiresCount=" + nrOfTotalTires;
  // 			vspec += "&commercial=" + commercial;
  // 			vspec += "&heightAbove1stAxle=" + heightAbove1stAxle;
  // 			if (width != null && width.length > 0) vspec += width;
  // 			if (length != null && length.length > 0) vspec += length;
  // 			if (shippedHazardousGoods != null && shippedHazardousGoods.length > 0) vspec += shippedHazardousGoods;
  // 			var routerParamsValue = document.getElementById('routerParamsValue').value;
  // 			var finalParamsValue = '';
  // 			if (routerParamsValue !== '') {
  // 				var paramsArray = [];
  // 				var components = routerParamsValue.split('&');
  // 				for (var i = 0; i < components.length; i++) {
  // 					var key = components[i].split('=');
  // 					if (key[0].substr(0, 'waypoint'.length) === 'waypoint') {
  // 						continue;// ignore waypoints because we already specified.
  // 					}
  // 					if (key[0] === 'mode') {
  // 						continue;// Ignore mode since cor build this inside
  // 					}
  // 					paramsArray.push(components[i]);
  // 				}
  // 				finalParamsValue = paramsArray.join('&');
  // 			}

  // 			var isDTFilteringEnabled = document.getElementById("chkEnableDTFiltering").checked;
  // 			var routeAlternativesRequested = false;
  // 			if (document.getElementById("routeAlternatives").value != null && document.getElementById("routeAlternatives").value != "0") {
  // 				routeAlternativesRequested = true;
  // 			}

  // 			var urlRoutingReq =
  // 				[
  // 					serverURL,
  // 					"jsonAttributes=41",
  // 					"&waypoint0=",
  // 					start.lat,
  // 					",",
  // 					start.lng,
  // 					"&detail=1",
  // 					"&waypoint1=",
  // 					destination.lat,
  // 					",",
  // 					destination.lng,
  // 					"&maneuverAttributes=none",
  // 					"&linkAttributes=none,sh",
  // 					"&legAttributes=none,li",
  // 					(noCostOptimizationJustCalculate ? "" : "&driver_cost="),
  // 					(noCostOptimizationJustCalculate ? "" : document.getElementById('hourDriverCost').value),
  // 					(noCostOptimizationJustCalculate ? "" : "&vehicle_cost="),
  // 					(noCostOptimizationJustCalculate ? "" : document.getElementById('hourVehicleCost').value),
  // 					"&currency=",
  // 					document.getElementById('currency').value,
  // 					"&departure=",
  // 					isDTFilteringEnabled ? document.getElementById("startRouteDate").value + 'T' + document.getElementById("startRouteTime").value : '',
  // 					vspec,
  // 					"&mode=fastest;" + transportMode + ";traffic:disabled",
  // 					"&rollup=none,country;tollsys",
  // 					(routeAlternativesRequested ? "&alternatives=" + document.getElementById("routeAlternatives").value : ''),
  // 					"&apiKey=",
  // 					config.apikey,
  // 					// Additional custom parameters
  // 					(finalParamsValue !== '' ? '&' + finalParamsValue : ''),
  // 					"&jsoncallback=parseRoutingResponse"].join("");
  // 					createMarkup(strRoutingRequestSend)
  // 			// feedbackTxt.innerHTML = strRoutingRequestSend;
  // 			window.script = document.createElement("script");
  // 			window.script.src = urlRoutingReq;
  // 			document.body.appendChild(window.script);
  // 		}

  // 		/************************************
  // 		parse the routing response
  // 		************************************/
  // 		function parseRoutingResponse(resp) {
  // 			if (resp.error != undefined) {
  // 				if (resp.error == "NoRouteFound") {
  // 					alert('Please consider to change your start or destination as the one you entered is not reachable with the given vehicle profile');
  // 					// feedbackTxt.innerHTML = 'The Router service is unable to compute the route: try to change your start / destination point';
  // 					createMarkup('The Router service is unable to compute the route: try to change your start / destination point');
  // 				}
  // 				else {
  // 					alert(resp.error);
  // 					createMarkup(resp.error)
  // 					// feedbackTxt.innerHTML = resp.error;
  // 				}
  // 				return;
  // 			}
  // 			if (resp.response == undefined && resp.subtype != undefined) {
  // 				if (resp.subtype == "NoRouteFound") {
  // 					alert('Please consider to change your start or destination as the one you entered is not reachable with the given vehicle profile');
  // 					// feedbackTxt.innerHTML = 'The Router service is unable to compute the route: try to change your start / destination point';
  // 					createMarkup('The Router service is unable to compute the route: try to change your start / destination point')
  // 				}
  // 				else {
  // 					alert(resp.subtype + " " + resp.details);
  // 					createMarkup(resp.error)
  // 					// feedbackTxt.innerHTML = resp.error;
  // 				}
  // 				return;
  // 			}
  // 			if (resp.error != undefined) {
  // 				// feedbackTxt.innerHTML = resp.error;
  // 				createMarkup(resp.error)
  // 				return;
  // 			}
  // 			if (resp.responseCode != undefined) {
  // 				alert(resp.message);
  // 				// feedbackTxt.innerHTML = resp.message;
  // 				createMarkup(resp.message)
  // 				return;
  // 			}
  // 			if (resp.onError == true) {
  // 				for (var i = 0; i < resp.errors.length; i++) {
  // 					createMarkup("<font color='red'>" + resp.errors + "</font>")
  // 					// feedbackTxt.innerHTML = "<font color='red'>" + resp.errors + "</font>";
  // 					createMarkup("<br />")
  // 					// feedbackTxt.innerHTML += "<br />";
  // 				}
  // 				return;
  // 			}
  // 			if (bErrorHappened) {
  // 				return;
  // 			}

  // 			if (createMarkup() != strTceError) {
  // 				// feedbackTxt.innerHTML = strTceResponseReceived;
  // 				createMarkup(strTceResponseReceived)
  // 			}

  // 			routeLinkHashMap = new Object();

  // 			// create link objects
  // 			for (var r = 0; r < resp.response.route.length; r++) {
  // 				for (var m = 0; m < resp.response.route[r].leg[0].link.length; m++) {
  // 					// only add new link if it does not exist so far - so alternatives are not drawn multiple times
  // 					var linkId = (resp.response.route[r].leg[0].link[m].linkId.lastIndexOf("+", 0) === 0 ? resp.response.route[r].leg[0].link[m].linkId.substring(1) : resp.response.route[r].leg[0].link[m].linkId);
  // 					if (routeLinkHashMap[linkId] == null) {
  // 						var strip = new H.geo.LineString(),
  // 							shape = resp.response.route[r].leg[0].link[m].shape,
  // 							i,
  // 							l = shape.length;

  // 						for (i = 0; i < l; i += 2) {
  // 							strip.pushLatLngAlt(shape[i], shape[i + 1], 0);
  // 						}

  // 						var link = new H.map.Polyline(strip,
  // 							{
  // 								style: {
  // 									lineWidth: (routeStroke - (r + 1)), // alternatives get smaller line with
  // 									strokeColor: routeColor[r],
  // 									lineCap: 'butt'
  // 								}
  // 							});
  // 						link.setArrows({ color: "#F00F", width: 2, length: 3, frequency: 4 });
  // 						link.$linkId = resp.response.route[r].leg[0].link[m].linkId;

  // 						//The router can send back links ids with "-" or "+" prefix: only "-" prefix is kept and stored in this HashMap, the "+" is removed
  // 						routeLinkHashMap[linkId] = link;

  // 						// add event listener to link
  // 						link.addEventListener("pointerdown", function (e) {
  // 							if (currentOpenBubble)
  // 								ui.removeBubble(currentOpenBubble);
  // 							var html = `'<div>' +
  // 								'<p style="font-family:Arial,sans-serif; font-size:12px;">LinkId: ' + e.target.$linkId + '</p>'
  // 							'</div>'`;

  // 							var pos = map.screenToGeo(e.currentPointer.viewportX, e.currentPointer.viewportY);

  // 							currentOpenBubble = new H.ui.InfoBubble(pos, { content: html });
  // 							ui.addBubble(currentOpenBubble);
  // 						});

  // 						group.addObject(link);
  // 					}
  // 				}
  // 			}

  // 			map.addObject(group);

  // 			// show TCE costs
  // 			showTceCost(resp.response.route[0].tollCost.costsByCountryAndTollSystem, resp.response.route[0].cost, resp.response.route[0].summary.distance / 1000.0, resp.response.route[0].summary.baseTime / 60 / 60.00, resp.response.route[0].summary.trafficTime / 60 / 60.00);

  // 			/***********************************************
  // 			Highlight Links
  // 			***********************************************/
  // 			for (var i = 0; i < resp.response.route.length; i++) {
  // 				highlightRoute(resp.response.route[i].tollCost.routeTollItems, i);
  // 			}
  // 		}

  // 		/**************************************************
  // 		show route toll cost response
  // 		**************************************************/
  // 		function showTceCost(costByCountryAndTollSystem, costs, length, basetime, traffictime) {

  // 			/***********************************************

  // 			Publishing route total cost

  // 			***********************************************/
  // 			createMarkup("<br/><span style=\"font-weight: bold;border: 1px solid;padding: 2px;\">COSTS FOR MAIN ROUTE</span>")
  // 			// feedbackTxt.innerHTML = "<br/><span style=\"font-weight: bold;border: 1px solid;padding: 2px;\">COSTS FOR MAIN ROUTE</span>";
  // 			if (!costs) {
  // 				// feedbackTxt.innerHTML += "<br/><br/>None.";
  // 				createMarkup("<br/><br/>None.");
  // 			} else {
  // 				createMarkup("<br/><br/>Length: " + length + " km<br/>");
  // 				createMarkup("BaseTime: " + basetime + " h<br/>");
  // 				createMarkup("TrafficTime: " + traffictime + " h<br/>");

  // 				createMarkup("Total Cost: " + costs.totalCost + " " + costs.currency + "<br/>");
  // 				createMarkup("Driver Cost: " + costs.details.driverCost + " " + costs.currency + "<br/>");
  // 				createMarkup("Vehicle Cost: " + costs.details.vehicleCost + " " + costs.currency + "<br/>");
  // 				createMarkup("Toll Cost: " + costs.details.tollCost + " " + costs.currency + "<br/>");
  // 				// feedbackTxt.innerHTML += "<br/><br/>Length: " + length + " km<br/>";
  // 				// feedbackTxt.innerHTML += "BaseTime: " + basetime + " h<br/>";
  // 				// feedbackTxt.innerHTML += "TrafficTime: " + traffictime + " h<br/>";

  // 				// feedbackTxt.innerHTML += "Total Cost: " + costs.totalCost + " " + costs.currency + "<br/>";
  // 				// feedbackTxt.innerHTML += "Driver Cost: " + costs.details.driverCost + " " + costs.currency + "<br/>";
  // 				// feedbackTxt.innerHTML += "Vehicle Cost: " + costs.details.vehicleCost + " " + costs.currency + "<br/>";
  // 				// feedbackTxt.innerHTML += "Toll Cost: " + costs.details.tollCost + " " + costs.currency + "<br/>";
  // 			}

  // 			/***********************************************

  // 			Publishing route detail cost

  // 			***********************************************/
  // 			createMarkup("<br/><span style=\"font-weight: bold;border: 1px solid;padding: 2px;\">TOLL COST FOR MAIN ROUTE</span>")
  // 			// feedbackTxt.innerHTML += "<br/><span style=\"font-weight: bold;border: 1px solid;padding: 2px;\">TOLL COST FOR MAIN ROUTE</span>";

  // 			if (costs.details.tollCost == 0.0) {
  // 				createMarkup("<br/><br/>None.<br/><br/>")
  // 				// feedbackTxt.innerHTML += "<br/><br/>None.<br/><br/>";
  // 			}

  // 			/***********************************************
  // 			Apply toll to link objects
  // 			***********************************************/
  // 			if (costByCountryAndTollSystem != null) {
  // 				var feedback = "";
  // 				feedback += "<br/>";
  // 				for (var j = 0; j < costByCountryAndTollSystem.length; j++) {
  // 					feedback += "<br/><span style=\"font-weight: bold;border: 1px solid;padding: 2px;\">" + costByCountryAndTollSystem[j].country + "</span>"
  // 					feedback += "<ul><li>";
  // 					if (costByCountryAndTollSystem[j].name != null && costByCountryAndTollSystem[j].name.trim().length > 0) {
  // 						feedback += "Toll System " + costByCountryAndTollSystem[j].name + ": ";
  // 					} else if (costByCountryAndTollSystem[j].tollSystemId != null && costByCountryAndTollSystem[j].tollSystemId.trim().length > 0) {
  // 						feedback += "Toll System ID " + costByCountryAndTollSystem[j].tollSystemId + ": "
  // 					} else {
  // 						feedback += "Toll : ";
  // 					}
  // 					feedback += costByCountryAndTollSystem[j].amountInTargetCurrency + " " + costs.currency;
  // 					feedback += "</li></ul>";
  // 				}
  // 				createMarkup(feedback)
  // 				// feedbackTxt.innerHTML += feedback;
  // 			}

  // 			if (costs.details.tollCost != 0.0) {
  // 				createMarkup("<br/><br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_A_Color[0]) + ";\">Paypoint Type A: Country wide toll - payed here.</span>")
  // 				createMarkup("<br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_a_Color[0]) + ";\">Paypoint Type A: Country wide toll - payed somewhere else.</span>")
  // 				createMarkup("<br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_S_Color[0]) + ";\">Paypoint Type S: Toll section from one toll booth or between two toll boths.</span>")
  // 				createMarkup("<br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_p_Color[0]) + ";\">Paypoint Type p: Toll - payed somewhere else.</span>")
  // 				createMarkup("<br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_F_Color[0]) + ";\">Paypoint Type F: Toll section belonging to a toll system.</span>")
  // 				createMarkup("<br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_K_Color[0]) + ";\">Paypoint Type K: Toll section defined between junctions.</span>")
  // 				createMarkup("<br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_U_Color[0]) + ";\">UFR: Usage fee required link(s).</span>")
  // 				// feedbackTxt.innerHTML += "<br/><br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_A_Color[0]) + ";\">Paypoint Type A: Country wide toll - payed here.</span>";
  // 				// feedbackTxt.innerHTML += "<br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_a_Color[0]) + ";\">Paypoint Type A: Country wide toll - payed somewhere else.</span>";
  // 				// feedbackTxt.innerHTML += "<br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_S_Color[0]) + ";\">Paypoint Type S: Toll section from one toll booth or between two toll boths.</span>";
  // 				// feedbackTxt.innerHTML += "<br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_p_Color[0]) + ";\">Paypoint Type p: Toll - payed somewhere else.</span>";
  // 				// feedbackTxt.innerHTML += "<br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_F_Color[0]) + ";\">Paypoint Type F: Toll section belonging to a toll system.</span>";
  // 				// feedbackTxt.innerHTML += "<br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_K_Color[0]) + ";\">Paypoint Type K: Toll section defined between junctions.</span>";
  // 				// feedbackTxt.innerHTML += "<br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_U_Color[0]) + ";\">UFR: Usage fee required link(s).</span>";
  // 			}

  // 			return; // done

  // 		}

  // 		/**
  // 			Highlights the toll links in map display
  // 		*/
  // 		function highlightRoute(routeTollItems, routeAlternative) {
  // 			if (routeTollItems != null) {
  // 				for (var i = 0; i < routeTollItems.length; i++) {
  // 					var tollType = routeTollItems[i].tollType;
  // 					var color = ppType_S_Color[routeAlternative];
  // 					if (tollType == 'A') {
  // 						color = ppType_A_Color[routeAlternative];
  // 					} else if (tollType == 'a') {
  // 						color = ppType_a_Color[routeAlternative];
  // 					} else if (tollType == 'S') {
  // 						color = ppType_S_Color[routeAlternative];
  // 					} else if (tollType == 'p') {
  // 						color = ppType_p_Color[routeAlternative];
  // 					} else if (tollType == 'F') {
  // 						color = ppType_F_Color[routeAlternative];
  // 					} else if (tollType == 'K') {
  // 						color = ppType_K_Color[routeAlternative];
  // 					} else if (tollType == 'U') {
  // 						color = ppType_U_Color[routeAlternative];
  // 					}

  // 					for (var j = 0; j < routeTollItems[i].linkIds.length; j++) {
  // 						// set color and stroke of links
  // 						var tollstroke = (tollCostStroke - (routeAlternative + 1));	// route alternatives have a different stroke
  // 						var link = routeLinkHashMap[routeTollItems[i].linkIds[j]];
  // 						if (link.getStyle().strokeColor == routeColor[routeAlternative]) { // only change link color to toll color if not already modified
  // 							link.setStyle({ strokeColor: color, lineWidth: tollstroke });
  // 						}
  // 					}

  // 					//toll structures
  // 					if (routeTollItems[i].tollStructures != null) {
  // 						for (var j = 0; j < routeTollItems[i].tollStructures.length; j++) {
  // 							createTollMarker(routeTollItems[i].tollStructures[j]);
  // 						}
  // 					}
  // 				}
  // 			}

  // 		}

 


  // 		// Helper for selecting the value attached to a JS selection
  // 		// function selectionSettingHelper(selection, value) {
  // 		// 	for (var opt, j = 0; opt = selection.options[j]; j++) {
  // 		// 		if (opt.value == value) {
  // 		// 			selection.selectedIndex = j;
  // 		// 			break;
  // 		// 		}
  // 		// 	}
  // 		// }






  // 		/**
  // 		This method creates the toll marker at the beginning of the passed link
  // 		*/
  // 		function createTollMarker(oneTollStructure) {
  // 			var pos = new H.geo.Point(oneTollStructure.latitude, oneTollStructure.longitude);
  // 			var tollMarker = new H.map.Marker(pos, { icon: tollIcon });
  // 			tollMarker.addEventListener("tap", function () { displayTollStructureName(pos, oneTollStructure.name); });
  // 			group.addObject(tollMarker);
  // 		}

  // 		function displayTollStructureName(position, name) {
  // 			let infoBubble = new H.ui.InfoBubble(position, { content: name });
  // 			ui.addBubble(infoBubble);
  // 		}

  // 		//Function to convert hex format to a rgb color from http://jsfiddle.net/Mottie/xcqpF/1/light/
  // 		function rgb2hex(rgb) {
  // 			rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  // 			return (rgb && rgb.length === 4) ? "#" +
  // 				("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
  // 				("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
  // 				("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
  // 		}

  // 		// Check if a string is null/undefined/withoutContent
  // 		function isEmpty(str) {
  // 			return (!str || 0 === str.length);
  // 		}
  // ======================================================================================
  


  clearLastRouteCalculation() {
    let { M, H,Map,CORV } = this.state
    var group = new H.map.Group();
    this.handleChange("bErrorHappened", false);
    this.handleChange("bLongClickUseForStartPoint", true);
    if (CORV.currentOpenBubble) {
      M.UI.removeBubble(CORV.currentOpenBubble);
    }
    group.removeAll();

  }

   		// Function rounds up number of decimal places
  roundUp(num, places) {
    return +(Math.round(num + "e+" + places) + "e-" + places);
  }
		//--- Helper - Create Start / Destination marker
  createIconMarker (line1, line2) {
    
    let { M, H,Map,CORV } = this.state;
    
    var svgMarker = CORV.svgMarkerImage_Line;

    // every long address not shown 
    // correctly in marker
    if (line2 && line2.length > 42) {
      line2 = line2.substring(0, 40);
      line2 = line2 + "..";
    }

    svgMarker = svgMarker.replace(/__line1__/g, line1);
    svgMarker = svgMarker.replace(/__line2__/g, (line2 != undefined ? line2 : ""));
    svgMarker = svgMarker.replace(/__width__/g, (line2 != undefined ? line2.length * 4 + 20 : (line1.length * 4 + 80)));
    svgMarker = svgMarker.replace(/__widthAll__/g, (line2 != undefined ? line2.length * 4 + 80 : (line1.length * 4 + 150)));
    var icon = new H.map.Icon(svgMarker, {
      anchor: new H.math.Point(24, 57),
      size: { w: 20, h: 20 },
    });
 
    return icon;

  };
  handleLongClickInMap(currentEvent) {

    let { Map, H,M,CORV } = this.state
    // let { M, H,Map } = this.state

   
		var markerGroup = new H.map.Group();
    console.log(markerGroup)
    var lastClickedPos = Map.screenToGeo(currentEvent.currentPointer.viewportX, currentEvent.currentPointer.viewportY);
    // round up decimal places as Geocoder can only provide upto 7 digits precision after decimal
    lastClickedPos.lat = this.roundUp(lastClickedPos.lat, 7);
    lastClickedPos.lng = this.roundUp(lastClickedPos.lng, 7);

    if (CORV.bLongClickUseForStartPoint) {
      this.clearLastRouteCalculation();
      CORV.line1 = "" + lastClickedPos.lat + "," + lastClickedPos.lng;
      //var line2 = " ";
      CORV.startValue = CORV.line1;
      CORV.pointA = new H.geo.Point(lastClickedPos.lat, lastClickedPos.lng);

      if (CORV.startMarker != null) {
        markerGroup.removeObject(CORV.startMarker);
        
      }
 
      CORV.startMarker = new H.map.Marker(CORV.pointA,
        {
          icon: this.createIconMarker(CORV.line1)
        });

      markerGroup.addObject(CORV.startMarker);
      CORV.bLongClickUseForStartPoint = false;
    }
    else {
      CORV.line1 = "" + lastClickedPos.lat + "," + lastClickedPos.lng;
      //var line2 = " ";
      CORV.DestinationValue= CORV.line1;
      CORV.pointB = new H.geo.Point(lastClickedPos.lat, lastClickedPos.lng);
      if (CORV.destMarker != null) {
        markerGroup.removeObject(CORV.destMarker);
      }
      CORV.destMarker = new H.map.Marker(CORV.pointB,
        {
          icon: this.createIconMarker(CORV.line1)
        });
      markerGroup.addObject(CORV.destMarker);
      CORV.bLongClickUseForStartPoint = true;
    }
  }

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
      clearWaypoints
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
        
        let routeArrows = new window.H.map.Polyline(linestring, {
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


    render() {

      const { options, analytics } = this.props
      const { Map, H, UI } = this.state
      
      
      if (Map != null) {
        
      

        Map.removeObjects(Map.getObjects())

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