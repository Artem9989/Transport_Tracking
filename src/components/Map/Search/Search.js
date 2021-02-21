import React, { Component,useState,memo, useEffect } from 'react'
import axios from 'axios'

import { config } from '../../../assets/config.js'
import './style.css'
import { Input, AutoComplete } from 'antd';

const { Option } = AutoComplete;

const Search = (props) => {

const [suggestions, setSuggestions] = useState([]);
// const [searchText, setSearchText] = useState("");


const handleSearch =  (value) => {
  if (value.trim() !== '' ){    
    searchLocation(value)

  }
};

  const searchLocation = async (value) => {
    let baseUrl = "https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json"
    let geoUrl = baseUrl + `?query=${value}` + `&apikey=${config.apikey}` + "&maxresults=8"
    try{
        const res = await axios.get(geoUrl)
        let suggestionsRequest = res.data.suggestions;
        setSuggestions( suggestionsRequest)
    }
    catch{
        alert('ошибка')
    }
  }


    const  onSelect = async (value,option) => {
      
      let location = option.key;
    
      let baseUrl = "https://geocoder.ls.hereapi.com/6.2/geocode.json"
        let geocoderUrl = baseUrl + `?locationid=${location}&apikey=${config.apikey}`
        
        const res = await axios.get(geocoderUrl)
          let lat = res.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
          let lng = res.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
          console.log(window)
          window.map.setCenter({lat: lat,lng: lng});
          window.map.setZoom(12);
          // setSearchText('');
          
          setSuggestions([]);
          // window.setState({ geocoderResults: []})
          //  setselectSuggestionsFunc(value);
  
      }

    // const setselectSuggestionsFunc = (value) => {
    //     suggestions.map((items, idx) => {
            
    //         if (value === items.label) {
    //             setselectSuggestions(idx);
    //         }
    //     }
    //     )}



        return (<div className="search-container">
        <AutoComplete
        placeholder="Поиск по местоположению"
        dropdownMatchSelectWidth={272}
        dropdownMatchSelectHeight={500}
        style={{
            width: 320,
        }}
        allowClear
        onSelect={onSelect}
        onSearch={handleSearch}
        >
          
          {suggestions && suggestions.map((item)=> <Option key={item.locationId} value={item.label}>{item.label}</Option>)}
        </AutoComplete>
        
      </div>
      
    );}
export default memo(Search);