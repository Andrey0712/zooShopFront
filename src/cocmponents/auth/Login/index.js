// import React, {useRef,useState,useEffect } from 'react'
// import { Formik,Form } from 'formik'
// import TextInput from '../../common/MyTextInput'
// import  validateLog  from './validation'
// import { useDispatch } from 'react-redux'
// import { useSelector } from 'react-redux'
// import EclipseWidget from '../../common/louding';
// import { LoginUser, isRole, GoogleLoginUser } from '../../../actions/auth';
// import jwt from 'jsonwebtoken';
// import { push } from 'connected-react-router';
// import GoogleLogin from 'react-google-login';
// import { gapi } from 'gapi-script';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'

// toast.configure();

// const LoginPage = () => {

//     const initState = {
//         email: '',
//         password: ''
//     }
//     const dispatch = useDispatch();
//     const [invalid, setInvalid] = useState([]);
//     const titleRef = useRef();

//     useEffect(() => {
//         const start = () => {
//             gapi.client.init({
//                 clientId: '523681892685-p9t6c2i45qb6p3qnpu6aom6lqdi9ln9r.apps.googleusercontent.com',
//                 //clientId: '436528464037-jt21etpk10kglcd0fllsua18g18tc9ul.apps.googleusercontent.com',
                
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
//                     let user = jwt.decode(result);
//                     // if (isRole(user, 'admin')) {
//                     //     dispatch(push("/admin"));
//                     //     return;
//                     // }
//                     toast.warn ("Авторизація успішна",{position: toast.POSITION.BOTTOM_RIGHT,autoClose:5000});
//                     dispatch(push("/"));
//                 })
//                 .catch(ex => {
//                     console.log("exception: ", ex);
//                     // setInvalid(ex.errors.invalid);
//                     // titleRef.current.scrollIntoView({ behavior: 'smooth' })
                    
//                 });
//         }
//         catch (error) {
//             console.log("Server is bad register from", error);
//         }
//       }

//     const onSubmitHandler=(values) => {
//         try {            
           
//             dispatch(LoginUser(values))
//                 .then(result => {
//                     let user = jwt.decode(result);
//                     if (isRole(user, 'admin')) {
//                         dispatch(push("/admin"));
//                         return;
//                     }
//                     toast.warn ("Авторизація успішна",{position: toast.POSITION.BOTTOM_RIGHT,autoClose:5000});
//                     dispatch(push("/"));
//                 })
//                 .catch(ex => {
//                     console.log("exception: ", ex);
//                     setInvalid(ex.errors.invalid);
//                     titleRef.current.scrollIntoView({ behavior: 'smooth' })
                    
//                 });
//         }
//         catch (error) {
//             console.log("Server is bad register from", error);
//         }
//     }

//     return (
//         <div className="row">
//             <div className="offset-md-3 col-md-5">
//             <br/>
//                 <h1 ref={titleRef} className="text-center">Вхід на сайт</h1>
//                 {invalid && invalid.length > 0 &&
//                     <div className="alert alert-danger">
//                         <ul>
//                             {
//                                 invalid.map((text, index) => {
//                                     return (
//                                         <li key={index}>{text}</li>

//                                     );
//                                 })
//                             }
//                         </ul>
//                     </div>

//                 }
//                 <Formik
//                     initialValues={initState}
//                     validationSchema={validateLog()}
//                     onSubmit={onSubmitHandler}
//                 >
//                     <Form>
//                         <TextInput
//                             label="Пошта"
//                             id="email"
//                             name="email"
//                             type="text"
//                         />

//                         <TextInput
//                             label="Пароль"
//                             id="password"
//                             name="password"
//                             type="password"
//                         />
//                         <div className="d-grid gap-2 d-md-flex justify-content-md-end">
//                             <input type="submit" className="btn btn-primary" value="Вхід"></input>
//                         </div>
                        
//                         <hr/>
//                         <h1 ref={titleRef} className="text-center">Вхід на сайт через Google</h1>
                        
