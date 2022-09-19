import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import usersReducer from "./reducers/usersReducer";
import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";
import ordersReducer from "./reducers/oderReduser";


const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
export const history = createBrowserHistory({ basename: baseUrl });

const middleware = [
    thunk,
    routerMiddleware(history)
];

const rootReducer = combineReducers({
    auth: authReducer,
    user:usersReducer,
    prod:productReducer,
    cart:cartReducer,
    order:ordersReducer,
    router: connectRouter(history)
});

// In development, use the browser's Redux dev tools extension if installed
 const enhancers = [];
 const isDevelopment = process.env.NODE_ENV === 'development';
if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
  window.devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
  enhancers.push(window.devToolsExtension());
}

const store = createStore(
    rootReducer,
    {},
    compose(applyMiddleware(...middleware), ...enhancers)
);
export default store;