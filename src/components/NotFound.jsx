import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {


    return <>
        <div className="container">
            <div className="row">
            <div className="col-md-12">
                Страница не найдена. Вернуться на{' '}
                <Link to="/login">главную</Link>?
            </div>
            </div>
        </div>
    </>

}
export default memo(NotFound)