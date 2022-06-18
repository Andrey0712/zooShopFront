import authService from "../services/auth.servie";
import { REGISTER, REGISTER_BEGIN, 
    REGISTER_FAILED, LOGIN, LOGOUT
} from "../constants/actionTypes";
import setAuthorizationToken from '../Utils/setAuthorizationToken';
import jwt from "jsonwebtoken";
//import { getCartUser } from "./cart";


//import { useHistory } from "react-router-dom";

export const RegisterUser = (model) => async (dispatch) => {
    //const history = useHistory();

    try {
        dispatch({type: REGISTER_BEGIN});
        const result = await authService.register(model);
        const token = result.data.token;
        console.log("register reuslt", result);
        dispatch({type: REGISTER});
        localStorage.authToken = token;
        dispatch(authUser(token));
        return Promise.resolve(result);
        
    }
    catch(err) {
        const {data} = err.response;
        //console.log("register error", );
        dispatch({type: REGISTER_FAILED});
        
        //console.log("Propblem register");
        return Promise.reject(data);
    }
}

export const LoginUser = (model) => async (dispatch) => {

    try {
        const result = await authService.login(model);
        const token = result.data.token;
        console.log("login reuslt", result);
        localStorage.authToken = token;
        dispatch(authUser(token));
        return Promise.resolve(token);
        
    }
    catch(err) {
        const {data} = err.response;
        return Promise.reject(data);
    }
}

export const GoogleLoginUser = (model) => async (dispatch) => {

    try {
        const result = await authService.googleLogin(model);
        const token = result.data.token;
        console.log("login reuslt", result);
        localStorage.authToken = token;
        dispatch(authUser(token));
        return Promise.resolve(token);
    }
    catch(err) {
        const {data} = err.response;
        return Promise.reject(data);
    }
}

export const authUser = (token) => (dispatch) => {
    var user = jwt.decode(token);
    setAuthorizationToken(token);
    dispatch({type: LOGIN, payload: user});
    //dispatch(getCartUser());
}


export const logout = () => (dispatch) => {
    localStorage.removeItem('authToken');
    dispatch(
        {
            type: LOGOUT
        }
    );
}

export const isRole = (user, role) => {
    if(Array.isArray(user.roles)) {
        for(let i =0; i < user.roles.length; i++)
        {
            if(user.roles[i]==role)
                return true;
        }
        return false;
    }
    else {
        return user.roles==role;
    }
}