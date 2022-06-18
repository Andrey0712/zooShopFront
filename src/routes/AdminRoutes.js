import React from 'react';

const UsersPage = React.lazy(() => import("../cocmponents/userlist"));
const MainAdminPage = React.lazy(() => import("../cocmponents/admin"));
const RegisterProduct = React.lazy(() => import("../cocmponents/admin/RegisterProduct"));

const adminRoutes = [
    { path: '/admin/userlist', exact: true, name: 'Користувачі', component: UsersPage  },
    { path: '/admin/RegisterProduct', exact: true, name: 'Додати лот', component: RegisterProduct  },
    { path: '/admin', exact: true, name: 'Головна', component: MainAdminPage  }
];
export default adminRoutes;