import React, { memo, useState } from 'react'
import LoginCSS from './AdminAuth.module.css';
import AdminAuth from './AdminAuth';
import adminPanel from './AdminPanel';

const AuthenticationAdminWindow = (props) => {
    const [isLogin, setIsLogin] = useState(true)

    const changingPage = () => {
        setIsLogin(!isLogin)
    }
    
    return <>
        <section>
        <div id="container_registration" >
            <div id="wrapper" className={LoginCSS.wrapper}>
                    {
                        isLogin ?
                            <AdminAuth changingPage={changingPage}/> :
                            <adminPanel changingPage={changingPage}/>
                    }
                    
                </div>

            </div>
        </section>
    </>

}


export default memo(AuthenticationAdminWindow)