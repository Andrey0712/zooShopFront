import React, {useEffect, useState,
    //useRef 
} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {urlBackend} from '../../http_common';
import cartService from '../../services/cart.service';
import { useHistory } from "react-router-dom";
import {  
    //Del_Item_Product,
        MinusProduct, PlusProd } from '../../actions/cart';

// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
 import { Button } from 'primereact/button';
 import { Tooltip } from 'primereact/tooltip';

 //import jsPDF from 'jspdf'
 //import autoTable from 'jspdf-autotable'
 import { getCartUser} from '../../actions/cart';
 import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

 toast.configure();

const CartDialog = () => {

    const dispatch = useDispatch();
    const[visible,setVisible]=useState(false);
    const { cart } = useSelector(redux => redux);
    const history = useHistory();
    const { list } = useSelector(state => state.cart);
    const [loading, setLoading] = useState(true);
    // const [qqq, setqqq] = useState(null);
    console.log("list",list);
    //console.log("qqq",qqq);
    

    
    useEffect(() => {
        try {
            dispatch(getCartUser())
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


    const onClickDelete = (e) => 
    {
        e.preventDefault();
        const cartProductdel=e.target.id;
       //var data ={productId: cartProductdel}
        var row = document.getElementById(cartProductdel);
        cartService.del_cartProd(cartProductdel)
        .then(result => {
            
            row.remove();
            
        }).catch(error=> {
            console.log(error.response);
        });

    }

       
    const onClickPlus = (e) => {
        e.preventDefault();
        const id=e.target.id;
        //const count= e.quantity;
        console.log("productId",id);
        //console.log("count",count);

        //if()
        try {            
            var data = {
                productId: id
                
                //quantity: count
            }
            console.log("data",data);
            
            dispatch(PlusProd(data))
                .then(() => {
                    setVisible(true);
                    console.log("Add to cart competed!");
                    history.push("/cart");
                })
                .catch(ex => {

                    toast.error('Нажаль, ця товарна позиція закінчилась.', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });


                    // toast.warn ("ПЕРЕБОР",{position: toast.POSITION.BOTTOM_RIGHT,autoClose:5000});
                    console.log("ПЕРЕБОР ");
                });
        }
        catch (error) {
            console.log("Server is bad ", error);
        }
    }

    const onClickMinus = (e) => {
        e.preventDefault();
        const id=e.target.id;
        try {            
            var data = {
                productId: id,
                //quantity: -1
            }
            dispatch(MinusProduct(data))
                .then(() => {
                    setVisible(true);
                    console.log("Minus to cart competed!");
                    history.push("/cart");
                })
                .catch(ex => {

                    toast.error('Ця товарна позиція залишилась у кошику в одному екземплярі. ', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                });
        }
        catch (error) {
            console.log("Server is bad ", error);
        }
    }
    
    const cols = [
        { field: 'id', header: 'Id' },
        { field: 'productName', header: 'Name' },
        { field: 'productPrice', header: 'Price' },
        { field: 'quantity', header: 'Quantity' }
        // { field: 'productImage', header: 'Image' }
        
    ];

    const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));

    
    const exportPdf = () => {

        import('jspdf').then(jsPDF => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);

                doc.autoTable(exportColumns, list);
                doc.save('Замовленя.pdf');
            })
        })
    }

    const header = (
        <div className="flex align-items-center export-buttons">
            
            <Button type="button" icon="pi pi-file-pdf" onClick={exportPdf} className="p-button-warning mr-2" data-pr-tooltip="PDF" />
            
        </div>
    );

       

    return (

        
       
         <div className="row">
            <div className="offset-md-2 col-md-6">
            <br/>

                <h1 className="text-center" >Кошик</h1>

                 <Tooltip target=".export-buttons>button" position="bottom" />

           
            {
               
                
                
                <table className="table">
                <thead className="table table-bordered">
                    <tr>
                    {/* <th scope="col">ID</th> */}
                        <th scope="col">Фото</th>
                        <th scope="col">Назва</th>
                        <th scope="col">Ціна</th>
                        <th scope="col">Кількість</th>
                        <th scope="col">Вартість</th>
                        <th scope="col">Дії</th>
                    </tr>
                </thead>

                 <tbody>
                    {
                    list && list.map((item) =>
                        <tr key={item.id}>
                           {/* <td>{item.productId}</td> */}
                            <td>
                                <img src={`${urlBackend}`+item.productImage}
                                    alt=" "
                                    width="100"
                                />
                            </td>
                            
                            <td>{item.productName}</td>
                            <td> {item.productPrice} грн.</td>
                            <td> {item.quantity} </td>
                            {/* <td> {item.quantityOll} </td> */}
                            <td> {item.quantity*item.productPrice} грн. </td>
                            
                            <i className="fa fa-trash-o text-danger fa-2x" id={item.id} 
                                            onClick={onClickDelete} style={{cursor: 'pointer'}} aria-hidden="true"></i>
                            <i className="fa fa-plus-square-o fa-2x" id={item.id} 
                                            onClick={onClickPlus} style={{cursor: 'pointer'}} aria-hidden="true"></i>
                            <i className="fa fa-minus-square-o fa-2x" id={item.id} 
                                            onClick={onClickMinus} style={{cursor: 'pointer'}} aria-hidden="true"></i>


                        </tr>)}
                        
                </tbody>
               
            </table>
            }
            <br/>
                        <hr width="250" />
                    <h3 className="text-left" >До оплати {cart.summa} грн.</h3>
            
                    
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
             
             <button type="submit" onClick={() => {
                
                history.push("/сheckOut");
                

                        // cartService.del_cart()
                        //     .then(result => {
                        //         history.push("/");
                                
                        //     }).catch(error => {
                        //         console.log(error.response);
                        //     });

          }}
          className="btn btn-primary">Замовити</button>  
          {/* <div className="flex align-items-center export-buttons">
            
            <Button type="button" icon="pi pi-file-pdf" onClick={exportPdf} className="p-button-warning mr-2" data-pr-tooltip="PDF" />
            
        </div> */}
         </div>

               <br/>          
            </div>
            </div>
            
    );
}
export default CartDialog;