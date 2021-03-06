
import React from 'react';

const HomePage = React.lazy(() => import("../cocmponents/home"));
const CartDialog = React.lazy(() => import("../cocmponents/home/cartDialog"));
const LoginPage = React.lazy(() => import("../cocmponents/auth/Login"));
const RegisterPage = React.lazy(() => import("../cocmponents/auth/Register"));
// const UsersPage = React.lazy(() => import("../cocmponents/userlist"));
 //const RegisterProduct = React.lazy(() => import("../cocmponents/admin/RegisterProduct"));

const defaultRoutes = [
    // { path: '/userlist', exact: true, name: 'Користувачі', component: UsersPage  },
     //{ path: '/RegisterProd', exact: true, name: 'Додати лот', component: RegisterProduct  },
    { path: '/', exact: true, name: 'Головна', component: HomePage  },
    { path: '/cart', exact: true, component: CartDialog  },
    { path: '/login', exact: true, name: 'Вхід', component: LoginPage  },
    { path: '/register', exact: true, name: 'Реєстрація', component: RegisterPage  }
];
export default defaultRoutes;