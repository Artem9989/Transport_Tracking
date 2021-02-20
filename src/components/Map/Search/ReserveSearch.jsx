import React, { Component,useState,memo, useEffect } from 'react'
import axios from 'axios'

import { config } from '../../../assets/config.js'
import './style.css'
import { Input, AutoComplete } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
const Search = (props) => {

//   const onSelect = (suggestions) => {
//       console.log(suggestionsRequest)
//       debugger
//     // let baseUrl = "https://geocoder.ls.hereapi.com/6.2/geocode.json"
//     // let geocoderUrl = baseUrl + `?locationid=${value.locationId}&apikey=${config.apikey}`
    
//     // axios.get(geocoderUrl).then(res => {

//     //   let lat = res.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude
//     //   let lng = res.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude

//     //   window.map.setCenter({lat: lat,lng: lng})
//     //   window.map.setZoom(17)

//     //   this.setState({searchText: "", geocoderResults: [], Suggestions:[]})
//     // })
//     console.log('onSelect', suggestions);
//   };
//   const onChange = (suggestions) => {
//     console.log(suggestionsRequest)

//   // let baseUrl = "https://geocoder.ls.hereapi.com/6.2/geocode.json"
//   // let geocoderUrl = baseUrl + `?locationid=${value.locationId}&apikey=${config.apikey}`
  
//   // axios.get(geocoderUrl).then(res => {

//   //   let lat = res.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude
//   //   let lng = res.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude

//   //   window.map.setCenter({lat: lat,lng: lng})
//   //   window.map.setZoom(17)

//   //   this.setState({searchText: "", geocoderResults: [], Suggestions:[]})
//   // })
//   console.log('onChange', suggestions);
// };



const [suggestions, setSuggestions] = useState([]);
const [options, setOptions] = useState([]);
const [selectSuggestions, setselectSuggestions] = useState(0);

const handleSearch =  (value) => {
  if (value.trim() !== '' ){    
      
      setOptions(value ? searchResult(value) : []);
      
      console.log(options)
  }


};

  const searchResult = (query) => {

    searchLocation(query)
    // console.log(suggestions)
        // let suggestionsLocation =  ( suggestions? suggestions.map((items,idx) => { category = `${query}${idx}${items}`}): []);
    // console.log(suggestionsLocation)
    return suggestions.map((items, idx) => {
        const category = `${items.label} `;

        return {
          value: category,
          // label: 
          //   <div
          //     style={{
          //       display: 'flex',
          //       justifyContent: 'space-between',
          //     }}
          //   >
          //       <span>
          //         {category}
          //       </span>
          //     {/* <span> {idx}</span> */}
          //   </div>
          
        };
      });
  };
  

 

  const searchLocation = async (value) => {
    let baseUrl = "https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json"
    let geoUrl = baseUrl + `?query=${value}` + `&apikey=${config.apikey}` + "&maxresults=5"
    try{
        const res = await axios.get(geoUrl)
        let suggestionsRequest = res.data.suggestions;
        setSuggestions( suggestionsRequest)
    }
    catch{
        alert('ошибка')
    }
  }

    // const onChange = (value) => {
        
    //     setOptions(value? suggestions: [])
        
     
    // };
  

    const  onSelect = async (value,option) => {
      debugger
      console.log(option)
     console.log('suggestions', selectSuggestions);
           setselectSuggestionsFunc(value);
  
          console.log('suggestions', selectSuggestions);
        
          // let baseUrl = "https://geocoder.ls.hereapi.com/6.2/geocode.json"
          // let geocoderUrl = baseUrl + `?locationid=${suggestions.locationId}&apikey=${config.apikey}`
        
          // const res = await axios.get(geocoderUrl)
      
          //   let lat = res.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude
          //   let lng = res.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude
      
          //   window.map.setCenter({lat: lat,lng: lng})
          //   window.map.setZoom(17)
      
          //   this.setState({searchText: "", geocoderResults: [], suggestions:[]})
          
      }

    const setselectSuggestionsFunc = (value) => {
        suggestions.map((items, idx) => {
            
            if (value === items.label) {
                setselectSuggestions(idx);
            }
        }
        )}

  


    
    // const options = [
    //     {
    //         options: suggestions
    //     }
    // ]
        // const suffix = (
        //     <AudioOutlined
        //       style={{
        //         fontSize: 16,
        //         color: '#1890ff',
        //       }}
        //     />
        //   );
        //   const onSearch = value => console.log(value);


        return (<div className="search-container">
         {/* <Space direction="vertical">
        <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
       
      </Space> */}
        <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{
            width: 300,
        }}
        // value={suggestions.label}
        onChange={handleSearch}
        options={options}
        onSelect={onSelect}
        
        // onSearch={handleSearch}
        >
        <Input.Search  size="large" placeholder="Поиск" enterButton />
        </AutoComplete>
        
      </div>
        // <div className="search-container">
        //     <div>
        //         <div style={{background: "#fff"}}>
        //             <div 
        //                 placeholder="Search" >
        //                 <input onChange={e => this.onChangeSearch(e.currentTarget.value)} type="text" value={searchText}></input>  
        //             </div>
                        
        //         </div>

        //         <div className="suggestions-list">
        //             <div  style={{display: (suggestions !== undefined && suggestions.length !== 0) ? "block" : "none", height: "auto", width: "400px", maxWidth: "400px"}}>
        //                 {
        //                     (suggestions !== undefined ? 
        //                         suggestions.map((result, i) => {
        //                             return  <div
        //                                         key={i}  
        //                                         onClick={() => this.geocode(result.locationId)}>
        //                                             {result.label}
        //                                     </div>
        //                         }) 
                                
        //                         : 

        //                         <div></div>
        //                     )
        //                 }
        //             </div>
        //         </div>

        //     </div>
        // </div>   
    );}
export default memo(Search);