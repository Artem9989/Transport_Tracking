import React, { useState,useRef,useEffect } from "react";
import { Collapse } from 'antd';
import ResultCostOptimRoute from './ResultOptimRoute/ResultOptimRoute.jsx';
import { config } from '../../../assets/config';
import svgMarkerImage_Line from '../InfoControl/LUI-icon-pd-information-solid-24.svg';

const { Panel } = Collapse;

export const createMarkup = (htmlValue) => {
	if (htmlValue === undefined)
	{
		return {__html: `Данных пока нет`}
	}
	else {
		return {__html: `${htmlValue}`};
	}
	
  }

const CostOptimRoute = (props) => {


    const [trStartRouteDate, settrStartRouteDate] = useState(false);
    const [dateNow, setDate] = useState('');
    const [time, setTime] = useState('');
    const [serverURL, setserverURL] = useState('https://fleet.ls.hereapi.com/2/calculateroute.json?');
	const [routeButton, setrouteButton] = useState("Высчитать оптимальную стоимость маршрута");
	// onKey
	const [startValue, setstartValue] = useState('am Kronberger Hang 8, Schwalbach');
	const [DestinationValue, setDestinationValue] = useState('Frankfurt am Main');
	const [costPerHour, setcostPerHour] = useState('50');
	const [costPerKm, setcostPerKm] = useState('300');
	const [currency, setCurrency] = useState('RUB');
	const [routerParamsState, setrouterParamsState] = useState(' ');
	const [routerParamsValueState, setrouterParamsValueState] = useState('');
	const [nrOfTotalTires, setnrOfTotalTires] = useState('4');
	const [nrOfAxlesVehicle, setnrOfAxlesVehicle] = useState('2');
	const [nrOfAxlesTrailer, setnrOfAxlesTrailer] = useState('0');
	const [vehHeight, setvehHeight] = useState('167');
	const [trailerHeight, settrailerHeight] = useState('0');
	const [vehWeight, setvehWeight] = useState('1739');
	const [totalWeight, settotalWeight] = useState('1739');
	const [totalLength, settotalLength] = useState('441');
	const [totalWidth, settotalWidth] = useState('180');
	const [nrPassengers, setnrPassengers] = useState('2');
	const [heightAbove1stAxle, setheightAbove1stAxle] = useState('100');
	const [trailerNr, settrailerNr] = useState('0');
	const [emissionType, setemissionType] = useState('5');
	const [routeAlternatives, setrouteAlternatives] = useState('1');
	const [predefinedVehSpec, setpredefinedVehSpec] = useState('0');
	const [vehicles, setvehicles] = useState('2');
	const [trailerType, settrailerType] = useState('0');
	const [hybrid, sethybrid] = useState('0');
	const [disabledEquipped, setdisabledEquipped] = useState('0');
	const [minPollution, setminPollution] = useState('0')
	const [hov, sethov] = useState('0');
	const [commercial, setcommercial] = useState('0')
	const [hazardousType, sethazardousType] = useState('0');
	const [fuelType, setfuelType] = useState("petrol");

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
				var url = window.location.protocol + '//' + window.location.host + window.location.pathname + '?';
				var inputs = document.getElementsByTagName('input');
				for (var i = 0; i < inputs.length; i++) {
					url += inputs[i].id + '=' + encodeURIComponent(inputs[i].value) + '&';
				}
				var inputs = document.getElementsByTagName('select');
				for (var i = 0; i < inputs.length; i++) {
					url += inputs[i].id + '=' + inputs[i].value + '&';
				}

				window.open(url);
			}

			const H = window.H

			var mapContainer = document.getElementById('map');

			// check if the site was loaded via secure connection
			// var secure = (window.location.protocol === 'https:') ? true : false;

			var platform = new H.service.Platform({
				apikey: config.apikey,
				// useHTTPS: secure
			});
			var maptypes = platform.createDefaultLayers();
			var geocoder = platform.getGeocodingService();
			var router = platform.getRoutingService();
			var group = new H.map.Group();
			var markerGroup = new H.map.Group();
			var map = new H.Map(mapContainer, maptypes.vector.normal.map,
				{
					center: { lat:54.00684227163969, lng: 56.00684227163969  },
					zoom: 6,
					pixelRatio: window.pixelRatio || 1,
					engineType: H.map.render.p2d,
					Localization: 'ru-RU',
					languages: 'RUS'
				}
			);

			// Do not draw under control panel
			// map.getViewPort().setPadding(0, 0, 0, ('.ctrl-panel').width());

			// add behavior control
			new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

			// add UI
			var ui = H.ui.UI.createDefault(map, maptypes);

			//add JS API Release information
			// releaseInfoTxt.innerHTML += "JS API: 3." + H.buildInfo().version;

			//add MRS Release information
			// loadMRSVersionTxt();

			//helper
			var releaseGeocoderShown = false;
			var releaseRoutingShown = false;


			// add window resizing event listener
			window.addEventListener('resize', function () {
				map.getViewPort().resize();
			});

			// add long click in map event listener
			map.addEventListener('longpress', handleLongClickInMap);

			// var routeButton = document.getElementById("routeButton");
			var start = document.getElementById("start");
			var dest = document.getElementById("dest");
			var mapReleaseTxt = document.getElementById("mapReleaseTxt");
			var pos;
			var address;
			var line1;
			var line2;
			// var vehicles;
// =---------------------------



