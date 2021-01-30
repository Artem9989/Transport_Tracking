import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login } from '../../redux/Auth-reducer'
import LoginForm from './Login'


const LoginReduxFrom = reduxForm({ form: 'login' })(LoginForm);
const Login = (props) => {
   

    const onSubmit = (formData) => {

        props.login(formData.email, formData.password, formData.rememberMe)
    }

    // if (props.isAuth) {
    //     return <Redirect to={"/main"} />
    // }
    
    return <div>
        <h1>Логин</h1>
        <LoginReduxFrom handleSubmit={onSubmit}/>
    </div>
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    email: state.auth.email,
    password: state.auth.password,
    rememberMe: state.auth.rememberMe
})


export default connect(mapStateToProps, { login })(Login);

//  const decoratedComponent = connect(mapStateToProps, { login })(Login);
// reduxForm({ form: 'login' })(decoratedComponent);
// compose(connect(mapStateToProps, {login}),reduxForm({ form: 'login', validate })(Login))