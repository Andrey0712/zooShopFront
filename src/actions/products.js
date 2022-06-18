import { PRODUCT_LIST } from "../constants/actionTypes";
import productService from "../services/product.service";


export const getProduct= () => async (dispatch) => {
    try {
        const {data} = await productService.get_list_prod();
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