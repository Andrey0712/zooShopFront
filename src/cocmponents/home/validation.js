import * as Yup from 'yup';

const validate=()=>{


    return Yup.object({
        consumerFirstName: Yup.string()
            .required("Вкажіть Ім'я"),  
            consumerSecondName: Yup.string().required("Вкажіть призвіще"),
            consumerPhone: Yup.string()
    //         .matches(/[0-9 ]{3}[0-9 ]{4}[0-9]{3}/, {
    //   message: "Не вірний номер",
    //   excludeEmptyString: false,
    // })
    .required("Вкажіть телефон"),
                 
    });
}
export default validate;