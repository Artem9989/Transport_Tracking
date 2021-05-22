(function () {
    'use strict';
    if (H.service.Platform.prototype.ext === undefined) {
        H.service.Platform.prototype.ext = {};
    }

    H.service.Platform.prototype.ext.getGeoFencingService = function (api_key) {
        if(api_key){
            return new GfeGateway('https://fleet.ls.hereapi.com/2', 'https://fleet.ls.hereapi.com/2', api_key);
        }else{
            return new GfeGateway('https://cle.api.here.com/2', 'https://maps.gfe.api.here.com/1');
        }
    };

    H.service.Platform.prototype.ext.getGeoFencingServiceCustom = function (customLayersCLEEndpoint, mapLayersEndpoint, api_key) {
        return new GfeGateway(customLayersCLEEndpoint, mapLayersEndpoint, api_key);
    };

    function GfeGateway(customLayersCLEEndpoint, mapLayersEndpoint, api_key) {
        this.apiKey = api_key;
        this.appId = app_id;
        this.appCode = app_code;
        this.perfect = perfect;
		this.customLayersCLEEndpoint = customLayersCLEEndpoint;
        this.mapLayersEndpoint = mapLayersEndpoint;
        
    }

	/**
     * Check asset position against custom uploaded layers using CLE.
     * @param layerId integer to identify previously loaded layer.
     * @param assetPosition H.geo.Point of the asset position to check.
     * @param options further options.
     * @param callback function to be called on completion/error.
     */
    GfeGateway.prototype.checkProximity = function (layerId, assetPosition, options, callback) {
        var optionsParams = [];
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                optionsParams.push(key.toString() + '=' + options[key].toString());
            }
        }
        var url = 'https://fleet.ls.hereapi.com/2' + '/search/proximity.json?' + 'layer_ids=' + layerId + '&proximity=' + assetPosition.lat+','+assetPosition.lng+','+options.search_radius + 
            '&' + 'apikey=' + "sAR34-R5unCz4RhUywXkiVOV5QTf_B0OMhyhYhUnFJ8";
// document.querySelector("textarea[name=deviation_text]").value+="Текст, который необходимо вставить"
        var that = this;

        loadJSONP(url, function (resp) {
            if (resp.error_id != null ) {
                // if (resp.response_code == '400 Bad Request') {
                // callback.call(that, resp, assetPosition, new Error(resp.issues[0].message));
                // return null;
                // }
                if ( that.perfect) {
                    return 
                }
                else {
                    callback.call(that, resp, assetPosition, new Error(resp.error));
                    return console.log(resp);   
                }
                        //  console.log(resp)
            }
            callback.call(that, resp, assetPosition, null);
        }, this);
    };

    /**
     * Check asset position again layers in the core map data (PDE).
     * @param layerId integer to identify previously loaded layer.
     * @param assetPosition H.geo.Point of the asset position to check.
     * @param options further options.
     * @param callback function to be called on completion/error.
     */
    GfeGateway.prototype.checkOnMap = function (layerId, assetPosition, options, callback) {
        var optionsParams = [];
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                optionsParams.push(key.toString() + '=' + options[key].toString());
            }
        }
        var url = 'https://fleet.ls.hereapi.com/2' + '/search/proximity.json?' + 'layer_ids=' + layerId + '&proximity=' + assetPosition.lat + ',' + assetPosition.lng + ',' + options.search_radius + "&key_attributes=" + options.keyattributes +
            '&' + 'apikey=' + "sAR34-R5unCz4RhUywXkiVOV5QTf_B0OMhyhYhUnFJ8";

        var that = this;

        loadJSONP(url, function (resp) {
            if (resp.onError === true) {
                callback.call(that, resp, assetPosition, new Error(resp.error));
                return;
            }
            callback.call(that, resp, assetPosition, null);
        }, this);
    };
	


    GfeGateway.prototype.getMapLayers = function (callback) {
        var url = 'https://fleet.ls.hereapi.com/2' + '/doc/layers.json?' +  'apikey=' + "sAR34-R5unCz4RhUywXkiVOV5QTf_B0OMhyhYhUnFJ8";

        var that = this;

        loadJSONP(url, function (resp) {
            if (resp.faultCode) {
                callback.call(that, resp, new Error(resp.message));
                return;
            }
            var geoFencableLayers = [];
            resp.forEach(function (layer) {
                if (layer.type === "geom") {
                    layer.attributes.splice(layer.attributes.indexOf('LAT'), 1);
                    layer.attributes.splice(layer.attributes.indexOf('LON'), 1);
                    geoFencableLayers.push({"name": layer.name, "attributes": layer.attributes});
                }
            });
            callback.call(that, geoFencableLayers, null);
        }, this);
    };

    /**
     *
     * @param layerId integer, layer to create or replace.
     * @param content base64 encoded (plain or zipped) WKT or Shapefile
     * @param callback function to be called on completion.
     */
    GfeGateway.prototype.uploadLayerCLE = function (layerId, content, callback) {
        

        
        var url = this.customLayersCLEEndpoint + "/layers/upload.json?" +
            "layer_id=" + layerId + "&file=" + encodeURIComponent(content) +
            '&' + this.getCredParam(); //  + "&store=CLE1"
        var that = this;
    
        loadJSONP(url, function (resp) {
            if (resp.error_id != null) {
                this.perfect = false;
                callback.call(that, resp, new Error(resp.issues[0].message));
                return;
            }
            this.perfect = true;
            callback.call(that, resp, null);

        }, this);
    };

    GfeGateway.prototype.getCredParam = function () {
        var cred;
        if(this.apiKey){
            cred = 'apiKey=' + this.apiKey;
        }else{
            cred = 'app_code=' + this.appCode + '&app_id=' + this.appId;
        }
        
        return cred;
    };



})();

var loadJSONP = (function () {
    'use strict';
    var unique = 0;
    return function (url, callback, context) {
        // INIT
        var jsonpCallbackParamName = 'callback';
        var name = "_jsonp_" + unique++;
        if (url.match(/\?/)) {
            url += '&' + jsonpCallbackParamName + '=' + name;
        } else {
            url += '?' + jsonpCallbackParamName + '=' + name;
        }

        // Create script
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        // Setup handler
        window[name] = function (data) {
            callback.call((context || window), data);
            document.getElementsByTagName('head')[0].removeChild(script);
            script = null;
            delete window[name];
        };

        // Load JSON
        document.getElementsByTagName('head')[0].appendChild(script);
        
    };
})();

