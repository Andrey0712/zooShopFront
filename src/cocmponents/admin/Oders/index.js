
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
//import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './DataTableOder.css';
import {push} from 'connected-react-router';
import { chack_status, getOrders } from '../../../actions/orders';
import ordersService from '../../../services/orders.service';
import { useHistory } from "react-router-dom";

const OdersPage = () => {


    let empty = {
        id:'',
        consumerFirstName: '',
        consumerSecondName: '',
        consumerPhone:'',
        region:'',
        city: '',
        postOffice: '',
        statusName:''
        
        
    };

    
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [order, setOrder] = useState(empty);
    const [selected, setSelected] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { list } = useSelector(state => state.order);
    const history = useHistory();
         
    useEffect(() => {
        try {
            dispatch(getOrders())
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

    // const onClickPlus = (e) => {
    //     e.preventDefault();
    //     const id=e.target.id;
    //     try {            
    //         var data = {
    //             productId: id
    //             //quantity: 1
    //         }
    //         dispatch(PlusProd(data))
    //             .then(() => {
    //                 setVisible(true);
    //                 console.log("Add to cart competed!");
    //                 history.push("/cart");
    //             })
    //             .catch(ex => {
    //             });
    //     }
    //     catch (error) {
    //         console.log("Server is bad ", error);
    //     }
    // }
    
    const statusCheck = (status) => {
        console.log("statusCheck", status);
        try {            
                    var dataStatus = {
                        Id: status.id,
                        StatusId: 2
                    }
                    console.log("data",dataStatus);
                    dispatch(chack_status(dataStatus))
                .then(() => {
                    //setVisible(true);
                    console.log("statusCheck!");
                    history.push("/admin/oderlist");
                })
                .catch(ex => {
                });
                }
                catch (error) {
                    console.log("Server is bad ", error);
                }
               
    }

    const statusTrash=(status)=>{
        console.log("statusTrash", status);
        try {            
                    var dataStatus = {
                        Id: status.id,
                        StatusId: 3
                    }
                    console.log("data",dataStatus);
                    dispatch(chack_status(dataStatus))
                .then(() => {
                    //setVisible(true);
                    console.log("statusTrash!");
                    history.push("/admin/oderlist");
                })
                .catch(ex => {
                });
                }
                catch (error) {
                    console.log("Server is bad ", error);
                }
               

    }
   
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                 
                <Button icon="pi pi-check" className="p-button-rounded p-button-success mr-2"  onClick={() => statusCheck(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger"   onClick={()=>statusTrash(rowData)}/>
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Панель керування замовленями</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Пошук..." />
            </span>
        </div>
    );
    
    return (
      
        <div className="datatable-crud-demo">
            
            <Toast ref={toast} />

            <div className="card">
               
                <DataTable ref={dt} value={list} selection={selected} onSelectionChange={(e) => setSelected(e.value)}
                    dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column field="consumerFirstName" header="Ім'я" style={{ minWidth: '6rem' }}></Column>
                    <Column field="consumerSecondName" header="Призвище" style={{ minWidth: '8rem' }}></Column>
                    <Column field="consumerPhone" header="Телефон" sortable style={{ minWidth: '8rem' }} ></Column>
                    <Column field="region" header="Регіон" sortable style={{ minWidth: '10rem' }} ></Column>
                    <Column field="city" header="Місто" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="postOffice" header="Поштове відділеня" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="statusName" header="Статус замовленя" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column header="Зміна статусу замовленя" body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

           

                        
        </div>
    );

}

 export default OdersPage;

// const OdersPage = () => {
//     return (
//       <>
        
//           <title>Нічого не знайдено</title>
        
//         <h2>Nothing to see here!</h2>
//         <p>
//           <Link to="/">Go to the home page</Link>
//         </p>
//       </>
//     );
// }

// export default OdersPage;