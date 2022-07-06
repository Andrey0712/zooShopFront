
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
                            type="password"/>

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
