import React, {useEffect, useState} from 'react';
// import './AdminAuth.module.css'
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { Table, Tag, Space } from 'antd';
import 'antd/lib/button/style/index.css';

const { Column, ColumnGroup } = Table;

const { Option } = Select;

const User = ({users,FollowingInProgress}) => {
  
  function onChange(value) {
    console.log(`selected ${value}`);
  }
  
  function onBlur() {
    console.log('blur');
  }
  
  function onFocus() {
    console.log('focus');
  }
  
  function onSearch(val) {
    console.log('search:', val);
  }
console.log(users)
    // let numberCar = props.numberCar.map( p=> <Driver numberCar={p.numberCar} name={p.name}/>);
    // Clicked === false ? getInfo() : setClicked(false)
    return(<>

     <Table   loading={false} dataSource={users}>
     <Column
      title="Id"
      key="action"
      render={(text, record) => (
        <Space size="middle">
           {record.id}
        </Space>
      )}
    />

    <Column
      title="Логин"
      key="action"
      render={(text, record) => (
        <Space size="middle">
           {record.login} 
        </Space>
      )}
    />
     <Column
     columnWidth={64}
      title="фото"
      key="action"
      render={(text, record) => (
        <Space size="middle">
           <Avatar size={63} icon={<UserOutlined />} /> 
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
        <Space size="middle">
           {record.email}
        </Space>
      )}
    />
    <Column title="Телефон" dataIndex="address" key="phone" />

    <Column
      title="Выбрать роль"
      key="action"
      render={(text, record) => (
        <Space size="middle">
                <Select
              showSearch
              style={{ width: 100 }}
              placeholder="Роль"
              optionFilterProp="children"
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
            <Option value="Водитель">Водитель</Option>
            <Option value="Менеджер">Менеджер</Option>
            <Option value="Админ">Админ</Option>
            <Option value="Гость">Гость</Option>
          </Select>
        </Space>
      )}
    />
      <Column
      title="Состояние"
      key="action"
      render={(text, record) => (
        <Space size="middle">
          <a>Заблокировать {record.lastName}</a>
          <a>Разблокировать</a>
        </Space>
      )}
    />
  </Table>
   
        
         
        
         </>
    );
}
export default User;

{/* <div  id="hider" className="driver-data"  >
<div id = "drivers"  className= {DriverCSS.drivers}>
    {/* <img className= {DriverCSS.avatar} src= 'https://f1.upet.com/h_5JB36T9mqa_q.jpg' alt='Фото не загрузилось' /> */}
    // <Avatar size={64} icon={<UserOutlined />} /> 
        // <Avatar size={64} src={user.photos != null ? user.photos : UserOutlined}       style={{
// color: '#f56a00',
// backgroundColor: '#fde3cf',
// borderRadius: 50,
// padding: 5
// }}
// >  {user.firstName}  </Avatar>
        
//       <div className="div"> Фамилия {user.lastName} </div>
//        <div className="">Отчество{user.middleName}</div>
//        <div className="">Логин: {user.login} </div>
//        <div className="">Пароль: {user.password}</div>
//       <div className=""> Почта: {user.email}</div>
//       <Select
//       showSearch
//       style={{ width: 200 }}
//       placeholder="Select a person"
//       optionFilterProp="children"
//       onChange={onChange}
//       onFocus={onFocus}
//       onBlur={onBlur}
//       onSearch={onSearch}
//       filterOption={(input, option) =>
//         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//       }
//     >
//     <Option value="jack">Jack</Option>
//     <Option value="lucy">Lucy</Option>
//     <Option value="tom">Tom</Option>
//   </Select>
// <p> № машины: <span className={DriverCSS.infoDriver}> {user.id} </span> </p>
// </div>
// <div id="driver-data-add" className='driver-data-add' >
// <p> Номер Телефона : <span className={DriverCSS.infoDriver}>  </span> </p>


// </div>
// </div> */}
