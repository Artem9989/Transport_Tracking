import React from 'react';
import preloader from '../../../assets/images/Preloader.gif';

let Preloader = (props) => {
    return <>
        <img  alt = 'нет фото' style = {{position: 'absolute', left: '50%', top: '50%'}} src = {preloader}/>
        </>
}

export default Preloader;