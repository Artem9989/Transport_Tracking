import React from "react"
import './Modal.css'
import { Modal, Button } from 'antd';

export const ModalWindowMemo = ({ ShowModal, toggleModal, dontShowModal }) => {
    return (
       
        <Modal
        title="Памятка пользования картой" 
        visible={ShowModal} 
        onOk={toggleModal} 
        okText='Ознакомлен'
        onCancel={toggleModal}
        style={{ top: 20}}
        width= {'80%'}
        cancelButtonProps={{ style: { display: 'none' } }}
        >
            
                <span slot="title"> Мониторинг средств автотранспорта</span>
                <b>Описания</b>
                <br/>
                <br/>
                This web app is designed as an analytical tool that provides information about hospitals around Germany and their ICU and ventilating machine capacity. 
                People who may need medical cure, can find which hospital is nearest and less busy. Ambulance drivers can use the navigation option to find the best way to a particular hospital. 
                Hospital administration or local authorities can use this tool as a point in decision making about equipment distribution and supply. 

                <br/>
                <br/> 
                <b>Data Features</b>
                <br/>
                <br/>
                For the pilot project we used data from <a target="_blank" href="https://www.intensivregister.de/#/intensivregister">DIVI</a>. 
                It provides updates every 5 minutes on hospital occupancy rate and capacity: Number of patients in total, number of beds (standard and ICU), number and availability of ventilation machines and ECMO units.
                
                <br/>
                <br/> 
                <b>Map functionality</b>
                <br/>
                <br/> 
              
                This web app shows detailed information for each hospital. 
                You can see each hospital point colored according to how busy it is (red, yellow and green), quantity of ICU (divided on low/high care). 
                In addition, it provides navigational features, that offer you the best routes (to hospital according workload, from one hospital to another, from equipment supplier to hospital etc.) 
                <br/>
                <br/>
                In order to create a route, right-click on the desired starting point and choose from the menu “add waypoint”, then make a right-click again on the desired hospital. 
                In addition to the routing feature, you can also see in a radius of any given distance from your location, how many and which hospitals have free capacity. 
                From the panel on the left choose the “Routing” option, select a means of transportation and travel time; then make a right-click on the map and choose the “calculate isoline” option. 
                <br/>
                <br/> 
                <b>Technical description</b>
                <br/>
                <br/> 

                The application was implemented with <a href="https://developer.here.com/documentation/studio/map_customization_suite_cli_hlp/dev_guide/index.html?cid=Coronavirus-coronavirusmap-CM-0-Dev-&utm_source=coronavirusmap&utm_medium=referral&utm_campaign=Online_Coronavirus_Dev_2020" target="_blank">HERE Data Hub </a> to store and update information about hospitals in real time. 
                As a data source we decided to use DIVI portal. Web-application we implemented using efficient set of tools including <a href="https://developer.here.com/develop/javascript-api?cid=Coronavirus-coronavirusmap-CM-0-Dev-&utm_source=coronavirusmap&utm_medium=referral&utm_campaign=Online_Coronavirus_Dev_2020" target="_blank">HERE JavaScript API</a>. 
                It’s possible to customize routes based on traffic information and type of vehicle.
                <br/>
                <br/>
                To enable users to create routes, we used the HERE Routing API that helps order up to 100 points on a route. And finally, isochrones are calculated through the HERE Routing API as well. 
 
                {/* {
                    localStorage.getItem("modal") !== "false" ?
                        <lui-button slot="controls" secondary onClick={dontShowModal}>Don't show again</lui-button>
                    :
                    <></>
                    
                } */}
           </Modal>

    )
}