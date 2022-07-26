import * as Yup from 'yup';

const validate=()=>{


    return Yup.object({
        name: Yup.string()
            .required("Вкажіть назву"),  
        price: Yup.number()
            .required('Вкажіть ціну'),
            description: Yup.string()
            .required('Короткий опис товару'),
            categoryId: Yup.number().min(1).max(4)
            .required('Вкажіть номер категорії'),
            rating: Yup.number().min(0).max(5)
            .required('Вкажіть рейтинг'),           
    });
}
export default validate;