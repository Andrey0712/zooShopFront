import { PRODUCT_LIST,REGISTER_PRODUCTS,
    UPDATE_PRODUCTS,
    DELL_PRODUCTS 
} from "../constants/actionTypes";


const initialState = {
    list: []
};

function productReducer(state  = initialState, action) {
    const {type, payload} = action;
    switch(type){
        case PRODUCT_LIST: {
            return {
                ...state,
                list: payload
            }
            
        }
        case REGISTER_PRODUCTS:
            {
                return {
                    ...state,
                list: payload
                    
                }
            }
            case UPDATE_PRODUCTS:
            {
                state = [
                    state.map((element) => element.items.filter((item) => item.id !== action.payload.id)),
                  ];
                  return state;
            }
             case DELL_PRODUCTS:
                return {
                    ...state,
                    list: state.filter((el) => el.id !== action.payload),
                    
                  };
        default: 
            return state ;
    }
}
export default productReducer;