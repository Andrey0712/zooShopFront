import React from 'react';

const UsersPage = React.lazy(() => import("../cocmponents/userlist"));
const MainAdminPage = React.lazy(() => import("../cocmponents/admin"));
const RegisterProduct = React.lazy(() => import("../cocmponents/admin/RegisterProduct"));
const EditProduct = React.lazy(() => import("../cocmponents/admin/EditProduct"));
const OdersPage = React.lazy(() => import("../cocmponents/admin/Oders"));
const OderItemsPage = React.lazy(() => import("../cocmponents/admin/Oders/orderItems"));


const adminRoutes = [
    { path: '/admin/oderlist', exact: true, name: 'Замовленя', component: OdersPage  },
    { path: '/admin/Oders/orderItems', exact: true, name: 'Перелік замовлень', component: OderItemsPage  },
    { path: '/admin/userlist', exact: true, name: 'Користувачі', component: UsersPage  },
    { path: '/admin/RegisterProduct', exact: true, name: 'Додати товар', component: RegisterProduct  },
    { path: '/admin/EditProduct', exact: true, name: 'Редагувати товар', component: EditProduct  },
    { path: '/admin', exact: true, name: 'Головна', component: MainAdminPage  }
];
export default adminRoutes;