import React, { Component } from 'react'
import { Drawer } from "antd";

// Components
import Map from './Map'
import CostOptimRoute from "./CostOptimRoute/CostOptimRoute.jsx";
import { ModalWindowMemo  } from './Modal/Modal'

// Requests library
import axios from 'axios'

// Config
import { config } from '../../assets/config.js'


export default class DisplayMapClassContainer extends Component {

  constructor (props) {
    super(props)

    this.state = {
      apikey: config.apikey,
      analytics: {
        mode: "analytics",
        active_layer: "low_care",
        statistics: null,
        dropdown: {
          low_care: true,
          high_care: true,
          ecmo: true
        }
      },
      options: {
        dropdown: {
          isoline: true,
          waypoints: true
        },
        isoline: {
          range: 300,
          type: "time",
          transport: 'truck',
          traffic: "enabled",
          geometry: [],
          marker: {lat: null, lng: null}
        },
        waypoints: {
          url: "",
          transport: 'truck',
          traffic: "enabled",
          markers: [],
          geometry: [],
        },
 
      }
    }

   



    this.calculateIsoline = this.calculateIsoline.bind(this)
    this.clearIsoline = this.clearIsoline.bind(this)


    // Waypoint routing
    this.calculateRoute = this.calculateRoute.bind(this)
    this.updateWaypoints = this.updateWaypoints.bind(this)
    this.clearWaypoints = this.clearWaypoints.bind(this)

  }

  componentDidMount () {
    
    

  }

  calculateIsoline (coords) {
    let { isoline } = this.state.options

 
    if (coords.lat === null && coords.lng === null) {
      return
    }

    let isolineBaseUrl = "https://isoline.route.ls.hereapi.com/routing/7.2/calculateisoline.json?"

    let isolineRequest = isolineBaseUrl + `apikey=${config.apikey}&mode=fastest;${isoline.transport};traffic:${isoline.traffic}&rangetype=${isoline.type}&range=${isoline.range}&start=geo!${coords.lat},${coords.lng}`

    axios.get(isolineRequest)
      .then(res => {
        if(res.data.response !== null){
          this.setState((state, props) => ({
            options: {
              ...state.options,
              isoline: {
                ...state.options.isoline,
                geometry: res.data.response.isoline[0].component[0].shape,
                marker: {
                  lat: coords.lat, 
                  lng: coords.lng
                }
              },
            } 
          }))
        }
        
      }, error => {
        console.log(error)
      })
  }

  clearIsoline () {
    this.setState((state, props) => ({
      
      options: {
        ...state.options,
        isoline: {
          ...state.options.isoline,
          marker: {
            lat: null, 
            lng: null
          },
          geometry: []
        }
      }
    }))
  }

  updateWaypoints (waypoint) {
    this.setState((state, props) => ({ 
      options: {
        ...state.options,
        waypoints: {
          ...state.options.waypoints,
          markers: [
            ...state.options.waypoints.markers, 
            waypoint
          ]
        }
      } 
    }), () => {
      this.calculateRoute()
    })
  }

  clearWaypoints () {
    this.setState((state, props) => ({ 
      options: {
        ...state.options,
        waypoints: {
          ...state.options.waypoints,
          markers: [],
          geometry: []
        }
      }
    }))
  }

  async __getWaypointsSequence () {
    const { transport, markers } = this.state.options.waypoints
    const waypointBaseUrl = "https://wse.ls.hereapi.com/2/findsequence.json?"

    if (markers.length === 1) {
      return
    }

    let waypointsToString = markers.map( (coords, i) => {
      if (i === 0) {
        return `start=${i};${coords.lat},${coords.lng}`
      } else if (i === markers.length -1) {
        return `end=${i};${coords.lat},${coords.lng}`
      } else {
        return `destination${i}=${i};${coords.lat},${coords.lng}`
      }
    }).join("&")

    let waypointsRequest = `${waypointBaseUrl}apikey=${config.apikey}&mode=fastest;${transport}&${waypointsToString}`

    let res = await axios.get(waypointsRequest)

    let optimalMarkersOrder = res.data.results[0].waypoints.map( (point, i) => {
      return {lat: point.lat, lng: point.lng}
    })

    console.log(optimalMarkersOrder)

    return optimalMarkersOrder
  }

  __createWeGoLink () {
    const { markers, transport } = this.state.options.waypoints
    const navigationBaseUrl = "https://share.here.com/r"
            
    let navigationShape = markers.map(item =>`/${item.lat},${item.lng}`).join("")
    let mode = transport === "car" ? "d" : "w"
    
    return `${navigationBaseUrl}${navigationShape}?m=${mode}`
  }

  async calculateRoute () {
    const { waypoints } = this.state.options
    const routeBaseUrl = "https://route.ls.hereapi.com/routing/7.2/calculateroute.json?"

    if (waypoints.markers.length === 1) {
      return
    }

    let optimalMarkersOrder = await this.__getWaypointsSequence()
    
    // Form url to calculate route based on waypoint sequence
    let routeToString = optimalMarkersOrder.map( (point, i) => {
      return `waypoint${i}=geo!${point.lat},${point.lng}`
    }).join("&")

    let routeRequest = `${routeBaseUrl}apikey=${config.apikey}&mode=fastest;${waypoints.transport};traffic:${waypoints.traffic}&routeattributes=sh&${routeToString}`
    
    let res_route = await axios.get(routeRequest)
    
    let polylineArray = res_route.data.response.route[0].shape.map((coords, i) => {
      return coords.split(',').map(Number);
    })

    let hereWeGoLink = this.__createWeGoLink() 

    this.setState({
      analytics: {
        ...this.state.analytics,
        mode: "routing",
      },
      options: {
        ...this.state.options,
        waypoints: {
          ...this.state.options.waypoints,
          geometry: polylineArray,
          markers: optimalMarkersOrder,
          url: hereWeGoLink
        }
      } 
    })

  }

  render () {

    let {
      apikey,
      analytics,
      options,
    } = this.state

    return (<>

        
          <Drawer
              title="CostOptimRouter"
              placement="left"
              closable={true}
              onClose={()=> { this.props.setshowCostOptimRoute(false)}}
              visible={this.props.showCostOptimRoute}
              mask={false}
              width= {450}
            >
              <CostOptimRoute showCostOptimRoute={this.props.showCostOptimRoute}
        
                        CORV={this.props.CORV}
                        getcostOptimRouteValue={this.props.getcostOptimRouteValue}
                       />
            </Drawer>
        <ModalWindowMemo 
          toggleModal={this.props.toggleModal}
          ShowModal={this.props.ShowModal}
          
          />
        
        <Map 
          apikey={apikey}
          options={options}
          analytics={analytics}
          CORV={this.props.CORV}
          toggleModal={this.props.toggleModal}
          clearIsoline={this.clearIsoline}
          calculateRoute={this.calculateRoute}
          clearWaypoints={this.clearWaypoints}
          updateWaypoints={this.updateWaypoints}
          calculateIsoline={this.calculateIsoline}
          getcostOptimRouteValue={this.props.getcostOptimRouteValue}
          getcostOptimRoute={this.props.getcostOptimRoute}
          />
        {/* <iframe src="hh2.html" height="500px" width="10%"></iframe> */}
        
</> 

    )
  }
}
