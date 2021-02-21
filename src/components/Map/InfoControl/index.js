export class InfoControl extends window.H.ui.Control {

    constructor (options) {
        super()
        this.setAlignment(options.position)
        this.toggleModal = options.toggleModal
    }
    renderInternal (el, doc) {
        el.innerHTML = `
            <div id="ctrl-homeview">
                <div class="H_btn H_el">
                <svg class="H_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Памятка</title><g id="Layer_2" data-name="Layer 2"><g id="LUI-icon-pd-information-solid-24"><g id="LUI-icon-pd-information-solid-24-2" data-name="LUI-icon-pd-information-solid-24"><rect width="24" height="24" fill="none"/><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2ZM11,6h2V8H11Zm4,12H9V16h2V12H9V10h4v6h2Z" fill-rule="evenodd"/></g></g></g></svg>
                </div>
            </div>
        `

        el.addEventListener ('click', () => this.toggleModal())
        
        super.renderInternal(el, doc)
    }
    
    setHomeView () {
        this.map.setCenter(this.center)
        this.map.setZoom(this.zoom)
    }
}