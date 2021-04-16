import React,{useState,useEffect} from "react"
import 'antd/lib/button/style/index.css';
import { Form, Input, Button, Modal,Select } from 'antd';
import {  CarOutlined } from '@ant-design/icons';
import AddRouteDriverCSS from './AddRouteDriverCSS.module.css'

const { Option } = Select;
export const AddRouteDriver = ({ visible, setvisible , totalItemsCount,
    pageSize,
    currentPage,
    onPageChanged,
    drivers,
    FollowingInProgress,
}) => {
    const driverList = [...drivers];
    console.log('driverList',driverList)





    const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  useEffect(() => {
    forceUpdate({});
  }, []);

const [modalText, setModalText] = useState('Выберите автомобиль для присваивания маршрута')
const [selectId, setselectId] = useState(false)

  const [enterLoading, setenterLoading] = useState(false)
  const [disabled, setdisabled] = useState(true)
  const handleOk = (value) => {
    //   Здесь функция для добавления маршрутов 
    // addDrivers(driverId, value.vehicleNumber, value.vehicleType )

    setenterLoading(true)
    // console.log(e);

    // setvisible();
    setModalText('Отправка данных');
    setConfirmLoading(true);
    setTimeout(() => {
        setvisible();
      setConfirmLoading(false);
      setenterLoading(false)
      setModalText('Выберите автомобиль для присваивания маршрута')
      form.resetFields();
    }, 2000);
};

const onSelect = (a,b) => {
setdisabled(false)

setselectId(a)

}

const onClear = () => {
    setdisabled(true)
    // setselectId()
    setselectId(false)
}

    const handleCancel = (e) => {
        console.log(e);
        setvisible()
        form.resetFields();
      };
      // модальное окно
      // const [visible, setVisible] = useState(false);
      const [confirmLoading, setConfirmLoading] = useState(false);
    
    //получение ид пользователя модального окна, передается через пропсы из addDriver
    //   setModalText(`Выберите автомобиль для присваивания маршрута`)

    return (
       
        <Modal
        title={modalText} 
        visible={visible} 
        onOk={()=> setvisible()} 
        okText='Отправить'
        footer = {null}
        onCancel={()=>  handleCancel()}
        style={{ top: 80}}
        width= {'50%'}
      
        footer={[
          
          <Button
              type="primary"
              htmlType="submit"
              loading={enterLoading}
              disabled= {disabled} 
              onClick={() => handleOk()}
              >
              Готово
            </Button>
             ]}
        >
      
    {/* <Form onFinish={() => handleOk()} form={form} name="horizontal_login" layout="inline" > */}
        <Select
        showSearch
        style={{ width: "100%" }}
        placeholder="Поиск по выборке"
        optionFilterProp="children"
        allowClear={true}
        onClear={()=>onClear()}
        onSelect = {(a,b) => onSelect(a,b)}
        // defaultActiveFirstOption={false}
        filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
        }
    >

        {drivers.map((items,idx)=> {
            console.log(idx)
            return <Option value={idx}>{items.vehicleNumber}</Option>
        })}
        

    </Select>

        



      {/* <Form.Item
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
      </Form.Item> */}
      {/* <Form.Item
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
      </Form.Item> */}
      
    
    {!disabled?  
        // console.log('selectID',selectId)
        <div className={AddRouteDriverCSS.infoContainer}>
        <div> Информация о Водителе: </div>
        <div className={AddRouteDriverCSS.info}>
        
        <img className={AddRouteDriverCSS.avatar} src='https://f1.upet.com/h_5JB36T9mqa_q.jpg' alt='Фото не загрузилось' />
      
        <div>
        <div> ФИО: {` ${driverList[selectId].lastName}  
           ${driverList[selectId].firstName }
           ${driverList[selectId].middleName}`}
         </div>
        <div> Тип ТС: {driverList[selectId].login} </div>
        <div> Логин: {driverList[selectId].vehicleType} </div>
        </div>
        </div>
        </div>
        : null}
        {/* <Form.Item shouldUpdate={true} style={{ position: 'absolute', bottom: 10 ,top: 50,right: 0, margin: 0,padding: 0 }} > */}
        {/* {() => ( */}
              {/* <Button
              type="primary"
              htmlType="submit"
              loading={enterLoading}
              disabled= {disabled}
  
              // disabled={
              //   !form.isFieldsTouched(true) ||
              //   !!form.getFieldsError().filter(({ errors }) => errors.length).length
              // }
            >
              Готово
            </Button> */}
        {/* )} */}
      {/* </Form.Item> */}
      {/* </Form> */}
        </Modal>

    )
}