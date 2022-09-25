import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { push } from 'connected-react-router';

const HeaderAdmin = () => {
    
    const dispatch = useDispatch();

    const {isAuth, username} = useSelector(redux => redux.auth);



    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/admin">Адмін панель</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/admin">Адмімін</Link>
                        </li> */}
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/admin/userlist">Користувачі</Link>
                            
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/admin/oderlist">Замовлення</Link>
                            
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Вихід на головну</Link>
                        </li>
                    </ul>

                    
                    

                </div>
            </div>
        </nav>
    )
}

export default HeaderAdmin