
import { CHECKOUT} from "../constants/actionTypes";
import checkOutServise from "../services/checkOut.servise";

export const AddCheckOut = (product) => async (dispatch) => {
   
    try {
        console.log("action");
        const {data} = await checkOutServise.add(product);
        console.log("action+++++");
        // const data = {
        //     id: product.productId,
        //     productName: "Сало",
        //     productImage: "/images/",
        //     productPrice: 432,
        //     quantity: 1
        // };
        dispatch({type: CHECKOUT, payload: data});
        return Promise.resolve();
        
        
    }
    catch(err) {
        const {data} = err.response;
        return Promise.reject(data);
    }
}