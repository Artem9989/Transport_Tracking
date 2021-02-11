import React, {  useEffect, useState } from 'react';
// import './AdminAuth.module.css'
import {  CarOutlined } from '@ant-design/icons';
// import addDriver from './AddDriver/addDriver.jsx';
// import { Field, reduxForm } from "redux-form";
import 'antd/lib/button/style/index.css';
import { Form, Input, Button, Modal } from 'antd';


const AddDriverComponent = (props) => {
  const { totalItemsCount, roles,modalText,setModalText, setVisible, addDrivers, driverId, users, visible } = props
  // const dispatch = useDispatch();

  // console.log(addDrivers);
  // console.log(`testL` + driverId);

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


  //  let state = { visible: false };

  console.log(modalText)
  const [enterLoading, setenterLoading] = useState(false)
  const handleOk = (value) => {
    addDrivers(driverId, value.vehicleNumber, value.vehicleType )
    console.log(driverId)
    setenterLoading(true)
    // console.log(e);
    setVisible(false);
    setModalText('Отправка данных');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      setenterLoading(false)
      setModalText('Введите номер и тип машины')
      form.resetFields();
    }, 2000);

  };
  const handleCancel = (e) => {
    console.log(e);
    setVisible(false)
    form.resetFields();
  };
  // модальное окно
  // const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

//получение ид пользователя модального окна, передается через пропсы из addDriver
  setModalText(`Введите номер и тип машины для пользователя с ID ${driverId}`)

  return <Modal
    title={modalText}
    visible={visible}
    confirmLoading={confirmLoading}
    onCancel={handleCancel}
    footer={null}
    
  >


    <Form onFinish={handleOk} form={form} name="horizontal_login" layout="inline" >
      <Form.Item
        style={{ width: '100%', marginTop: 10, marginBottom: 20 }}
        name="vehicleNumber"
        label="Номер машины"

        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите номер машины',
          },
        ]}
      >
        <Input prefix={<CarOutlined className="site-form-item-icon" />} placeholder="Номер машины (х102хх102)" />
      </Form.Item>
      <Form.Item
        style={{ width: '100%', marginTop: 10, marginBottom: 20 }}
        name="vehicleType"
        label="Тип автомобиля "
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите тип машины',
          },
        ]}
      >
        <Input prefix={<CarOutlined className="site-form-item-icon" />} placeholder="Тип машины (Грузовик)" />
      </Form.Item>
      <Form.Item shouldUpdate={true} style={{ marginLeft: 200, marginTop: 20 }} >
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            loading={enterLoading}
            
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


}

// export default connect(withAuthRedirect)(AdminPanel);

export default AddDriverComponent
// export default reduxForm({form: 'addDriver'})(addDriverComponent)
// export default connect(withAuthRedirect)(AdminPanel);