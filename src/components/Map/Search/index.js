import React, { Component } from 'react'
import axios from 'axios'

import { config } from '../../../assets/config.js'
import './style.css'

export class Search extends Component {
    
    constructor (props) {
        super(props)

        this.state = {
            suggestions:[],
            searchText:"",
        }
    }

    geocode (locationId) {
        let baseUrl = "https://geocoder.ls.hereapi.com/6.2/geocode.json"
        let geocoderUrl = baseUrl + `?locationid=${locationId}&apikey=${config.apikey}`
        
        axios.get(geocoderUrl).then(res => {
    
          let lat = res.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude
          let lng = res.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude
    
          window.map.setCenter({lat: lat,lng: lng})
          window.map.setZoom(17)
    
          this.setState({searchText: "", geocoderResults: [], suggestions:[]})
        })
    }

    onChangeSearch(searchText){
        this.setState({searchText: searchText})
    
        let baseUrl = "https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json"
        let geoUrl = baseUrl + `?query=${searchText}` + `&apikey=${config.apikey}` + "&maxresults=5"
        
        axios.get(geoUrl).then(res => {
          this.setState({suggestions: res.data.suggestions})
        })  
    }

    render () {

        let { 
            searchText, 
            suggestions, 
        } = this.state

        return <div className="search-container">
            <lui-default-theme>
                <div style={{background: "#fff"}}>
                    <lui-search 
                        placeholder="Search" >
                        <input onChange={e => this.onChangeSearch(e.currentTarget.value)} type="text" value={searchText}></input>  
                    </lui-search>
                        
                </div>

                <div className="suggestions-list">
                    <lui-menu  style={{display: (suggestions !== undefined && suggestions.length !== 0) ? "block" : "none", height: "auto", width: "400px", maxWidth: "400px"}}>
                        {
                            (suggestions !== undefined ? 
                                suggestions.map((result, i) => {
                                    return  <lui-menuitem 
                                                key={i}  
                                                onClick={() => this.geocode(result.locationId)}>
                                                    {result.label}
                                            </lui-menuitem>
                                }) 
                                
                                : 

                                <div></div>
                            )
                        }
                    </lui-menu>
                </div>

            </lui-default-theme>
        </div>   
    } 
}