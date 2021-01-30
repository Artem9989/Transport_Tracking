// const Login = (props) => {
//     const [login, setLogin] = useState('');
//     const [pass, setPassword] = useState('');
//     //    const [auth, setAuth] = useState(false);

//     const onChangeLogin = ({ target: { value } }) => {
//         setLogin(value)
//     }

//     const onChangePass = ({ target: { value } }) => {
//         setPassword(value)
//     }

//     /*  const doLogin = () => {
//           if (login === {login} && pass === {pass}) {
//               setAuth(true)
//           }
//           else {
//               alert('Пароль не верный')
//           }
//       if (auth) {
//           return <Redirect from="*" to="/main" />
//       }}*/
//     const doLogin = () => {
//         if ((login && pass) !== '') {
//             axios.post('http://www.webapiroads.somee.com/api/account/login', {
//                 Email: login,
//                 Password: pass
//             },
//                 {
//                     headers: {
//                         'Access-Control-Allow-Origin': 'http://www.webapiroads.somee.com',
//                         'X-Requested-With': 'XMLHttpRequest',
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json'
//                     }
//                 })

//                 // Если запрос успешен
//                 .then(function (response) {
//                     ///console.log(response);
//                     localStorage.setItem('accessToken', response.data.data.accessToken);
//                 })
//                 // Если запрос с ошибкой
//                 .catch(function (error) {
//                     alert(error.response.data.data.message);
//                 });
//         } else {
//             // Пользователь ввел не все поля
//             alert("Заполните все поля!");
//         }
//     }

    

//     return <>
//         <div id="login" className="wrapper__login form">
//             <h1>Вход</h1>
//             <p>
//                 <label htmlFor="username" className="uname" data-icon="u"> Ваш e-mail или логин</label>
//                 <input id="username" name="username" required="required" type="text" placeholder="Vasya или vasya_pryanik@list.com" value={login} onChange={onChangeLogin} />
//             </p>
//             <p>
//                 <label htmlFor="password" className="youpasswd" data-icon="p"> Ваш пароль </label>
//                 <input id="password" name="password" required="required" type="password" placeholder="например 123456" value={pass} onChange={onChangePass} />
//             </p>
//             <p className="keeplogin">
//                 <input type="checkbox" name="loginkeeping" id="loginkeeping" value="loginkeeping" />
//                 <label htmlFor="loginkeeping">Запомнить меня</label>
//             </p>
//             <p className="wrapper__login_button button">
//                 <input id="btnLogin" type="submit" value="Войти" onClick={doLogin} />
//             </p>
//             <p className="wrapper__login_change">
//                 Не зарегистрированы еще ?
//                 <button className="to_login" onClick={props.click}> Присоединится</button>
//             </p>
//         </div>
//     </>
// }