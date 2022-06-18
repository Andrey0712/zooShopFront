import * as Yup from 'yup';

const validateLog=()=>{


    return Yup.object({
        email: Yup.string()
            .email('Введіть валідні дані')
            .required('Введіть пошту'),
        password: Yup.string()
            .required('Вкажіть пароль.')
            .min(5, 'Пароль має містить мінімум 5 символів.')
            .matches(/[0-9]/, 'Пароль має містить хоча б одну цифру.')

    });


}

export default validateLog;