import React from 'react'

import { useSelector } from 'react-redux';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


const OderItemsPage = () => {

    var url = new URL(window.location.href);
    const oderId = url.searchParams.get("id")
        
    console.log("Id order prod:", oderId);
    const {list}=useSelector(res=>res.order);
    console.log( "list:", list);
    const number_orderProd=list.find(order=>order.id==oderId);
    const orderProd=list.find(order=>order.id==oderId).items;
    
     console.log( "order:", orderProd);
     

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Товарні позиції замовленя № {number_orderProd.id}</h5>
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