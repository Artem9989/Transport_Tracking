import {
  hospital_green,
  hospital_red,
  hospital_yellow,
  hospital_purple,
  hospital_purple_cluster,
  hospital_green_cluster,
  hospital_red_cluster,
  hospital_yellow_cluster
} from './icons'

const H = window.H

export const high_care_theme = (map, ui) => {
    
    return {
        getClusterPresentation: cluster => {
    
          let weight = cluster.getWeight()
    
          let available = []
          let limited = []
          let not_available = []
          let no_data = []
    
          cluster.forEachDataPoint(e => {
            switch ( e.getData().high_care ) {
              case 'Available': 
                available.push(1)
                break
              
              case 'Limited': 
                limited.push(1)
                break
    
              case 'Not available': 
                not_available.push(1)
                break
              
              default:
                no_data.push(1)
                break
            }
            
          })
    
          
          let clusterSvgTemplate
    
          if (no_data.length >= available.length && no_data.length >= not_available.length && no_data.length >= limited.length ) {
            
            clusterSvgTemplate = hospital_purple_cluster
          
          } else if (not_available.length >= available.length && not_available.length >= limited.length ) {
            clusterSvgTemplate = hospital_red_cluster
    
          } else if (available.length > not_available.length && available.length > limited.length) {
    
            clusterSvgTemplate = hospital_green_cluster
    
          } else if (limited.length >= available.length && limited.length > not_available.length) {
            clusterSvgTemplate = hospital_yellow_cluster
          }
          
          let svgString = clusterSvgTemplate.replace(/\{weight\}/g, weight)
    
          let clusterIcon = new H.map.Icon(svgString, {
            size: {w: 30, h: 30},
            // anchor: {x: radius, y: radius}
          })
    
            // Create a marker for the cluster
          let clusterMarker = new H.map.Marker(cluster.getPosition(), {
              icon: clusterIcon,
              min: cluster.getMinZoom(),
              max: cluster.getMaxZoom()
            })
          clusterMarker.setData(cluster)
    
          clusterMarker.addEventListener('tap', evt => {
            map.getViewModel().setLookAtData({
              zoom: evt.target.getMax() + 1,
              bounds: evt.target.getGeometry()
          })
            
            
          })
    
          return clusterMarker
      },
      getNoisePresentation: noisePoint => {
        // debugger
        let properties = noisePoint.getData()
        let status_icon
    
        if (properties.high_care === "Available") {
          status_icon = hospital_green
    
        } else if (properties.high_care === "Not available") {
          status_icon = hospital_red
    
        } else if (properties.high_care === "Limited") {
          
          status_icon = hospital_yellow
          
        } else {
          status_icon = hospital_purple
        }
    
        var noiseIcon = new H.map.Icon(status_icon, {
          size: { w: 22, h: 22 },
          anchor: { x: 10, y: 10},
        })
    
        var noiseMarker = new H.map.Marker(noisePoint.getPosition(), {
          icon: noiseIcon,
          min: noisePoint.getMinZoom()
        })

        noiseMarker.setData(noisePoint.getData())

        noiseMarker.addEventListener('tap', evt => {

          if (evt.currentPointer.button === 0) {
            ui.getBubbles().forEach(bubble => ui.removeBubble(bubble))

            let data = evt.target.getData()
            // debugger
            
            let bubble =  new H.ui.InfoBubble(evt.target.getGeometry(), {
              content: `
              <div style="min-width:250px">
                <b>Hospital</b><br/>
                ${data.hospital_name}
                <br/>
                <span style="font-size: 13px"><b>Address</b>: ${data.address}</span><br/>
                <span style="font-size: 13px"><b>ICU low care</b>: ${data.low_care === undefined ? 'no data' : data.low_care }</span><br/>
                <span style="font-size: 13px"><b>ICU high care</b>: ${data.high_care === undefined ? 'no data' : data.high_care }</span><br/>
                <span style="font-size: 13px"><b>ECMO</b>: ${data.ecmo === undefined ? 'no data' : data.ecmo}</span><br/>
              </div>`
            })
            // show info bubble
            ui.addBubble(bubble)
          }
        })

        
        return noiseMarker
      }
    }
} 
