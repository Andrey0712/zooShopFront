
//import jwt from 'jsonwebtoken';
import { REGISTER_PRODUCTS } from '../constants/actionTypes';

import productService from '../services/product.service';

//import authTokenRequest from '../services/auth_request';
//import {push} from 'connected-react-router';
//import setAuthorizationToken from '../utils/setAuthorizationToken';



export const RegisterProd=(model)=>async(dispatch)=>{

    try {

        //dispatch({type: REGISTER_BEGIN});
        const result = await productService.registerProd(model);
        console.log("register reuslt", result);
        dispatch({type: REGISTER_PRODUCTS});
        return Promise.resolve(result);
    }
    catch(err) {
        const{data}=err.response;
        //console.log("Register error", err.response.data);
        //dispatch({type:REGISTER_FAILED});
        //console.log("Problem register");

        return Promise.reject(data);
    }

    
}
