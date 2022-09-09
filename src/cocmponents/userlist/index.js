
 import { getUsers } from '../../actions/users';
 import userService from "../../services/user.service";
// import { Link } from 'react-router-dom';


import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './DataTableUser.css';
import {push} from 'connected-react-router';

const UsersPage = () => {


    let empty = {
        email: '',
        firstName: '',
        secondName:'',
        phone:''
        
    };

    // const [products, setProducts] = useState(null);
    // const [productDialog, setProductDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [user, setUser] = useState(empty);
    const [selected, setSelected] = useState(null);
    //const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

       //     const dispatch = useDispatch();
//     //const list = useSelector(state => state.users.list);
     const { list } = useSelector(state => state.user);
     //const { list } = useSelector(state => state.prod);

    
    useEffect(() => {
        try {
            dispatch(getUsers())
                .then(() => {
                    setLoading(false);
                })
                .catch(ex => {
                    setLoading(false);
                });
        }
        catch (error) {
            setLoading(false);
            console.log("Server is bad register from", error);
        } 
    }, []);

   
    const hideDeleteDialog = () => {
        setDeleteDialog(false);
    }

    

    const editProduct = (product) => {
        console.log("edit", product);
        dispatch(push(`/admin/EditProduct?id=${product.id}`));
        
    }
   

    // const leftToolbarTemplate = () => {
    //     return (
    //         <React.Fragment>
    //             <Button label="Додати новий товар" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                
    //         </React.Fragment>
    //     )
    // }

    
    // const imageBodyTemplate = (rowData) => {
    //     return <img src={`${urlBackend}`+rowData.image} 
        
    //     onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />
    // }

    // const formatCurrency = (value) => {
    //     return value.toLocaleString('ua-UA', { style: 'currency', currency: 'UAH' });
    // }
    // const priceBodyTemplate = (rowData) => {
    //     return formatCurrency(rowData.price);
    // }

    // const ratingBodyTemplate = (rowData) => {
    //     return <Rating value={rowData.rating} readOnly cancel={false} />;
    // }

    // const statusBodyTemplate = (rowData) => {
    //     return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    // }

    const confirmDelete = (user) => {
        //const Productdel=product.id;
        //console.log("Server is bad register from", Productdel);
        setUser(user);
        setDeleteDialog(true);
    }

    const deleteUser = (user) => {
        //const userdel=product.id;
        //console.log("del", userdel);
        //dispatch({type: DELL_PRODUCTS});
        //productService.del_Prod({product})
        userService.del_user({user})
        .then(result => {
            
            //console.log("del+++++++");
         setDeleteDialog(false);
         setUser(empty);
         toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Користувача видалено', life: 2000 });
         
        })
        .catch(error=> {
            console.log(error.response);
        });

        
        
    }

   
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                 
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"  onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"  onClick={() => confirmDelete(rowData)} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Панель керування користувачами</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Пошук..." />
            </span>
        </div>
    );
    
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="Так" icon="pi pi-times" className="p-button-text"onClick={()=>deleteUser(user)}  />
            <Button label="Ні" icon="pi pi-check" className="p-button-text"  onClick={hideDeleteDialog}/>
        </React.Fragment>
    );
        
   
    return (
      
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">
                {/* <Toolbar className="mb-4" left={leftToolbarTemplate} ></Toolbar> */}

                <DataTable ref={dt} value={list} selection={selected} onSelectionChange={(e) => setSelected(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Відображено з {first} по {last} всього {totalRecords} користувачів"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column field="email" header="Email" style={{ minWidth: '8rem' }}></Column>
                    <Column field="firstName" header="FirstName" sortable style={{ minWidth: '16rem' }} ></Column>
                    <Column field="secondName" header="SecondName" sortable style={{ minWidth: '16rem' }} ></Column>
                    <Column field="phone" header="Phone" style={{ minWidth: '10rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>

           

            <Dialog visible={deleteDialog} style={{ width: '450px' }} header="Видаленя товару" modal footer={deleteProductDialogFooter} onHide={hideDeleteDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {user && <span>Ви впевнені, що хочети видалити <b>{user.name}</b>?</span>}
                </div>
            </Dialog>

            
        </div>
    );





//     const dispatch = useDispatch();
//     //const list = useSelector(state => state.users.list);
//     const { list } = useSelector(state => state.user);

//     const onClickEdit = (e) => {
        
//     }
    
// const onClickDelete = (e) => 
//     {
//         const userdel=e.target.id;
//         var row = document.getElementById(userdel);
//         userService.del_user(userdel)
//         .then(result => {
//             //dispatch(push("/user"));
//             row.remove();
            
//         }).catch(error=> {
//             console.log(error.response);
//         });

//     }
    

//     useEffect(()=>
//     {
//         dispatch(getUsers());
//         console.log("Request to server");
//     },[]);
//     console.log("Render component users")
//     return(
              
            
//             <div className="offset-2 col-md-8">
//                 <h1>Список користувачів</h1>    
//             <table className="table table-striped ">
//                 <thead className="thead-dark">
//                     <tr>
                    
//                         <th scope="col">Фото</th>
//                         <th scope="col">Имя</th>
//                         <th scope="col">E-mail</th>
//                         <th scope="col">Действие</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                 {                    
//                   list && list.map((item, index) => 
//                   <tr id={item.email} key={index}>
//                                 <td>
//                                 {/* <img width="60" height="60" src={'/images/' + item.image} alt="no image"/> `/edit/${item.email}` */  }
//                                     <img src={http.defaults.baseURL+item.photo} alt="no foto" width="60" height="60"/>
//                                 </td>
//                                 <td>{item.name}</td>
//                                 <td>{item.email}</td>
//                                 <td>
//                                 <div className="mx-auto">
//                                 <i className="fa fa-trash-o text-danger fa-2x" id={item.email} 
//                                             onClick={onClickDelete} style={{cursor: 'pointer'}} aria-hidden="true"></i>
//                                             <Link to={"/edit?email=" + item.email }><i className="fa fa-pencil text-info fa-2x ms-2" onClick={onClickEdit}
//                                             style={{cursor: 'pointer'}} aria-hidden="true"></i></Link>
//                                              </div>
//                                     </td>
//                             </tr>)


                
                


//                 }
//                 </tbody>
//             </table>
//         </div>
//     )
}

export default UsersPage;