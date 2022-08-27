import {ORDERS, CHACK_STATUS, ORDERITEMS} from "../constants/actionTypes";
import ordersService from "../services/orders.service";


export const getOrders = () => async (dispatch) => {
    try {
        const res = await ordersService.get_list();
        dispatch({
            type: ORDERS,
            data: res.data
        });
    } catch(err) {
        console.log(err);
    }
}

export const chack_status = (dataStatus) => async (dispatch) => {
    try {
        
        const {data} = await ordersService.checkStatus(dataStatus);
        
        dispatch({type: CHACK_STATUS, payload: data});
        return Promise.resolve();
        
    }
    catch(err) {
        const {data} = err.response;
        return Promise.reject(data);
    }
}

// export const list_Items = (current) => async (dispatch) => {
//     console.log("listItems1+++", current);
//     try {
//         const res = await ordersService.listItems(current.id);
//         dispatch({
//             type: ORDERITEMS,
//             data: res.data
//         });
        
//         return Promise.resolve();
        
//     }
//     catch(err) {
//         const {data} = err.response;
//         return Promise.reject(data);
//     }
// }