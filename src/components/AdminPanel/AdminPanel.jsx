import React, { memo, useState } from 'react';
import Users from './AllUsers.jsx'
import AdminPanelCSS from './AdminAuth.module.css';
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/AuthAdmin-reducer';
import { Input, Space, AutoComplete } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';



const AdminPanel = ({ currentPage, onPageChanged, addDrivers, totalItemsCount, pageSize, users, roles, ...props }) => {
    const { Search } = Input;

    const dispatch = useDispatch();

    const out = () => {
        dispatch(logout());
        window.location.reload();
    }


    const [foundUsers, setfoundUsers] = useState(null)
    const [foundWindow, setfoundWindow] = useState(false)
    // useEffect(() => {
    //     console.log(foundUsers.length === 0);
    //     if (foundUsers.length === 0){
    //         return null;
    //     }
    //     else {
    //         console.log(foundUsers)
    //         return <FoundUsers users={foundUsers} roles={roles} addDrivers={addDrivers} />

    //     }
    // });

    let token = localStorage.getItem('isAuthAdminToken')
    if (token === null) {
        return <Redirect to={'/admin'} />
    }
    console.log(users)
    let foundUser = [];
    const onSearch = (value) => {
        users.filter((user, index) => {
            let userLastNameUpdate = user.lastName.toLowerCase();
            let userFirstNameUpdate = user.firstName.toLowerCase();
            let userLoginUpdate = user.login.toLowerCase();
            let userEmailUpdate = user.email.toLowerCase();
            let userIDUpdate = user.id;
            console.log(value)
            let valueUpdate = value.toLowerCase();
            // console.log(userUpdate,valueUpdate)

            if (userLastNameUpdate.startsWith(valueUpdate) ||
                userLastNameUpdate.startsWith(valueUpdate) ||
                userFirstNameUpdate.startsWith(valueUpdate) ||
                userLoginUpdate.startsWith(valueUpdate) ||
                userEmailUpdate.startsWith(valueUpdate) ||
                userIDUpdate == value
                ) {
                    foundUser.push(user);
                    // console.log(index, user);

                    return setfoundWindow(true);

            }
            else {
                return false;
            }
        })
        setfoundUsers(foundUser)
    }

    return <>

        <div className={AdminPanelCSS.container}>
            <div className={AdminPanelCSS.header_container}>
            {foundWindow ? <h3>Найденные пользователи:</h3>: <h3>Найти пользователей</h3>}
            <button className='hiddenSearchTable' onClick={()=> setfoundWindow(false)}> Скрыть таблицу поиска </button>
                <Space direction="vertical" >
                    <Search
                        placeholder="Фамилия"
                        allowClear
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        size="large"
                        onSearch={onSearch}
                    />
                </Space>
                <button id='Exit' className="Exit" onClick={out}> Выйти </button>
            </div>
                
            {foundWindow && <Users users={foundUsers} roles={roles} addDrivers={addDrivers} />}
            {/* <Paginator currentPage = {currentPage} onPageChanged={onPageChanged} totalItemsCount ={totalItemsCount} pageSize={pageSize}/> */}

            {/* {
                users.map(u => <Users  user={u}/>)
            } */}
            <h3>Список зарегистрированных пользователей:</h3>
            <Users users={users} roles={roles} addDrivers={addDrivers} />

        </div>

    </>

}
// export default connect(withAuthRedirect)(AdminPanel);
export default memo(AdminPanel);
// export default connect(withAuthRedirect)(AdminPanel);