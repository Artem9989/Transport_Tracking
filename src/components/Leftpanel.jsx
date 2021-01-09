import React, { memo, useEffect } from 'react'
import './Leftpanel.css'
import Driver from './driver/driver.jsx'

const Leftpanel = (props) => {
    useEffect(() => {
        document.getElementById('side-open').onclick = function () {
            document.getElementById('side-open').hidden = true;
        }
        document.getElementById('side-button-2').onclick = function () {
            document.getElementById('side-open').hidden = false;
        }
    }, []);

    return <>
        <input type="checkbox" id="side-checkbox" />
        <div className="side-panel">
            <label id='side-button-2' className="side-button-2" htmlFor="side-checkbox">+</label>
            <div className="side-title">Выдвижная панель:</div>
            <p>Информация в панеле</p>
            <Driver name= 'Александр' numberCar= 'Х111ХХ'/>
            <Driver name= 'Артем' numberCar= 'В152ВВ'/>
            <Driver name= 'Павел' numberCar= 'У975АУ'/>
            <button id='Exit' className="Exit"> Выйти </button>
        </div>
        <div className="side-button-1-wr">
            <label className="side-button-1" htmlFor="side-checkbox">
                <div id='side-open' className="side-b side-open">Меню</div>
            </label>
        </div>
    </>

}
export default memo(Leftpanel)