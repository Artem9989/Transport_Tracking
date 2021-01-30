
import React, { useState, useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../Common/FormsControls/FormsControls'
import { required } from '../../redux/utils/validators/Validators'
import { connect } from 'react-redux';
import { login } from '../../redux/Auth-reducer'
import { Redirect, Route } from 'react-router-dom';
import LoginCSS from './Login.module.css';
import FirstWindow from '../FirstWindow'
import AuthenticationWindow from '../AuthenticationWindow';
import { withAuthRedirect } from '../HOC/withAuthRedirect'
import { compose } from 'redux';

const LoginForm = ({handleSubmit , error, changingPage}) => {
    
    return (<div id="login" className={`${LoginCSS.wrapper__login} ${LoginCSS.form}`}>
        <form onSubmit={handleSubmit}>
        <h1>Вход</h1>
            <div>
            <label htmlFor="Emailsignup" className={LoginCSS.uname} data-icon="p">Ваша e-mail </label>
                <Field name={"email"} placeholder={"Ваша почта (@mail)  "} component={Input} validate={[required]} />
            </div>
            <div>
            <label htmlFor="Emailsignup" className={LoginCSS.uname} data-icon="p">Ваш пароль </label>
                <Field name={"password"} placeholder={"Пароль"} type={"password"} component={Input} validate={[required]} />
            </div>
            <div className={LoginCSS.checkBoxRememberME}>
                
                <Field name={"rememberMe"} type={"checkbox"} labelField="text" component={Input} value="RememberMer"/> Запомнить меня
        </div>

            {error && <div className={LoginCSS.formSummaryError}>
                {error}
            </div>}
            <div className={`${LoginCSS.wrapper__login_button} ${LoginCSS.button}`}>
                <button id="1" className={`${LoginCSS.button} ${LoginCSS.input}` } >Зайти </button>
            </div>
        </form>
                   <p className={LoginCSS.wrapper__login_change}>
                   {"Не зарегистрированы еще ? "}
                      <button className={LoginCSS.to_login} onClick={changingPage}> Присоединится </button>
               </p>
               </div>
    )
}

const LoginReduxFrom = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {

     
    // if (!token) {
    //      <Route path="/login" component={AuthenticationWindow}/>
    // }
    // else {
    //      <Route path="/main" component={FirstWindow} />
    // }
    // let redirect = props.isAuth
    // if (redirect){
    //     return <Redirect to={'/main'} />
    // }
    // else {
    //     if ( !token )
    //     { <Redirect to={'/login'} />}
    // }
    // debugger
    

    const onSubmit = (formData) => {
        
        props.login(formData.email, formData.password, formData.rememberMe)
        
    }

    // if (token === null || token === 'false') { return <Redirect to={'/login'} />}
    
    let token = localStorage.getItem('isAuthToken')
    if(token === 'true') {
         console.log(props.changingPage) 
        return  <Redirect to={'/main'} />
    }

    console.log() 
    return <div>
        <h1>Логин</h1>
        <LoginReduxFrom onSubmit={onSubmit} changingPage={props.changingPage}/>
    </div>
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    // loginSuccess: state.auth.loginSuccess

})
export default connect(mapStateToProps, { login })(Login);