// =---------------------
			var pointA;
			var pointB;
			var startMarker = null;
			var destMarker = null;
			var routeLinkHashMap = new Object(); // key = linkID, value = link object
			var routerMapRelease;
			var release;
			var currentBubble;
			var currentOpenBubble;
			var bErrorHappened = false;
			var bLongClickUseForStartPoint = true; // for long click in map we toggle start/destination

			var routeColor = ["rgba(18, 65, 145, 0.8)", "rgba(0, 145, 255, 0.7)", "rgba(127, 201, 255, 0.6)"];
			var ppType_A_Color = ["rgba(255, 255, 0, 0.8)", "rgba(255, 255, 0, 0.7)", "rgba(255, 255, 0, 0.6)"];
			var ppType_a_Color = ["rgba(255, 216, 0, 0.8)", "rgba(255, 216, 0, 0.7)", "rgba(255, 216, 0, 0.6)"];
			var ppType_S_Color = ["rgba(255, 0, 0, 0.8)", "rgba(255, 0, 0, 0.7)", "rgba(255, 0, 0, 0.6)"];
			var ppType_p_Color = ["rgba(255, 127, 127, 0.8)", "rgba(255, 127, 127, 0.7)", "rgba(255, 127, 127, 0.6)"];
			var ppType_F_Color = ["rgba(214, 127, 255, 0.8)", "rgba(214, 127, 255, 0.7)", "rgba(214, 127, 255, 0.6)"];
			var ppType_K_Color = ["rgba(178, 0, 255, 0.8)", "rgba(178, 0, 255, 0.7)", "rgba(178, 0, 255, 0.6)"];
			var ppType_U_Color = ["rgba(0, 204, 0, 0.8)", "rgba(0, 204, 0, 0.7)", "rgba(0, 204, 0, 0.6)"];
			var tollCostStroke = 8, routeStroke = 8;
			var strRoutingRequestSend = "Routing request sent. Waiting for response...";
			var strTceRequestSend = "Route Toll Cost request sent and logged. Waiting for response...";
			var strTceError = "An Error happened during Route Toll Cost calculation. Please check the vehicle specification<br/>F.e. Trailer number set but no trailer type.";
			var strTceResponseReceived = "Received TCE response. Processing it now.";
			// toll image
			var tollImg = document.createElement("img");
			tollImg.src = "/assets/icons/toll_20_10.png";
			var tollIcon = new H.map.Icon(tollImg, { anchor: new H.math.Point(0, 10) });
			map.addObject(markerGroup);
			// enable/disable calculation of cost optimized route calculation
			var noCostOptimizationJustCalculate = false;
			
			// handleEnableCalculateOptimizedRouteClicked();

			/************************************
	
			Geocoding and routing methods
	
			************************************/

			/***/
			function clearLastRouteCalculation() {
				bErrorHappened = false;
				bLongClickUseForStartPoint = true;
				if (currentOpenBubble) {
					ui.removeBubble(currentOpenBubble);
				}
				group.removeAll();

			}

			/************************************
			Start Route Calculation
			************************************/
			var startRouteCalculation = function () {
				debugger
				clearLastRouteCalculation();
				geocode(start.value, true);
			}
			// routeButton.onClick = startRouteCalculation;

			/********************************************************
			Start/Destination selectin via LongClick in map
			********************************************************/
			function handleLongClickInMap(currentEvent) {
				var lastClickedPos = map.screenToGeo(currentEvent.currentPointer.viewportX, currentEvent.currentPointer.viewportY);
				// round up decimal places as Geocoder can only provide upto 7 digits precision after decimal
				lastClickedPos.lat = roundUp(lastClickedPos.lat, 7);
				lastClickedPos.lng = roundUp(lastClickedPos.lng, 7);

				if (bLongClickUseForStartPoint) {
					clearLastRouteCalculation();
					var line1 = "" + lastClickedPos.lat + "," + lastClickedPos.lng;
					//var line2 = " ";
					start.value = line1;
					pointA = new H.geo.Point(lastClickedPos.lat, lastClickedPos.lng);
					if (startMarker != null) {
						markerGroup.removeObject(startMarker);
					}
					startMarker = new H.map.Marker(pointA,
						{
							icon: createIconMarker(line1)
						});
					markerGroup.addObject(startMarker);
					bLongClickUseForStartPoint = false;
				}
				else {
					var line1 = "" + lastClickedPos.lat + "," + lastClickedPos.lng;
					//var line2 = " ";
					dest.value = line1;
					pointB = new H.geo.Point(lastClickedPos.lat, lastClickedPos.lng);
					if (destMarker != null) {
						markerGroup.removeObject(destMarker);
					}
					destMarker = new H.map.Marker(pointB,
						{
							icon: createIconMarker(line1)
						});
					markerGroup.addObject(destMarker);
					bLongClickUseForStartPoint = true;
				}
			}

			/************************************
			Geocode start/destination
			************************************/
			var isStartGlobal;
			var geocode = function (searchTerm, isStart) {
				isStartGlobal = isStart;
				//add Geocoder Release information if not already done
				if (releaseGeocoderShown == false) {
					// loadGeocoderVersionTxt();
					releaseGeocoderShown = true;
				}

				// check if coordinates , use search end point for coordinates
				var query = searchTerm.split(",");
				var regex = /[0-9]+[.]?[0-9]*/;
				if (query.length == 2 && regex.test(query[0]) && regex.test(query[1])) {
					geocoder.search(
						{
							searchText: searchTerm
						},
						onResult,
						onError
					);
				} else {
					geocoder.geocode(
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
					pos = result.Response.View[0].Result[0].Location.DisplayPosition;
				}
				else {
					pos = result.Response.View[0].Result[0].Place.Locations[0].DisplayPosition;
				}

				if (isStartGlobal)
					pointA = new H.geo.Point(pos.Latitude, pos.Longitude);
				else
					pointB = new H.geo.Point(pos.Latitude, pos.Longitude);

				if (result.Response.View[0].Result[0].Location != null) {
					address = result.Response.View[0].Result[0].Location.Address;
				}
				else {
					address = result.Response.View[0].Result[0].Place.Locations[0].Address;
				}


				line1 = pos.Latitude + " " + pos.Longitude;
				line2 = address.Label;

				if (isStartGlobal) {
					if (startMarker != null) {
						markerGroup.removeObject(startMarker);
					}
					startMarker = new H.map.Marker(pointA,
						{
							icon: createIconMarker(line1, line2)
						});
					markerGroup.addObject(startMarker);

				}
				else {
					if (destMarker != null) {
						markerGroup.removeObject(destMarker);
					}
					destMarker = new H.map.Marker(pointB,
						{
							icon: createIconMarker(line1, line2)
						});
					markerGroup.addObject(destMarker);
					map.getViewModel().setLookAtData({
						bounds: markerGroup.getBoundingBox()
					});
				}


				if (isStartGlobal)
					geocode(dest.value, false);
				else
					calculateRoute(pointA, pointB);
			}

			/************************************
			Actual Route Calculation
			************************************/
			
			var calculateRoute = function (start, destination) {

				// generate routing request
				var transportMode = "car";
				if (vehicles.value == "3" || vehicles.value == "9") {
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

				if (parseInt(trailerType.value) > 0) {
					hasTrailer = "&trailersCount=1";
				}

				if (parseInt(hazardousType.value) == 1) {
					shippedHazardousGoods = "&shippedHazardousGoods=explosive";
				}
				else if (parseInt(hazardousType.value) == 2) {
					shippedHazardousGoods = "&shippedHazardousGoods=other";
				}

				if (parseInt(vehWeight.value) > 0) {
					if (parseInt(vehWeight.value) > parseInt(totalWeight.value)) {
						alert("Total Weight cannot be smaller than Vehicle Weight");
						return;
					}
					limitedWeight = "&limitedWeight=" + (totalWeight.value / 1000) + "t";// router 7.2 used by TCE includes trailer weight
				}


				if (parseInt(vehHeight.value) > 0 || parseInt(trailerHeight.value) > 0) {
					height = "&height=" + ((parseInt(vehHeight.value) > parseInt(trailerHeight.value) ? parseInt(vehHeight.value) : parseInt(trailerHeight.value)) / 100) + "m";
				}

				if (parseInt(totalWidth.value) > 0) {
					width = "&width=" + (totalWidth.value / 100) + 'm';
				}

				if (parseInt(totalLength.value) > 0) {
					length = "&length=" + (totalLength.value / 100) + 'm';
				}

				if (document.getElementById("heightAbove1stAxle").value != 0) {
					heightAbove1stAxle = (document.getElementById("heightAbove1stAxle").value / 100) + "m";
				}

				var vspec = "";
				vspec += "&tollVehicleType=" + vehicles.value;
				vspec += "&trailerType=" + trailerType.value;
				vspec += "&trailersCount=" + trailerNr.value;
				vspec += "&vehicleNumberAxles=" + nrOfAxlesVehicle.value;
				vspec += "&trailerNumberAxles=" + nrOfAxlesTrailer.value;
				vspec += "&hybrid=" + hybrid.value;
				vspec += "&emissionType=" + emissionType.value;
				vspec += "&fuelType=" + fuelType.value;
				if (height != null && height.length > 0) vspec += height;
				vspec += "&trailerHeight=" + trailerHeight.value;
				vspec += "&vehicleWeight=" + vehWeight.value;
				if (limitedWeight != null && limitedWeight.length > 0) vspec += limitedWeight;
				vspec += "&disabledEquipped=" + disabledEquipped.value;
				vspec += "&minimalPollution=" + minPollution.value;
				vspec += "&hov=" + hov.value;
				vspec += "&passengersCount=" + nrPassengers.value;
				vspec += "&tiresCount=" + nrOfTotalTires.value;
				vspec += "&commercial=" + commercial.value;
				vspec += "&heightAbove1stAxle=" + heightAbove1stAxle;
				if (width != null && width.length > 0) vspec += width;
				if (length != null && length.length > 0) vspec += length;
				if (shippedHazardousGoods != null && shippedHazardousGoods.length > 0) vspec += shippedHazardousGoods;
				var routerParamsValue = document.getElementById('routerParamsValue').value;
				var finalParamsValue = '';
				if (routerParamsValue !== '') {
					var paramsArray = [];
					var components = routerParamsValue.split('&');
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

				var isDTFilteringEnabled = document.getElementById("chkEnableDTFiltering").checked;
				var routeAlternativesRequested = false;
				if (document.getElementById("routeAlternatives").value != null && document.getElementById("routeAlternatives").value != "0") {
					routeAlternativesRequested = true;
				}

				var urlRoutingReq =
					[
						serverURL.value,
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
						(noCostOptimizationJustCalculate ? "" : "&driver_cost="),
						(noCostOptimizationJustCalculate ? "" : document.getElementById('hourDriverCost').value),
						(noCostOptimizationJustCalculate ? "" : "&vehicle_cost="),
						(noCostOptimizationJustCalculate ? "" : document.getElementById('hourVehicleCost').value),
						"&currency=",
						document.getElementById('currency').value,
						"&departure=",
						isDTFilteringEnabled ? document.getElementById("startRouteDate").value + 'T' + document.getElementById("startRouteTime").value : '',
						vspec,
						"&mode=fastest;" + transportMode + ";traffic:disabled",
						"&rollup=none,country;tollsys",
						(routeAlternativesRequested ? "&alternatives=" + document.getElementById("routeAlternatives").value : ''),
						"&apiKey=",
						config.apikey,
						// Additional custom parameters
						(finalParamsValue !== '' ? '&' + finalParamsValue : ''),
						"&jsoncallback=parseRoutingResponse"].join("");
						createMarkup(strRoutingRequestSend)
				// feedbackTxt.innerHTML = strRoutingRequestSend;
				window.script = document.createElement("script");
				window.script.src = urlRoutingReq;
				document.body.appendChild(window.script);
			}

			/************************************
			parse the routing response
			************************************/
			function parseRoutingResponse(resp) {
				if (resp.error != undefined) {
					if (resp.error == "NoRouteFound") {
						alert('Please consider to change your start or destination as the one you entered is not reachable with the given vehicle profile');
						// feedbackTxt.innerHTML = 'The Router service is unable to compute the route: try to change your start / destination point';
						createMarkup('The Router service is unable to compute the route: try to change your start / destination point');
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
						alert('Please consider to change your start or destination as the one you entered is not reachable with the given vehicle profile');
						// feedbackTxt.innerHTML = 'The Router service is unable to compute the route: try to change your start / destination point';
						createMarkup('The Router service is unable to compute the route: try to change your start / destination point')
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
						createMarkup("<font color='red'>" + resp.errors + "</font>")
						// feedbackTxt.innerHTML = "<font color='red'>" + resp.errors + "</font>";
						createMarkup("<br />")
						// feedbackTxt.innerHTML += "<br />";
					}
					return;
				}
				if (bErrorHappened) {
					return;
				}

				if (createMarkup() != strTceError) {
					// feedbackTxt.innerHTML = strTceResponseReceived;
					createMarkup(strTceResponseReceived)
				}

				routeLinkHashMap = new Object();

				// create link objects
				for (var r = 0; r < resp.response.route.length; r++) {
					for (var m = 0; m < resp.response.route[r].leg[0].link.length; m++) {
						// only add new link if it does not exist so far - so alternatives are not drawn multiple times
						var linkId = (resp.response.route[r].leg[0].link[m].linkId.lastIndexOf("+", 0) === 0 ? resp.response.route[r].leg[0].link[m].linkId.substring(1) : resp.response.route[r].leg[0].link[m].linkId);
						if (routeLinkHashMap[linkId] == null) {
							var strip = new H.geo.LineString(),
								shape = resp.response.route[r].leg[0].link[m].shape,
								i,
								l = shape.length;

							for (i = 0; i < l; i += 2) {
								strip.pushLatLngAlt(shape[i], shape[i + 1], 0);
							}

							var link = new H.map.Polyline(strip,
								{
									style: {
										lineWidth: (routeStroke - (r + 1)), // alternatives get smaller line with
										strokeColor: routeColor[r],
										lineCap: 'butt'
									}
								});
							link.setArrows({ color: "#F00F", width: 2, length: 3, frequency: 4 });
							link.$linkId = resp.response.route[r].leg[0].link[m].linkId;

							//The router can send back links ids with "-" or "+" prefix: only "-" prefix is kept and stored in this HashMap, the "+" is removed
							routeLinkHashMap[linkId] = link;

							// add event listener to link
							link.addEventListener("pointerdown", function (e) {
								if (currentOpenBubble)
									ui.removeBubble(currentOpenBubble);
								var html = `'<div>' +
									'<p style="font-family:Arial,sans-serif; font-size:12px;">LinkId: ' + e.target.$linkId + '</p>'
								'</div>'`;

								var pos = map.screenToGeo(e.currentPointer.viewportX, e.currentPointer.viewportY);

								currentOpenBubble = new H.ui.InfoBubble(pos, { content: html });
								ui.addBubble(currentOpenBubble);
							});

							group.addObject(link);
						}
					}
				}

				map.addObject(group);

				// show TCE costs
				showTceCost(resp.response.route[0].tollCost.costsByCountryAndTollSystem, resp.response.route[0].cost, resp.response.route[0].summary.distance / 1000.0, resp.response.route[0].summary.baseTime / 60 / 60.00, resp.response.route[0].summary.trafficTime / 60 / 60.00);

				/***********************************************
				Highlight Links
				***********************************************/
				for (var i = 0; i < resp.response.route.length; i++) {
					highlightRoute(resp.response.route[i].tollCost.routeTollItems, i);
				}
			}

			/**************************************************
			show route toll cost response
			**************************************************/
			function showTceCost(costByCountryAndTollSystem, costs, length, basetime, traffictime) {

				/***********************************************
	
				Publishing route total cost
	
				***********************************************/
				createMarkup("<br/><span style=\"font-weight: bold;border: 1px solid;padding: 2px;\">COSTS FOR MAIN ROUTE</span>")
				// feedbackTxt.innerHTML = "<br/><span style=\"font-weight: bold;border: 1px solid;padding: 2px;\">COSTS FOR MAIN ROUTE</span>";
				if (!costs) {
					// feedbackTxt.innerHTML += "<br/><br/>None.";
					createMarkup("<br/><br/>None.");
				} else {
					createMarkup("<br/><br/>Length: " + length + " km<br/>");
					createMarkup("BaseTime: " + basetime + " h<br/>");
					createMarkup("TrafficTime: " + traffictime + " h<br/>");

					createMarkup("Total Cost: " + costs.totalCost + " " + costs.currency + "<br/>");
					createMarkup("Driver Cost: " + costs.details.driverCost + " " + costs.currency + "<br/>");
					createMarkup("Vehicle Cost: " + costs.details.vehicleCost + " " + costs.currency + "<br/>");
					createMarkup("Toll Cost: " + costs.details.tollCost + " " + costs.currency + "<br/>");
					// feedbackTxt.innerHTML += "<br/><br/>Length: " + length + " km<br/>";
					// feedbackTxt.innerHTML += "BaseTime: " + basetime + " h<br/>";
					// feedbackTxt.innerHTML += "TrafficTime: " + traffictime + " h<br/>";

					// feedbackTxt.innerHTML += "Total Cost: " + costs.totalCost + " " + costs.currency + "<br/>";
					// feedbackTxt.innerHTML += "Driver Cost: " + costs.details.driverCost + " " + costs.currency + "<br/>";
					// feedbackTxt.innerHTML += "Vehicle Cost: " + costs.details.vehicleCost + " " + costs.currency + "<br/>";
					// feedbackTxt.innerHTML += "Toll Cost: " + costs.details.tollCost + " " + costs.currency + "<br/>";
				}


				/***********************************************
	
				Publishing route detail cost
	
				***********************************************/
				createMarkup("<br/><span style=\"font-weight: bold;border: 1px solid;padding: 2px;\">TOLL COST FOR MAIN ROUTE</span>")
				// feedbackTxt.innerHTML += "<br/><span style=\"font-weight: bold;border: 1px solid;padding: 2px;\">TOLL COST FOR MAIN ROUTE</span>";

				if (costs.details.tollCost == 0.0) {
					createMarkup("<br/><br/>None.<br/><br/>")
					// feedbackTxt.innerHTML += "<br/><br/>None.<br/><br/>";
				}

				/***********************************************
				Apply toll to link objects
				***********************************************/
				if (costByCountryAndTollSystem != null) {
					var feedback = "";
					feedback += "<br/>";
					for (var j = 0; j < costByCountryAndTollSystem.length; j++) {
						feedback += "<br/><span style=\"font-weight: bold;border: 1px solid;padding: 2px;\">" + costByCountryAndTollSystem[j].country + "</span>"
						feedback += "<ul><li>";
						if (costByCountryAndTollSystem[j].name != null && costByCountryAndTollSystem[j].name.trim().length > 0) {
							feedback += "Toll System " + costByCountryAndTollSystem[j].name + ": ";
						} else if (costByCountryAndTollSystem[j].tollSystemId != null && costByCountryAndTollSystem[j].tollSystemId.trim().length > 0) {
							feedback += "Toll System ID " + costByCountryAndTollSystem[j].tollSystemId + ": "
						} else {
							feedback += "Toll : ";
						}
						feedback += costByCountryAndTollSystem[j].amountInTargetCurrency + " " + costs.currency;
						feedback += "</li></ul>";
					}
					createMarkup(feedback)
					// feedbackTxt.innerHTML += feedback;
				}

				if (costs.details.tollCost != 0.0) {
					createMarkup("<br/><br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_A_Color[0]) + ";\">Paypoint Type A: Country wide toll - payed here.</span>")
					createMarkup("<br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_a_Color[0]) + ";\">Paypoint Type A: Country wide toll - payed somewhere else.</span>")
					createMarkup("<br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_S_Color[0]) + ";\">Paypoint Type S: Toll section from one toll booth or between two toll boths.</span>")
					createMarkup("<br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_p_Color[0]) + ";\">Paypoint Type p: Toll - payed somewhere else.</span>")
					createMarkup("<br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_F_Color[0]) + ";\">Paypoint Type F: Toll section belonging to a toll system.</span>")
					createMarkup("<br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_K_Color[0]) + ";\">Paypoint Type K: Toll section defined between junctions.</span>")
					createMarkup("<br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_U_Color[0]) + ";\">UFR: Usage fee required link(s).</span>")
					// feedbackTxt.innerHTML += "<br/><br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_A_Color[0]) + ";\">Paypoint Type A: Country wide toll - payed here.</span>";
					// feedbackTxt.innerHTML += "<br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_a_Color[0]) + ";\">Paypoint Type A: Country wide toll - payed somewhere else.</span>";
					// feedbackTxt.innerHTML += "<br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_S_Color[0]) + ";\">Paypoint Type S: Toll section from one toll booth or between two toll boths.</span>";
					// feedbackTxt.innerHTML += "<br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_p_Color[0]) + ";\">Paypoint Type p: Toll - payed somewhere else.</span>";
					// feedbackTxt.innerHTML += "<br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_F_Color[0]) + ";\">Paypoint Type F: Toll section belonging to a toll system.</span>";
					// feedbackTxt.innerHTML += "<br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_K_Color[0]) + ";\">Paypoint Type K: Toll section defined between junctions.</span>";
					// feedbackTxt.innerHTML += "<br/><span style=\"font-weight: normal;color:" + rgb2hex(ppType_U_Color[0]) + ";\">UFR: Usage fee required link(s).</span>";
				}

				return; // done

			}

			/**
				Highlights the toll links in map display
			*/
			function highlightRoute(routeTollItems, routeAlternative) {
				if (routeTollItems != null) {
					for (var i = 0; i < routeTollItems.length; i++) {
						var tollType = routeTollItems[i].tollType;
						var color = ppType_S_Color[routeAlternative];
						if (tollType == 'A') {
							color = ppType_A_Color[routeAlternative];
						} else if (tollType == 'a') {
							color = ppType_a_Color[routeAlternative];
						} else if (tollType == 'S') {
							color = ppType_S_Color[routeAlternative];
						} else if (tollType == 'p') {
							color = ppType_p_Color[routeAlternative];
						} else if (tollType == 'F') {
							color = ppType_F_Color[routeAlternative];
						} else if (tollType == 'K') {
							color = ppType_K_Color[routeAlternative];
						} else if (tollType == 'U') {
							color = ppType_U_Color[routeAlternative];
						}

						for (var j = 0; j < routeTollItems[i].linkIds.length; j++) {
							// set color and stroke of links
							var tollstroke = (tollCostStroke - (routeAlternative + 1));	// route alternatives have a different stroke
							var link = routeLinkHashMap[routeTollItems[i].linkIds[j]];
							if (link.getStyle().strokeColor == routeColor[routeAlternative]) { // only change link color to toll color if not already modified
								link.setStyle({ strokeColor: color, lineWidth: tollstroke });
							}
						}

						//toll structures
						if (routeTollItems[i].tollStructures != null) {
							for (var j = 0; j < routeTollItems[i].tollStructures.length; j++) {
								createTollMarker(routeTollItems[i].tollStructures[j]);
							}
						}
					}
				}

			}

			//--- Helper - Create Start / Destination marker
			var createIconMarker = function (line1, line2) {
				var svgMarker = svgMarkerImage_Line;

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
				console.log(svgMarker);
				var icon = new H.map.Icon(svgMarker, {
					anchor: new H.math.Point(24, 57)
				});
				return icon;

			};


			// Helper for selecting the value attached to a JS selection
			// function selectionSettingHelper(selection, value) {
			// 	for (var opt, j = 0; opt = selection.options[j]; j++) {
			// 		if (opt.value == value) {
			// 			selection.selectedIndex = j;
			// 			break;
			// 		}
			// 	}
			// }

			/*********************************
			 Vehicle Specification
			 *********************************/
			/**
			 This method checks the user setted vehicle specification and adapts all vehicle value in the GUI
			 */
			//  переделать все значения на use State 
			// var vehicle = 2;
			// var totalNumTires = 4;
			// var trailerType = 0;
			// var trailerNum = 0;
			// var vehicleNumAxles = 2;
			// var trailerNumAxles = 0;
			// var hybrid = 0;
			// var emmisionType = 5;
			// var vehicleHeight = 167;
			// var vehicleWeight = 1739;
			// var trailerHeight = 0;
			// var totalWeight = 1739;
			// var totalWidth = 180;
			// var totalLength = 441;
			// var disabledEquipped = 0;
			// var minPollution = 0;
			// var hov = 0;
			// var numPassengers = 2;
			// var commercial = 0;
			// var hazardousType = 0;
			// var heightAbove1stAxle = 100;
			// var fuelType = 'petrol';
			var totalNumTires = nrOfTotalTires;
			var trailerNum = trailerNr;
			var trailerNumAxles = nrOfAxlesVehicle;
			var trailerNumAxles = nrOfAxlesTrailer;
			var vehicleHeight = vehHeight;
			var vehicleWeight = vehWeight;
			var numPassengers = nrPassengers;
			var vehSpecSelection = predefinedVehSpec;
			function handleVehicleSpecChanged() {
				setUserdefinedVehicleSpec(false);

				// var vehicle = 2;
				// var totalNumTires = 4;
				// var trailerType = 0;
				// var trailerNum = 0;
				// var vehicleNumAxles = 2;
				// var trailerNumAxles = 0;
				// var hybrid = 0;
				// var emmisionType = 5;
				// var vehicleHeight = 167;
				// var vehicleWeight = 1739;
				// var trailerHeight = 0;
				// var totalWeight = 1739;
				// var totalWidth = 180;
				// var totalLength = 441;
				// var disabledEquipped = 0;
				// var minPollution = 0;
				// var hov = 0;
				// var numPassengers = 2;
				// var commercial = 0;
				// var hazardousType = 0;
				// var heightAbove1stAxle = 100;
				// var fuelType = 'petrol';
				setvehicles('2');
				setnrOfTotalTires('4');
				settrailerType('0');
				settrailerNr('0');
				setnrOfAxlesVehicle('2');
				setnrOfAxlesTrailer('0');
				sethybrid('0');
				setemissionType('5');
				setvehHeight('167');
				setvehWeight('1739');
				settrailerHeight('0');
				settotalWeight('1739');
				settotalWidth('180');
				settotalLength('441');
				setdisabledEquipped('0');
				setminPollution('0');
				sethov('0');
				setnrPassengers('2');
				setcommercial('0');
				sethazardousType('0');
				setfuelType('petrol');
				setheightAbove1stAxle('100');

				// var vehSpecSelection = document.getElementById("predefinedVehSpec");
				if (vehSpecSelection == 0) // Car
				{
					// vehicle = 2;
					// totalNumTires = 4;
					// trailerType = 0;
					// trailerNum = 0;
					// vehicleNumAxles = 2;
					// trailerNumAxles = 0;
					// hybrid = 0;
					// emmisionType = 5;
					// vehicleHeight = 167;
					// vehicleWeight = 1739;
					// trailerHeight = 0;
					// totalWeight = 1739;
					// totalWidth = 180;
					// totalLength = 441;
					// disabledEquipped = 0;
					// minPollution = 0;
					// hov = 0;
					// numPassengers = 2;
					// commercial = 0;
					// hazardousType = 0;
					// heightAbove1stAxle = 100;
					// fuelType = 'diesel';
					setvehicles('2');
					setnrOfTotalTires('4');
					settrailerType('0');
					settrailerNr('0');
					setnrOfAxlesVehicle('2');
					setnrOfAxlesTrailer('0');
					sethybrid('0');
					setemissionType('5');
					setvehHeight('167');
					setvehWeight('1739');
					settrailerHeight('0');
					settotalWeight('1739');
					settotalWidth('180');
					settotalLength('441');
					setdisabledEquipped('0');
					setminPollution('0');
					sethov('0');
					setnrPassengers('2');
					setcommercial('0');
					sethazardousType('0');
					setfuelType('diesel');
					setheightAbove1stAxle('100');
				}
				else if (vehSpecSelection == 1) // Transporter
				{
					// vehicle = 2;
					// totalNumTires = 4;
					// trailerType = 0;
					// trailerNum = 0;
					// vehicleNumAxles = 2;
					// trailerNumAxles = 0;
					// hybrid = 0;
					// emmisionType = 5;
					// vehicleHeight = 255;
					// vehicleWeight = 3500;
					// trailerHeight = 0;
					// totalWeight = 3500;
					// totalWidth = 194;
					// totalLength = 652;
					// disabledEquipped = 0;
					// minPollution = 0;
					// hov = 0;
					// numPassengers = 1;
					// commercial = 1;
					// hazardousType = 0;
					// heightAbove1stAxle = 130;
					// fuelType = 'diesel';
					setvehicles('2');
					setnrOfTotalTires('4');
					settrailerType('0');
					settrailerNr('0');
					setnrOfAxlesVehicle('2');
					setnrOfAxlesTrailer('0');
					sethybrid('0');
					setemissionType('5');
					setvehHeight('255');
					setvehWeight('3500');
					settrailerHeight('0');
					settotalWeight('3500');
					settotalWidth('1194');
					settotalLength('652');
					setdisabledEquipped('0');
					setminPollution('0');
					sethov('0');
					setnrPassengers('1');
					setcommercial('1');
					sethazardousType('0');
					setfuelType('diesel');
					setheightAbove1stAxle('130');
				}
				else if (vehSpecSelection == 2) // Truck 7.5t
				{
					// vehicle = 3;
					// totalNumTires = 4;
					// trailerType = 0;
					// trailerNum = 0;
					// vehicleNumAxles = 2;
					// trailerNumAxles = 0;
					// hybrid = 0;
					// emmisionType = 5;
					// vehicleHeight = 340;
					// vehicleWeight = 7500;
					// trailerHeight = 0;
					// totalWeight = 7500;
					// totalWidth = 250;
					// totalLength = 720;
					// disabledEquipped = 0;
					// minPollution = 0;
					// hov = 0;
					// numPassengers = 1;
					// commercial = 1;
					// hazardousType = 0;
					// heightAbove1stAxle = 300;
					// fuelType = 'diesel';
					setvehicles('3');
					setnrOfTotalTires('4');
					settrailerType('0');
					settrailerNr('0');
					setnrOfAxlesVehicle('2');
					setnrOfAxlesTrailer('0');
					sethybrid('0');
					setemissionType('5');
					setvehHeight('340');
					setvehWeight('7500');
					settrailerHeight('0');
					settotalWeight('7500');
					settotalWidth('250');
					settotalLength('720');
					setdisabledEquipped('0');
					setminPollution('0');
					sethov('0');
					setnrPassengers('1');
					setcommercial('1');
					sethazardousType('0');
					setfuelType('diesel');
					setheightAbove1stAxle('300');
				}
				else if (vehSpecSelection == 3) // Truck 11t
				{
				// 	vehicle = 3;
				// 	totalNumTires = 6;
				// 	trailerType = 0;
				// 	trailerNum = 0;
				// 	vehicleNumAxles = 2;
				// 	trailerNumAxles = 0;
				// 	hybrid = 0;
				// 	emmisionType = 5;
				// 	vehicleHeight = 380;
				// 	vehicleWeight = 11000;
				// 	trailerHeight = 0;
				// 	totalWeight = 11000;
				// 	totalWidth = 255;
				// 	totalLength = 1000;
				// 	disabledEquipped = 0;
				// 	minPollution = 0;
				// 	hov = 0;
				// 	numPassengers = 1;
				// 	commercial = 1;
				// 	hazardousType = 0;
				// 	heightAbove1stAxle = 300;
				// 	fuelType = 'diesel';
				setvehicles('3');
				setnrOfTotalTires('6');
				settrailerType('0');
				settrailerNr('0');
				setnrOfAxlesVehicle('2');
				setnrOfAxlesTrailer('0');
				sethybrid('0');
				setemissionType('5');
				setvehHeight('380');
				setvehWeight('11000');
				settrailerHeight('0');
				settotalWeight('11000');
				settotalWidth('255');
				settotalLength('1000');
				setdisabledEquipped('0');
				setminPollution('0');
				sethov('0');
				setnrPassengers('1');
				setcommercial('1');
				sethazardousType('0');
				setfuelType('diesel');
				setheightAbove1stAxle('300');
				}
				else if (vehSpecSelection == 4) // Truck one trailer 38t
				{
					// vehicle = 3;
					// totalNumTires = 10;
					// trailerType = 2;
					// trailerNum = 1;
					// vehicleNumAxles = 2;
					// trailerNumAxles = 3;
					// hybrid = 0;
					// emmisionType = 5;
					// vehicleHeight = 400;
					// vehicleWeight = 24000;
					// trailerHeight = 400;
					// totalWeight = 38000;
					// totalWidth = 255;
					// totalLength = 1800;
					// disabledEquipped = 0;
					// minPollution = 0;
					// hov = 0;
					// numPassengers = 1;
					// commercial = 1;
					// hazardousType = 0;
					// heightAbove1stAxle = 300;
					// fuelType = 'diesel';
					setvehicles('3');
					setnrOfTotalTires('10');
					settrailerType('2');
					settrailerNr('1');
					setnrOfAxlesVehicle('2');
					setnrOfAxlesTrailer('3');
					sethybrid('0');
					setemissionType('5');
					setvehHeight('400');
					setvehWeight('24000');
					settrailerHeight('400');
					settotalWeight('38000');
					settotalWidth('255');
					settotalLength('1800');
					setdisabledEquipped('0');
					setminPollution('0');
					sethov('0');
					setnrPassengers('1');
					setcommercial('1');
					sethazardousType('0');
					setfuelType('diesel');
					setheightAbove1stAxle('300');
				}
				else if (vehSpecSelection == 5) // Trailer Truck 40t
				{
					// vehicle = 3;
					// totalNumTires = 14;
					// trailerType = 2;
					// trailerNum = 1;
					// vehicleNumAxles = 3;
					// trailerNumAxles = 2;
					// hybrid = 0;
					// emmisionType = 5;
					// vehicleHeight = 400;
					// vehicleWeight = 12000;
					// trailerHeight = 400;
					// totalWeight = 40000;
					// totalWidth = 255;
					// totalLength = 1650;
					// disabledEquipped = 0;
					// minPollution = 0;
					// hov = 0;
					// numPassengers = 1;
					// commercial = 1;
					// hazardousType = 0;
					// heightAbove1stAxle = 300;
					// fuelType = 'diesel';
					setvehicles('3');
					setnrOfTotalTires('14');
					settrailerType('2');
					settrailerNr('1');
					setnrOfAxlesVehicle('3');
					setnrOfAxlesTrailer('2');
					sethybrid('0');
					setemissionType('5');
					setvehHeight('400');
					setvehWeight('12000');
					settrailerHeight('400');
					settotalWeight('40000');
					settotalWidth('255');
					settotalLength('1650');
					setdisabledEquipped('0');
					setminPollution('0');
					sethov('0');
					setnrPassengers('1');
					setcommercial('1');
					sethazardousType('0');
					setfuelType('diesel');
					setheightAbove1stAxle('300');
				}
				else if (vehSpecSelection == 6) // Car with Trailer
				{
					// vehicle = 2;
					// totalNumTires = 6;
					// trailerType = 2;
					// trailerNum = 1;
					// vehicleNumAxles = 2;
					// trailerNumAxles = 1;
					// hybrid = 0;
					// emmisionType = 5;
					// vehicleHeight = 167;
					// vehicleWeight = 1739;
					// trailerHeight = 167;
					// totalWeight = 2589;
					// totalWidth = 180;
					// totalLength = 733;
					// disabledEquipped = 0;
					// minPollution = 0;
					// hov = 0;
					// numPassengers = 1;
					// commercial = 0;
					// hazardousType = 0;
					// heightAbove1stAxle = 100;
					// fuelType = 'diesel';
					setvehicles('2');
					setnrOfTotalTires('6');
					settrailerType('2');
					settrailerNr('1');
					setnrOfAxlesVehicle('2');
					setnrOfAxlesTrailer('1');
					sethybrid('0');
					setemissionType('5');
					setvehHeight('167');
					setvehWeight('1739');
					settrailerHeight('167');
					settotalWeight('2589');
					settotalWidth('180');
					settotalLength('733');
					setdisabledEquipped('0');
					setminPollution('0');
					sethov('0');
					setnrPassengers('1');
					setcommercial('0');
					sethazardousType('0');
					setfuelType('diesel');
					setheightAbove1stAxle('100');
				}
				else if (vehSpecSelection == 7) // Bus
				{
					// vehicle = 3;
					// totalNumTires = 6;
					// trailerType = 0;
					// trailerNum = 0;
					// vehicleNumAxles = 3;
					// trailerNumAxles = 0;
					// hybrid = 0;
					// emmisionType = 5;
					// vehicleHeight = 371;
					// vehicleWeight = 17500;
					// trailerHeight = 0;
					// totalWeight = 17500;
					// totalWidth = 253;
					// totalLength = 1300;
					// disabledEquipped = 0;
					// minPollution = 0;
					// hov = 0;
					// numPassengers = 51;
					// commercial = 1;
					// hazardousType = 0;
					// heightAbove1stAxle = 300;
					// fuelType = 'diesel';
					setvehicles('3');
					setnrOfTotalTires('6');
					settrailerType('0');
					settrailerNr('0');
					setnrOfAxlesVehicle('3');
					setnrOfAxlesTrailer('0');
					sethybrid('0');
					setemissionType('5');
					setvehHeight('371');
					setvehWeight('17500');
					settrailerHeight('0');
					settotalWeight('17500');
					settotalWidth('253');
					settotalLength('1300');
					setdisabledEquipped('0');
					setminPollution('0');
					sethov('0');
					setnrPassengers('51');
					setcommercial('1');
					sethazardousType('0');
					setfuelType('diesel');
					setheightAbove1stAxle('300');
				}
				else if (vehSpecSelection == 8) // Motor Home
				{
					// vehicle = 3;
					// totalNumTires = 4;
					// trailerType = 0;
					// trailerNum = 0;
					// vehicleNumAxles = 2;
					// trailerNumAxles = 0;
					// hybrid = 0;
					// emmisionType = 5;
					// vehicleHeight = 372;
					// vehicleWeight = 4535;
					// trailerHeight = 0;
					// totalWeight = 4535;
					// totalWidth = 254;
					// totalLength = 760;
					// disabledEquipped = 0;
					// minPollution = 0;
					// hov = 0;
					// numPassengers = 4;
					// commercial = 0;
					// hazardousType = 0;
					// heightAbove1stAxle = 140;
					// fuelType = 'diesel';
					setvehicles('3');
					setnrOfTotalTires('4');
					settrailerType('0');
					settrailerNr('0');
					setnrOfAxlesVehicle('2');
					setnrOfAxlesTrailer('0');
					sethybrid('0');
					setemissionType('5');
					setvehHeight('372');
					setvehWeight('4535');
					settrailerHeight('0');
					settotalWeight('4535');
					settotalWidth('254');
					settotalLength('760');
					setdisabledEquipped('0');
					setminPollution('0');
					sethov('0');
					setnrPassengers('4');
					setcommercial('0');
					sethazardousType('0');
					setfuelType('diesel');
					setheightAbove1stAxle('140');
				}

				// selectionSettingHelper(document.getElementById("vehicles"), vehicle);
				// document.getElementById("nrOfTotalTires").value = totalNumTires;
				// selectionSettingHelper(document.getElementById("trailerType"), trailerType);
				// selectionSettingHelper(document.getElementById("trailerNr"), trailerNum);
				// document.getElementById("nrOfAxlesVehicle").value = vehicleNumAxles;
				// document.getElementById("nrOfAxlesTrailer").value = trailerNumAxles;
				// selectionSettingHelper(document.getElementById("hybrid"), hybrid);
				// selectionSettingHelper(document.getElementById("emissionType"), emmisionType);
				// document.getElementById("vehHeight").value = vehicleHeight;
				// document.getElementById("vehWeight").value = vehicleWeight;
				// document.getElementById("trailerHeight").value = trailerHeight;
				// document.getElementById("totalWeight").value = totalWeight;
				// document.getElementById("totalWidth").value = totalWidth;
				// document.getElementById("totalLength").value = totalLength;
				// selectionSettingHelper(document.getElementById("disabledEquipped"), disabledEquipped);
				// selectionSettingHelper(document.getElementById("minPollution"), minPollution);
				// selectionSettingHelper(document.getElementById("hov"), hov);
				// document.getElementById("nrPassengers").value = numPassengers;
				// selectionSettingHelper(document.getElementById("commercial"), commercial);
				// selectionSettingHelper(document.getElementById("hazardousType"), hazardousType);
				// document.getElementById("heightAbove1stAxle").value = heightAbove1stAxle;
				// selectionSettingHelper(document.getElementById("fuelType"), fuelType);
			}

			/**
			 This method sets the user defined vehicle spec option in the element predefinedVehSpec if
			 the passed parameter is true
			 */
			function setUserdefinedVehicleSpec(bSetUserdefinedVehicleSpec) {

				if (bSetUserdefinedVehicleSpec) {
					// show User defined option
					// var vehSpecSelection = document.getElementById("predefinedVehSpec");
					setpredefinedVehSpec('99')
					// selectionSettingHelper(predefinedVehSpec, 99);
				}
				/*else
				 {
				 // do nothing cause User defined option will hide automatically
				 }*/
			}


			/**
			This method creates the toll marker at the beginning of the passed link
			*/
			function createTollMarker(oneTollStructure) {
				var pos = new H.geo.Point(oneTollStructure.latitude, oneTollStructure.longitude);
				var tollMarker = new H.map.Marker(pos, { icon: tollIcon });
				tollMarker.addEventListener("tap", function () { displayTollStructureName(pos, oneTollStructure.name); });
				group.addObject(tollMarker);
			}

			function displayTollStructureName(position, name) {
				let infoBubble = new H.ui.InfoBubble(position, { content: name });
				ui.addBubble(infoBubble);
			}

			//Function to convert hex format to a rgb color from http://jsfiddle.net/Mottie/xcqpF/1/light/
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


			/**
			 * Function handling the click on the "Enable datetime filtering" checkbox
			 */
			// function handleDateTimeFilteringClicked() {
			// 	var isDTFilteringEnabled = document.getElementById("chkEnableDTFiltering").checked;
			// 	if (isDTFilteringEnabled) {
			// 		//Displaying the date and time input checkboxes
			// 		document.getElementById("trStartRouteDate").style.display = '';
			// 		document.getElementById("trStartRouteTime").style.display = '';
			// 		document.getElementById("trStartRouteActions").style.display = '';
			// 	}
			// 	else {
			// 		//Hiding the date and time input checkboxes
			// 		document.getElementById("trStartRouteDate").style.display = 'none';
			// 		document.getElementById("trStartRouteTime").style.display = 'none';
			// 		document.getElementById("trStartRouteActions").style.display = 'none';
			// 	}

			// }


			/**
				Function handling the click on the "enable/disable cost optimized routing calculation" checkbox
			*/
			const [isDChecked, setisDChecked] = useState(true)
		
			function handleEnableCalculateOptimizedRouteClicked() {
				
				// var isDChecked = document.getElementById("chkEnableCalculateOptimizedRoute").checked;
				if (isDChecked) {
					setisDChecked(!isDChecked);
					noCostOptimizationJustCalculate = false;
					// document.getElementById("routeButton").value = "Calculate Cost Optimized Route";
					setrouteButton("Высчитать оптимальную стоимость маршрута")
				}
				else {
					setisDChecked(!isDChecked);
					noCostOptimizationJustCalculate = true;
					setrouteButton("Рассчитать маршрут без оптимизации")
					// document.getElementById("routeButton").value = "Calculate Route without optimization";
				}
			}


			// Function rounds up number of decimal places
			function roundUp(num, places) {
				return +(Math.round(num + "e+" + places) + "e-" + places);
			}

	
    const applyNowToStartRoute = () =>{
        //Getting now datetime informations
        var now = new Date();
        var day = now.getDate();
        var month = now.getMonth() + 1; //January is 0!
        var year = now.getFullYear();
        var hours = now.getHours()
        var minutes = now.getMinutes()
        var seconds = now.getSeconds()
        //Setting these info in the datetime fields
        setDate(year + '-' + ((month < 10) ? '0' + month : month) + '-' + ((day < 10) ? '0' + day : day));
        setTime(((hours < 10) ? '0' + hours : hours) + ':' + ((minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds));
        
    }
   
	const selectedCustomParam = (value) => {
		setrouterParamsState(' ')
		setrouterParamsValueState(value)
		
	}
	const optionCustomParam = (value) => {
		setrouterParamsState(value);
		setrouterParamsValueState(value)
	}
  return (<>	

	<div id="content-real">

		<div className="ctrl-panel">
			<span id="toggle-ctrl-panel" className="glyphicon glyphicon-menu-left"></span>

			<p id="mapReleaseTxt"> Оптимизированный по стоимости маршрут извлекается из Службы расширения платы за проезд и отображается на экране.
			</p>
			<p>Начало и пункт назначения могут быть геокодированы или выбраны с помощью длинного клика на карте.</p>

			<hr className="separator"/>

			<div className="form-horizontal">
				<div className="form-group">
					<label className="control-label col-sm-3" htmlFor="start">Старт:</label>
					<div className="col-sm-9">
						<input type='text' id='start' className='form-control input-wide'
							value={startValue}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null} onChange={(event)=> setstartValue(event.target.value)}/>
					</div>
				</div>
				<div className="form-group">
					<label className="control-label col-sm-3" htmlFor="dest">Место назначения:</label>
					<div className="col-sm-9">
						<input type='text' id='dest' className='form-control input-wide' size='40' value={DestinationValue}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null} onChange={(event)=> setDestinationValue(event.target.value)} />
					</div>
				</div>
			</div>
            
            <Collapse  onChange={()=> settrStartRouteDate(!trStartRouteDate)}>
            <Panel header="Enable datetime filtering" key="1">
            <div id="trStartRouteDate" className="form-horizontal" >
				<div className="form-group">
					<label className="control-label col-sm-4" htmlFor="startRouteDate">Дата начала маршрута:</label>
					<div className="col-sm-8">
						<input onChange={e=> setDate(e.target.value)} value={dateNow} type="text" id="startRouteDate" className="form-control input-wide"
							name="startRouteDate"/>(гггг-ММ-дд) 
					</div>
				</div>
			</div>
			<div id="trStartRouteTime" className="form-horizontal" >
				<div className="form-group">
					<label className="control-label col-sm-4" htmlFor="startRouteTime">Route start time:</label>
					<div className="col-sm-8">
						<input onChange={e=> setTime(e.target.value)} value={time} type="text" id="startRouteTime" className="form-control input-wide"
							name="startRouteTime"/>(ЧЧ:мм:сс)
					</div>
				</div>
			</div>
			<div id="trStartRouteActions" >
				<div className="form-group">
					<input type="button" className="btn btn-default btn-sm" name="btStartRouteApplyNow"
						value='Применить текущие время и дату' onClick={()=> applyNowToStartRoute()} />
				</div>
			</div>
            </Panel>
            </Collapse>
       
		
          
			<hr className="separator"/>
			<h5>Toll Cost Parameters</h5>

			<table border="0">
			< tbody > 
				<tr>
					<td>Стоимость автомобиля за километр</td>
					<td><input type='text' id='hourVehicleCost' className="form-control" style={{width:85}} value={costPerHour}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null} onChange={(event)=> setcostPerHour(event.target.value)}/></td>
					<td>Стоимость водителя в час</td>
					<td><input type='text' id='hourDriverCost' className="form-control"  style={{width:85}} value={costPerKm}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null} onChange={(event)=> setcostPerKm(event.target.value)}/></td>
				</tr>
				</ tbody > 
				< tbody > 
				<tr>
					<td>Валюта</td>
					<td><input type='text' id='currency' className="form-control"  style={{width:85}} value={currency}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null} onChange={(event)=> setCurrency(event.target.value)}/></td>
				</tr></ tbody > 
			</table>

			<hr className="separator"/>
			<h5>Параметра маршрута</h5>

			<table border="0" className="form-group">
			< tbody > 
				<tr>
					<td>Альтернативные маршруты:</td>
					<td colSpan="3">
						<select id="routeAlternatives" className="form-control" style={{width:312}}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							value={routeAlternatives} onChange={(value)=> setrouteAlternatives(value.target.value)}>
							<option value="0">0</option>
							<option value="1">1</option>
							<option value="2">2</option>
						</select>
					</td>
				</tr>
				</ tbody > 
				< tbody > 
				<tr>
					<td>Спецификация транспортного средства:</td>
					<td colSpan="3">
						<select id="predefinedVehSpec" className="form-control" style={{width:312}}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							// onChange={()=>handleVehicleSpecChanged()}
							value={predefinedVehSpec} onClick={()=>handleVehicleSpecChanged()} onChange={(value)=> {setpredefinedVehSpec(value.target.value);}}>
							<option value="0" >Машина</option>
							<option value="1">Перевозчик</option>
							<option value="2">Грузовик (7.5Т)</option>
							<option value="3">Грузовик (11Т)</option>
							<option value="4">Грузовик с одним прицепом (38Т)</option>
							<option value="5">Грузовик с прицепом (40Т)</option>
							<option value="6">Автомобиль с прицепом</option>
							{/* <!--option value="7">Bus</option>
					<option value="8">Motor Home</option--> */}
							<option value="99" disabled style={{display:'none'}}>Определяемый пользователем</option>
						</select>
					</td>
				</tr>
				</ tbody > 
				< tbody > 
                <tr>
					<td>Пользовательские Параметры:</td>
					
					<td colSpan="2">
						<input type='text' id='routerParamsValue' className="form-control" style={{width:212}} value={routerParamsValueState}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							// onChange={(event)=>{  setrouterParamsValue(event.target.value)}}
							onChange={(event) => {selectedCustomParam(event.target.value); }}
							// onChange="document.getElementById('routerParams').selectedIndex = 2;document.getElementById('routerParams').value=this.value;" 
							/>
					</td>

					<td>
						<select id="routerParams" className="form-control" style={{width:89}}
							value={routerParamsState}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							onChange={(event) => optionCustomParam(event.target.value)}
							// onChange="document.getElementById('routerParamsValue').value=this.value;" 
							>
						<option value=" ">Пустой</option>
						<option 
							value="verbosemode=0&metricsystem=metric&maneuverAttributes=none&mode=shortest;car&jsonattributes=41&combinechange=true&linkAttributes=none,sh&legAttributes=none,li&language=en-us&alternatives=3">
							Управляемый
							</option>
						<option  value="param1=value1&param2=value2" >Пользовательские</option>
						</select> 
                  
					</td>
				</tr>
				</ tbody > 
				< tbody > 
				<tr>
					<td>Транспортное средство</td>
					<td>
						<select id="vehicles" className="form-control" style={{width:89}}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							onChange={(value)=> {setUserdefinedVehicleSpec(true); setvehicles(value.target.value)  }}
							value={vehicles}>
							{/* <!--option value="1">Motorcycle</option--> */}
							<option value="2">Машина</option>
							 <option value="3">Грузовик</option>
			
						</select>
					</td>
					<td>Общее Количество Шин</td>
					<td><input type='text' id='nrOfTotalTires' className="form-control" style={{width:85}} value={nrOfTotalTires}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							onChange={(event)=> {setUserdefinedVehicleSpec(true); setnrOfTotalTires(event.target.value)}} /></td>
				</tr>
				</ tbody > 
				< tbody > 
				<tr>
					<td>Тип прицепа</td>
					<td>
						<select id="trailerType" className="form-control" style={{width:89}}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							onChange={(value)=>{setUserdefinedVehicleSpec(true); settrailerType(value.target.value)}}
							value={trailerType}>
							<option value="0">Нет</option>
							<option value="1">Караван</option>
							<option value="2">Прицеп</option>
						</select>
					</td>
					<td>Количество прицепов</td>
					<td>
						<select id="trailerNr" className="form-control" style={{width:89}}
							value={trailerNr}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							onChange={(event)=>{setUserdefinedVehicleSpec(true); settrailerNr(event.target.value)}}
							value={trailerNr}>
							<option value="0">0</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3 или больше</option>
						</select>
					</td>
				</tr>
				</ tbody > 
				< tbody > 
				<tr>
					<td>Количество Осей Транспортного Средства</td>
					<td><input type='text' id='nrOfAxlesVehicle' className="form-control" style={{width:85}} value={nrOfAxlesVehicle}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							onChange={(event)=> {setUserdefinedVehicleSpec(true); setnrOfAxlesVehicle(event.target.value)}} /></td>
					<td>Количество Осей Прицепа</td>
					<td><input type='text' id='nrOfAxlesTrailer' className="form-control" style={{width:85}} value={nrOfAxlesTrailer}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							onChange={(event)=> {setUserdefinedVehicleSpec(true); setnrOfAxlesTrailer(event.target.value)}} /></td>
				</tr>
				</ tbody > 
				< tbody > 
				<tr>
					<td>Гибридный</td>
					<td>
						<select id="hybrid" className="form-control" style={{width:89}}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							onChange={(value)=>{setUserdefinedVehicleSpec(true); sethybrid(value.target.value)}}
							value={hybrid}>
							<option value="0" >Да</option>
							<option value="1">Нет</option>
						</select>
					</td>
					<td>Тип эмиссии</td>
					<td>
						<select id="emissionType" className="form-control" style={{width:89}}
						value={emissionType}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							onChange={(event)=>{setUserdefinedVehicleSpec(true); setemissionType(event.target.value)}}
							value={"5"}>
							<option value="1">EURO I</option>
							<option value="2">EURO II</option>
							<option value="3">EURO III</option>
							<option value="4">EURO IV</option>
							<option value="5" >EURO V</option>
							<option value="6">EURO VI</option>
							<option value="7">EURO EEV</option>
							<option value="8">Электромобиль</option>
						</select>
					</td>
				</tr>
				</ tbody > 
				< tbody > 
				<tr>
					<td>Высота транспортного средства</td>
					<td><input type='text' id='vehHeight' className="form-control" style={{width:85}} value={vehHeight}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							onChange={(event)=> {setUserdefinedVehicleSpec(true); setvehHeight(event.target.value)} }/></td>
					<td>Высота прицепа</td>
					<td><input type='text' id='trailerHeight' className="form-control" style={{width:85}} value={trailerHeight}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							onChange={(event)=> {setUserdefinedVehicleSpec(true); settrailerHeight(event.target.value)} } /></td>
				</tr>
				</ tbody > 
				< tbody > 
				<tr>
					<td>Масса транспортного средства</td>
					<td><input type='text' id='vehWeight' className="form-control" style={{width:85}} value={vehWeight}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							onChange={(event)=> {setUserdefinedVehicleSpec(true); setvehWeight(event.target.value)} } /></td>
					<td>Общий Вес</td>
					<td><input type='text' id='totalWeight' className="form-control" style={{width:85}} value={totalWeight}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							onChange={(event)=> {setUserdefinedVehicleSpec(true); settotalWeight(event.target.value)} } /></td>
				</tr>
				</ tbody > 
				< tbody > 
				<tr>
					<td>Общая Ширина</td>
					<td><input type='text' id='totalWidth' className="form-control" style={{width:85}} value={totalWidth}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							onChange={(event)=> {setUserdefinedVehicleSpec(true); settotalLength(event.target.value)} } /></td>
					<td>Общая Длина</td>
					<td><input type='text' id='totalLength' className="form-control" style={{width:85}} value={totalLength}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							onChange={(event)=> {setUserdefinedVehicleSpec(true); settotalWidth(event.target.value)} } /></td>
				</tr>
				</ tbody > 
				< tbody > 
				<tr>
					<td>Инвалиды Оборудованы</td>
					<td>
						<select id="disabledEquipped" className="form-control" style={{width:89}}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							onChange={(value)=>{setUserdefinedVehicleSpec(true); setdisabledEquipped(value.target.value)}}
							value={disabledEquipped}>
							<option value="0" >Нет</option>
							<option value="1">Да</option>
						</select>
					</td>
					<td>Минимальное Загрязнение</td>
					<td>
						<select id="minPollution" className="form-control" style={{width:89}}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							onChange={(value)=>{setUserdefinedVehicleSpec(true); setminPollution(value.target.value)}}
							value={minPollution}>
							<option value="0">Нет</option>
							<option value="1">Дп</option>
						</select>
					</td>
				</tr>
				</ tbody > 
				< tbody > 
				<tr>
					<td>ХОВ</td>
					<td>
						<select id="hov" className="form-control" style={{width:89}}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							onChange={(value)=>{setUserdefinedVehicleSpec(true); sethov(value.target.value)}}
							value={hov}>
							<option value="0" >Нет</option>
							<option value="1">Да</option>
						</select>
					</td>
					<td>Количество пассажиров</td>
					<td><input type='text' id='nrPassengers' className="form-control" style={{width:85}} value={nrPassengers}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							onChange={(event) =>{setUserdefinedVehicleSpec(true); setnrPassengers(event.target.value)}} /></td>
				</tr>
				</ tbody > 
				< tbody > 
				<tr>
					<td>Коммерческий</td>
					<td>
						<select id="commercial" className="form-control" style={{width:89}}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							onChange={(value)=>{setUserdefinedVehicleSpec(true); setcommercial(value.target.value)}}
							value={commercial}>
							<option value="0" >Нет</option>
							<option value="1">Да</option>
						</select>
					</td>
					<td>Опасный Тип</td>
					<td>
						<select id="hazardousType" className="form-control" style={{width:89}}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							onChange={(value)=>{setUserdefinedVehicleSpec(true); sethazardousType(value.target.value)}}
							value={hazardousType}>
							<option value="0" >Нет</option>
							<option value="1">Взрывчатый</option>
							<option value="2">Любые Опасные Материалы</option>
						</select>
					</td>
				</tr>
				</ tbody > 
				< tbody > 
				<tr>
					<td>Высота над 1-й осью</td>
					<td>
						<input type='text' id='heightAbove1stAxle' className="form-control" style={{width:85}} value={heightAbove1stAxle}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							onChange={(event) =>{setUserdefinedVehicleSpec(true); setheightAbove1stAxle(event.target.value)}} />
					</td>
					<td>Тип бензина</td>
					<td>
						<select id="fuelType" className="form-control" style={{width:89}}
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null}
							onChange={(value)=>{setUserdefinedVehicleSpec(true); setfuelType(value.target.value)}}
							value={fuelType}>
							<option value="petrol" >Бензин</option>
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
				</ tbody > 
			</table>
			<p>Все параметры длины и веса должны быть в сантиметрах и килограммах.</p>
			<div className="form-group">
				<div className="checkbox">
					<label><input type="checkbox" defaultChecked={isDChecked} id="chkEnableCalculateOptimizedRoute"
							name="chkEnableCalculateOptimizedRoute"
							onClick={()=>handleEnableCalculateOptimizedRouteClicked()}/>Включение/Выключение оптимизированного маршрута
							расчет</label>
				</div>
			</div>
			<table border="0" className="form-group">
			< tbody > 
				<tr>
					<td><input type="submit"  id="routeButton" className="btn btn-default btn-sm"
							value={routeButton} onClick={()=> startRouteCalculation()}/></td>
					<td><input type="submit" id="cloneButton" className="btn btn-default btn-sm"
							value="Открыть в новой вкладке" onClick={()=>cloneSettingsInNewWindow()} /></td>
				</tr>
				</ tbody > 
			</table>
			<table border="0">
			< tbody > 
				<tr>
					<td>URL</td>
					<td><input type='text' id='serverURL' className="form-control" style={{width:380}}
							value='https://fleet.ls.hereapi.com/2/calculateroute.json?'
							onKeyDown={(event) => event.keyCode == 13? startRouteCalculation(): null} onChange={(value)=> setserverURL(value)}/></td>
							 
				</tr>
				</ tbody > 
			</table>
			<br /> 
			<ResultCostOptimRoute />
			<div id="feedbackTxt" dangerouslySetInnerHTML={createMarkup()} className="form-group">
                
				</div>
		</div>

        </div>
       
    </>
  );
};

export default CostOptimRoute;
