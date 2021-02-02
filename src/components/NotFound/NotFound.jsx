import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { Result, Button } from 'antd';
import './NotFound.css';


const NotFound = () => {


    return <>
        <div className="container">
            <div className="row">

            <Result 
                status="404"
                title="404"
                subTitle="К сожалению, посещенная вами страница не существует."
                extra={<Button type="primary"> <Link to="/login">главную</Link></Button>}
            />
            </div>
        </div>
    </>

}
export default memo(NotFound)