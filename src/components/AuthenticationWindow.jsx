import React, { memo, useState } from 'react'
import AuthCSS from './Login/Login.module.css'
import Login from './Login/Login';
import Register from './Login/Register';

const AuthenticationWaindow = (props) => {
    const [isLogin, setIsLogin] = useState(true)

    const changingPage = () => {
        setIsLogin(!isLogin)
    }

    return <>
        <section>
         
                <div id="wrapper" className={AuthCSS.wrapper}>
                    {
                        isLogin ?
                            <Login changingPage={changingPage}/> :
                            <Register changingPage={changingPage}/>
                    }
                    
                </div>
        </section>
    </>

}


export default memo(AuthenticationWaindow)
