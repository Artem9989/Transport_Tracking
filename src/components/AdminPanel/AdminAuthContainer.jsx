import React, { memo } from 'react'
import LoginCSS from './AdminAuth.module.css';
import AdminAuth from './AdminAuth';

const AuthenticationAdminWindow = (props) => {
    
    return <>
        <section>
        <div id="container_registration" >
            <div id="wrapper" className={LoginCSS.wrapper}>
                    

                            <AdminAuth users = {props.users}/> 
                            
                    
                    
                </div>

            </div>
        </section>
    </>

}


export default memo(AuthenticationAdminWindow)