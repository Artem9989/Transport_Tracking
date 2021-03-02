import React, { useState } from "react";
import { Collapse } from 'antd';
import ResultCostOptimRoute from './ResultOptimRoute/ResultOptimRoute.jsx';
import { config } from '../../../assets/config';
import svgMarkerImage_Line from '../InfoControl/LUI-icon-pd-information-solid-24.svg';

const { Panel } = Collapse;

export const createMarkup = (htmlValue) => {

	return {__html: `${htmlValue}`};
  }

const CostOptimRoute = (props) => {


    const [trStartRouteDate, settrStartRouteDate] = useState(false);
    const [dateNow, setDate] = useState('');
    const [time, setTime] = useState('');
    // const [serverURL, setserverURL] = useState('')




			/*
			* authors ez,ah,mc
			* (C) HERE 2015
			*
			* This is an example implementation of the route toll cost calculation offered by HERE.
			* With a calculated route the route toll cost calculation service gets called and the
			* response is presented in a summary.
			* Please note that not all possible details of the route toll cost service is analysed
			* by this demo.
			*
			* Cause JS has the limitations of GET request URL length there are several calls done to
			* the route toll cost service. The route (links) gets split in overlapping segments.
			* If they would not overlap you could loose toll informations which are only present between
			* specific segments (links). Since the route toll cost service responds possibly with
			* the same toll on the same links - the result gets post-processed to exclude the double
			* toll costs. This limitation does not exists using POST or GET within other applications.
			// author asadovoy
			// (C) HERE 2019 -> migrate to 3.1
			*/
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
			var secure = (window.location.protocol === 'https:') ? true : false;

			var platform = new H.service.Platform({
				apikey: config.apikey,
				useHTTPS: secure
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
			map.getViewPort().setPadding(0, 0, 0, ('.ctrl-panel').width());

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

			var routeButton = document.getElementById("routeButton");
			var start = document.getElementById("start");
			var dest = document.getElementById("dest");
			var mapReleaseTxt = document.getElementById("mapReleaseTxt");
			var pos;
			var address;
			var line1;
			var line2;
			var vehicles;
// =---------------------------
			var serverURL = 'https://fleet.ls.hereapi.com/2/calculateroute.json?';
			var vehWeight;
			var vehHeight;
			var trailerNr;
			var nrOfAxlesVehicle;
			var nrOfAxlesTrailer;
			var emissionType;
			var nrPassengers;
			var nrOfTotalTires;

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
			handleEnableCalculateOptimizedRouteClicked();

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
				clearLastRouteCalculation();
				geocode(start.value, true);
			}
			routeButton.onclick = startRouteCalculation;

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
			function selectionSettingHelper(selection, value) {
				for (var opt, j = 0; opt = selection.options[j]; j++) {
					if (opt.value == value) {
						selection.selectedIndex = j;
						break;
					}
				}
			}

			/*********************************
			 Vehicle Specification
			 *********************************/
			/**
			 This method checks the user setted vehicle specification and adapts all vehicle value in the GUI
			 */
			var vehicle = 2;
			var totalNumTires = 4;
			var trailerType = 0;
			var trailerNum = 0;
			var vehicleNumAxles = 2;
			var trailerNumAxles = 0;
			var hybrid = 0;
			var emmisionType = 5;
			var vehicleHeight = 167;
			var vehicleWeight = 1739;
			var trailerHeight = 0;
			var totalWeight = 1739;
			var totalWidth = 180;
			var totalLength = 441;
			var disabledEquipped = 0;
			var minPollution = 0;
			var hov = 0;
			var numPassengers = 2;
			var commercial = 0;
			var hazardousType = 0;
			var heightAbove1stAxle = 100;
			var fuelType = 'petrol';
			function handleVehicleSpecChanged() {
				setUserdefinedVehicleSpec(false);
				var vehicle = 2;
				var totalNumTires = 4;
				var trailerType = 0;
				var trailerNum = 0;
				var vehicleNumAxles = 2;
				var trailerNumAxles = 0;
				var hybrid = 0;
				var emmisionType = 5;
				var vehicleHeight = 167;
				var vehicleWeight = 1739;
				var trailerHeight = 0;
				var totalWeight = 1739;
				var totalWidth = 180;
				var totalLength = 441;
				var disabledEquipped = 0;
				var minPollution = 0;
				var hov = 0;
				var numPassengers = 2;
				var commercial = 0;
				var hazardousType = 0;
				var heightAbove1stAxle = 100;
				var fuelType = 'petrol';

				var vehSpecSelection = document.getElementById("predefinedVehSpec");
				if (vehSpecSelection.value == 0) // Car
				{
					vehicle = 2;
					totalNumTires = 4;
					trailerType = 0;
					trailerNum = 0;
					vehicleNumAxles = 2;
					trailerNumAxles = 0;
					hybrid = 0;
					emmisionType = 5;
					vehicleHeight = 167;
					vehicleWeight = 1739;
					trailerHeight = 0;
					totalWeight = 1739;
					totalWidth = 180;
					totalLength = 441;
					disabledEquipped = 0;
					minPollution = 0;
					hov = 0;
					numPassengers = 2;
					commercial = 0;
					hazardousType = 0;
					heightAbove1stAxle = 100;
					fuelType = 'diesel';
				}
				else if (vehSpecSelection.value == 1) // Transporter
				{
					vehicle = 2;
					totalNumTires = 4;
					trailerType = 0;
					trailerNum = 0;
					vehicleNumAxles = 2;
					trailerNumAxles = 0;
					hybrid = 0;
					emmisionType = 5;
					vehicleHeight = 255;
					vehicleWeight = 3500;
					trailerHeight = 0;
					totalWeight = 3500;
					totalWidth = 194;
					totalLength = 652;
					disabledEquipped = 0;
					minPollution = 0;
					hov = 0;
					numPassengers = 1;
					commercial = 1;
					hazardousType = 0;
					heightAbove1stAxle = 130;
					fuelType = 'diesel';
				}
				else if (vehSpecSelection.value == 2) // Truck 7.5t
				{
					vehicle = 3;
					totalNumTires = 4;
					trailerType = 0;
					trailerNum = 0;
					vehicleNumAxles = 2;
					trailerNumAxles = 0;
					hybrid = 0;
					emmisionType = 5;
					vehicleHeight = 340;
					vehicleWeight = 7500;
					trailerHeight = 0;
					totalWeight = 7500;
					totalWidth = 250;
					totalLength = 720;
					disabledEquipped = 0;
					minPollution = 0;
					hov = 0;
					numPassengers = 1;
					commercial = 1;
					hazardousType = 0;
					heightAbove1stAxle = 300;
					fuelType = 'diesel';
				}
				else if (vehSpecSelection.value == 3) // Truck 11t
				{
					vehicle = 3;
					totalNumTires = 6;
					trailerType = 0;
					trailerNum = 0;
					vehicleNumAxles = 2;
					trailerNumAxles = 0;
					hybrid = 0;
					emmisionType = 5;
					vehicleHeight = 380;
					vehicleWeight = 11000;
					trailerHeight = 0;
					totalWeight = 11000;
					totalWidth = 255;
					totalLength = 1000;
					disabledEquipped = 0;
					minPollution = 0;
					hov = 0;
					numPassengers = 1;
					commercial = 1;
					hazardousType = 0;
					heightAbove1stAxle = 300;
					fuelType = 'diesel';
				}
				else if (vehSpecSelection.value == 4) // Truck one trailer 38t
				{
					vehicle = 3;
					totalNumTires = 10;
					trailerType = 2;
					trailerNum = 1;
					vehicleNumAxles = 2;
					trailerNumAxles = 3;
					hybrid = 0;
					emmisionType = 5;
					vehicleHeight = 400;
					vehicleWeight = 24000;
					trailerHeight = 400;
					totalWeight = 38000;
					totalWidth = 255;
					totalLength = 1800;
					disabledEquipped = 0;
					minPollution = 0;
					hov = 0;
					numPassengers = 1;
					commercial = 1;
					hazardousType = 0;
					heightAbove1stAxle = 300;
					fuelType = 'diesel';
				}
				else if (vehSpecSelection.value == 5) // Trailer Truck 40t
				{
					vehicle = 3;
					totalNumTires = 14;
					trailerType = 2;
					trailerNum = 1;
					vehicleNumAxles = 3;
					trailerNumAxles = 2;
					hybrid = 0;
					emmisionType = 5;
					vehicleHeight = 400;
					vehicleWeight = 12000;
					trailerHeight = 400;
					totalWeight = 40000;
					totalWidth = 255;
					totalLength = 1650;
					disabledEquipped = 0;
					minPollution = 0;
					hov = 0;
					numPassengers = 1;
					commercial = 1;
					hazardousType = 0;
					heightAbove1stAxle = 300;
					fuelType = 'diesel';
				}
				else if (vehSpecSelection.value == 6) // Car with Trailer
				{
					vehicle = 2;
					totalNumTires = 6;
					trailerType = 2;
					trailerNum = 1;
					vehicleNumAxles = 2;
					trailerNumAxles = 1;
					hybrid = 0;
					emmisionType = 5;
					vehicleHeight = 167;
					vehicleWeight = 1739;
					trailerHeight = 167;
					totalWeight = 2589;
					totalWidth = 180;
					totalLength = 733;
					disabledEquipped = 0;
					minPollution = 0;
					hov = 0;
					numPassengers = 1;
					commercial = 0;
					hazardousType = 0;
					heightAbove1stAxle = 100;
					fuelType = 'diesel';
				}
				else if (vehSpecSelection.value == 7) // Bus
				{
					vehicle = 3;
					totalNumTires = 6;
					trailerType = 0;
					trailerNum = 0;
					vehicleNumAxles = 3;
					trailerNumAxles = 0;
					hybrid = 0;
					emmisionType = 5;
					vehicleHeight = 371;
					vehicleWeight = 17500;
					trailerHeight = 0;
					totalWeight = 17500;
					totalWidth = 253;
					totalLength = 1300;
					disabledEquipped = 0;
					minPollution = 0;
					hov = 0;
					numPassengers = 51;
					commercial = 1;
					hazardousType = 0;
					heightAbove1stAxle = 300;
					fuelType = 'diesel';
				}
				else if (vehSpecSelection.value == 8) // Motor Home
				{
					vehicle = 3;
					totalNumTires = 4;
					trailerType = 0;
					trailerNum = 0;
					vehicleNumAxles = 2;
					trailerNumAxles = 0;
					hybrid = 0;
					emmisionType = 5;
					vehicleHeight = 372;
					vehicleWeight = 4535;
					trailerHeight = 0;
					totalWeight = 4535;
					totalWidth = 254;
					totalLength = 760;
					disabledEquipped = 0;
					minPollution = 0;
					hov = 0;
					numPassengers = 4;
					commercial = 0;
					hazardousType = 0;
					heightAbove1stAxle = 140;
					fuelType = 'diesel';
				}

				selectionSettingHelper(document.getElementById("vehicles"), vehicle);
				document.getElementById("nrOfTotalTires").value = totalNumTires;
				selectionSettingHelper(document.getElementById("trailerType"), trailerType);
				selectionSettingHelper(document.getElementById("trailerNr"), trailerNum);
				document.getElementById("nrOfAxlesVehicle").value = vehicleNumAxles;
				document.getElementById("nrOfAxlesTrailer").value = trailerNumAxles;
				selectionSettingHelper(document.getElementById("hybrid"), hybrid);
				selectionSettingHelper(document.getElementById("emissionType"), emmisionType);
				document.getElementById("vehHeight").value = vehicleHeight;
				document.getElementById("vehWeight").value = vehicleWeight;
				document.getElementById("trailerHeight").value = trailerHeight;
				document.getElementById("totalWeight").value = totalWeight;
				document.getElementById("totalWidth").value = totalWidth;
				document.getElementById("totalLength").value = totalLength;
				selectionSettingHelper(document.getElementById("disabledEquipped"), disabledEquipped);
				selectionSettingHelper(document.getElementById("minPollution"), minPollution);
				selectionSettingHelper(document.getElementById("hov"), hov);
				document.getElementById("nrPassengers").value = numPassengers;
				selectionSettingHelper(document.getElementById("commercial"), commercial);
				selectionSettingHelper(document.getElementById("hazardousType"), hazardousType);
				document.getElementById("heightAbove1stAxle").value = heightAbove1stAxle;
				selectionSettingHelper(document.getElementById("fuelType"), fuelType);
			}

			/**
			 This method sets the user defined vehicle spec option in the element predefinedVehSpec if
			 the passed parameter is true
			 */
			function setUserdefinedVehicleSpec(bSetUserdefinedVehicleSpec) {
				if (bSetUserdefinedVehicleSpec) {
					// show User defined option
					var vehSpecSelection = document.getElementById("predefinedVehSpec");
					selectionSettingHelper(vehSpecSelection, 99);
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
			function handleEnableCalculateOptimizedRouteClicked() {
				var isDChecked = document.getElementById("chkEnableCalculateOptimizedRoute").checked;
				if (isDChecked) {
					noCostOptimizationJustCalculate = false;
					document.getElementById("routeButton").value = "Calculate Cost Optimized Route";
				}
				else {
					noCostOptimizationJustCalculate = true;
					document.getElementById("routeButton").value = "Calculate Route without optimization";
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
   
  return (<>	

	<div id="content-real">

		<div className="ctrl-panel">
			<span id="toggle-ctrl-panel" className="glyphicon glyphicon-menu-left"></span>

			<p id="mapReleaseTxt"> The cost optimized route is retrieved from Toll Cost Extension Service and displayed.
			</p>
			<p>The start and destination can be geocoded or selected via long click in map.</p>

			<hr className="separator"/>

			<div className="form-horizontal">
				<div className="form-group">
					<label className="control-label col-sm-3" for="start">Start:</label>
					<div className="col-sm-9">
						<input type='text' id='start' className='form-control input-wide'
							value='am Kronberger Hang 8, Schwalbach'
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"/>
					</div>
				</div>
				<div className="form-group">
					<label className="control-label col-sm-3" for="dest">Destination:</label>
					<div className="col-sm-9">
						<input type='text' id='dest' className='form-control input-wide' size='40' value='Frankfurt am Main'
							onkeydown="if (event.keyCode == 13)startRouteCalculation();" />
					</div>
				</div>
			</div>
            
            <Collapse  onChange={()=> settrStartRouteDate(!trStartRouteDate)}>
            <Panel header="Enable datetime filtering" key="1">
            <div id="trStartRouteDate" className="form-horizontal" >
				<div className="form-group">
					<label className="control-label col-sm-4" for="startRouteDate">Route start date:</label>
					<div className="col-sm-8">
						<input onChange={e=> setDate(e.target.value)} value={dateNow} type="text" id="startRouteDate" className="form-control input-wide"
							name="startRouteDate"/>(yyyy-MM-dd) 
					</div>
				</div>
			</div>
			<div id="trStartRouteTime" className="form-horizontal" >
				<div className="form-group">
					<label className="control-label col-sm-4" for="startRouteTime">Route start time:</label>
					<div className="col-sm-8">
						<input onChange={e=> setTime(e.target.value)} value={time} type="text" id="startRouteTime" className="form-control input-wide"
							name="startRouteTime"/>(HH:mm:ss)
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
				<tr>
					<td>Vehicle Cost per Km</td>
					<td><input type='text' id='hourVehicleCost' className="form-control" style={{width:85}} value='0.50'
							onkeydown="if (event.keyCode == 13)startRouteCalculation();" /></td>
					<td>Driver Cost per Hour</td>
					<td><input type='text' id='hourDriverCost' className="form-control"  style={{width:85}} value='10'
							onkeydown="if (event.keyCode == 13)startRouteCalculation();" /></td>
				</tr>
				<tr>
					<td>Currency</td>
					<td><input type='text' id='currency' className="form-control"  style={{width:85}} value='EUR'
							onkeydown="if (event.keyCode == 13)startRouteCalculation();" /></td>
				</tr>
			</table>

			<hr className="separator"/>
			<h5>Router Parameters</h5>

			<table border="0" className="form-group">
				<tr>
					<td>Route Alternatives:</td>
					<td colspan="3">
						<select id="routeAlternatives" className="form-control" style={{width:312}}
							onkeydown="if (event.keyCode == 13)startRouteCalculation();">
							<option value="0">0</option>
							<option value="1" selected="true">1</option>
							<option value="2">2</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>Vehicle Specification:</td>
					<td colspan="3">
						<select id="predefinedVehSpec" className="form-control" style={{width:312}}
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"
							onchange={()=>handleVehicleSpecChanged()}>
							<option value="0" selected="true">Car</option>
							<option value="1">Transporter</option>
							<option value="2">Truck (7.5t)</option>
							<option value="3">Truck (11t)</option>
							<option value="4">Truck with one trailer (38t)</option>
							<option value="5">Trailer Truck (40t)</option>
							<option value="6">Car with Trailer</option>
							{/* <!--option value="7">Bus</option>
					<option value="8">Motor Home</option--> */}
							<option value="99" disabled style={{display:'none'}}>User defined</option>
						</select>
					</td>
				</tr>

                <tr>
					<td>Custom Parameters:</td>
					<td colspan="2">
						<input type='text' id='routerParamsValue' class="form-control" style={{width:212}} value=''
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"
							onchange="document.getElementById('routerParams').selectedIndex = 2;document.getElementById('routerParams').value=this.value;" />
					</td>
					<td>
						{/* <select id="routerParams" class="form-control" style={{width:89}}
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"
							onchange="document.getElementById('routerParamsValue').value=this.value;" />
						<option value="" selected>Empty</option>
						<option
							value="verbosemode=0&metricsystem=metric&maneuverAttributes=none&mode=shortest;car&jsonattributes=41&combinechange=true&linkAttributes=none,sh&legAttributes=none,li&language=en-us&alternatives=3">
							Managed
						<option value="">Custom</option>
						{/* <!--option value="param1=value1&param2=value2" selected>Example</option--> */}
						{/* </select> */} 
                  
					</td>
				</tr>


				<tr>
					<td>Vehicle</td>
					<td>
						<select id="vehicles" className="form-control" style={{width:89}}
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"
							onchange="setUserdefinedVehicleSpec(true)">
							{/* <!--option value="1">Motorcycle</option-->
							{/* <option value="2" selected="true">Car</option>
							<option value="3">Truck</option> */}
							{/* <!--option value="4">Motor Home</option>
					<option value="5">Minibus</option>
					<option value="6">Bus</option>
					<option value="7">Motorcycle Sidecar</option>
					<option value="8">Tricycle</option>
					<option value="9">Delivery Truck</option>
					<option value="10">Snowmobile</option>
					<option value="11">Pick-Up</option>
					<option value="12">Tractor</option
					<option value="13">Taxi</option>
					<option value="14">HCM/EME</option>--> */}
						</select>
					</td>
					<td>Total Number Of Tires</td>
					<td><input type='text' id='nrOfTotalTires' className="form-control" style={{width:85}} value='4'
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"
							onchange="setUserdefinedVehicleSpec(true)" /></td>
				</tr>
				<tr>
					<td>Trailer Type</td>
					<td>
						<select id="trailerType" className="form-control" style={{width:89}}
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"
							onchange="setUserdefinedVehicleSpec(true)">
							<option value="0" selected="true">None</option>
							<option value="1">Caravan</option>
							<option value="2">Trailer</option>
						</select>
					</td>
					<td>Trailer Number</td>
					<td>
						<select id="trailerNr" className="form-control" style={{width:89}}
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"
							onchange="setUserdefinedVehicleSpec(true)">
							<option value="0" selected="true">0</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3 or more</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>Vehicle Number Of Axles</td>
					<td><input type='text' id='nrOfAxlesVehicle' className="form-control" style={{width:85}} value='2'
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"
							onchange="setUserdefinedVehicleSpec(true)" /></td>
					<td>Trailer Number Of Axles</td>
					<td><input type='text' id='nrOfAxlesTrailer' className="form-control" style={{width:85}} value='0'
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"
							onchange="setUserdefinedVehicleSpec(true)" /></td>
				</tr>
				<tr>
					<td>Hybrid</td>
					<td>
						<select id="hybrid" className="form-control" style={{width:89}}
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"
							onchange="setUserdefinedVehicleSpec(true)">
							<option value="0" selected="true">No Hybrid</option>
							<option value="1">Hybrid</option>
						</select>
					</td>
					<td>Emission Type</td>
					<td>
						<select id="emissionType" className="form-control" style={{width:89}}
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"
							onchange="setUserdefinedVehicleSpec(true)">
							<option value="1">EURO I</option>
							<option value="2">EURO II</option>
							<option value="3">EURO III</option>
							<option value="4">EURO IV</option>
							<option value="5" selected="true">EURO V</option>
							<option value="6">EURO VI</option>
							<option value="7">EURO EEV</option>
							<option value="8">Electric Vehicle</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>Vehicle Height</td>
					<td><input type='text' id='vehHeight' className="form-control" style={{width:85}} value='167'
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"
							onchange="setUserdefinedVehicleSpec(true)" /></td>
					<td>Trailer Height</td>
					<td><input type='text' id='trailerHeight' className="form-control" style={{width:85}} value='0'
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"
							onchange="setUserdefinedVehicleSpec(true)" /></td>
				</tr>
				<tr>
					<td>Vehicle Weight</td>
					<td><input type='text' id='vehWeight' className="form-control" style={{width:85}} value='1739'
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"
							onchange="setUserdefinedVehicleSpec(true)" /></td>
					<td>Total Weight</td>
					<td><input type='text' id='totalWeight' className="form-control" style={{width:85}} value='1739'
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"
							onchange="setUserdefinedVehicleSpec(true)" /></td>
				</tr>
				<tr>
					<td>Total Width</td>
					<td><input type='text' id='totalWidth' className="form-control" style={{width:85}} value='180'
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"
							onchange="setUserdefinedVehicleSpec(true)" /></td>
					<td>Total Length</td>
					<td><input type='text' id='totalLength' className="form-control" style={{width:85}} value='441'
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"
							onchange="setUserdefinedVehicleSpec(true)" /></td>
				</tr>
				<tr>
					<td>Disabled Equipped</td>
					<td>
						<select id="disabledEquipped" className="form-control" style={{width:89}}
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"
							onchange="setUserdefinedVehicleSpec(true)">
							<option value="0" selected="true">No</option>
							<option value="1">Yes</option>
						</select>
					</td>
					<td>Min Pollution</td>
					<td>
						<select id="minPollution" className="form-control" style={{width:89}}
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"
							onchange="setUserdefinedVehicleSpec(true)">
							<option value="0" selected="true">No</option>
							<option value="1">Yes</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>HOV</td>
					<td>
						<select id="hov" className="form-control" style={{width:89}}
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"
							onchange="setUserdefinedVehicleSpec(true)">
							<option value="0" selected="true">No</option>
							<option value="1">Yes</option>
						</select>
					</td>
					<td>Number Passengers</td>
					<td><input type='text' id='nrPassengers' className="form-control" style={{width:85}} value='2'
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"
							onchange="setUserdefinedVehicleSpec(true)" /></td>
				</tr>
				<tr>
					<td>Commercial</td>
					<td>
						<select id="commercial" className="form-control" style={{width:89}}
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"
							onchange="setUserdefinedVehicleSpec(true)">
							<option value="0" selected="true">No</option>
							<option value="1">Yes</option>
						</select>
					</td>
					<td>Hazardous Type</td>
					<td>
						<select id="hazardousType" className="form-control" style={{width:89}}
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"
							onchange="setUserdefinedVehicleSpec(true)">
							<option value="0" selected="true">None</option>
							<option value="1">Explosives</option>
							<option value="2">Any Hazardous Material</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>Height above 1st axle</td>
					<td>
						<input type='text' id='heightAbove1stAxle' className="form-control" style={{width:85}} value='100'
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"
							onchange="setUserdefinedVehicleSpec(true)" />
					</td>
					<td>Fuel Type</td>
					<td>
						<select id="fuelType" className="form-control" style={{width:89}}
							onkeydown="if (event.keyCode == 13)startRouteCalculation();"
							onchange="setUserdefinedVehicleSpec(true)">
							<option value="petrol" selected="true">Petrol</option>
							<option value="diesel">Diesel</option>
							<option value="lng">LNG</option>
							<option value="lpg">LPG</option>
							<option value="cng">CNG</option>
							<option value="ethanol">Ethanol</option>
							<option value="propane">Propane</option>
							<option value="hydrogen">Hydrogen</option>
							<option value="electric">Electric</option>
						</select>
					</td>
				</tr>
			</table>
			<p>All length and weight settings must be in centimeter and kilograms.</p>
			<div className="form-group">
				<div className="checkbox">
					<label><input type="checkbox" checked="true" id="chkEnableCalculateOptimizedRoute"
							name="chkEnableCalculateOptimizedRoute"
							onclick="handleEnableCalculateOptimizedRouteClicked()"/>Enable/Disable optimized route
						calculation</label>
				</div>
			</div>
			<table border="0" className="form-group">
				<tr>
					<td><input type="submit" id="routeButton" className="btn btn-default btn-sm"
							value="Высчитать стоимость дороги" /></td>
					<td><input type="submit" id="cloneButton" className="btn btn-default btn-sm"
							value="Открыть в новой вкладке" onclick={()=>cloneSettingsInNewWindow()} /></td>
				</tr>
			</table>
			<table border="0">
				<tr>
					<td>URL</td>
					<td><input type='text' id='serverURL' className="form-control" style={{width:380}}
							value='https://fleet.ls.hereapi.com/2/calculateroute.json?'
							onkeydown="if (event.keyCode == 13)startRouteCalculation();" /></td>
							 {/* onChange={(value)=> setserverURL(value)} */}
				</tr>
			</table>
			<br /> 
			<ResultCostOptimRoute />
			<div id="feedbackTxt" dangerouslySetInnerHTML={createMarkup()} class="form-group">
                
				</div>
		</div>

        </div>
       
    </>
  );
};

export default CostOptimRoute;
