
import React, {useRef,useState} from 'react'
import { Formik, Form } from 'formik'
import TextInput from '../../common/MyTextInput'
import { useDispatch } from 'react-redux';
import validate from './validation'
import { useSelector } from 'react-redux'
import MyPhotoInput from '../../common/MyPhotoInput';
//import { RegisterUser } from '../../../actions/RegisterUser';
import EclipseWidget from '../../common/louding';
import {push} from 'connected-react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { RegisterProd } from '../../../actions/RegisterProduct';


toast.configure();



const RegisterProduct = () => {

    const initState = {
        name: '',
        photo: null,
        price: ''
        

    }

    const dispatch = useDispatch();
    const { loading, errors } = useSelector(state => state.auth);
    const refFormik = useRef();
    const titleRef = useRef();
    const [invalid, setInvalid] = useState([]);


    const onSubmitHandler = async (values) => {

        console.log("errors", errors);
        try {            
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => formData.append(key, value));
            dispatch(RegisterProd(formData))
                .then(result => {

                    toast.warn ("Вы удачно зарегистрировали",{position: toast.POSITION.BOTTOM_RIGHT,autoClose:5000});
                                     
                   dispatch(push("/admin"));
                })
                .catch(ex=> {
                    Object.entries(ex.errors).forEach(([key, values]) => {
                        let message = '';
                        values.forEach(text=> message+=text+" ");
                        refFormik.current.setFieldError(key,message);
                    });

                    setInvalid(ex.errors.invalid);
                    titleRef.current.scrollIntoView({ behavior: 'smooth' })
                    
                });
        }
        catch (error) {
            console.log("Server is bad register from", errors);
        }
    }

    
    

    return (

        <div className="row">
            <div className="offset-md-3 col-md-6">
            <h1 ref={titleRef} className="text-center" >Реєстрація продукту</h1>
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
                    initialValues={initState}
                    validationSchema={validate()}
                    onSubmit={onSubmitHandler}
                >
                    <Form>
                        <TextInput
                            label="Name"
                            name="name"
                            id="name"
                            type="text"
                        />
                        <MyPhotoInput
                        refFormik={refFormik}
                        field="Photo"/>

                        <TextInput

                            label="Price"
                            name="Price"
                            id="Price"
                            type="text"
                        />
                        
                        <button type="submit" className="btn btn-primary">Реєстрація</button>
                    </Form>
                </Formik>
            </div>

            {loading && <EclipseWidget />}
        </div>

    )

}

export default RegisterProduct;
