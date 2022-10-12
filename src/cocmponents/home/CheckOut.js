import React, {useState,
    useRef 
} from 'react'
import { Form, Formik } from 'formik';
import { useSelector,useDispatch } from 'react-redux';
import TextInput from '../../cocmponents/common/MyTextInput'
import EclipseWidget from '../../cocmponents/common/louding';
import { Button } from 'primereact/button';
import {push} from 'connected-react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import validate from './validation'
import http from "../../http_common";


const CheckOut = () => {

    const { auth, cart } = useSelector(redux => redux);
    console.log("cartData", cart.list);
    console.log("authName", auth.user.name);

    const initialValues = {
        consumerFirstName: "",
        consumerSecondName: "",
        consumerPhone: "",
        region: "",
        city: "",
        postOffice: "",
        statusId: 1,
        orderItems: cart.list.map((el) => {
          return {
            productId: el.id,
            buyPrice: el.productPrice,
            quantity: el.quantity
            
          };
        }),
      };

      const [loading, setLoading] = useState(false);
      const refFormik = useRef();
    const titleRef = useRef();
    const [invalid, setInvalid] = useState([]);
    const dispatch = useDispatch();

    const cols = [
      { field: 'productName', header: 'Product name' },
        { field: 'productPrice', header: 'Price' },
        { field: 'quantity', header: 'Quantity' },
     
  ];

  const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));

    
    const exportPdf = () => {

        import('jspdf').then(jsPDF => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0,0 );

                doc.autoTable(exportColumns, cart.list);
                doc.save('Замовленя.pdf');
            })
        })
    }

  const header = (
      <div className="flex align-items-center export-buttons">
          
          <Button type="button" icon="pi pi-file-pdf" onClick={exportPdf} className="p-button-warning mr-2" data-pr-tooltip="PDF" />
          
      </div>
  );

   const onHandleSubmit = async (values) => {
	 	try {
    setLoading(true);
    console.log("onHandleSubmit+++++++");         
           const formData = new FormData();
           Object.entries(values).forEach(([key, value]) => formData.append(key, value));
            console.log("onHandleSubmit----------",values);
            console.log("onHandleSubmit---------111",initialValues.orderItems);
    const result = await http.post("/api/orders/add", values);
    setLoading(false);
                   toast.warn ("Замовленя оформлено",{position: toast.POSITION.BOTTOM_RIGHT,autoClose:3000});
                    // cartService.del_cart()
                    //         .then(result => {
                                
                                
                    //         }).catch(error => {
                    //             console.log(error.response);
                    //         });
                    dispatch(push("/"));
                   
  }
   catch (error) {
	 				setLoading(false);
  console.log("Server is bad from", error);
	 	}
  }
	 

      return (
        <div class="container">
      {/* <div className="row m-4"> */}
            <h3 className="text-center">Оформлення замовлення</h3>
            
         {/* <div className="row">
            <div className="offset-md-3 col-md-6">
                <h1 ref={titleRef} className="text-center" >Оформленя замовленя</h1>  */}
                {invalid && invalid.length>0 &&
                    <div className="alert alert-danger">
                        <ul>
                        {
                            invalid.map((text, index) => {
                                return (
                                    <li key={index}>{text}</li>
    
                                );
                            })
                        }
                        </ul>
                    </div>
    
                }
                <Formik
                    innerRef = {refFormik}
                    initialValues={initialValues}
                    validationSchema={validate()}
                    onSubmit={onHandleSubmit}
                >
                    <Form>
          <div class="row justify-content-evenly">
            <div class="col-4">
            {/* <div className="col-8">
              <div className="row">
                <div className="col-6"> */}
                  <h5 className="m-3 text-center">Контактні дані</h5>
                    <TextInput
                            label="Ім'я"
                            name="consumerFirstName" 
                            id="consumerFirstName"
                            type="text" 
                            placeholder="Обов'язкове поле"
                            />
                  
                  <TextInput
                            label="Прізвище"
                            name="consumerSecondName"
                            id="consumerSecondName"
                            type="text" 
                            placeholder="Обов'язкове поле"/>
                  <TextInput
                            label="Телефон"
                            name="consumerPhone"
                            id="consumerPhone"
                            type="text" 
                            placeholder="+380xxxxxxxxx"/>
                            </div>
                          {/* </div>
                        </div> */}

           {/* <div className="col-12">
              <div className="row"> */}

                {/* <div className="col-9"> */}
                <div class="col-4">
                  <h5 className="m-3 text-center">Доставка</h5>
                  <TextInput
                            label="Область"
                            name="region" 
                            id="region"
                            type="text" 
                            placeholder="Не обов'язкове поле"/>
                  
                  <TextInput
                            label="Місто"
                            name="city"
                            id="city"
                            type="text" 
                            placeholder="Не обов'язкове поле"/>
                  <TextInput
                            label="Поштове відділеня"
                            name="postOffice"
                            id="postOffice"
                            type="text" 
                            placeholder="Не обов'язкове поле"/>
                            
                        </div>
                        </div>
        <hr />
        <div class="row justify-content-center">
          <h3 className="m-1 text-center">Ваші замовленя</h3>

               <div className="offset-md-1 col-md-6">
                  
              {

                <table className="table">
                <thead className="table table-bordered">
                    <tr>
                       
                        
                        <th scope="col">Назва</th>
                        <th scope="col">Ціна</th>
                        <th scope="col">Кількість</th>
                        <th scope="col">Сума</th>
                        
                    </tr>
                </thead>

                 <tbody>
                    {
                    cart.list.map((item) =>
                        <tr key={item.id}>
                           
                            
                            <td>{item.productName}</td>
                            <td> {item.productPrice} грн.</td>
                            <td> {item.quantity} </td>
                            <td> {item.quantity*item.productPrice} грн. </td>
                            
                            
                        </tr>)}
                        
                </tbody>
               
            </table>

            




              // cart.list.map(
              //   ({ productName, productPrice, quantity }) => {
              //     return (
                    
              //         <div className="card-body row">
              //           <div className="media">
              //             <div className="row my-auto flex-column flex-md-row">
                           
              //               <div className="col my-auto">
              //                 <small>{productName}</small>
              //               </div>
              //               <div className="col my-auto">
              //                 <small>Ціна : {productPrice} грн</small>
              //               </div>
              //               <div className="col my-auto">
              //                 <small>Кількість : {quantity}</small>
              //               </div>
              //               <div className="col my-auto">
              //                 <h6 className="mb-0">
              //                   Cума : {productPrice * quantity} грн
              //                 </h6>
              //               </div>
              //             </div>
              //           </div>
              //         </div>
                   
              //     );
              //   }
              // )
              }
              </div></div>

              <h3 className="d-grid gap-2 d-md-flex justify-content-md-end" >До оплати {cart.summa} грн.</h3> <br/>
              
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
             
             <button type="submit" onClick={() => {
               
                        // cartService.del_cart()
                        //     .then(result => {
                        //         history.push("/");
                                
                        //     }).catch(error => {
                        //         console.log(error.response);
                        //     });

          }}
          className="btn btn-primary">Оформити замовленя</button>  
          <div className="flex align-items-center export-buttons">
            
            <Button type="button" icon="pi pi-file-pdf" onClick={exportPdf} className="p-button-warning mr-2" data-pr-tooltip="PDF" />
            
        </div></div>

                        {loading && <EclipseWidget />}
                    </Form>
                </Formik>
          </div>
    
       
    )


}
export default CheckOut;

