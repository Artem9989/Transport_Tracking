
  
  // Initialize the platform object:
  var platform = new H.service.Platform({
    'apikey': 'sAR34-R5unCz4RhUywXkiVOV5QTf_B0OMhyhYhUnFJ8'
  });

  // Obtain the default map types from the platform object
  var maptypes = platform.createDefaultLayers();

  // Instantiate (and display) a map object:
  var map = new H.Map(
    document.getElementById('YMapsID'),
    maptypes.vector.normal.map,
    {
      zoom: 14,
      center: { lng: 55.9678, lat: 54.7431 },
    });
    window.addEventListener('resize', () => map.getViewPort().resize());
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    
    var ui = H.ui.UI.createDefault(map, maptypes, 'ru-RU');

    var mapSettings = ui.getControl('mapsettings');
    var zoom = ui.getControl('zoom');
    mapSettings.setAlignment('top-right');
    zoom.setAlignment('top-right');
    
    var bubble = new H.ui.InfoBubble({ lng: 55.9678, lat: 54.7431 }, {
      content: '<b>Hello World, this UFA!</b>'
   });

    // Add info bubble to the UI:
    ui.addBubble(bubble);

    var service = platform.getSearchService();

// Call the geocode method with the geocoding parameters,
// the callback and an error callback function (called if a
// communication error occurs):
service.geocode({
  q: 'Уфа, Карла маркса 13'
}, (result) => {
  // Add a marker for each location found
  result.items.forEach((item) => {
    map.addObject(new H.map.Marker(item.position));
  });
}, alert);

var service = platform.getSearchService();

// Call the reverse geocode method with the geocoding parameters,
// the callback and an error callback function (called if a
// communication error occurs):
service.reverseGeocode({
  at: '54.7431,55.9678'
}, (result) => {
  result.items.forEach((item) => {
    // Assumption: ui is instantiated
    // Create an InfoBubble at the returned location with
    // the address as its contents:
    ui.addBubble(new H.ui.InfoBubble(item.position, {
      content: item.address.label
    }));
  });
}, alert);

var service = platform.getSearchService();

// Call the "autosuggest" method with the search parameters,
// the callback and an error callback function (called if a
// communication error occurs):
service.autosuggest({
  // Search query
  q: 'уфа',
  // Center of the search context
  at: '38.71014896078624,-98.60787954719035'
}, (result) => {
  let {position, title} = result.items[0];
  // Assumption: ui is instantiated
  // Create an InfoBubble at the returned location
  ui.addBubble(new H.ui.InfoBubble(position, {
    content: title
  }));
}, alert);


var routingParameters = {
  'routingMode': 'fast',
  'transportMode': 'car',
  // The start point of the route:
  'origin': '54.7431,55.9678',
  // The end point of the route:
  'destination': '54.74,55.96',
  // Include the route shape in the response
  'return': 'polyline'
};

// Define a callback function to process the routing response:
var onResult = function(result) {
  // ensure that at least one route was found
  if (result.routes.length) {
    result.routes[0].sections.forEach((section) => {
         // Create a linestring to use as a point source for the route line
        let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

        var routeOutline = new H.map.Polyline(linestring, {
          style: {
            lineWidth: 10,
            strokeColor: 'rgba(0, 128, 255, 0.7)',
            lineTailCap: 'arrow-tail',
            lineHeadCap: 'arrow-head'
          }
        });
        // Create a patterned polyline:
        var routeArrows = new H.map.Polyline(linestring, {
          style: {
            lineWidth: 10,
            fillColor: 'white',
            strokeColor: 'rgba(255, 255, 255, 1)',
            lineDash: [0, 2],
            lineTailCap: 'arrow-tail',
            lineHeadCap: 'arrow-head' }
          }
        );
        // Create a polyline to display the route:
        var routeLine = new H.map.Group();
        routeLine.addObjects([routeOutline, routeArrows]);

        // Create a marker for the start point:
        let startMarker = new H.map.Marker(section.departure.place.location);

        // Create a marker for the end point:
        let endMarker = new H.map.Marker(section.arrival.place.location);

        // Add the route polyline and the two markers to the map:
        map.addObjects([routeLine, startMarker, endMarker]);

        // Set the map's viewport to make the whole route visible:
        map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
    });
  }
};

// Get an instance of the routing service version 8:
var router = platform.getRoutingService(null, 8);

// Call calculateRoute() with the routing parameters,
// the callback and an error callback function (called if a
// communication error occurs):
router.calculateRoute(routingParameters, onResult,
  function(error) {
    alert(error.message);
  });

