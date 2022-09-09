
import React from 'react';

const HomePage = React.lazy(() => import("../cocmponents/home"));
const CartDialog = React.lazy(() => import("../cocmponents/home/cartDialog"));
const CheckOut = React.lazy(() => import("../cocmponents/home/CheckOut"));
const LoginPage = React.lazy(() => import("../cocmponents/auth/Login"));
const RegisterPage = React.lazy(() => import("../cocmponents/auth/Register"));
 const NoMatch = React.lazy(() => import("../cocmponents/NoMatch"));
 //const RegisterProduct = React.lazy(() => import("../cocmponents/admin/RegisterProduct"));

const defaultRoutes = [
     { path: '/noMatch', exact: true, component: NoMatch  },
     //{ path: '/RegisterProd', exact: true, name: 'Додати лот', component: RegisterProduct  },
    { path: '/', exact: true, name: 'Головна', component: HomePage  },
    { path: '/cart', exact: true, component: CartDialog  },
    { path: '/login', exact: true, name: 'Вхід', component: LoginPage  },
    { path: '/register', exact: true, name: 'Реєстрація', component: RegisterPage  },
    { path: '/сheckOut', exact: true,name: 'Замовленя', component: CheckOut  }
];
export default defaultRoutes;