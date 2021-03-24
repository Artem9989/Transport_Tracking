import React, { useState, useRef, useEffect } from "react";
import { Collapse } from "antd";
import ResultCostOptimRoute from "./ResultOptimRoute/ResultOptimRoute.jsx";
import { config } from "../../../assets/config";
import svgMarkerImage_Line from "../InfoControl/LUI-icon-pd-information-solid-24.svg";
import axios from "axios";
import { DatePicker, Space } from 'antd';
import CORS from './CORS.css';



const { Panel } = Collapse;


const CostOptimRoute = (props) => {

  // const [trStartRouteDate, settrStartRouteDate] = useState(false);
  const [trisDTFilteringEnabled, setisDTFilteringEnabled] = useState(false);
  const [isDChecked, setisDChecked] = useState(false);

  let CORV = props.costOptimRouteValue;
  let updateCORV = props.getcostOptimRouteValue;

  const handleChange = (field, value) => {
    updateCORV(field, value);
  };



  const createMarkup = (htmlValue) => {
    if (htmlValue === undefined) {
      
    } else {
      handleChange('ResponseResult', htmlValue)
    }
    
  }

  		(function setValuesFromUrl() {
  			let nameVal;
  			var indexOf = window.location.href.indexOf('?');
  			if (indexOf < 0) return;
  			var vars = window.location.href.slice(indexOf + 1).split('&');

  			for (var i = 0; i < vars.length; i++) {
  				nameVal = vars[i].split('=');
  				if (!nameVal[0]) continue;
  				document.getElementById(nameVal[0]).value = decodeURIComponent(nameVal[1]);
  			}

  		})();

  function cloneSettingsInNewWindow() {
    var url =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?";
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      url += inputs[i].id + "=" + encodeURIComponent(inputs[i].value) + "&";
    }
    var inputs = document.getElementsByTagName("select");
    for (var i = 0; i < inputs.length; i++) {
      url += inputs[i].id + "=" + inputs[i].value + "&";
    }

    window.open(url);
  }

  	
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
  function clearLastRouteCalculation() {
    handleChange("bErrorHappened", false);
    handleChange("bLongClickUseForStartPoint", true);
    // CORV.bErrorHappened = false;
    // bLongClickUseForStartPoint = true;
    // if (CORV.currentOpenBubble) {
    // 	ui.removeBubble(CORV.currentOpenBubble);
    // }
    // group.removeAll();
  }

  // 		/************************************
  // 		Start Route Calculation
  // 		************************************/
  var startRouteCalculation = function () {
    clearLastRouteCalculation();
    geocode(CORV.startValue, true);
  };
  // routeButton.onClick = startRouteCalculation;

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

  const createIconMarker = (line1, line2) => {
    
    // let { M, H,Map,CORV } = this.state;
    
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
    var icon = new window.H.map.Icon(svgMarker, {
      anchor: new window.H.math.Point(24, 57),
      size: { w: 20, h: 20 },
    });
 
    return icon;

  };
  		/************************************
  		Geocode start/destination
  		************************************/
  		var isStartGlobal;
  		var geocode = function (searchTerm, isStart) {
        
  			isStartGlobal = isStart;
  			//add Geocoder Release information if not already done
  			if (CORV.releaseGeocoderShown == false) {
  				// loadGeocoderVersionTxt();
  				CORV.releaseGeocoderShown = true;
  			}

  			// check if coordinates , use search end point for coordinates
  			var query = searchTerm.split(",");
  			var regex = /[0-9]+[.]?[0-9]*/;
  			if (query.length == 2 && regex.test(query[0]) && regex.test(query[1])) {
  				CORV.geocoder.search(
  					{
  						searchText: searchTerm
  					},
  					onResult,
  					onError
  				);
  			} else {
  				CORV.geocoder.geocode(
  					{
  						searchText: searchTerm
  					},
  					onResult,
  					onError
  				);
  			}
  		}
  		function onError(error) {
  			alert(error);
  		}

  		function onResult(result) {

  			// return if no results
  			if (!result.Response.View[0]) {
  				onError("Input could not be geocoded");
  				return;
  			}

  			if (result.Response.View[0].Result[0].Location != null) {
  				CORV.pos = result.Response.View[0].Result[0].Location.DisplayPosition;
  			}
  			else {
  				CORV.pos = result.Response.View[0].Result[0].Place.Locations[0].DisplayPosition;
  			}

  			if (isStartGlobal)
        CORV.pointA = new window.H.geo.Point(CORV.pos.Latitude, CORV.pos.Longitude);
  			else
        CORV.pointB = new window.H.geo.Point(CORV.pos.Latitude, CORV.pos.Longitude);

  			if (result.Response.View[0].Result[0].Location != null) {
  				CORV.address = result.Response.View[0].Result[0].Location.Address;
  			}
  			else {
  				CORV.address = result.Response.View[0].Result[0].Place.Locations[0].Address;
  			}

  			CORV.line1 = CORV.pos.Latitude + " " + CORV.pos.Longitude;
  			CORV.line2 = CORV.address.Label;

  			if (isStartGlobal) {
  				if (CORV.startMarker != null) {
  					CORV.markerGroup.removeObject(CORV.startMarker);
  				}
  				CORV.startMarker = new window.H.map.Marker(CORV.pointA,
  					{
  						icon: createIconMarker(CORV.line1, CORV.line2)
  					});
            CORV.markerGroup.addObject(CORV.startMarker);

  			}
  			else {
  				if (CORV.destMarker != null) {
  					CORV.markerGroup.removeObject(CORV.destMarker);
  				}
  				CORV.destMarker = new window.H.map.Marker(CORV.pointB,
  					{
  						icon: createIconMarker(CORV.line1, CORV.line2)
  					});
            CORV.markerGroup.addObject(CORV.destMarker);
            window.map.getViewModel().setLookAtData({
  					bounds: CORV.markerGroup.getBoundingBox()
  				});
  			}

  			if (isStartGlobal)
  				geocode(CORV.DestinationValue, false);
  			else
  				calculateRoute(CORV.pointA, CORV.pointB);
  		}

  // 		/************************************
  // 		Actual Route Calculation
  // 		************************************/

  		var calculateRoute = function (start, destination) {
  			// generate routing request
  			var transportMode = "car";
  			if (CORV.vehicles == "3" || CORV.vehicles == "9") {
  				transportMode = "truck"
  			}

  			var hasTrailer = null;
  			var shippedHazardousGoods = null;
  			var limitedWeight = null;
  			var trailerWeight = null;
  			var height = null;
  			var width = null;
  			var length = null;
  			var heightAbove1stAxle = null;

  			if (parseInt(CORV.trailerType) > 0) {
  				hasTrailer = "&trailersCount=1";
  			}

  			if (parseInt(CORV.hazardousType) == 1) {
  				shippedHazardousGoods = "&shippedHazardousGoods=explosive";
  			}
  			else if (parseInt(CORV.hazardousType) == 2) {
  				shippedHazardousGoods = "&shippedHazardousGoods=other";
  			}

  			if (parseInt(CORV.vehWeight) > 0) {
  				if (parseInt(CORV.vehWeight) > parseInt(CORV.totalWeight)) {
  					alert("Total Weight cannot be smaller than Vehicle Weight");
  					return;
  				}
  				limitedWeight = "&limitedWeight=" + (CORV.totalWeight / 1000) + "t";// router 7.2 used by TCE includes trailer weight
  			}

  			if (parseInt(CORV.vehHeight) > 0 || parseInt(CORV.trailerHeight) > 0) {
  				height = "&height=" + ((parseInt(CORV.vehHeight) > parseInt(CORV.trailerHeight) ? parseInt(CORV.vehHeight) : parseInt(CORV.trailerHeight)) / 100) + "m";
  			}

  			if (parseInt(CORV.totalWidth) > 0) {
  				width = "&width=" + (CORV.totalWidth / 100) + 'm';
  			}

  			if (parseInt(CORV.totalLength) > 0) {
  				length = "&length=" + (CORV.totalLength / 100) + 'm';
  			}
        let heightAbove1stAxleValue;
  			if (CORV.heightAbove1stAxle != 0) {
  				heightAbove1stAxleValue = (CORV.heightAbove1stAxle / 100) + "m";
          // handleChange('heightAbove1stAxle', heightAbove1stAxleValue)
  			}

  			var vspec = "";
  			vspec += "&tollVehicleType=" + CORV.vehicles;
  			vspec += "&trailerType=" + CORV.trailerType;
  			vspec += "&trailersCount=" + CORV.trailerNr;
  			vspec += "&vehicleNumberAxles=" + CORV.nrOfAxlesVehicle;
  			vspec += "&trailerNumberAxles=" + CORV.nrOfAxlesTrailer;
  			vspec += "&hybrid=" + CORV.hybrid;
  			vspec += "&emissionType=" + CORV.emissionType;
  			vspec += "&fuelType=" + CORV.fuelType;
  			if (height != null && height.length > 0) vspec += height;
  			vspec += "&trailerHeight=" + CORV.trailerHeight;
  			vspec += "&vehicleWeight=" + CORV.vehWeight;
  			if (limitedWeight != null && limitedWeight.length > 0) vspec += limitedWeight;
  			vspec += "&disabledEquipped=" + CORV.disabledEquipped;
  			vspec += "&minimalPollution=" + CORV.minPollution;
  			vspec += "&hov=" + CORV.hov;
  			vspec += "&passengersCount=" + CORV.nrPassengers;
  			vspec += "&tiresCount=" + CORV.nrOfTotalTires;
  			vspec += "&commercial=" + CORV.commercial;
  			vspec += "&heightAbove1stAxle=" + heightAbove1stAxleValue;
  			if (width != null && width.length > 0) vspec += width;
  			if (length != null && length.length > 0) vspec += length;
  			if (shippedHazardousGoods != null && shippedHazardousGoods.length > 0) vspec += shippedHazardousGoods;
  			var routerParamsValueState = CORV.routerParamsValueState;
  			var finalParamsValue = '';
  			if (routerParamsValueState !== '') {
  				var paramsArray = [];
  				var components = routerParamsValueState.split('&');
  				for (var i = 0; i < components.length; i++) {
  					var key = components[i].split('=');
  					if (key[0].substr(0, 'waypoint'.length) === 'waypoint') {
  						continue;// ignore waypoints because we already specified.
  					}
  					if (key[0] === 'mode') {
  						continue;// Ignore mode since cor build this inside
  					}
  					paramsArray.push(components[i]);
  				}
  				finalParamsValue = paramsArray.join('&');
  			}

  			var isDTFilteringEnabled = trisDTFilteringEnabled;
  			var routeAlternativesRequested = false;
  			if (CORV.routeAlternatives != null && CORV.routeAlternatives != "0") {
  				routeAlternativesRequested = true;
  			}
  			var urlRoutingReq =
  				[
  					CORV.serverURL,
  					"jsonAttributes=41",
  					"&waypoint0=",
  					start.lat,
  					",",
  					start.lng,
  					"&detail=1",
  					"&waypoint1=",
  					destination.lat,
  					",",
  					destination.lng,
  					"&maneuverAttributes=none",
  					"&linkAttributes=none,sh",
  					"&legAttributes=none,li",
  					(CORV.noCostOptimizationJustCalculate ? "" : "&driver_cost="),
  					(CORV.noCostOptimizationJustCalculate ? "" : CORV.costPerKm),
  					(CORV.noCostOptimizationJustCalculate ? "" : "&vehicle_cost="),
  					(CORV.noCostOptimizationJustCalculate ? "" : CORV.costPerHour),
  					"&currency=",
  					CORV.currency,
  					"&departure=",
  					// isDTFilteringEnabled ? `${CORV.dateNow}T${CORV.time}`: '',
  					isDTFilteringEnabled ? `${CORV.dateNow.replace(' ', 'T')}`: '',
  					vspec,
  					"&mode=fastest;" + transportMode + ";traffic:disabled",
  					"&rollup=none,country;tollsys",
  					(routeAlternativesRequested ? "&alternatives=" + CORV.routeAlternatives : ''),
  					"&apiKey=",
  					config.apikey,
  					// Additional custom parameters
  					(finalParamsValue !== '' ? '&' + finalParamsValue : ''),
  			    ].join("");
  					createMarkup(CORV.strRoutingRequestSend)
            // console.log(urlRoutingReq)
  			// feedbackTxt.innerHTML = strRoutingRequestSend;
  			// window.script = document.createElement("script");
  			// window.script.src = urlRoutingReq;
  			// document.body.appendChild(window.script);
        parseRoutingResponse(urlRoutingReq)
  		}

  		/************************************
  		parse the routing response
  		************************************/
  		async function  parseRoutingResponse(response) {
        
        let data = await axios.get(response);
      let resp = data.data;
  			if (resp.error != undefined) {
  				if (resp.error == "NoRouteFound") {
  					alert('Пожалуйста, подумайте о том, чтобы изменить свой старт или пункт назначения, так как тот, который вы ввели, недоступен с данным профилем транспортного средства');
  					// feedbackTxt.innerHTML = 'The Router service is unable to compute the route: try to change your start / destination point';
  					createMarkup('Служба маршрутизатора не может вычислить маршрут: попробуйте изменить начальную / конечную точку');
  				}
  				else {
  					alert(resp.error);
  					createMarkup(resp.error)
  					// feedbackTxt.innerHTML = resp.error;
  				}
  				return;
  			}
  			if (resp.response == undefined && resp.subtype != undefined) {
  				if (resp.subtype == "NoRouteFound") {
  					alert('Пожалуйста, подумайте о том, чтобы изменить свой старт или пункт назначения, так как тот, который вы ввели, недоступен с данным профилем транспортного средства');
  					// feedbackTxt.innerHTML = 'The Router service is unable to compute the route: try to change your start / destination point';
  					createMarkup('Служба маршрутизатора не может вычислить маршрут: попробуйте изменить начальную / конечную точку')
  				}
  				else {
  					alert(resp.subtype + " " + resp.details);
  					createMarkup(resp.error)
  					// feedbackTxt.innerHTML = resp.error;
  				}
  				return;
  			}
  			if (resp.error != undefined) {
  				// feedbackTxt.innerHTML = resp.error;
  				createMarkup(resp.error)
  				return;
  			}
  			if (resp.responseCode != undefined) {
  				alert(resp.message);
  				// feedbackTxt.innerHTML = resp.message;
  				createMarkup(resp.message)
  				return;
  			}
  			if (resp.onError == true) {
  				for (var i = 0; i < resp.errors.length; i++) {
  					createMarkup(<font color='red'> {resp.errors} </font>)
  					// feedbackTxt.innerHTML = "<font color='red'>" + resp.errors + "</font>";
  					createMarkup(<br />)
  					// feedbackTxt.innerHTML += "<br />";
  				}
  				return;
  			}
  			if (CORV.bErrorHappened) {
  				return;
  			}

  			if (createMarkup() != CORV.strTceError) {
  				// feedbackTxt.innerHTML = strTceResponseReceived;
  				createMarkup(CORV.strTceResponseReceived)
  			}

  			CORV.routeLinkHashMap = new Object();

  			// create link objects
  			for (var r = 0; r < resp.response.route.length; r++) {
  				for (var m = 0; m < resp.response.route[r].leg[0].link.length; m++) {
  					// only add new link if it does not exist so far - so alternatives are not drawn multiple times
  					var linkId = (resp.response.route[r].leg[0].link[m].linkId.lastIndexOf("+", 0) === 0 ? resp.response.route[r].leg[0].link[m].linkId.substring(1) : resp.response.route[r].leg[0].link[m].linkId);
  					if (CORV.routeLinkHashMap[linkId] == null) {
  						var strip = new window.H.geo.LineString(),
  							shape = resp.response.route[r].leg[0].link[m].shape,
  							i,
  							l = shape.length;

  						for (i = 0; i < l; i += 2) {
  							strip.pushLatLngAlt(shape[i], shape[i + 1], 0);
  						}

  						var link = new window.H.map.Polyline(strip,
  							{
  								style: {
  									lineWidth: (CORV.routeStroke - (r + 1)), // alternatives get smaller line with
  									strokeColor: CORV.routeColor[r],
  									lineCap: 'butt'
  								}
  							});
  						link.setArrows({ color: "#F00F", width: 2, length: 3, frequency: 4 });
  						link.$linkId = resp.response.route[r].leg[0].link[m].linkId;
  						link.$remainTime = resp.response.route[r].leg[0].link[m].remainTime;
              // console.log(resp.response.route[r].leg[0].link[m])

  						//The router can send back links ids with "-" or "+" prefix: only "-" prefix is kept and stored in this HashMap, the "+" is removed
  						CORV.routeLinkHashMap[linkId] = link;

  						// add event listener to link
  						link.addEventListener("pointerdown", function (e) {
  							if (CORV.currentOpenBubble)
                window.UI.removeBubble(CORV.currentOpenBubble);
                console.log(e.target)
  							var html = `<div>
  								<p style="font-family:Arial,sans-serif; font-size:12px;">Точка нажатия:  ${e.target.$linkId} </p>
  								<p style="font-family:Arial,sans-serif; font-size:12px;">Оставшееся время:  ${e.target.$remainTime}  </p>
  								<p style="font-family:Arial,sans-serif; font-size:12px;">Скорость:  ${Math.floor(Math.random() * Math.floor(80))}  </p>
  				        </div>`;


  							var pos = window.map.screenToGeo(e.currentPointer.viewportX, e.currentPointer.viewportY);

  							CORV.currentOpenBubble = new window.H.ui.InfoBubble(pos, { content: html });
  							window.UI.addBubble(CORV.currentOpenBubble);
  						});

  						CORV.group.addObject(link);
  					}
  				}
  			}

  			window.map.addObject(CORV.group);

// РАСКОМЕНТИТь с нижними функциям
  			// // show TCE costs
  			showTceCost(resp.response.route[0].tollCost.costsByCountryAndTollSystem, resp.response.route[0].cost, resp.response.route[0].summary.distance / 1000.0, resp.response.route[0].summary.baseTime / 60 / 60.00, resp.response.route[0].summary.trafficTime / 60 / 60.00);

  			// /***********************************************
  			// Highlight Links
  			// ***********************************************/
  			for (var i = 0; i < resp.response.route.length; i++) {
  				// highlightRoute(resp.response.route[i].tollCost.routeTollItems, i);
  			}
  		}
