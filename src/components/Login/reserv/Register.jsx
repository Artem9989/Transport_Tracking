import React, { memo, useState } from 'react';
import axios from 'axios';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../Common/FormsControls/FormsControls'
import { required } from '../../redux/utils/validators/Validators'
import { connect } from 'react-redux';
import { login } from '../../redux/Auth-reducer'
import { Redirect } from 'react-router-dom';
import LoginCSS from './Login.module.css';

const Register = (props) => {
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [middle_name, setMiddle_name] = useState('');
    const [pass_one, setPassword_one] = useState('');
    const [pass_confirm, setPassword_confirm] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');

    const onChangeLogin = ({ target: { value } }) => {
        setLogin(value)
    }
    const onChangeFirst_name = ({ target: { value } }) => {
        setFirst_name(value)
    }
    const onChangeLast_name = ({ target: { value } }) => {
        setLast_name(value)
    }
    const onChangeMiddle_name = ({ target: { value } }) => {
        setMiddle_name(value)
    }
    const onChangePass_one = ({ target: { value } }) => {
        setPassword_one(value)
    }
    const onChangePass_confirm = ({ target: { value } }) => {
        setPassword_confirm(value)
    }
    const onChangeEmail = ({ target: { value } }) => {
        setEmail(value)
    }

    const doRegister = () => {
        if ((pass_one && pass_confirm && first_name && login && last_name && middle_name && email) !== '') {
            if (pass_one.length < 5) {
                // Пользователь ввел пароль меньше 5 символов
                alert("Пароль должен быть не меньше 5 символов!");
            } else if (pass_one === pass_confirm) {
                // Регестрируем пользователя

                // !!!!!!!! Поле mail никуда не записывается в меру функции создания пользователя в API
                debugger;
                axios.post('http://www.webapiroads.somee.com/api/account/register', {
                    Login: login,
                    Password: pass_one,
                    //    Password: pass_two,
                    FirstName: first_name,
                    LastName: last_name,
                    MiddleName: middle_name,
                    Email: email
                },
                    {
                        headers: {
                            'Access-Control-Allow-Origin': 'http://www.webapiroads.somee.com',
                            'X-Requested-With': 'XMLHttpRequest',
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })

                    // Если запрос успешен
                    .then(function (response) {
                        console.log(response);
                    })
                    // Если запрос с ошибкой
                    .catch(function (response) {
                        alert(response.response.data.data.message);
                        /*        if (error.message = "Request failed with status code") {
                                    alert("Oops! Пользователь с таким логином уже существует. :c");
                                }*/
                    });
            } else {
                // Пользователь ввел несовпадающие пароли
                alert("Пароли не совпадают!");
            }
        } else {
            // Пользователь ввел не все поля
            alert("Заполните все поля!");
        }
    }



    return <>
        <div id="register" className="wrapper__register form">
            <h1> Регистрация </h1>
            <p>
                <label htmlFor="usernamesignup" className="wrapper__register_uname" data-icon="u">Ваш логин</label>
                <input id="usernamesignup" name="usernamesignup" required="required" type="text" placeholder="Vasya" value={login} onChange={onChangeLogin} />
            </p>
            <p>
                <label htmlFor="Emailsignup" className="wrapper__register_email" data-icon="p">Ваша почта (@mail) </label>
                <input id="Emailsignup" name="Emailsignup" required="required" type="text" placeholder="Vasya@mail.ru" value={email} onChange={onChangeEmail} />
            </p>
            <p>
                <label htmlFor="first_namesignup" className="wrapper__register_first_name" data-icon="e">Имя</label>
                <input id="first_namesignup" name="first_namesignup" required="required" type="text" placeholder="Иван" value={first_name} onChange={onChangeFirst_name} />
            </p>
            <p>
                <label htmlFor="last_namesignup" className="wrapper__register_last_name" data-icon="e">Фамилия</label>
                <input id="last_namesignup" name="last_namesignup" required="required" type="text" placeholder="Иванов" value={last_name} onChange={onChangeLast_name} />
            </p>
            <p>
                <label htmlFor="middle_namesignup" className="wrapper__register_middle_name" data-icon="e">Отчество</label>
                <input id="middle_namesignup" name="middle_namesignup" required="required" type="text" placeholder="Иванович" value={middle_name} onChange={onChangeMiddle_name} />
            </p>
            <p>
                <label htmlFor="pass_onesignup" className="wrapper__register_youpasswd" data-icon="p">Ваш пароль </label>
                <input id="passwordsignup" name="passwordsignup" required="required" type="password" placeholder="123456" value={pass_one} onChange={onChangePass_one} />
            </p>
            <p>
                <label htmlFor="passwordsignup_confirm" className="wrapper__register_youpasswd" data-icon="p">Подтвердите ваш пароль </label>
                <input id="passwordsignup_confirm" name="passwordsignup_confirm" required="required" type="password" placeholder="123456" value={pass_confirm} onChange={onChangePass_confirm} />
            </p>
            <p>
                <label htmlFor="roledsignup" className="wrapper__register_role" data-icon="p"> Выберите роль </label>
          
            </p>
            <p className="wrapper__register_button button">
                <input id="btnRegister" type="submit" value="Регистрация" onClick={doRegister} />
            </p>
            <p className="wrapper__register_change">
                Уже зарегистрированы ?
                <button className="to_register" onClick={props.click} > Присоединится</button>
            </p>
        </div>
    </>
}
