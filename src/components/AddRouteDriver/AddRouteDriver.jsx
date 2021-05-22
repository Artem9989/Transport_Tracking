import React,{useState,useEffect} from "react"
import 'antd/lib/button/style/index.css';
import { Form, Input, Button, Modal,Select } from 'antd';
import {  CarOutlined } from '@ant-design/icons';
import AddRouteDriverCSS from './AddRouteDriverCSS.module.css'
import { addDrivers, insertendpoint } from "../../redux/Driver-reducer";
import * as axios from 'axios';
import { insertstartpoint } from "../../redux/Driver-selector";

const { Option } = Select;
export const AddRouteDriver = ({ visible, setvisible , totalItemsCount,
    pageSize,
    currentPage,
    onPageChanged,
    drivers,
    FollowingInProgress,
    getRoute,
    Route,
    insertendpoint,
    insertstartpoint,
    insertpoint,
    insertRoute,
    markers,
}) => {
    const driverList = [...drivers];





    const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  useEffect(() => {
    forceUpdate({});
  }, []);
  
// let token = localStorage.getItem('accessToken');
// const configAxios = {
//     headers: {'X-Requested-With': 'XMLHttpRequest',
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//     "replacecredentials": "same-origin",
//     'Authorization':'Bearer ' + token
//   }
// }
const [modalText, setModalText] = useState('Выберите автомобиль для присваивания маршрута')
const [selectId, setselectId] = useState(false)

  const [enterLoading, setenterLoading] = useState(false)
  const [disabled, setdisabled] = useState(true)
  const [RouteId, setRouteId] = useState()

  const newRoute = () => {
    const idDriver = driverList[selectId].id
    insertRoute(idDriver)
    getRoute(driverList[selectId].id)
    setRouteId(Route.id)
    // console.log(Route.id)
    // setModalText('id route: ' + Route.id);
  }
  
  const handleOk = (value) => {
    //   Здесь функция для добавления маршрутов 
    const idDriver = driverList[selectId].id
    console.log(markers)
    
    console.log(Route, 'routeID')
    
    if (markers.length > 1) {
    // console.log(selectId, 'selectID')
   
 
    insertstartpoint(idDriver,Route.id,markers[0].lat,markers[0].lng)
    if (markers.langth > 2) {
      insertendpoint(idDriver,Route.id,markers[markers.length - 1].lat,markers[markers.length - 1].lng)
    }
    else{
      insertendpoint(idDriver,Route.id, markers[1].lat,markers[1].lng)
    }
    
    
    
    console.log(Route,'Route')


    

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
  }
  else {
    insertRoute(idDriver)
    setModalText('Ошибка, выберите точки маршрута');
  }
};

// const getRoute = async (id) => {
//   debugger
//   await axios.get('http://www.webapiroads.somee.com/api/routes/getroute?driverId='+ `${id}`,{
//     configAxios
// }).then(resp => {
  
// })
// .catch(error => {
//   console.log(error)
// })
// }


const onSelect = (a,b) => {
setdisabled(false)
getRoute(driverList[a].id)
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
              onClick={() => newRoute()}
              >
              Создать новый маршрут
            </Button>,
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