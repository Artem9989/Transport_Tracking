import React, { Suspense } from 'react';
import {connect} from 'react-redux'
import Preloader from '../Components/Common/Preloader/Preloader';

export const  WithSuspense = (Component) => {
   return (props) => {
    return <Suspense fallback={<Preloader/>} >
    <Component {...props} />
    </Suspense>
   };
}