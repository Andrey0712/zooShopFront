
import React, {useRef,useState,useEffect} from 'react'
import { Formik, Form } from 'formik'
import TextInput from '../../common/MyTextInput'
import { useDispatch } from 'react-redux';
import validate from './validation'
import { useSelector } from 'react-redux'
import MyPhotoInput from '../../common/MyPhotoInput';
import { RegisterUser, GoogleLoginUser } from '../../../actions/auth';
import EclipseWidget from '../../common/louding';
import jwt from 'jsonwebtoken';
import {push} from 'connected-react-router';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


toast.configure();



const RegisterPage = () => {

    const initState = {
        email: '',
        phone: '',
        firstName: '',
        secondName: '',
        //photo: null,
        password: '',
        confirmPassword: ''
    }
    //const history = useHistory();
    const dispatch = useDispatch();
    const { errors } = useSelector(state => state.auth);
    const refFormik = useRef();
    const titleRef = useRef();
    const [invalid, setInvalid] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const start = () => {
            gapi.client.init({
                clientId: '523681892685-p9t6c2i45qb6p3qnpu6aom6lqdi9ln9r.apps.googleusercontent.com',
                //clientId: '436528464037-jt21etpk10kglcd0fllsua18g18tc9ul.apps.googleusercontent.com',
                
                scope: ''
            });
        }
        gapi.load('client:auth2', start);

    }, []);

    const responseGoogle = (response) => {
        console.log(response);
        let data = {
            provider: "Google",
            token: response.tokenId
        };
        try {            
           
            dispatch(GoogleLoginUser(data))
                .then(result => {
                    let user = jwt.decode(result);
                    // if (isRole(user, 'admin')) {
                    //     dispatch(push("/admin"));
                    //     return;
                    // }
                    toast.warn ("Авторизація успішна",{position: toast.POSITION.BOTTOM_RIGHT,autoClose:5000});
                    dispatch(push("/"));
                })
                .catch(ex => {
                    console.log("exception: ", ex);
                    // setInvalid(ex.errors.invalid);
                    // titleRef.current.scrollIntoView({ behavior: 'smooth' })
                    
                });
        }
        catch (error) {
            console.log("Server is bad register from", error);
        }
      }

    const onSubmitHandler = async (values) => {
        console.log("erіувапролд");
        console.log("errors", errors);
        try {            
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => formData.append(key, value));
            setLoading(true);
            dispatch(RegisterUser(formData))
                .then(result => {
                    setLoading(false);
                    toast.warn ("Реєстрація успішна",{position: toast.POSITION.BOTTOM_RIGHT,autoClose:5000});
                    dispatch(push("/"));
                })
                .catch(ex=> {
                    setLoading(false);
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
            setLoading(false);
            console.log("Server is bad register from", errors);
        }
    }
    
    return (
        
        <div className="row">
            <div className="offset-md-3 col-md-5">
            <br/>
                <h1 ref={titleRef} className="text-center" >Реєстрація</h1>
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
                            label="Електронна пошта"
                            name="email"
                            id="email"
                            type="email" />

                        <TextInput
                            label="Телефон"
                            name="phone"
                            id="phone"
                            type="text" />

                        <TextInput
                            label="Прізвище"
                            name="secondName"
                            id="secondName"
                            type="text" />

                        <TextInput
                            label="Ім'я"
                            name="firstName" 
                            id="firstName"
                            type="text" />
                        
                        {/* <MyPhotoInput 
                            refFormik={refFormik}
                            field="photo" /> */}

                        <TextInput
                            label="Пароль"
                            name="password"
                            id="password"
                            type="password"
                           
                            />

                        <TextInput
                            label="Підтвердження пароль"
                            name="confirmPassword"
                            id="confirmPassword"
                            type="password" />

                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button type="submit" className="btn btn-primary">Реєстрація</button>
                        </div>

                        <hr/>
                        <h1 ref={titleRef} className="text-center">Реєстрація через Google</h1>
                    
                        <GoogleLogin className="col-3 mx-auto justify-md-end d-md-flex"
                    clientId="523681892685-p9t6c2i45qb6p3qnpu6aom6lqdi9ln9r.apps.googleusercontent.com"
                    //clientId="436528464037-jt21etpk10kglcd0fllsua18g18tc9ul.apps.googleusercontent.com"
                    buttonText="Register"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}

                    />
                    </Form>
                </Formik>
            </div>

            {loading && <EclipseWidget />}
        </div>
    )
}


export default RegisterPage

