import React, {useRef,useState} from 'react'
import { Formik, Form } from 'formik'
import MyTextInput from '../../common/MyTextInput'
import { useDispatch } from 'react-redux';
import validate from '../RegisterProduct/validation'
import { useSelector } from 'react-redux'
import MyPhotoInput from '../../common/MyPhotoInput';
import EclipseWidget from '../../common/louding';
import {push} from 'connected-react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { EditProd } from '../../../actions/RegisterProduct';
import {urlBackend} from '../../../http_common';


toast.configure();


const EditProduct = ( ) => {

    var url = new URL(window.location.href);
    const productId = url.searchParams.get("id")
        
    console.log("Id current prod:", productId);
    const {list}=useSelector(res=>res.prod);
    
    //find user for delete from id.
    const current=list.find(prod=>prod.id==productId);
    console.log( "current:", current);
    
    const initState = {
        id:productId,
        name: current.name,
        startPhoto: urlBackend+current.image,
        //startPhoto: null,
        description: current.description,
        //categoryId: current.category,
        price: current.price,
        quantity: current.quantity,
        rating: current.rating
        

    }
   
    const dispatch = useDispatch();
    const { errors } = useSelector(state => state.auth);
    const refFormik = useRef();
    const titleRef = useRef();
    const [invalid, setInvalid] = useState([]);
    const [loading, setLoading] = useState(false);

    

const onSubmitHandler = async (values) => {
    
    console.log("errors", errors);
    try {            
        const formData1 = new FormData();
        Object.entries(values).forEach(([key, value]) => formData1.append(key, value));
                     setLoading(true);
                     console.log("result", {formData1});
             dispatch(EditProd(formData1))
                .then(result => {
                    console.log("edit complete--------------");
                    //console.log("update ok");
                     setLoading(false);
                     toast.warn ("Продукт відредаговано",{position: toast.POSITION.BOTTOM_RIGHT,autoClose:3000});
                                     
                    dispatch(push("/admin"));
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
        <div className="offset-md-3 col-md-6">
            <h1 ref={titleRef} className="text-center" >Редагуваня продукту</h1>
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
                //validationSchema={validate()}
                onSubmit={onSubmitHandler}
            >
                <Form>
                    <MyTextInput
                        label="Назва товару"
                        name="name"
                        id="name"
                        type="text" />

                        <MyPhotoInput 
                            refFormik={refFormik}
                            field="startPhoto"
                            image={initState.startPhoto} />

                    <MyTextInput
                        label="Ціна"
                        name="price"
                        id="price"
                        type="text" />

                    <MyTextInput
                        label="Опис"
                        name="description"
                        id="description"
                        type="text" />

                    {/* <MyTextInput
                        label="Категорія"
                        name="categoryId" 
                        id="categoryId"
                        type="text" /> */}
                    
                    
                    <MyTextInput
                        label="Рейтинг"
                        name="rating"
                        id="rating"
                        type="text"/>

                    <MyTextInput
                        label="Кількість"
                        name="quantity"
                        id="quantity"
                        type="text"/>

                        

                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button type="submit" className="btn btn-primary">Редагуваня продукта</button>
                        </div>
                    
                </Form>
            </Formik>
        </div>

        {loading && <EclipseWidget />}
    </div>
)
}

export default EditProduct;