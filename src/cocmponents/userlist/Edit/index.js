import React, {useRef,useState} from 'react'
import { Formik, Form } from 'formik'
import TextInput from '../../common/MyTextInput'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import MyPhotoInput from '../../common/MyPhotoInput';
 import EclipseWidget from '../../common/louding';
import {push} from 'connected-react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { EditUser } from '../../../actions/editUser';
import validateEdit from './validationEdit';

toast.configure();

const Edit = () => {

    var url = new URL(window.location.href);
    const userId = url.searchParams.get("email")
    
    const {list}=useSelector(res=>res.user);
    console.log("Id current user:", userId);   

    
    const initState = {        
        email:'',
        name: '',
        photo:null      
        // password:'',
        // confirmpassword:''
    }  

    const dispatch = useDispatch();
    const {loading, errors } = useSelector(state => state.auth);
    const refFormik = useRef();
    const titleRef = useRef();
    const [invalid, setInvalid] = useState([]);


    const onSubmitHandler = async (values) => {

        console.log("errors", errors);
        try {            
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => formData.append(key, value));
            dispatch(EditUser(formData))
                .then(result => {

                    toast.warn ("Supper",{position: toast.POSITION.BOTTOM_RIGHT,autoClose:5000});
                    dispatch(push("/user"));           
                   //dispatch(push("/"));
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
            console.log("Server is bad update from", errors);
        }
    }

    
    

    return (

        <div className="row">
            <div className="offset-md-3 col-md-6">
            <h1 ref={titleRef} className="text-center" >Update {userId}</h1>
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
                    validationSchema={validateEdit()}
                    onSubmit={onSubmitHandler}
                >
                    <Form>
                        <TextInput
                            label="Email"
                            name="email"
                            id="email"
                            type="text"
                        />
                        

                        <TextInput
                            label="Name"
                            name="name"
                            id="name"
                            type="text"
                        />
                        <MyPhotoInput
                        refFormik={refFormik}
                        field="Photo"/>

                        {/* <TextInput

                            label="Password"
                            name="password"
                            id="password"
                            type="password"
                        />

                        <TextInput                                                                                                                                                                                                                                                                                                                                               
                            label="Confirm password"
                            name="confirmpassword"
                            id="confirmpassword"
                            type="password"
                        /> */}
                        <button type="submit" className="btn btn-primary">Update</button>
                    </Form>
                </Formik>
            </div>

            {loading && <EclipseWidget />}
        </div>

    )

}

export default Edit;