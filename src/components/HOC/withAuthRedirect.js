import React from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux'

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth,
});

export const  withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render () {
    let token = localStorage.getItem('isAuthToken')
    debugger
    if( token === 'true') {
            
        return <Redirect to={'/main'} />
    }
    if (token === null) {
        localStorage.setItem('isAuthToken', false);
        return <Redirect to={'/login'}  />}
    if (token === 'false') {
        return <Component {...this.props} />}
        

    // debugger
    // if (token){
    //     return <Redirect to={'/main'} />
    // }
    // else if (!token || token === "null"){
    //     return <Redirect to={'/login'} />
    //     }
        // return <Component {...this.props} />
    // if (token == null) return <Redirect to = '/login'></Redirect>
   return <Component {...this.props} />
        }
}


let ConnectedAuthRedurectComponent = connect( mapStateToPropsForRedirect) (RedirectComponent);


return ConnectedAuthRedurectComponent;
}