import React, { memo, useState } from 'react';
// import { Redirect } from 'react-router-dom';
import './Login.css';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../Common/FormsControls/FormsControls'
import { required } from '../../redux/utils/validators/Validators'
import LoginCSS from './Login.module.css';

const LoginForm = ({handleSubmit,error, click}) => { //{ handleSubmit, error },

    return (<div id="login" className={`${LoginCSS.wrapper__login} ${LoginCSS.form}`}>
        <form onSubmit={handleSubmit}>
            
            <h1>Вход</h1>
            <label htmlFor="username" className={LoginCSS.uname} data-icon="u"> Ваш e-mail или логин</label>
            <div className={LoginCSS.uname}>
                <Field name={"email"} placeholder={"Email"} component={Input} validate={[required]} />
            </div>
            <label htmlFor="password" className={LoginCSS.youpasswd} data-icon="p"> Ваш пароль </label>
            <div className={LoginCSS.youpasswd}>
                <Field name={"password"} placeholder={"Password"} type={"password"} component={Input} validate={[required]} />
            </div>
            <div>
                <Field name={"rememberMe"} type={"checkbox"} component={Input} /> Запомнить меня
        </div>
            {error && <div className={LoginCSS.formSummaryError}>
                {error}
            </div>}

            <div className={`${LoginCSS.wrapper__login_button}  ${LoginCSS.button}`}>

                <button>Зайти</button>
            </div>

        </form>     
           <p className={LoginCSS.wrapper__login_change}>
            Не зарегистрированы еще ?
               <button className={LoginCSS.to_login} onClick={click}> Присоединится</button>
        </p>
    </div>
    )
}



export default memo(LoginForm)