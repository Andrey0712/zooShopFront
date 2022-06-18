import * as Yup from 'yup';

const validateEdit=()=>{


    return Yup.object({
        
        name: Yup.string()
            .required("Вкажіть прізвище"),  
        

    });
}
export default validateEdit;