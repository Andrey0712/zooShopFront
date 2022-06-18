import * as Yup from 'yup';

const validate=()=>{


    return Yup.object({
        name: Yup.string()
            .required("Вкажіть назву"),  
        price: Yup.string()
            .required('Вкажіть ціну')           
    });
}
export default validate;