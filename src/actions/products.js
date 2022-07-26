import { PRODUCT_LIST } from "../constants/actionTypes";
import productService from "../services/product.service";


export const getProduct= () => async (dispatch) => {
    try {
        const {data} = await productService.get_list_prod();
        //console.log("prod", data);
        dispatch({
            type: PRODUCT_LIST,
            payload: data
        });
        return Promise.resolve();
    } catch(err) {
        const {data} = err.response;
        return Promise.reject(data);
    }
}
export const getProductSearch= (model) => async (dispatch) => {
    try {
        console.log("model", model);
        const {data} = await productService.get_list_prod_search(model);
        dispatch({
            type: PRODUCT_LIST,
            payload: data
        });
        return Promise.resolve();
    } catch(err) {
        const {data} = err.response;
        return Promise.reject(data);
    }
}

export const getProductByCategory= (model) => async (dispatch) => {
    try {
        console.log("model", model);
        const {data} = await productService.get_list_prod_category(model);
        dispatch({
            type: PRODUCT_LIST,
            payload: data
        });
        return Promise.resolve();
    } catch(err) {
        const {data} = err.response;
        return Promise.reject(data);
    }
}