// import React, {useRef, useEffect, useState } from 'react';
// import { useFormik } from 'formik';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { Password } from 'primereact/password';
// import { Dialog } from 'primereact/dialog';
// import { Divider } from 'primereact/divider';
// import { classNames } from 'primereact/utils';
//  import { useDispatch } from 'react-redux'
//  import { RegisterUser, GoogleLoginUser } from '../../../actions/auth';
//  import jwt from 'jsonwebtoken';
//  import { push } from 'connected-react-router';
//  import GoogleLogin from 'react-google-login';
//  import { gapi } from 'gapi-script';
//  import { toast } from 'react-toastify';
//  import EclipseWidget from '../../common/louding';
//  import 'react-toastify/dist/ReactToastify.css'
// import './FormRegister.css';



//  toast.configure();



// const RegisterPage = () => {
   
//     const [showMessage, setShowMessage] = useState(false);
//     const [formData, setFormData] = useState({});
//     const dispatch = useDispatch();
//     const [invalid, setInvalid] = useState([]);
//     const titleRef = useRef();
//     const [loading, setLoading] = useState(false);

//     const formik = useFormik({
        
//         initialValues: {
//             email: '',
//             phone: '',
//         firstName: '',
//         secondName: '',
//         password: '',
//         confirmPassword: ''
          
//         },
       
//         validate: (values) => {
//             let errors = {};
                    
            
//             if (!values.email) {
//                 errors.email = 'Email is required.';
//             }
//             else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//                 errors.email = 'Некоректний email. example@email.com';
//             }

//             if (!values.phone) {
//                 errors.phone = 'Phone is required.';
//             }
//             else if (!/[+0-9]$/i.test(values.phone)) {
//                 errors.phone = 'Некоректний номер телефона';
//             }
            
//             if (!values.firstName) {
//                 errors.firstName = 'FirstName is required.';
//                             }
//             else if (!/[A-Z]$/i.test(values.firstName)) {
//                     errors.firstName = 'Некоректний номер телефона';}
            
//                     if (!values.secondName) {
//                 errors.secondName = 'SecondName is required.';
//             }
//             else if (!/[A-Z]$/i.test(values.secondName)) {
//                 errors.secondName = 'Некоректний номер телефона';}
            
//             if (!values.password) {
//                 errors.password = 'Password is required.';
//             }
//             else if (!/[A-Z0-9]$/i.test(values.password)) {
//                 errors.password = 'Некоректний пароль';
//             }
            
//             if (!values.confirmPassword) {
//                 errors.confirmPassword = 'ConfirmPassword is required.';
//             }
//             else if (!/[A-Z0-9]$/i.test(values.confirmPassword)) {
//                 errors.confirmPassword = 'Некоректний пароль';
//             }

//             return errors;
//        },

        
//         onSubmit: (values) => {
//                     try {            
//                         setFormData(values);
//                         console.log("setFormData", values);
//                         dispatch(RegisterUser(values))

//                             .then(result => {
//                                 setLoading(false);
//                                formik.resetForm();
//                                 toast.warn ("Реєстрація успішна",{position: toast.POSITION.BOTTOM_RIGHT,autoClose:5000});
//                                 dispatch(push("/"));
//                             })
//                             .catch(ex => {
//                                 console.log("exception: ", ex);
//                                 setShowMessage(true);
                                
//                                 dispatch(push("/register"));
                               
//                             });
//                     }
//                     catch (error) {
//                         console.log("Server is bad register from", error);
//                     }
//                 }
//     });

    
//     useEffect(() => {
//         const start = () => {
//             gapi.client.init({
//                 clientId: '523681892685-p9t6c2i45qb6p3qnpu6aom6lqdi9ln9r.apps.googleusercontent.com',
                
//                 scope: ''
//             });
//         }
//         gapi.load('client:auth2', start);

//     }, []);

//     const responseGoogle = (response) => {
//         console.log(response);
//         let data = {
//             provider: "Google",
//             token: response.tokenId
//         };
//         try {            
           
//             dispatch(GoogleLoginUser(data))
//                 .then(result => {
                    
//                     toast.warn ("Реєстрація успішна",{position: toast.POSITION.BOTTOM_RIGHT,autoClose:5000});
//                     dispatch(push("/"));
//                 })
//                 .catch(ex => {
//                     console.log("exception: ", ex);
                                        
//                 });
//         }
//         catch (error) {
//             console.log("Server is bad register from", error);
//         }
//       }

//     const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
//     const getFormErrorMessage = (name) => {
//         return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
//     };

