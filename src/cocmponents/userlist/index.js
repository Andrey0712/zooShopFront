import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import http from "../../http_common";
import { getUsers } from '../../actions/users';
import userService from "../../services/user.service";
import { Link } from 'react-router-dom';


const UsersPage = () => {
    const dispatch = useDispatch();
    //const list = useSelector(state => state.users.list);
    const { list } = useSelector(state => state.user);

    const onClickEdit = (e) => {
        
    }
    
const onClickDelete = (e) => 
    {
        const userdel=e.target.id;
        var row = document.getElementById(userdel);
        userService.del_user(userdel)
        .then(result => {
            //dispatch(push("/user"));
            row.remove();
            
        }).catch(error=> {
            console.log(error.response);
        });

    }
    

    useEffect(()=>
    {
        dispatch(getUsers());
        console.log("Request to server");
    },[]);
    console.log("Render component users")
    return(
              
            
            <div className="offset-2 col-md-8">
                <h1>Список користувачів</h1>    
            <table className="table table-striped ">
                <thead className="thead-dark">
                    <tr>
                    
                        <th scope="col">Фото</th>
                        <th scope="col">Имя</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Действие</th>
                    </tr>
                </thead>
                <tbody>
                {                    
                  list && list.map((item, index) => 
                  <tr id={item.email} key={index}>
                                <td>
                                {/* <img width="60" height="60" src={'/images/' + item.image} alt="no image"/> `/edit/${item.email}` */  }
                                    <img src={http.defaults.baseURL+item.photo} alt="no foto" width="60" height="60"/>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>
                                <div className="mx-auto">
                                <i className="fa fa-trash-o text-danger fa-2x" id={item.email} 
                                            onClick={onClickDelete} style={{cursor: 'pointer'}} aria-hidden="true"></i>
                                            <Link to={"/edit?email=" + item.email }><i className="fa fa-pencil text-info fa-2x ms-2" onClick={onClickEdit}
                                            style={{cursor: 'pointer'}} aria-hidden="true"></i></Link>
                                             </div>
                                    </td>
                            </tr>)


                
                


                }
                </tbody>
            </table>
        </div>
    )
}

export default UsersPage;