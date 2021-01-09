import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../Common/FormsControls/FormsControls'
import { required } from '../../redux/utils/validators/Validators'
import { connect } from 'react-redux';
import { login } from '../../redux/Auth-reducer'
import { Redirect } from 'react-router-dom';
import LoginCSS from './Login.module.css';

// const Register = (props) => {
//     const [first_name, setFirst_name] = useState('');
//     const [last_name, setLast_name] = useState('');
//     const [middle_name, setMiddle_name] = useState('');
//     const [pass_one, setPassword_one] = useState('');
//     const [pass_confirm, setPassword_confirm] = useState('');
//     const [login, setLogin] = useState('');
//     const [email, setEmail] = useState('');

//     const onChangeLogin = ({ target: { value } }) => {
//         setLogin(value)
//     }
//     const onChangeFirst_name = ({ target: { value } }) => {
//         setFirst_name(value)
//     }
//     const onChangeLast_name = ({ target: { value } }) => {
//         setLast_name(value)
//     }
//     const onChangeMiddle_name = ({ target: { value } }) => {
//         setMiddle_name(value)
//     }
//     const onChangePass_one = ({ target: { value } }) => {
//         setPassword_one(value)
//     }
//     const onChangePass_confirm = ({ target: { value } }) => {
//         setPassword_confirm(value)
//     }
//     const onChangeEmail = ({ target: { value } }) => {
//         setEmail(value)
//     }

//     const doRegister = () => {
//         if ((pass_one && pass_confirm && first_name && login && last_name && middle_name && email) !== '') {
//             if (pass_one.length < 5) {
//                 // Пользователь ввел пароль меньше 5 символов
//                 alert("Пароль должен быть не меньше 5 символов!");
//             } else if (pass_one === pass_confirm) {
//                 // Регестрируем пользователя

//                 // !!!!!!!! Поле mail никуда не записывается в меру функции создания пользователя в API
//                 axios.post('http://www.webapiroads.somee.com/api/account/register', {
//                     Login: login,
//                     Password: pass_one,
//                     //    Password: pass_two,
//                     FirstName: first_name,
//                     LastName: last_name,
//                     MiddleName: middle_name,
//                     Email: email
//                 },
//                     {
//                         headers: {
//                             'Access-Control-Allow-Origin': 'http://www.webapiroads.somee.com',
//                             'X-Requested-With': 'XMLHttpRequest',
//                             'Accept': 'application/json',
//                             'Content-Type': 'application/json'
//                         }
//                     })

//                     // Если запрос успешен
//                     .then(function (response) {
//                         console.log(response);
//                     })
//                     // Если запрос с ошибкой
//                     .catch(function (response) {
//                         alert(response.response.data.data.message);
//                         /*        if (error.message = "Request failed with status code") {
//                                     alert("Oops! Пользователь с таким логином уже существует. :c");
//                                 }*/
//                     });
//             } else {
//                 // Пользователь ввел несовпадающие пароли
//                 alert("Пароли не совпадают!");
//             }
//         } else {
//             // Пользователь ввел не все поля
//             alert("Заполните все поля!");
//         }
//     }




const RegisterForm = ({handleSubmit , error, changingPage}) => {
    return (<div id="register" className={`${LoginCSS.wrapper__register} ${LoginCSS.form}`}>
    <form onSubmit={handleSubmit}>
        
    <h1> Регистрация </h1>
        <label htmlFor="Emailsignup" className={LoginCSS.uname} data-icon="p">Ваша e-mail </label>
        <div className={LoginCSS.uname}>
            
            <Field name={"email"} placeholder={"Ваша почта (@mail)"} component={Input} validate={[required]} />
        </div>
        <label htmlFor="first_namesignup" className="wrapper__register_first_name" data-icon="e">Имя</label>
        <div className={LoginCSS.youpasswd}>
            <Field name={"first_namesignup"} placeholder={"Иван"} component={Input} validate={[required]} />
        </div>
        <label htmlFor="last_namesignup" className="wrapper__register_last_name" data-icon="e">Фамилия</label>
        <div className={LoginCSS.youpasswd}>
            <Field name={"last_namesignup"} placeholder={"Иванов"}  component={Input} validate={[required]} />
        </div>
        <label htmlFor="middle_namesignup" className="wrapper__register_middle_name" data-icon="e">Отчество</label>
        <div className={LoginCSS.youpasswd}>
            <Field name={"middle_namesignup"} placeholder={"Иванович"} component={Input} validate={[required]} />
        </div>
        <label htmlFor="password" className={LoginCSS.youpasswd} data-icon="p"> Ваш пароль </label>
        <div className={LoginCSS.youpasswd}>
            <Field name={"pass_onesignup"} placeholder={"Введите пароль"} type={"password"} component={Input} validate={[required]} />
        </div>
        <label htmlFor="password" className={LoginCSS.youpasswd} data-icon="p"> Подтвердите ваш пароль </label>
        <div className={LoginCSS.youpasswd}>
            <Field name={"Passwordsignup_confirm"} placeholder={"Повторите пароль"} type={"password"} component={Input} validate={[required]} />
        </div>
        <div>
            <Field name={"rememberMe"} type={"checkbox"} component={Input} /> Запомнить меня
    </div>
        {error && <div className={LoginCSS.formSummaryError}>
            {error}
        </div>}

        <div className={`${LoginCSS.wrapper__register_button}  ${LoginCSS.button}`}>

            <button>Регистрация</button>
        </div>

    </form>     
    <p>
                <label htmlFor="roledsignup" className="wrapper__register_role" data-icon="p"> Выберите роль </label>
                <select size="4" multiple name="Role[]">
                <option disabled> Выберите роль</option>
                    <option value="Role_One">Водитель </option>
                    <option value="Role_Two">Менеджер</option>
                    </select>
            </p>
            {/* <p className="wrapper__register_button button">
                <input id="btnRegister" type="submit" value="Регистрация" onClick={onSubmit} />
            </p> */}

       <p className={` ${LoginCSS.wrapper__login_change} ${LoginCSS.button}`}>
       Уже зарегистрированы ?
           <button className={LoginCSS.to_login} onClick={changingPage}> Присоединится</button>
    </p>
</div>
    )
}

const RegisterReduxFrom = reduxForm({ form: 'register' })(RegisterForm);

const Register = (props) => {
    if (props.isAuth) {
        return <Redirect to={"/login"} />
    }

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

 

    return <div>
        <h1>Логин</h1>
        <RegisterReduxFrom onSubmit={onSubmit} changingPage={props.changingPage}/>
    </div>
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,

})
export default connect(mapStateToProps, { login })(Register);