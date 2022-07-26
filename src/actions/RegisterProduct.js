
//import jwt from 'jsonwebtoken';
import { REGISTER_PRODUCTS, UPDATE_PRODUCTS } from '../constants/actionTypes';

import productService from '../services/product.service';


export const RegisterProd=(model)=>async(dispatch)=>{

    try {

        
        const result = await productService.registerProd(model);
        console.log("register reuslt", result);
        dispatch({type: REGISTER_PRODUCTS});
        return Promise.resolve(result);
    }
    catch(err) {
        const{data}=err.response;
        
        return Promise.reject(data);
    }

    
}

export const EditProd=(model)=>async(dispatch)=>{

    try {

        
         const result = await productService.editProd(model);
        console.log("result edit", result);
        //dispatch({type: UPDATE_PRODUCTS});
        return Promise.resolve();
    }
    catch(err) {
        console.log("ERROR------------");
        const{data}=err.response;
        
        return Promise.reject(data);
    }

    
}