//     const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
//     const passwordHeader = <h6>Перевірка надійності пароля</h6>;
//     const passwordFooter = (
//         <React.Fragment>
//             <Divider />
//             <p className="mt-0">Поради</p>
//             <ul className="pl-2 ml-1 mt-0" style={{ lineHeight: '1.5' }}>
//                 <li>Мінімум 5 латинських символів</li>
//                 <li>Xочаб одна цифра</li>
//             </ul>
//         </React.Fragment>
//     );
//     // const confirmPassword = (
//     //     <React.Fragment>
//     //         <p className="mt-0">Поради</p>
//     //         <ul className="pl-2 ml-1 mt-0" style={{ lineHeight: '1.5' }}>
//     //             <li>Має співпадати з полем "Пароль"</li>
                
//     //         </ul>
//     //     </React.Fragment>
//     // );

//     return (
//         <div className="row">
//             <div className="offset-md-3 col-md-5">
//              <br/><br/>
//         <div className="form-demo">
//             <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
//                 <div className="flex align-items-center flex-column pt-6 px-3">
//                     <i className="pi pi-undo" style={{ fontSize: '5rem', color: 'var(--blue-500)' }}></i>
//                     <br/><h5>Помилка реєстрації!</h5>
                    
//                 </div>
//             </Dialog>

//             <div className="flex justify-content-center">
//                 <div className="card">
//                     <h2 className="text-center">Реєстрація</h2>
//                     <form onSubmit={formik.handleSubmit} className="p-fluid">
                        
//                         <div className="field">
//                             <span className="p-float-label ">
//                                 <InputText id="firstName" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('firstName') })} />
//                                 <label htmlFor="firstName" className={classNames({ 'p-error': isFormFieldValid('firstName') })}>Ім'я*</label>
//                             </span>
//                             {getFormErrorMessage('firstName')}
//                         </div>

//                         <div className="field">
//                             <span className="p-float-label ">
//                                 <InputText id="secondName" name="secondName" value={formik.values.secondName} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('secondName') })} />
//                                 <label htmlFor="secondName" className={classNames({ 'p-error': isFormFieldValid('firstName') })}>Прізвище*</label>
//                             </span>
//                             {getFormErrorMessage('secondName')}
//                         </div>

//                         <div className="field">
//                             <span className="p-float-label p-input-icon-right">
//                                 <i className="pi pi-envelope" />
//                                 <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
//                                 <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>Email*</label>
//                             </span>
//                             {getFormErrorMessage('email')}
//                         </div>

//                         <div className="field">
//                             <span className="p-float-label ">
//                                 <InputText id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('phone') })} />
//                                 <label htmlFor="phone" className={classNames({ 'p-error': isFormFieldValid('phone') })}>Телефон*</label>
//                             </span>
//                             {getFormErrorMessage('phone')}
//                         </div>

//                         <div className="field">
//                             <span className="p-float-label">
//                                 <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} toggleMask
//                                     className={classNames({ 'p-invalid': isFormFieldValid('password') })}
//                                      header={passwordHeader} 
//                                      footer={passwordFooter} />
//                                 <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Пароль*</label>
//                             </span>
//                             {getFormErrorMessage('password')}
//                         </div>

//                         <div className="field">
//                             <span className="p-float-label">
//                                 <Password id="confirmPassword" name="confirmPassword" value={formik.values.confirmPassword} onChange={formik.handleChange} toggleMask
//                                     className={classNames({ 'p-invalid': isFormFieldValid('confirmPassword') })}
//                                      //header={passwordHeader} 
//                                      //footer={confirmPassword} 
//                                      />
//                                 <label htmlFor="confirmPassword" className={classNames({ 'p-error': isFormFieldValid('confirmPassword') })}>Підтвердження пароля*</label>
//                             </span>
//                             {getFormErrorMessage('confirmPassword')}
//                         </div>
                        
                        
//                         <Button type="submit" label="Вхід на сайт" className="mt-2" />
//                     </form>
//                 </div>
//             </div>
//         </div>
//         <hr/>
//                         <h3 ref={titleRef} className="text-center">Реєстрація через Google</h3>
                        
//                          <GoogleLogin className="col-3 mx-auto justify-md-end d-md-flex"
//                     clientId="523681892685-p9t6c2i45qb6p3qnpu6aom6lqdi9ln9r.apps.googleusercontent.com"
//                     buttonText="Register"
//                     onSuccess={responseGoogle}
//                     onFailure={responseGoogle}
//                     // cookiePolicy={'http://localhost:3000'}
//                 />
//         </div>
//         </div>
//     );
// }
//  export default RegisterPage
