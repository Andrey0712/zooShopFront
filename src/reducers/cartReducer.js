import { CART_ADD_PRODUCT, CART_LOAD_PRODUCT,CART_CLEAR,CART_PLUS_PRODUCT,CART_MINUS_PRODUCT,CART_DEL_ITEM_PRODUCT } from "../constants/actionTypes";

const initialState ={
    list: [], //товари в кошику
    count: 0, //кількість товарів в кошику
    summa:0, //сумма товарів в кошику
    
}

const cartReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case CART_ADD_PRODUCT: {
            const list = state.list.filter(item => item.id !== payload.id);
            
            return {
                ...state,
                list: [...list, payload],
                count: state.count+1,
               
            };
        } 

        
    


        case CART_LOAD_PRODUCT: {
            let quantityAll = 0;
            let sumAll=0;
            for(let i=0; i<payload.length; i++){
                quantityAll+=payload[i].quantity;
                sumAll+=payload[i].quantity*payload[i].productPrice;
            }
            return {
                ...state,
                list: payload,
                count: quantityAll,
                summa: sumAll
            }
        }

        // case CART_PLUS_PRODUCT: {
        //     const list = state.list.filter(item => item.id !== payload.id);
           
        //     return {
        //         ...state,
        //         list: [...list, payload],
        //         count: state.count+1,
                
        //     };
        // } 

        case CART_PLUS_PRODUCT:
      return {
        ...state,
        list: state.list.map((item) => {
          if (item.id === payload.id) {
            return { ...item, quantity: payload.quantity, count: state.count+1};
            
          } else {
            return item;
          }
        }),
      };

      case CART_MINUS_PRODUCT:
      return {
        ...state,
        list: state.list.map((item) => {
          if (item.id === payload.id) {
            return { ...item, quantity: payload.quantity, count: state.count-1};
            
          } else {
            return item;
          }
        }),
      };

        // case CART_MINUS_PRODUCT: {
        //     const list = state.list.filter(item => item.id !== payload.id);
            
        //     return {
        //         ...state,
        //         list: [...list, payload],
        //         count: state.count-1,
               
        //     };
        // } 

    //     case CART_DEL_ITEM_PRODUCT:
    //   return {
    //     ...state,
    //     list: state.list.filter(item => item.id !== payload.id),
    //     count: state.count-=1,
    //   };

        case CART_CLEAR: {
            
            return {
                ...state,
                list: [],
                count: 0,
               
            };
        } 


        default: {
            return state;
        }
    }
    

}

export default cartReducer;