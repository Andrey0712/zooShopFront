import React, {useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {urlBackend} from '../../http_common';
import cartService from '../../services/cart.service';
import { useHistory } from "react-router-dom";
import { AddCartProduct, MinusProduct, PlusProd } from '../../actions/cart';

const CartDialog = () => {

    const dispatch = useDispatch();
    const[visible,setVisible]=useState(false);
    const { cart } = useSelector(redux => redux);
    const history = useHistory();
    const { list } = useSelector(state => state.cart);

    const onClickDelete = (e) => 
    {
        e.preventDefault();
        const cartProductdel=e.target.id;
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
        try {            
            var data = {
                productId: id
                //quantity: 1
            }
            dispatch(PlusProd(data))
                .then(() => {
                    setVisible(true);
                    console.log("Add to cart competed!");
                })
                .catch(ex => {
                });
        }
        catch (error) {
            console.log("Server is bad ", error);
        }
    }

    const onClickMinus = (e, id) => {
        e.preventDefault();
        try {            
            var data = {
                productId: id,
                //quantity: -1
            }
            dispatch(MinusProduct(data))
                .then(() => {
                    setVisible(true);
                    console.log("Minus to cart competed!");
                })
                .catch(ex => {
                });
        }
        catch (error) {
            console.log("Server is bad ", error);
        }
    }
    

    return (
       
         <div className="row">
            <div className="offset-md-2 col-md-6">
            <br/>
                <h1 className="text-center" >Кошик</h1>
           
            {<table className="table">
                <thead className="table table-bordered">
                    <tr>
                       
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Suma</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {list && list.map((item) =>
                        <tr key={item.id}>
                           
                            <td>
                                <img src={`${urlBackend}`+item.productImage}
                                    alt=" "
                                    width="100"
                                />
                            </td>
                            <td>{item.productName}</td>
                            <td> {item.productPrice} грн.</td>
                            <td> {item.quantity} </td>
                            <td> {item.quantity*item.productPrice} грн. </td>
                            
                            <i className="fa fa-trash-o text-danger fa-2x" id={item.id} 
                                            onClick={onClickDelete} style={{cursor: 'pointer'}} aria-hidden="true"></i>
                            <i className="fa fa-plus-square-o fa-2x" id={item.id} 
                                            onClick={onClickPlus} style={{cursor: 'pointer'}} aria-hidden="true"></i>
                            <i className="fa fa-minus-square-o fa-2x" id={item.id} 
                                            onClick={onClickMinus} style={{cursor: 'pointer'}} aria-hidden="true"></i>


                        </tr>)}
                         
                </tbody>
               
            </table>}
            <br/>
                        <hr width="250" />
                    <h3 className="text-left" >До оплати {cart.summa} грн.</h3>
            
                               
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
             <button type="submit" onClick={() => {

                        cartService.del_cart()
                            .then(result => {
                                history.push("/");
                                
                            }).catch(error => {
                                console.log(error.response);
                            });

          }}
          className="btn btn-primary">Замовити</button>  
         </div>

               <br/>          
            </div>
            </div>
            
    );
}
export default CartDialog;