import { CHECKOUT } from "../constants/actionTypes";

const initialState ={
    list: [], //товари 
    
    
    
}

const checkOutReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case CHECKOUT: {
            const list = state.list.filter(item => item.id !== payload.id);
            
            return {
                ...state,
                list: [...list, payload]
                
               
            };
        } 

        default: {
            return state;
        }
    }
    

}

export default checkOutReducer;