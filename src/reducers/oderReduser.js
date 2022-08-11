import { ORDERS } from "../constants/actionTypes";


const initialState = {
    list: []
};

function ordersReducer(orders = initialState, action) {
    const {type, data} = action;
    switch(type){
        case ORDERS: {
            return {
                ...orders,
                list: data
            }
            
        }
        default: 
            return orders;
    }
}
export default ordersReducer;