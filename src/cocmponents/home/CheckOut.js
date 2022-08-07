import React, {useEffect, useState,
    useRef 
} from 'react'
import { Form, Formik } from 'formik';
import { useSelector,useDispatch } from 'react-redux';
import TextInput from '../../cocmponents/common/MyTextInput'
import EclipseWidget from '../../cocmponents/common/louding';

const CheckOut = () => {

    const { auth, cart } = useSelector(redux => redux);
    //const { cartData } = useSelector(store => store.cart)
    console.log("cartData", cart.list);
    //const { auth } = useSelector(state => state.auth);
    //console.log("auth", auth);
    
    console.log("authName", auth.user.name);

    const initialValues = {
        consumerFirstName: "",
        consumerSecondName: "",
        consumerPhone: "",
        statusId: 1,
        orderItems: cart.list.map((el) => {
          return {
            productId: el.id,
            buyPrice: el.productPrice,
            quantity: el.quantity,
          };
        }),
      };

      const [loading, setLoading] = useState(false);
      const refFormik = useRef();
    const titleRef = useRef();
    const [invalid, setInvalid] = useState([]);

      const onHandleSubmit=()=>{};


      return (
    
        <div className="row m-4">
            <h3 className="text-center">Оформлення замовлення</h3>
            <div className="col-8">
              <div className="row">
                <div className="col-6">
                  <h5 className="m-3 text-center">Контактні дані</h5>
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
                    //validationSchema={validate()}
                    onSubmit={onHandleSubmit}
                >
                    <Form>
                    <TextInput
                            label="Ім'я"
                            name="firstName" 
                            id="firstName"
                            type="text" />
                  
                  <TextInput
                            label="Прізвище"
                            name="secondName"
                            id="secondName"
                            type="text" />
                  <TextInput
                            label="Телефон"
                            name="phone"
                            id="phone"
                            type="text" />
           

        <hr />
        <div className="col-6">
                  {/* </div>/<h5 className="m-3 text-center">Доставка</h5> */}
              <h5 className="m-2 text-center">Товари</h5>
              {cart.list.map(
                ({ productName, productPrice, quantity }) => {
                  return (
                    
                      <div className="card-body row">
                        <div className="media">
                          <div className="row my-auto flex-column flex-md-row">
                           
                            <div className="col my-auto">
                              <small>{productName}</small>
                            </div>
                            <div className="col my-auto">
                              <small>Ціна : {productPrice} грн.</small>
                            </div>
                            <div className="col my-auto">
                              <small>Кількість : {quantity}</small>
                            </div>
                            <div className="col my-auto">
                              <h6 className="mb-0">
                                Cума : {productPrice * quantity} $
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                   
                  );
                }
              )}
              </div>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button type="submit" className="btn btn-primary">Оформленя замовленя</button>
                            </div>
                        
                    </Form>
                </Formik>
            </div>
    
            {loading && <EclipseWidget />}
        </div>
        </div>
        </div>
       
    )


}
export default CheckOut;