//                         <GoogleLogin className="col-3 mx-auto justify-md-end d-md-flex"
//                     clientId="523681892685-p9t6c2i45qb6p3qnpu6aom6lqdi9ln9r.apps.googleusercontent.com"
//                     //clientId="436528464037-jt21etpk10kglcd0fllsua18g18tc9ul.apps.googleusercontent.com"
//                     buttonText="Login"
//                     onSuccess={responseGoogle}
//                     onFailure={responseGoogle}
//                     // cookiePolicy={'http://localhost:3000'}
//                 />
//                     </Form>
//                 </Formik>

//             </div>


//         </div>
//     )
// }

// export default LoginPage


import React, {useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
 import { useDispatch } from 'react-redux'
 import { LoginUser, isRole, GoogleLoginUser } from '../../../actions/auth';
 import jwt from 'jsonwebtoken';
 import { push } from 'connected-react-router';
 import GoogleLogin from 'react-google-login';
 import { gapi } from 'gapi-script';
 import { toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css'
import './FormDemo.css';



 toast.configure();



const LoginPage = () => {
   
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const [invalid, setInvalid] = useState([]);
    const titleRef = useRef();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
            
        },

        validate: (data) => {
         let errors = {};
                    
            
            if (!data.email) {
                errors.email = 'Email is required.';
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Некоректний email. example@email.com';
            }
            
            if (!data.password) {
                errors.password = 'Password is required.';
            }
            else if (!/[A-Z0-9]$/i.test(data.password)) {
                errors.password = 'Некоректний пароль';
            }

            return errors;
        },

        
        onSubmit: (data) => {
                    try {            
                        setFormData(data);
                        
                        dispatch(LoginUser(data))

                            .then(result => {
                                let user = jwt.decode(result);
                                if (isRole(user, 'admin')) {
                                    dispatch(push("/admin"));
                                    return;
                                }
                                
                                formik.resetForm();
                                toast.warn ("Авторизація успішна",{position: toast.POSITION.BOTTOM_RIGHT,autoClose:5000});
                                dispatch(push("/"));
                            })
                            .catch(ex => {
                                console.log("exception: ", ex);
                                setShowMessage(true);
                                
                                dispatch(push("/login"));
                               
                            });
                    }
                    catch (error) {
                        console.log("Server is bad register from", error);
                    }
                }
    });

    
    useEffect(() => {
        const start = () => {
            gapi.client.init({
                clientId: '523681892685-p9t6c2i45qb6p3qnpu6aom6lqdi9ln9r.apps.googleusercontent.com',
                
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
                    
                    toast.warn ("Авторизація успішна",{position: toast.POSITION.BOTTOM_RIGHT,autoClose:5000});
                    dispatch(push("/"));
                })
                .catch(ex => {
                    console.log("exception: ", ex);
                                        
                });
        }
        catch (error) {
            console.log("Server is bad register from", error);
        }
      }

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    //const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-0">Поради</p>
            <ul className="pl-2 ml-1 mt-0" style={{ lineHeight: '1.5' }}>
                <li>Мінімум 5 латинських символів</li>
                <li>Xочаб одна цифра</li>
            </ul>
        </React.Fragment>
    );

    return (
        <div className="row">
            <div className="offset-md-3 col-md-5">
             <br/><br/>
        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-undo" style={{ fontSize: '5rem', color: 'var(--blue-500)' }}></i>
                    <br/><h5>Помилка авторизациї!</h5>
                    
                </div>
            </Dialog>

            <div className="flex justify-content-center">
                <div className="card">
                    <h2 className="text-center">Авторизація</h2>
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
                                <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>Email*</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} toggleMask
                                    className={classNames({ 'p-invalid': isFormFieldValid('password') })}
                                     //header={passwordHeader} 
                                     footer={passwordFooter} />
                                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Пароль*</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                        
                        
                        <Button type="submit" label="Вхід на сайт" className="mt-2" />
                    </form>
                </div>
            </div>
        </div>
        <hr/>
                        <h3 ref={titleRef} className="text-center">Вхід на сайт через Google</h3>
                        
                         <GoogleLogin className="col-3 mx-auto justify-md-end d-md-flex"
                    clientId="523681892685-p9t6c2i45qb6p3qnpu6aom6lqdi9ln9r.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    // cookiePolicy={'http://localhost:3000'}
                />
        </div>
        </div>
    );
}
 export default LoginPage