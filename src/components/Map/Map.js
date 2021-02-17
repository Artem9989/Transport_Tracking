import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { HomeViewControl } from './HomeViewControl'
import { InfoControl } from './InfoControl'
import { ServicesLabelControl } from './ServicesLabel'
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

    this.hospitalsClusterLayer = null
    this.clusteredDataProvider = null
    this.activeLayer = null
  }

    
  async componentDidMount () {

    let { toggleModal } = this.props

    const H = window.H

    const M = {
      Platform: {},
      DefaultLayers: {},
      Map: {},
      TileService: {},
      TileLayer: {},
      Behavior: {},
      UI: {},
      Settings: {
        center: { lat:54.00684227163969, lng: 56.00684227163969  },
        zoom: 6,
        pixelRatio: window.pixelRatio || 1,
        // engineType: H.map.render.p2d
      },
      HomeViewControl: {},
      InfoControl: {},
      ZoomControl: {},
      MapSettingsControl: {},
      DistanceMeasurement: {},
      ZoomRectangle: {},
      ScaleBar: {},
      ServicesLabelControl: {},
      Hospitals: null,
    }

    // Initialize paltform
    M.Platform = new H.service.Platform({ apikey: this.props.apikey })
    M.DefaultLayers = M.Platform.createDefaultLayers()
      
    // Customize type of basemap
    
    M.TileService = M.Platform.getMapTileService({type: 'base'})
    
    M.TileLayer = M.TileService.createTileLayer('maptile', 'reduced.day', 256, 'png8', {})
    
    M.TileLayer.setMin(6)

    M.Map = new H.Map( this.mapRef.current, M.TileLayer, M.Settings )
    
    // Behavior
    M.Behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(M.Map))
    M.Behavior.disable(H.mapevents.Behavior.Feature.FRACTIONAL_ZOOM)
    
    //  User Interface
    M.UI = new H.ui.UI(M.Map)


    // Distance Measurement control
    // M.ScaleBar = new H.ui.ScaleBar({alignment: "bottom-center"})
    // M.UI.addControl('scalebar', M.ScaleBar)

    // M.ServicesLabelControl = new ServicesLabelControl({
    //   position:'right-bottom'
    // })

    M.UI.addControl('service-label', M.ServicesLabelControl)


    // Zoom Control
    M.ZoomControl = new H.ui.ZoomControl({fractionalZoom: false, alignment: "right-middle"})
    M.UI.addControl('zoom', M.ZoomControl)

    // Home Control
    M.HomeViewControl = new HomeViewControl({
      map: M.Map,
      position:'right-middle',
      center: {
        lat: 54.00684227163969, lng: 56.00684227163969
      },
      zoom:10
    })
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



    // Map default layers customization 
    // M.MapSettingsControl = new H.ui.MapSettingsControl({
    //   baseLayers: [{
    //     label: 'Reduced map',
    //     layer: M.TileLayer
    //   },
    //   {
    //     label: 'Normal day',
    //     layer: M.DefaultLayers.raster.normal.map
    //   },
    //   {
    //     label: 'Satellite',
    //     layer: M.DefaultLayers.raster.satellite.map
    //   }, 
    //   {
    //     label: 'Normal night',
    //     layer: M.DefaultLayers.raster.normal.basenight
    //   }, 
    //   {
    //     label: 'Base night',
    //     layer: M.DefaultLayers.raster.normal.xbasenight
    //   }],
    //   alignment: "right-bottom"
    // })

    // M.UI.addControl('mapsettings', M.MapSettingsControl)

    let bounds = new H.geo.Rect(55.92458580482951, 2.197265625, 45.27488643704891, 17.402343749999996)
    
    M.Map.getViewModel().addEventListener('sync', function() {
      let center = M.Map.getCenter()
  
      if (!bounds.containsPoint(center)) {
        if (center.lat > bounds.getTop()) {
          center.lat = bounds.getTop();
        } else if (center.lat < bounds.getBottom()) {
          center.lat = bounds.getBottom();
        }
        if (center.lng < bounds.getLeft()) {
          center.lng = bounds.getLeft();
        } else if (center.lng > bounds.getRight()) {
          center.lng = bounds.getRight();
        }
        M.Map.setCenter(center)
      }
    })

    // Resize map on window size change
    window.addEventListener('resize', function() {
        M.Map.getViewPort().resize()
    })

    M.Map.addEventListener('contextmenu', evt => this.contextMenu(evt))

    M.Map.addEventListener('tap', evt => {
      if (evt.target === M.Map) {
        M.UI.getBubbles().forEach(bubble => M.UI.removeBubble(bubble))
        
      }
    })

    let reader = new H.data.geojson.Reader(overlay,
          {
   
          style: mapObject => {
            mapObject.getObjects().forEach(feature => {
              feature.setStyle({
                fillColor: 'rgba(0,0,0,.1)',
                strokeColor: 'rgba(0,0,0,.1)',
                lineWidth: 0
              });
            })
            
          }
    })

    reader.parse()
    M.Map.addLayer(reader.getLayer())

    window.map = M.Map
    this.setState({ ...M, H: H })
  }

  componentWillUnmount() {
      this.state.map.dispose()
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
          label: 'Center Map',
          callback: function() {
            Map.setCenter(coord, true);
          }
        }),
        
        H.util.ContextItem.SEPARATOR,
        
        new H.util.ContextItem({
          label: 'Calculate Isoline',
          callback: () => {
            calculateIsoline(coord)
          }
        }),
        new H.util.ContextItem({
          label: 'Clear Isoline',
          callback: () => {
            clearIsoline()
          }
        }),

        H.util.ContextItem.SEPARATOR,

        new H.util.ContextItem({
          label: 'Add waypoint',
          callback: () => {
            updateWaypoints(coord)
          }
        }),

        new H.util.ContextItem({
          label: 'Clear route',
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
        
        if (analytics.hospitals != null) {
        
          if (this.hospitalsClusterLayer === null) {
            switch(analytics.active_layer) {
              case "low_care":
                this.activeLayer = "low_care"
                this.hospitalsClusterLayer = this.createClusterLayer(analytics.hospitals.features, low_care_theme)
                break
              
              case "high_care":
                this.activeLayer = "high_care"
                this.hospitalsClusterLayer = this.createClusterLayer(analytics.hospitals.features, high_care_theme)
                break
              
              case "ecmo":
                this.activeLayer = "ecmo"
                this.hospitalsClusterLayer = this.createClusterLayer(analytics.hospitals.features, ecmo_theme)
                break        
            }

            Map.addLayer(this.hospitalsClusterLayer, 2)
          
          } else {
            const that = this

            switch (analytics.active_layer) {
              case "low_care":
                if (that.activeLayer !== "low_care") {
                  that.activeLayer = "low_care"
                  that.clusteredDataProvider.setTheme(low_care_theme(Map, UI))
                }
                break

              case "high_care":
                if (that.activeLayer !== "high_care"){
                  that.activeLayer = "high_care"
                  that.clusteredDataProvider.setTheme(high_care_theme(Map, UI))
                }
                break
              
              case "ecmo":
                if (that.activeLayer !== "ecmo"){
                  that.activeLayer = "ecmo"
                  that.clusteredDataProvider.setTheme(ecmo_theme(Map, UI))
                }
                break
            }
          }
        }

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
                lineWidth: 2,
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

        return <div className="map" ref={this.mapRef} />
    }
}

Map.propTypes = {
  apikey: PropTypes.string,
  calculateIsoline: PropTypes.func, 
  clearIsoline: PropTypes.func,
  updateWaypoints: PropTypes.func,
  clearWaypoints: PropTypes.func
}