const [HTMLTag, setHTMLTag] = useState([])
  		/**************************************************
  		show route toll cost response
  		**************************************************/
  		function showTceCost(costByCountryAndTollSystem, costs, length, basetime, traffictime) {
debugger
        var HTML = [];
  			// /***********************************************

  			// Publishing route total cost

  			// ***********************************************/

        HTML = [...HTML, <p style={{  fontWeight: 'bold',fontSize: '16px',
        padding: '2px'}} className={CORS.title}>Затраты на основной маршрут</p>];
		    if (!costs) {
  				createMarkup('None.');
  			} else {
          HTML = [...HTML, <p> Длина: { Math.floor(length * 100) / 100}км </p>];
          HTML = [...HTML, <p> Базовое время: { Math.floor(basetime * 100) / 100}ч или {Math.floor(basetime * 100*60) / 100}Мин </p>];
          HTML = [...HTML, <p> Время Движения: {Math.floor(traffictime * 100) / 100}ч или {Math.floor(traffictime * 100*60) / 100}Мин</p>];
          HTML = [...HTML, <p> Общая Стоимость: {costs.totalCost} {costs.currency} </p>];
          HTML = [...HTML, <p> Оплата водителя: {costs.details.driverCost} {costs.currency}  </p>];
          HTML = [...HTML, <p> Стоимость ТС: {costs.details.vehicleCost} {costs.currency} </p>];
          HTML = [...HTML, <p> Стоимость Проезда: {costs.details.tollCost} {costs.currency} </p>];
  				// createMarkup("<br/><br/>Length: " + length + " km<br/>");
  				// createMarkup("BaseTime: " + basetime + " h<br/>");
  				// createMarkup("TrafficTime: " + traffictime + " h<br/>");

  				// createMarkup("Total Cost: " + costs.totalCost + " " + costs.currency + "<br/>");
  				// createMarkup("Driver Cost: " + costs.details.driverCost + " " + costs.currency + "<br/>");
  				// createMarkup("Vehicle Cost: " + costs.details.vehicleCost + " " + costs.currency + "<br/>");
  				// createMarkup("Toll Cost: " + costs.details.tollCost + " " + costs.currency + "<br/>");
  			}

  // 			/***********************************************

  // 			Publishing route detail cost

  // 			***********************************************/
  HTML = [...HTML, <p style={{  fontWeight: 'bold',fontSize: '16px',
    padding: '2px'}} className={CORS.title}>Стоимость проезда по основному маршруту </p>];
    debugger
  			if (costs.details.tollCost == 0.0) {
          HTML = [...HTML, <p>None.</p>];
  			}
   
  // 			/***********************************************
  // 			Apply toll to link objects
  // 			***********************************************/
  			if (costByCountryAndTollSystem != null) {
  				var feedback = [];
  				// feedback += "<br/>";
  				for (var j = 0; j < costByCountryAndTollSystem.length; j++) {
            feedback = [...feedback, <p className={CORS.title}> {costByCountryAndTollSystem[j].country} </p>];
  					// feedback += <p className={CORS.title}> {costByCountryAndTollSystem[j].country} </p>;
  					// feedback += "<ul><li>";
  					if (costByCountryAndTollSystem[j].name != null && costByCountryAndTollSystem[j].name.trim().length > 0) {
  						// feedback += <p>Платная система {costByCountryAndTollSystem[j].name} : </p>;
              feedback = [...feedback, <p>Платная система {costByCountryAndTollSystem[j].name} : </p>];
  					} else if (costByCountryAndTollSystem[j].tollSystemId != null && costByCountryAndTollSystem[j].tollSystemId.trim().length > 0) {
  						// feedback += <p>Идентификатор Платной системы {costByCountryAndTollSystem[j].tollSystemId}:</p>;
              feedback = [...feedback, <p>Идентификатор Платной системы {costByCountryAndTollSystem[j].tollSystemId} : </p>];
            } else {
              feedback = [...feedback, <p>Пошлина : </p>];
  						// feedback += <p>Пошлина : </p>;
  					}
            feedback = [...feedback, <p>{costByCountryAndTollSystem[j].amountInTargetCurrency} {costs.currency}; </p>];
  					// feedback += costByCountryAndTollSystem[j].amountInTargetCurrency + " " + costs.currency;
  					// feedback += "</li></ul>";
  				}
          HTML = [...HTML, feedback];
  			}
       
  			if (costs.details.tollCost != 0.0) {        
  				HTML = [...HTML, <p style={{fontWeight: 'normal', color: rgb2hex(CORV.ppType_A_Color[0])}}> Точка оплаты Типа А: платный проезд по всей стране оплачивается здесь.</p>];
  				HTML = [...HTML, <p style={{fontWeight: 'normal',color:  rgb2hex(CORV.ppType_a_Color[0])}}  > Точка оплаты Типа А: платный проезд по всей стране оплачивается где - то в другом месте.</p>];
  				HTML = [...HTML, <p style={{fontWeight: 'normal',color:  rgb2hex(CORV.ppType_S_Color[0])}} > Типы точек оплаты: Платный участок от одной платной будки или между двумя платными будками.</p>];
  				HTML = [...HTML, <p style={{fontWeight: 'normal',color:  rgb2hex(CORV.ppType_p_Color[0])}}  > Тип точки оплаты p: Платный проезд оплачивается где - то в другом месте.</p>];
  				HTML = [...HTML, <p style={{fontWeight: 'normal',color:  rgb2hex(CORV.ppType_F_Color[0])}}  > Тип точки оплаты F: Платная секция, принадлежащая платной системе.</p>];
  				HTML = [...HTML, <p style={{fontWeight: 'normal',color:  rgb2hex(CORV.ppType_K_Color[0])}}  > Тип точки оплаты K: Платный участок, определенный между перекрестками.</p>];
  				HTML = [...HTML, <p style={{fontWeight: 'normal',color:  rgb2hex(CORV.ppType_U_Color[0])}}  > Ссылка (ссылки) на обязательную плату за использование.(UFR)</p>];
        	}
          // createMarkup('ыыы ')
          setHTMLTag(HTML);
  			return; // done

  		}

  // 		/**
  // 			Highlights the toll links in map display
  // Выделяет платные ссылки на дисплее карты
  // 		*/
  		// function highlightRoute(routeTollItems, routeAlternative) {
  		// 	if (routeTollItems != null) {
  		// 		for (var i = 0; i < routeTollItems.length; i++) {
  		// 			var tollType = routeTollItems[i].tollType;
  		// 			var color = CORV.ppType_S_Color[routeAlternative];
  		// 			if (tollType == 'A') {
  		// 				color = CORV.ppType_A_Color[routeAlternative];
  		// 			} else if (tollType == 'a') {
  		// 				color = CORV.ppType_a_Color[routeAlternative];
  		// 			} else if (tollType == 'S') {
  		// 				color = CORV.ppType_S_Color[routeAlternative];
  		// 			} else if (tollType == 'p') {
  		// 				color = CORV.ppType_p_Color[routeAlternative];
  		// 			} else if (tollType == 'F') {
  		// 				color = CORV.ppType_F_Color[routeAlternative];
  		// 			} else if (tollType == 'K') {
  		// 				color = CORV.ppType_K_Color[routeAlternative];
  		// 			} else if (tollType == 'U') {
  		// 				color = CORV.ppType_U_Color[routeAlternative];
  		// 			}

  		// 			for (var j = 0; j < routeTollItems[i].linkIds.length; j++) {
  		// 				// set color and stroke of links
  		// 				var tollstroke = (CORV.tollCostStroke - (routeAlternative + 1));	// route alternatives have a different stroke
  		// 				var link = CORV.routeLinkHashMap[routeTollItems[i].linkIds[j]];
  		// 				if (link.getStyle().strokeColor == routeColor[routeAlternative]) { // only change link color to toll color if not already modified
  		// 					link.setStyle({ strokeColor: color, lineWidth: tollstroke });
  		// 				}
  		// 			}

  		// 			//toll structures
  		// 			if (routeTollItems[i].tollStructures != null) {
  		// 				for (var j = 0; j < routeTollItems[i].tollStructures.length; j++) {
  		// 					createTollMarker(routeTollItems[i].tollStructures[j]);
  		// 				}
  		// 			}
  		// 		}
  		// 	}

  		// }

 


  		// Helper for selecting the value attached to a JS selection
  		// function selectionSettingHelper(selection, value) {
  		// 	for (var opt, j = 0; opt = selection.options[j]; j++) {
  		// 		if (opt.value == value) {
  		// 			selection.selectedIndex = j;
  		// 			break;
  		// 		}
  		// 	}
  		// }

  // 		/*********************************
  // 		 Vehicle Specification
  // 		 *********************************/
  // 		/**
  // 		 This method checks the user setted vehicle specification and adapts all vehicle value in the GUI
  // 		 */

  // 		var totalNumTires = nrOfTotalTires;
  // 		var trailerNum = trailerNr;
  // 		var trailerNumAxles = nrOfAxlesVehicle;
  // 		var trailerNumAxles = nrOfAxlesTrailer;
  // 		var vehicleHeight = vehHeight;
  // 		var vehicleWeight = vehWeight;
  // 		var numPassengers = nrPassengers;
  // 		var vehSpecSelection = predefinedVehSpec;
  function handleVehicleSpecChanged() {
    setUserdefinedVehicleSpec(false);

    handleChange("vehicles", "2");
    handleChange("nrOfTotalTires", "4");
    handleChange("trailerType", "0");
    handleChange("trailerNr", "0");
    handleChange("nrOfAxlesVehicle", "2");
    handleChange("nrOfAxlesTrailer", "0");
    handleChange("hybrid", "0");
    handleChange("emissionType", "5");
    handleChange("vehHeight", "167");
    handleChange("vehWeight", "1739");
    handleChange("trailerHeight", "0");
    handleChange("totalWeight", "1739");
    handleChange("totalWidth", "180");
    handleChange("totalLength", "441");
    handleChange("disabledEquipped", "0");
    handleChange("minPollution", "0");
    handleChange("hov", "0");
    handleChange("nrPassengers", "2");
    handleChange("commercial", "0");
    handleChange("hazardousType", "0");
    handleChange("fuelType", "petrol");
    handleChange("heightAbove1stAxle", "100");

    // var vehSpecSelection = document.getElementById("predefinedVehSpec");
    if (CORV.predefinedVehSpec == 0) {
      // Car
      handleChange("vehicles", "2");
      handleChange("nrOfTotalTires", "4");
      handleChange("trailerType", "0");
      handleChange("trailerNr", "0");
      handleChange("nrOfAxlesVehicle", "2"); 
      handleChange("nrOfAxlesTrailer", "0");
      handleChange("hybrid", "0");
      handleChange("emissionType", "5");
      handleChange("vehHeight", "167");
      handleChange("vehWeight", "1739");
      handleChange("trailerHeight", "0");
      handleChange("totalWeight", "1739");
      handleChange("totalWidth", "180");
      handleChange("totalLength", "441");
      handleChange("disabledEquipped", "0");
      handleChange("minPollution", "0");
      handleChange("hov", "0");
      handleChange("nrPassengers", "2");
      handleChange("commercial", "0");
      handleChange("hazardousType", "0");
      handleChange("fuelType", "diesel");
      handleChange("heightAbove1stAxle", "100");
    } else if (CORV.predefinedVehSpec == 1) {
      // Transporter
      handleChange("vehicles", "2");
      handleChange("nrOfTotalTires", "4");
      handleChange("trailerType", "0");
      handleChange("trailerNr", "0");
      handleChange("nrOfAxlesVehicle", "2");
      handleChange("nrOfAxlesTrailer", "0");
      handleChange("hybrid", "0");
      handleChange("emissionType", "5");
      handleChange("vehHeight", "255");
      handleChange("vehWeight", "3500");
      handleChange("trailerHeight", "0");
      handleChange("totalWeight", "3500");
      handleChange("totalWidth", "1194");
      handleChange("totalLength", "652");
      handleChange("disabledEquipped", "0");
      handleChange("minPollution", "0");
      handleChange("hov", "0");
      handleChange("nrPassengers", "1");
      handleChange("commercial", "1");
      handleChange("hazardousType", "0");
      handleChange("fuelType", "diesel");
      handleChange("heightAbove1stAxle", "130");
    } else if (CORV.predefinedVehSpec == 2) {
      // Truck 7.5t
      handleChange("vehicles", "3");
      handleChange("nrOfTotalTires", "4");
      handleChange("trailerType", "0");
      handleChange("trailerNr", "0");
      handleChange("nrOfAxlesVehicle", "2");
      handleChange("nrOfAxlesTrailer", "0");
      handleChange("hybrid", "0");
      handleChange("emissionType", "5");
      handleChange("vehHeight", "340");
      handleChange("vehWeight", "7500");
      handleChange("trailerHeight", "0");
      handleChange("totalWeight", "7500");
      handleChange("totalWidth", "250");
      handleChange("totalLength", "720");
      handleChange("disabledEquipped", "0");
      handleChange("minPollution", "0");
      handleChange("hov", "0");
      handleChange("nrPassengers", "1");
      handleChange("commercial", "1");
      handleChange("hazardousType", "0");
      handleChange("fuelType", "diesel");
      handleChange("heightAbove1stAxle", "300");
    } else if (CORV.predefinedVehSpec == 3) {
      // Truck 11t
      handleChange("vehicles", "3");
      handleChange("nrOfTotalTires", "6");
      handleChange("trailerType", "0");
      handleChange("trailerNr", "0");
      handleChange("nrOfAxlesVehicle", "2");
      handleChange("nrOfAxlesTrailer", "0");
      handleChange("hybrid", "0");
      handleChange("emissionType", "5");
      handleChange("vehHeight", "380");
      handleChange("vehWeight", "11000");
      handleChange("trailerHeight", "0");
      handleChange("totalWeight", "11000");
      handleChange("totalWidth", "255");
      handleChange("totalLength", "1000");
      handleChange("disabledEquipped", "0");
      handleChange("minPollution", "0");
      handleChange("hov", "0");
      handleChange("nrPassengers", "1");
      handleChange("commercial", "1");
      handleChange("hazardousType", "0");
      handleChange("fuelType", "diesel");
      handleChange("heightAbove1stAxle", "300");
    } else if (CORV.predefinedVehSpec == 4) {
      // Truck one trailer 38t
      handleChange("vehicles", "3");
      handleChange("nrOfTotalTires", "10");
      handleChange("trailerType", "2");
      handleChange("trailerNr", "1");
      handleChange("nrOfAxlesVehicle", "2");
      handleChange("nrOfAxlesTrailer", "3");
      handleChange("hybrid", "0");
      handleChange("emissionType", "5");
      handleChange("vehHeight", "400");
      handleChange("vehWeight", "24000");
      handleChange("trailerHeight", "400");
      handleChange("totalWeight", "38000");
      handleChange("totalWidth", "255");
      handleChange("totalLength", "1800");
      handleChange("disabledEquipped", "0");
      handleChange("minPollution", "0");
      handleChange("hov", "0");
      handleChange("nrPassengers", "1");
      handleChange("commercial", "1");
      handleChange("hazardousType", "0");
      handleChange("fuelType", "diesel");
      handleChange("heightAbove1stAxle", "300");
    } else if (CORV.predefinedVehSpec == 5) {
      // Trailer Truck 40t
      handleChange("vehicles", "3");
      handleChange("nrOfTotalTires", "14");
      handleChange("trailerType", "2");
      handleChange("trailerNr", "1");
      handleChange("nrOfAxlesVehicle", "3");
      handleChange("nrOfAxlesTrailer", "2");
      handleChange("hybrid", "0");
      handleChange("emissionType", "5");
      handleChange("vehHeight", "400");
      handleChange("vehWeight", "12000");
      handleChange("trailerHeight", "400");
      handleChange("totalWeight", "40000");
      handleChange("totalWidth", "255");
      handleChange("totalLength", "1650");
      handleChange("disabledEquipped", "0");
      handleChange("minPollution", "0");
      handleChange("hov", "0");
      handleChange("nrPassengers", "1");
      handleChange("commercial", "1");
      handleChange("hazardousType", "0");
      handleChange("fuelType", "diesel");
      handleChange("heightAbove1stAxle", "300");
    } else if (CORV.predefinedVehSpec == 6) {
      // Car with Trailer
      handleChange("vehicles", "3");
      handleChange("nrOfTotalTires", "6");
      handleChange("trailerType", "2");
      handleChange("trailerNr", "1");
      handleChange("nrOfAxlesVehicle", "2");
      handleChange("nrOfAxlesTrailer", "1");
      handleChange("hybrid", "0");
      handleChange("emissionType", "5");
      handleChange("vehHeight", "167");
      handleChange("vehWeight", "1739");
      handleChange("trailerHeight", "167");
      handleChange("totalWeight", "2589");
      handleChange("totalWidth", "180");
      handleChange("totalLength", "733");
      handleChange("disabledEquipped", "0");
      handleChange("minPollution", "0");
      handleChange("hov", "0");
      handleChange("nrPassengers", "1");
      handleChange("commercial", "0");
      handleChange("hazardousType", "0");
      handleChange("fuelType", "diesel");
      handleChange("heightAbove1stAxle", "100");
    } else if (CORV.predefinedVehSpec == 7) {
      // Bus
      handleChange("vehicles", "3");
      handleChange("nrOfTotalTires", "6");
      handleChange("trailerType", "0");
      handleChange("trailerNr", "0");
      handleChange("nrOfAxlesVehicle", "3");
      handleChange("nrOfAxlesTrailer", "0");
      handleChange("hybrid", "0");
      handleChange("emissionType", "5");
      handleChange("vehHeight", "371");
      handleChange("vehWeight", "17500");
      handleChange("trailerHeight", "0");
      handleChange("totalWeight", "17500");
      handleChange("totalWidth", "253");
      handleChange("totalLength", "1300");
      handleChange("disabledEquipped", "0");
      handleChange("minPollution", "0");
      handleChange("hov", "0");
      handleChange("nrPassengers", "51");
      handleChange("commercial", "1");
      handleChange("hazardousType", "0");
      handleChange("fuelType", "diesel");
      handleChange("heightAbove1stAxle", "300");
    } else if (CORV.predefinedVehSpec == 8) {
      // Motor Home
      handleChange("vehicles", "3");
      handleChange("nrOfTotalTires", "4");
      handleChange("trailerType", "0");
      handleChange("trailerNr", "0");
      handleChange("nrOfAxlesVehicle", "2");
      handleChange("nrOfAxlesTrailer", "0");
      handleChange("hybrid", "0");
      handleChange("emissionType", "5");
      handleChange("vehHeight", "372");
      handleChange("vehWeight", "4535");
      handleChange("trailerHeight", "0");
      handleChange("totalWeight", "4535");
      handleChange("totalWidth", "254");
      handleChange("totalLength", "760");
      handleChange("disabledEquipped", "0");
      handleChange("minPollution", "0");
      handleChange("hov", "0");
      handleChange("nrPassengers", "4");
      handleChange("commercial", "0");
      handleChange("hazardousType", "0");
      handleChange("fuelType", "diesel");
      handleChange("heightAbove1stAxle", "140");
    }
  }

  // 		/**
  // 		 This method sets the user defined vehicle spec option in the element predefinedVehSpec if
  // 		 the passed parameter is true
  // 		 */
  function setUserdefinedVehicleSpec(bSetUserdefinedVehicleSpec) {
    if (bSetUserdefinedVehicleSpec) {
      // show User defined option
      handleChange("predefinedVehSpec", "99");
    }
    else
  			 {
  			 // do nothing cause User defined option will hide automatically
  			 }
  }

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
  		function rgb2hex(rgb) {
  			rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  			return (rgb && rgb.length === 4) ? "#" +
  				("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
  				("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
  				("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
  		}

  		// Check if a string is null/undefined/withoutContent
  		function isEmpty(str) {
  			return (!str || 0 === str.length);
  		}

  // 		/**
  // 		 * Function handling the click on the "Enable datetime filtering" checkbox
  // 		 */
  		// function handleDateTimeFilteringClicked() {
      //   setisDTFilteringEnabled(!isDTFilteringEnabled)
  		// 	// var isDTFilteringEnabled = document.getElementById("chkEnableDTFiltering").checked;
  		// 	// if (isDTFilteringEnabled) {
  		// 	// 	//Displaying the date and time input checkboxes
  		// 	// 	// document.getElementById("trStartRouteDate").style.display = '';
  		// 	// 	// document.getElementById("trStartRouteTime").style.display = '';
  		// 	// 	// document.getElementById("trStartRouteActions").style.display = '';
  		// 	// }
  		// 	// else {
  		// 	// 	//Hiding the date and time input checkboxes
  		// 	// 	// document.getElementById("trStartRouteDate").style.display = 'none';
  		// 	// 	// document.getElementById("trStartRouteTime").style.display = 'none';
  		// 	// 	// document.getElementById("trStartRouteActions").style.display = 'none';
  		// 	// }

  		// }

  // 		/**
  // 			Function handling the click on the "enable/disable cost optimized routing calculation" checkbox
  // 		*/

  function handleEnableCalculateOptimizedRouteClicked() {
    if (isDChecked) {
      setisDChecked(!isDChecked);
      handleChange("noCostOptimizationJustCalculate", false);
      handleChange("routeButton", "Высчитать оптимальную стоимость маршрута");
    } else {
      setisDChecked(!isDChecked);
      handleChange("noCostOptimizationJustCalculate", true);
      handleChange("routeButton", "Рассчитать маршрут без оптимизации");
    }
  }

 


  // const applyNowToStartRoute = () => {
  //   //Getting now datetime informations
  //   var now = new Date();
  //   var day = now.getDate();
  //   var month = now.getMonth() + 1; //January is 0!
  //   var year = now.getFullYear();
  //   var hours = now.getHours();
  //   var minutes = now.getMinutes();
  //   var seconds = now.getSeconds();
  //   //Setting these info in the datetime fields
  //   handleChange(
  //     "dateNow",
  //     year +
  //       "-" +
  //       (month < 10 ? "0" + month : month) +
  //       "-" +
  //       (day < 10 ? "0" + day : day)
  //   );
  //   handleChange(
  //     "time",
  //     (hours < 10 ? "0" + hours : hours) +
  //       ":" +
  //       (minutes < 10 ? "0" + minutes : minutes) +
  //       ":" +
  //       (seconds < 10 ? "0" + seconds : seconds)
  //   );
  // };


  return (
    <>
      <div id="content-real">
        <div className="ctrl-panel">
          <span
            id="toggle-ctrl-panel"
            className="glyphicon glyphicon-menu-left"
          ></span>

          <p id="mapReleaseTxt">
            {" "}
            Оптимизированный по стоимости маршрут извлекается из Службы
            расширения платы за проезд и отображается на экране.
          </p>
          <p>
            Начало и пункт назначения могут быть геокодированы или выбраны с
            помощью длинного клика на карте.
          </p>

          <hr className="separator" />

          <div className="form-horizontal">
            <div className="form-group">
              <label className="control-label col-sm-3" htmlFor="start">
                Старт:
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  id="start"
                  className="form-control input-wide"
                  value={CORV.startValue}
                  onKeyDown={(event) =>
                    event.keyCode == 13 ? startRouteCalculation() : null
                  }
                  onChange={(event) =>
                    handleChange("startValue", event.target.value)
                  }
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-3" htmlFor="dest">
                Место назначения:
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  id="dest"
                  className="form-control input-wide"
                  size="40"
                  value={CORV.DestinationValue}
                  onKeyDown={(event) =>
                    event.keyCode == 13 ? startRouteCalculation() : null
                  }
                  onChange={(event) =>
                    handleChange("DestinationValue", event.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <Collapse onChange={() => {setisDTFilteringEnabled(!trisDTFilteringEnabled)}}>
            <Panel header="Включить фильтрацию даты и времени" key="1">
   
            <label
                    className="control-label col-sm-4"
                    htmlFor="startRouteDate"
                  >
                    Дата начала маршрута:
                  </label>
                  <Space direction="vertical" size={12}>
                  <DatePicker
                  allowClear={true}
                  showToday= {true}
                  showTime={true}
                    format="YYYY-MM-DD HH:mm:ss"
                    
                    // showToday={{ defaultValue: '00:00:00' }}
                    // showTime={{ defaultValue: '00:00:00' }}
                    // onChange={(d,m) => console.log(d, m)}
                    onChange={(d,e) => handleChange("dateNow", e)}
                    // onOk={()=> console.log(CORV.dateNow)}
                  />
                    </Space>
              {/* <div id="trStartRouteDate" className="form-horizontal">
                <div className="form-group">

                  <div className="col-sm-8">
                    <input
                      onChange={(e) => handleChange("dateNow", e.target.value)}
                      value={CORV.dateNow}
                      type="text"
                      id="startRouteDate"
                      className="form-control input-wide"
                      name="startRouteDate"
                    />
                    (гггг-ММ-дд)
                  </div>
                </div>
              </div>
              <div id="trStartRouteTime" className="form-horizontal">
                
                <div className="form-group">
                  <label
                    className="control-label col-sm-4"
                    htmlFor="startRouteTime"
                  >
                    Route start time:
                  </label>
                  <div className="col-sm-8">
                  
                    <input
                      onChange={(e) => handleChange("time", e.target.value)}
                      value={CORV.time}
                      type="text"
                      id="startRouteTime"
                      className="form-control input-wide"
                      name="startRouteTime"
                    />
                    (ЧЧ:мм:сс)
                  </div>
                </div>
              </div>
              <div id="trStartRouteActions">
                <div className="form-group">
                  <input
                    type="button"
                    className="btn btn-default btn-sm"
                    name="btStartRouteApplyNow"
                    value="Применить текущие время и дату"
                    onClick={() => applyNowToStartRoute()}
                  />
                </div>
              </div> */}
            </Panel>
          </Collapse>

          <hr className="separator" />
          <h5>Toll Cost Parameters</h5>

          <table border="0">
            <tbody>
              <tr>
                <td>Стоимость автомобиля за километр</td>
                <td>
                  <input
                    type="text"
                    id="hourVehicleCost"
                    className="form-control"
                    style={{ width: 85 }}
                    value={CORV.costPerHour}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(event) =>
                      handleChange("costPerHour", event.target.value)
                    }
                  />
                </td>
                <td>Стоимость водителя в час</td>
                <td>
                  <input
                    type="text"
                    id="hourDriverCost"
                    className="form-control"
                    style={{ width: 85 }}
                    value={CORV.costPerKm}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(event) =>
                      handleChange("costPerKm", event.target.value)
                    }
                  />
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Валюта</td>
                <td>
                  <input
                    type="text"
                    id="currency"
                    className="form-control"
                    style={{ width: 85 }}
                    value={CORV.currency}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(event) =>
                      handleChange("currency", event.target.value)
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <hr className="separator" />
          <h5>Параметра маршрута</h5>

          <table border="0" className="form-group">
            <tbody>
              <tr>
                <td>Альтернативные маршруты:</td>
                <td colSpan="3">
                  <select
                    id="routeAlternatives"
                    className="form-control"
                    style={{ width: 312 }}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    value={CORV.routeAlternatives}
                    onChange={(value) =>
                      handleChange("routeAlternatives", value.target.value)
                    }
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Спецификация транспортного средства:</td>
                <td colSpan="3">
                  <select
                    id="predefinedVehSpec"
                    className="form-control"
                    style={{ width: 312 }}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    // onChange={()=>handleVehicleSpecChanged()}
                    value={CORV.predefinedVehSpec}
                    onClick={() => handleVehicleSpecChanged()}
                    onChange={(value) => {
                      handleChange("predefinedVehSpec", value.target.value);
                    }}
                  >
                    <option value="0">Машина</option>
                    <option value="1">Перевозчик</option>
                    <option value="2">Грузовик (7.5Т)</option>
                    <option value="3">Грузовик (11Т)</option>
                    <option value="4">Грузовик с одним прицепом (38Т)</option>
                    <option value="5">Грузовик с прицепом (40Т)</option>
                    <option value="6">Автомобиль с прицепом</option>
                    {/* <!--option value="7">Bus</option>
					<option value="8">Motor Home</option--> */}
                    <option value="99" disabled style={{ display: "none" }}>
                      Определяемый пользователем
                    </option>
                  </select>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Пользовательские Параметры:</td>

                <td colSpan="2">
                  <input
                    type="text"
                    id="routerParamsValueState"
                    className="form-control"
                    style={{ width: 212 }}
                    value={CORV.routerParamsValueState}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    // onChange={(event)=>{  setrouterParamsValue(event.target.value)}}
                    onChange={(event) => {
                      handleChange(
                        "routerParamsValueState",
                        event.target.value
                      );
                    }}
                    // onChange="document.getElementById('routerParams').selectedIndex = 2;document.getElementById('routerParams').value=this.value;"
                  />
                </td>

                <td>
                  <select
                    id="routerParams"
                    className="form-control"
                    style={{ width: 89 }}
                    value={CORV.routerParamsState}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(event) =>
                      handleChange("routerParamsState", event.target.value)
                    }
                    // onChange="document.getElementById('routerParamsValue').value=this.value;"
                  >
                    <option value=" ">Пустой</option>
                    <option value="verbosemode=0&metricsystem=metric&maneuverAttributes=none&mode=shortest;car&jsonattributes=41&combinechange=true&linkAttributes=none,sh&legAttributes=none,li&language=en-us&alternatives=3">
                      Управляемый
                    </option>
                    <option value="param1=value1&param2=value2">
                      Пользовательские
                    </option>
                  </select>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Транспортное средство</td>
                <td>
                  <select
                    id="vehicles"
                    className="form-control"
                    style={{ width: 89 }}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(value) => {
                      setUserdefinedVehicleSpec(true);
                      handleChange("vehicles", value.target.value);
                    }}
                    value={CORV.vehicles}
                  >
                    {/* <!--option value="1">Motorcycle</option--> */}
                    <option value="2">Машина</option>
                    <option value="3">Грузовик</option>
                  </select>
                </td>
                <td>Общее Количество Шин</td>
                <td>
                  <input
                    type="text"
                    id="nrOfTotalTires"
                    className="form-control"
                    style={{ width: 85 }}
                    value={CORV.nrOfTotalTires}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(event) => {
                      setUserdefinedVehicleSpec(true);
                      handleChange("nrOfTotalTires", event.target.value);
                    }}
                  />
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Тип прицепа</td>
                <td>
                  <select
                    id="trailerType"
                    className="form-control"
                    style={{ width: 89 }}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(value) => {
                      setUserdefinedVehicleSpec(true);
                      handleChange("trailerType", value.target.value);
                    }}
                    value={CORV.trailerType}
                  >
                    <option value="0">Нет</option>
                    <option value="1">Караван</option>
                    <option value="2">Прицеп</option>
                  </select>
                </td>
                <td>Количество прицепов</td>
                <td>
                  <select
                    id="trailerNr"
                    className="form-control"
                    style={{ width: 89 }}
                    value={CORV.trailerNr}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(event) => {
                      setUserdefinedVehicleSpec(true);
                      handleChange("trailerNr", event.target.value);
                    }}
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3 или больше</option>
                  </select>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Количество Осей Транспортного Средства</td>
                <td>
                  <input
                    type="text"
                    id="nrOfAxlesVehicle"
                    className="form-control"
                    style={{ width: 85 }}
                    value={CORV.nrOfAxlesVehicle}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(event) => {
                      setUserdefinedVehicleSpec(true);
                      handleChange("nrOfAxlesVehicle", event.target.value);
                    }}
                  />
                </td>
                <td>Количество Осей Прицепа</td>
                <td>
                  <input
                    type="text"
                    id="nrOfAxlesTrailer"
                    className="form-control"
                    style={{ width: 85 }}
                    value={CORV.nrOfAxlesTrailer}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(event) => {
                      setUserdefinedVehicleSpec(true);
                      handleChange("nrOfAxlesTrailer", event.target.value);
                    }}
                  />
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Гибридный</td>
                <td>
                  <select
                    id="hybrid"
                    className="form-control"
                    style={{ width: 89 }}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(value) => {
                      setUserdefinedVehicleSpec(true);
                      handleChange("hybrid", value.target.value);
                    }}
                    value={CORV.hybrid}
                  >
                    <option value="0">Да</option>
                    <option value="1">Нет</option>
                  </select>
                </td>
                <td>Тип эмиссии</td>
                <td>
                  <select
                    id="emissionType"
                    className="form-control"
                    style={{ width: 89 }}
                    value={CORV.emissionType}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(event) => {
                      setUserdefinedVehicleSpec(true);
                      handleChange("emissionType", event.target.value);
                    }}
                  >
                    <option value="1">EURO I</option>
                    <option value="2">EURO II</option>
                    <option value="3">EURO III</option>
                    <option value="4">EURO IV</option>
                    <option value="5">EURO V</option>
                    <option value="6">EURO VI</option>
                    <option value="7">EURO EEV</option>
                    <option value="8">Электромобиль</option>
                  </select>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Высота транспортного средства</td>
                <td>
                  <input
                    type="text"
                    id="vehHeight"
                    className="form-control"
                    style={{ width: 85 }}
                    value={CORV.vehHeight}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(event) => {
                      setUserdefinedVehicleSpec(true);
                      handleChange("vehHeight", event.target.value);
                    }}
                  />
                </td>
                <td>Высота прицепа</td>
                <td>
                  <input
                    type="text"
                    id="trailerHeight"
                    className="form-control"
                    style={{ width: 85 }}
                    value={CORV.trailerHeight}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(event) => {
                      setUserdefinedVehicleSpec(true);
                      handleChange("trailerHeight", event.target.value);
                    }}
                  />
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Масса транспортного средства</td>
                <td>
                  <input
                    type="text"
                    id="vehWeight"
                    className="form-control"
                    style={{ width: 85 }}
                    value={CORV.vehWeight}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(event) => {
                      setUserdefinedVehicleSpec(true);
                      handleChange("vehWeight", event.target.value);
                    }}
                  />
                </td>
                <td>Общий Вес</td>
                <td>
                  <input
                    type="text"
                    id="totalWeight"
                    className="form-control"
                    style={{ width: 85 }}
                    value={CORV.totalWeight}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(event) => {
                      setUserdefinedVehicleSpec(true);
                      handleChange("totalWeight", event.target.value);
                    }}
                  />
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Общая Ширина</td>
                <td>
                  <input
                    type="text"
                    id="totalWidth"
                    className="form-control"
                    style={{ width: 85 }}
                    value={CORV.totalWidth}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(event) => {
                      setUserdefinedVehicleSpec(true);
                      handleChange("totalWidth", event.target.value);
                    }}
                  />
                </td>
                <td>Общая Длина</td>
                <td>
                  <input
                    type="text"
                    id="totalLength"
                    className="form-control"
                    style={{ width: 85 }}
                    value={CORV.totalLength}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(event) => {
                      setUserdefinedVehicleSpec(true);
                      handleChange("totalLength", event.target.value);
                    }}
                  />
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Инвалиды Оборудованы</td>
                <td>
                  <select
                    id="disabledEquipped"
                    className="form-control"
                    style={{ width: 89 }}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(value) => {
                      setUserdefinedVehicleSpec(true);
                      handleChange("disabledEquipped", value.target.value);
                    }}
                    value={CORV.disabledEquipped}
                  >
                    <option value="0">Нет</option>
                    <option value="1">Да</option>
                  </select>
                </td>
                <td>Минимальное Загрязнение</td>
                <td>
                  <select
                    id="minPollution"
                    className="form-control"
                    style={{ width: 89 }}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(value) => {
                      setUserdefinedVehicleSpec(true);
                      handleChange("minPollution", value.target.value);
                    }}
                    value={CORV.minPollution}
                  >
                    <option value="0">Нет</option>
                    <option value="1">Дп</option>
                  </select>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>ХОВ</td>
                <td>
                  <select
                    id="hov"
                    className="form-control"
                    style={{ width: 89 }}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(value) => {
                      setUserdefinedVehicleSpec(true);
                      handleChange("hov", value.target.value);
                    }}
                    value={CORV.hov}
                  >
                    <option value="0">Нет</option>
                    <option value="1">Да</option>
                  </select>
                </td>
                <td>Количество пассажиров</td>
                <td>
                  <input
                    type="text"
                    id="nrPassengers"
                    className="form-control"
                    style={{ width: 85 }}
                    value={CORV.nrPassengers}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(event) => {
                      setUserdefinedVehicleSpec(true);
                      handleChange("nrPassengers", event.target.value);
                    }}
                  />
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Коммерческий</td>
                <td>
                  <select
                    id="commercial"
                    className="form-control"
                    style={{ width: 89 }}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(value) => {
                      setUserdefinedVehicleSpec(true);
                      handleChange("commercial", value.target.value);
                    }}
                    value={CORV.commercial}
                  >
                    <option value="0">Нет</option>
                    <option value="1">Да</option>
                  </select>
                </td>
                <td>Опасный Тип</td>
                <td>
                  <select
                    id="hazardousType"
                    className="form-control"
                    style={{ width: 89 }}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(value) => {
                      setUserdefinedVehicleSpec(true);
                      handleChange("hazardousType", value.target.value);
                    }}
                    value={CORV.hazardousType}
                  >
                    <option value="0">Нет</option>
                    <option value="1">Взрывчатый</option>
                    <option value="2">Любые Опасные Материалы</option>
                  </select>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Высота над 1-й осью</td>
                <td>
                  <input
                    type="text"
                    id="heightAbove1stAxle"
                    className="form-control"
                    style={{ width: 85 }}
                    value={CORV.heightAbove1stAxle}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(event) => {
                      setUserdefinedVehicleSpec(true);
                      handleChange("heightAbove1stAxle", event.target.value);
                    }}
                  />
                </td>
                <td>Тип бензина</td>
                <td>
                  <select
                    id="fuelType"
                    className="form-control"
                    style={{ width: 89 }}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(value) => {
                      setUserdefinedVehicleSpec(true);
                      handleChange("fuelType", value.target.value);
                    }}
                    value={CORV.fuelType}
                  >
                    <option value="petrol">Бензин</option>
                    <option value="diesel">Дизель</option>
                    <option value="lng">Газ</option>
                    <option value="lpg">ЛПГ</option>
                    <option value="cng">ЦНГ</option>
                    <option value="ethanol">Этанол</option>
                    <option value="propane">Пропан</option>
                    <option value="hydrogen">Водород</option>
                    <option value="electric">Электрический</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            Все параметры длины и веса должны быть в сантиметрах и килограммах.
          </p>
          <div className="form-group">
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  defaultChecked={isDChecked}
                  id="chkEnableCalculateOptimizedRoute"
                  name="chkEnableCalculateOptimizedRoute"
                  onClick={() => handleEnableCalculateOptimizedRouteClicked()}
                />
                Включение/Выключение оптимизированного маршрута расчет
              </label>
            </div>
          </div>
          <table border="0" className="form-group">
            <tbody>
              <tr>
                <td>
                  <input
                    type="submit"
                    id="routeButton"
                    className="btn btn-default btn-sm"
                    value={CORV.routeButton}
                    onClick={() => startRouteCalculation()}
                  />
                </td>
                <td>
                  <input
                    type="submit"
                    id="cloneButton"
                    className="btn btn-default btn-sm"
                    value="Открыть в новой вкладке"
                    onClick={() => cloneSettingsInNewWindow()}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table border="0">
            <tbody>
              <tr>
                <td>URL</td>
                <td>
                  <input
                    type="text"
                    id="serverURL"
                    className="form-control"
                    style={{ width: 380 }}
                    value={CORV.serverURL}
                    onKeyDown={(event) =>
                      event.keyCode == 13 ? startRouteCalculation() : null
                    }
                    onChange={(value) =>
                      handleChange("serverURL", value.target.value)
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          {/* <ResultCostOptimRoute createMarkup={createMarkup}/> */}
          {CORV.ResponseResult ?
           <ResultCostOptimRoute resp={CORV.ResponseResult} HTMLTag={HTMLTag}/>:
           'данных пока нет'  }
          {/* {CORV.ResponseResult ?
           HTMLTag:
           'данных пока нет'  } */}
        </div>
      </div>
    </>
  );
};

export default CostOptimRoute;
