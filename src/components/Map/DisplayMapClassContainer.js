import React, { Component } from 'react'
import { Drawer } from "antd";

// Components
import Map from './Map'
import CostOptimRoute from "./CostOptimRoute/CostOptimRoute.jsx";
import { ModalWindowMemo  } from './Modal/Modal'
import  AddRouteDriverContainer  from '../AddRouteDriver/AddRouteDriverContainer';

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
          range:  this.props.isolineValue * (this.props.isolineType == "time" ? 60 : 1000),
          type: this.props.isolineType,
          transport: this.props.transportType,
          traffic: this.props.considerTraffic? 'enabled' : 'disabled',
          geometry: [],
          marker: {lat: null, lng: null}
        },
        waypoints: {
          url: "",
          transport: this.props.transportType,
          traffic: this.props.considerTraffic? 'enabled' : 'disabled',
          markers: [],
          geometry: [],
        },
 
      },
      // modal: {
      //   visible:false,
      //   toggleModal: false
      // }
    }

    // isolineType = {this.props.isolineType}
    // calculationIsoline ={this.props.calculationIsoline}

    this.calculateIsoline = this.calculateIsoline.bind(this)
    this.clearIsoline = this.clearIsoline.bind(this)


    // Waypoint routing
    this.calculateRoute = this.calculateRoute.bind(this)
    this.updateWaypoints = this.updateWaypoints.bind(this)
    this.clearWaypoints = this.clearWaypoints.bind(this)
    this.saveRoute = this.saveRoute.bind(this)

  }

  componentDidMount () {

    

  }
  componentDidUpdate (prevProps) {

    if( prevProps !== this.props) {
      this.setState((state, props) => ({
        options: {
          ...state.options,
          isoline: {
            ...state.options.isoline,
            range:  props.isolineValue * (props.isolineType == "time" ? 60 : 1000),
            type: props.isolineType,
            transport: props.transportType,},
            waypoints: {
              ...state.options.waypoints,
              transport: props.transportType,
              traffic: props.considerTraffic? 'enabled' : 'disabled',
            }
        }
     
          }
        ))
    }


    // console.log(isoline.type)
  
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
    // window.map.removeObjects(window.map.getObjects())
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
    // console.log(window.map.getObjects())
    // window.map.removeObjects(window.map.getObjects())
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

  

  saveRoute () {

    // const { markers } = this.state.options.waypoints;
    const { markers } = this.state.options.waypoints
    try{ 

      // console.log('saveRoute',markers)
      this.props.setvisible(true)
    }
    catch {
      console.log('FALSE ERROR A')
    }
  }
  render () {

    const { markers } = this.state.options.waypoints
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
          { this.props.visible ?  <AddRouteDriverContainer markers={markers} visible={this.props.visible} setvisible= {this.props.setvisible}/> : null}
        
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
          saveRoute={this.saveRoute}
          getcostOptimRouteValue={this.props.getcostOptimRouteValue}
          getcostOptimRoute={this.props.getcostOptimRoute}
          locationTracking={this.props.locationTracking}
          Routing={this.props.Routing}
          RoutingArray={this.props.RoutingArray}
          
          />
        {/* <iframe src="hh2.html" height="500px" width="10%"></iframe> */}
        
</> 

    )
  }
}
