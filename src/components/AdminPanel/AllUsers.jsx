import React, { useEffect, useState } from 'react';
// import './AdminAuth.module.css'
import {  UserOutlined, CarOutlined } from '@ant-design/icons';
import 'antd/lib/button/style/index.css';
import {
  Form, Input, Button, Checkbox, Modal
  , Table, Tag, Space, Avatar, Image, Select
} from 'antd';
const { Column, ColumnGroup } = Table;

const { Option } = Select;

const User = ({ users, roles }) => {

  console.log(roles);
  // const Roles = [{ nameRole: 'admin', nameRoleRu: 'Админ', idRole: '90f84438-6762-4394-887a-c3196f7e5877' },
  // { nameRole: 'guest', nameRoleRu: 'Гость', idRole: '18a0659d-df47-4c49-b727-0264b81e83e0' },
  // { nameRole: 'driver', nameRoleRu: 'Водитель', idRole: 'e0528690-e98f-480b-ab63-e0d9b81b2b11' },
  // { nameRole: 'manager', nameRoleRu: 'Менеджер', idRole: '5d72b87b-605e-4429-ac11-b29ea5aeed40' },
  // { nameRole: 'Who?', nameRoleRu: 'Неизвестный', idRole: '00000000-0000-0000-0000-000000000000' },

  // ];


  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  useEffect(() => {
    forceUpdate({});
  }, []);
  // function setRole () {
  //   let numberRole = 0
  //   for( numberRole = 0; numberRole<Role.length; numberRole++)
  //     {
  //       return Role[numberRole].idRole
  //     }
  //   // return Role[numberRole].nameRole
  // }

const [visible, setVisible] = useState(false);
//  let state = { visible: false };


  const [enterLoading, setenterLoading] = useState(false)
const handleOk = (id,vehicleType,vehicleNumber) => {
  setenterLoading(true)
    // console.log(e);
    setModalText('Отправка данных');
    setConfirmLoading(true);
      setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
        setenterLoading(false)
        setModalText('Введите номер и тип машины')

      }, 3000);
    
};
  const handleCancel = (e) => {
    console.log(e);
    setVisible(false)
  };
  // модальное окно
  // const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Введите номер и тип машины')
  

  function onChange(value) {
    // Role.nameRoleRu, record.id,Role.idRole
    if (value[2] === roles[2].id) {
      setVisible(true);

    }
    console.log(`selected , ${value[2] === roles[2].id}`);
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

            <Modal
      title= {modalText}
      visible={visible}
      footer={null}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
       
     
       <Form  form={form} name="horizontal_login" layout="inline" >
      <Form.Item
      style={{ width: '100%', marginTop: 10, marginBottom: 20}}
        name="vehicleNumber"
        label="Номер машины"
        
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите номер машины',
          },
        ]}
      >
        <Input prefix={<CarOutlined  className="site-form-item-icon" />} placeholder="Номер машины (х102хх102)" />
      </Form.Item>
      <Form.Item
       style={{ width: '100%', marginTop: 10, marginBottom: 20}}
        name="vehicleType"
        label="Тип автомобиля "
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите тип машины',
          },
        ]}
      >
        <Input prefix={<CarOutlined  className="site-form-item-icon" />} placeholder="Тип машины (Грузовик)" />
      </Form.Item>
      <Form.Item shouldUpdate={true} style={{ marginLeft: 200, marginTop: 20 }} >
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            loading={enterLoading} 
        
            onClick={() => handleOk()}
            
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Готово
          </Button>
        )}
      </Form.Item>
    </Form>
 
        </Modal>
  
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
