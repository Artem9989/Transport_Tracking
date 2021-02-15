import React, { useState,useEffect } from 'react';
// import './AdminAuth.module.css'
import { UserOutlined } from '@ant-design/icons';
import 'antd/lib/button/style/index.css';
import { Table, Space, Avatar, Select } from 'antd';
import AddDriverComponent from '../AddDriver/addDriverContainer.jsx'
const { Column, ColumnGroup } = Table;

const { Option } = Select;

const FoundUsers = ({ users, roles, addDrivers, onSearch }) => {


    // console.log(users);
    // const Roles = [{ nameRole: 'admin', nameRoleRu: 'Админ', idRole: '90f84438-6762-4394-887a-c3196f7e5877' },
    // { nameRole: 'guest', nameRoleRu: 'Гость', idRole: '18a0659d-df47-4c49-b727-0264b81e83e0' },
    // { nameRole: 'driver', nameRoleRu: 'Водитель', idRole: 'e0528690-e98f-480b-ab63-e0d9b81b2b11' },
    // { nameRole: 'manager', nameRoleRu: 'Менеджер', idRole: '5d72b87b-605e-4429-ac11-b29ea5aeed40' },
    // { nameRole: 'Who?', nameRoleRu: 'Неизвестный', idRole: '00000000-0000-0000-0000-000000000000' },

    // ];

    // титульник модального окна
    const [modalText, setModalText] = useState(`Введите номер и тип машины для пользователя с ID `)
    //отображение модального окна
    const [visible, setVisible] = useState(false);
    //  let state = { visible: false };
    //получение ид пользователя модального окна
    const [driverId, setdriverId] = useState(null);
    function onChange(value) {
        // Role.nameRoleRu, record.id,Role.idRole
        if (value[2] === roles[2].id) {
            setdriverId(value[1])

            // console.log(value)
            // console.log(`Test1`+driverId)
            setVisible(true);

        }
        // console.log(`selected , ${value[2] === roles[2].id}`);
    }

    function onBlur() {
        // console.log(`blur `);
    }

    function onFocus(record) {
        // console.log(`focus: `);
    }

    function onSearch(val) {
        // console.log('search:', val);
    }

    // console.log(users)

    // let numberCar = props.numberCar.map( p=> <Driver numberCar={p.numberCar} name={p.name}/>);
    // Clicked === false ? getInfo() : setClicked(false)
    return (<>
        <Table showHeader={true} loading={false} dataSource={users} size="small">
            <Column
                title="Id"
                key="action"
                render={(text, record) => (
                    <Space size="small">
                        {record.id}
                    </Space>
                )}
            />

            <Column
                title="Логин"
                key="action"
                render={(text, record) => (
                    <Space size="small">
                        {record.login}
                    </Space>
                )}
            />
            <Column
                columnWidth={60}
                title="фото"
                key="action"
                render={(text, record) => (
                    <Space size="small">
                        <Avatar size={58} icon={<UserOutlined />} />
                    </Space>
                )}
            />

            <ColumnGroup title="ФИО">
                <Column title="Имя" dataIndex="firstName" key="firstName" />
                <Column title="Фамилия" dataIndex="lastName" key="lastName" />
            </ColumnGroup>
            <Column
                title="Почта"
                key="action"
                render={(text, record) => (
                    <Space size="small">
                        {record.email}
                    </Space>
                )}
            />
            <Column title="Телефон" dataIndex="address" key="phone" />


            <Column
                title="Состояние"
                key="action"
                render={(text, record) => (
                    <Space size="small">
                        <a>Заблокировать {record.lastName}</a>
                        <a>Разблокировать</a>
                    </Space>
                )}
            />
            <Column
                title="Выбрать роль"
                key="action"
                render={(text, record) => (
                    <Space size="small">
                        <Select
                            showSearch
                            style={{ width: 100 }}
                            placeholder={roles.map((Role, index) =>
                                record.roleId === Role.id ? Role.name : null
                            )}
                            optionFilterProp="children"

                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {roles.map((Role, index) =>

                                <Option value={[Role.name, record.id, Role.id]}>{Role.name}</Option>

                            )}
                        </Select>
                    </Space>
                )}
            />
        </Table>
        <AddDriverComponent setModalText={setModalText} modalText={modalText} driverId={driverId} addDrivers={addDrivers} users={users} setVisible={setVisible}
            roles={roles} visible={visible} />
    </>
    );
}
export default FoundUsers;

