// export class HomeViewControl extends window.H.ui.Control {

//     constructor (options) {
//         super()
//         this.setAlignment(options.position)
//         this.map = options.map
//         this.center = options.center
//         this.zoom = options.zoom
//     }
//     renderInternal (el, doc) {
//         el.innerHTML = `
//             <div id="ctrl-homeview">
//                 <div class="H_btn H_el">
//                     <svg class="H_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>LUI-icon-pd-building_home-solid-24</title><g id="Layer_2" data-name="Layer 2"><g id="LUI-icon-pd-building_home-solid-24"><g id="LUI-icon-pd-building_home-solid-24-2" data-name="LUI-icon-pd-building_home-solid-24"><rect width="24" height="24" fill="none"/><path d="M11.17,2.36a1.16,1.16,0,0,1,1.66,0L22,11V22H15V15H9v7H2V11Z"/></g></g></g></svg>
//                 </div>
//             </div>
//         `

//         el.addEventListener ('click', this.setHomeView.bind(this), false)
        
//         super.renderInternal(el, doc)
//     }
    
//     setHomeView () {
//         this.map.setCenter(this.center)
//         this.map.setZoom(this.zoom)
//     }
// }