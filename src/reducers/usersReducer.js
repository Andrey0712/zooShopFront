import { USERS } from "../constants/actionTypes";


const initialState = {
    list: []
};

function usersReducer(users = initialState, action) {
    const {type, data} = action;
    switch(type){
        case USERS: {
            return {
                list: data
            }
            
        }
        default: 
            return users;
    }
}
export default usersReducer;