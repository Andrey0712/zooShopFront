import React from 'react'

import { useSelector } from 'react-redux';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';


const OderItemsPage = () => {

    var url = new URL(window.location.href);
    const oderId = url.searchParams.get("id")
        
    console.log("Id order prod:", oderId);
    const {list}=useSelector(res=>res.order);
    console.log( "list:", list);
    const number_orderProd=list.find(order=>order.id==oderId);
    const orderProd=list.find(order=>order.id==oderId).items;
    
     console.log( "order:", orderProd);
     

    
    
    const exportExcel = () => {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(orderProd);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            saveAsExcelFile(excelBuffer, 'orderProd');
        });
    }
    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then(module => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    }

const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Товарні позиції замовленя № {number_orderProd.id}</h5>
            <Button type="button" icon="pi pi-file-excel" onClick={exportExcel} className="p-button-success mr-2" data-pr-tooltip="XLS" />
                    </div>
    );


    return (
      
        <div className="datatable-crud-demo">
            
           
            <div className="card">
               
                <DataTable value={orderProd}
                
                    dataKey="id"  header={header} responsiveLayout="scroll">
                    <Column field="productId" header="Номер замовленя" style={{ minWidth: '6rem' }}></Column>
                    <Column field="productName" header="Назва товару" style={{ minWidth: '8rem' }}></Column>
                    <Column field="quantity" header="Кількість" sortable style={{ minWidth: '8rem' }} ></Column>
                    <Column field="buyPrice" header="Ціна" sortable style={{ minWidth: '8rem' }} ></Column>
                    
                    
                </DataTable>
            </div>
                  
        </div>
    );


//     return (
       
//         <div className="row">
//            <div className="offset-md-2 col-md-6">
//            <br/>
//                <h1 className="text-center" >Товарні позиції замовленя № {orderProd.id}</h1>

//                 {/* <Tooltip target=".export-buttons>button" position="bottom" /> */}

          
//            {
              
               
               
//                <table className="table">
//                <thead className="table table-bordered">
//                    <tr>
//                    {/* <th scope="col">ID</th> */}
//                        <th scope="col">Id</th>
//                        {/* <th scope="col">Name</th>
//                        <th scope="col">Price</th>
//                        <th scope="col">Quantity</th> */}
                       
//                    </tr>
//                </thead>

//                 <tbody>
//                    {
//                  this.orderProd.map((item) =>
//                        <tr key={item.productId}>
//                           {/* <td>{item.productId}</td> */}
                           
//                            <td>{item.productId}</td>
//                            {/* <td> {item.buyPrice} грн.</td>
//                            <td> {item.quantity} </td>
//                            <td> {item.productName} грн. </td> */}
                           
                           
//                        </tr>)
//                        }
                       
//                </tbody>
              
//            </table>
//            }
                   
//            </div>
//            </div>
           
//    );

}

export default OderItemsPage;