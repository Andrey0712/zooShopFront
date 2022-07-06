import React, {useRef,useState,useEffect } from 'react'
import { Formik,Form } from 'formik'
import TextInput from '../../common/MyTextInput'
import  validateLog  from './validation'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import EclipseWidget from '../../common/louding';
import { LoginUser, isRole, GoogleLoginUser } from '../../../actions/auth';
import jwt from 'jsonwebtoken';
import { push } from 'connected-react-router';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

const LoginPage = () => {

    const initState = {
        email: '',
        password: ''
    }
    const dispatch = useDispatch();
    const [invalid, setInvalid] = useState([]);
    const titleRef = useRef();

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

    const onSubmitHandler=(values) => {
        try {            
           
            dispatch(LoginUser(values))
                .then(result => {
                    let user = jwt.decode(result);
                    if (isRole(user, 'admin')) {
                        dispatch(push("/admin"));
                        return;
                    }
                    toast.warn ("Авторизація успішна",{position: toast.POSITION.BOTTOM_RIGHT,autoClose:5000});
                    dispatch(push("/"));
                })
                .catch(ex => {
                    console.log("exception: ", ex);
                    setInvalid(ex.errors.invalid);
                    titleRef.current.scrollIntoView({ behavior: 'smooth' })
                    
                });
        }
        catch (error) {
            console.log("Server is bad register from", error);
        }
    }

    return (
        <div className="row">
            <div className="offset-md-3 col-md-5">
            <br/>
                <h1 ref={titleRef} className="text-center">Вхід на сайт</h1>
                {invalid && invalid.length > 0 &&
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
                    initialValues={initState}
                    validationSchema={validateLog()}
                    onSubmit={onSubmitHandler}
                >
                    <Form>
                        <TextInput
                            label="Пошта"
                            id="email"
                            name="email"
                            type="text"
                        />

                        <TextInput
                            label="Пароль"
                            id="password"
                            name="password"
                            type="password"
                        />
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <input type="submit" className="btn btn-primary" value="Вхід"></input>
                        </div>
                        
                        <hr/>
                        <h1 ref={titleRef} className="text-center">Вхід на сайт через Google</h1>
                        
                        <GoogleLogin className="col-3 mx-auto justify-md-end d-md-flex"
                    clientId="523681892685-p9t6c2i45qb6p3qnpu6aom6lqdi9ln9r.apps.googleusercontent.com"
                    //clientId="436528464037-jt21etpk10kglcd0fllsua18g18tc9ul.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    // cookiePolicy={'http://localhost:3000'}
                />
                    </Form>
                </Formik>

            </div>


        </div>
    )
}

export default LoginPage