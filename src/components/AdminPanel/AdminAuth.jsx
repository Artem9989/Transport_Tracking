import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../Common/FormsControls/FormsControls'
import { required } from '../../redux/utils/validators/Validators'
import { connect } from 'react-redux';
import { adminAuth } from '../../redux/AuthAdmin-reducer'
import { Redirect } from 'react-router-dom';
import LoginCSS from './AdminAuth.module.css';

const AdminForm = ({ handleSubmit, error, changingPage }) => {
    return (
                <div id="login" className={`${LoginCSS.wrapper__login} ${LoginCSS.form}`}>
                    <form onSubmit={handleSubmit}>
                        <h1>Вход в панель администратора</h1>
                        <div>
                            <label htmlFor="Emailsignup" className={LoginCSS.uname} data-icon="p">Ваша e-mail </label>
                            <Field name={"email"} placeholder={"Ваша почта (@mail)  "} component={Input} validate={[required]} />
                        </div>
                        <div>
                            <label htmlFor="Emailsignup" className={LoginCSS.uname} data-icon="p">Ваш пароль </label>
                            <Field name={"password"} placeholder={"Пароль"} type={"password"} component={Input} validate={[required]} />
                        </div>
                        <div className={LoginCSS.checkBoxRememberME}>

                            <Field name={"rememberMe"} type={"checkbox"} labelField="text" component={Input} value="RememberMer" /> Запомнить меня
        </div>

                        {error && <div className={LoginCSS.formSummaryError}>
                            {error}
                        </div>}
                        <div className={`${LoginCSS.wrapper__login_button} ${LoginCSS.button}`}>
                            <button className={`${LoginCSS.button} ${LoginCSS.input}`}>Зайти </button>
                        </div>
                    </form>
                </div>
    )
}




const AdminAuthReduxFrom = reduxForm({ form: 'adminAuth' })(AdminForm);

const AdminAuth = (props) => {
    if (props.isAuth) {
        return <Redirect to={"/adminPanel"} />
    }

    const onSubmit = (formData) => {
        props.adminAuth(formData.email, formData.password, formData.rememberMe)
    }



    return <div className={LoginCSS.container_registration}>
        <AdminAuthReduxFrom onSubmit={onSubmit} changingPage={props.changingPage} />
    </div>
}
const mapStateToProps = (state) => ({
    isAuth: state.adminAuth.isAuth,
    adminAuth: state.adminAuth.adminAuth,
   

})
export default connect(mapStateToProps, { adminAuth })(AdminAuth);