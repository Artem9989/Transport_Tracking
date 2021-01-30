import React, { memo, useState } from 'react'
import AuthCSS from './Login/Login.module.css'
import Login from './Login/Login';
import Register from './Login/Register';
import { Redirect, Route } from 'react-router-dom';
import { withAuthRedirect } from './HOC/withAuthRedirect'
import { compose } from 'redux';
import { connect } from 'react-redux';
const AuthenticationWaindow = (props) => {
    const [isLogin, setIsLogin] = useState(true)

    const changingPage = () => {
        setIsLogin(!isLogin)
    }

    return <>
        <section>
            <div id="container_registration">
                <div id="wrapper" className={AuthCSS.wrapper}>
                    {
                        isLogin ?
                            <Login changingPage={changingPage}/> :
                            <Register changingPage={changingPage}/>
                    }
                    
                </div>

            </div>
        </section>
    </>

}


export default memo(AuthenticationWaindow)
// export default compose(withAuthRedirect)(AuthenticationWaindow);
// export default compose(connect(),withAuthRedirect)(AuthenticationWaindow);