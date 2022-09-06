
// const MainAdminPage = () => {
    
//     return (<>
//         <h1>Main page</h1>
//     </>);
// }

// export default MainAdminPage;

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './DataTableDemo.css';
import { getProduct } from '../../actions/products';
import {urlBackend} from '../../http_common';
import productService from '../../services/product.service';
import {push} from 'connected-react-router';
// import { DELL_PRODUCTS } from '../../constants/actionTypes';
// import { classNames } from 'primereact/utils';

const MainAdminPage = () => {

    let emptyProduct = {
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'У наявності'
    };

    // const [products, setProducts] = useState(null);
    // const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    //const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

       
     const { list } = useSelector(state => state.prod);

    
    useEffect(() => {
        try {
            dispatch(getProduct())
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

    

    const openNew = () => {
        
        dispatch(push("/admin/RegisterProduct"));
    }

    

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    

    const editProduct = (product) => {
        console.log("edit", product);
        dispatch(push(`/admin/EditProduct?id=${product.id}`));
        
    }
   

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Додати новий товар" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                
            </React.Fragment>
        )
    }

    
    const imageBodyTemplate = (rowData) => {
        return <img src={`${urlBackend}`+rowData.image} 
        
        onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />
    }

    const formatCurrency = (value) => {
        return value.toLocaleString('ua-UA', { style: 'currency', currency: 'UAH' });
    }
    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    }

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    }

    const statusBodyTemplate = (rowData) => {
        return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    }

    const confirmDeleteProduct = (product) => {
        const Productdel=product.id;
        //console.log("Server is bad register from", Productdel);
        setProduct(product);
        setDeleteProductDialog(true);
    }

    const deleteProduct = (product) => {
                
        //console.log("del", product.name);
        //dispatch({type: DELL_PRODUCTS});
        productService.del_Prod({product})
        
        .then(result => {
            
            //console.log("del+++++++");
         setDeleteProductDialog(false);
         setProduct(emptyProduct);
         toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Продукт видалено', life: 2000 });
         
        })
        .catch(error=> {
            console.log(error.response);
        });

        
        
    }

   
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                 
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"  onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"  onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Панель керування продуктами</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Пошук..." />
            </span>
        </div>
    );
    
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="Так" icon="pi pi-times" className="p-button-text"onClick={()=>deleteProduct(product)}  />
            <Button label="Ні" icon="pi pi-check" className="p-button-text"  onClick={hideDeleteProductDialog}/>
        </React.Fragment>
    );
        
   
    return (
      
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} ></Toolbar>

                <DataTable ref={dt} value={list} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Відображено від {first} до {last} з {totalRecords} товарних позицій"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column> */}
                    <Column field="image" header="Image" body={imageBodyTemplate}></Column>
                    <Column field="name" header="Name" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="description" header="Description" style={{ minWidth: '16rem' }} ></Column>
                    <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="category" header="Category" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>

           

            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Видаленя товару" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {product && <span>Ви впевнені, що хочети видалити <b>{product.name}</b>?</span>}
                </div>
            </Dialog>

            
        </div>
    );
    
    
}

export default MainAdminPage