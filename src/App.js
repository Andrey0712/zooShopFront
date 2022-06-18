
import './App.css';
import React, {Suspense} from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
// import  Header  from './cocmponents/header';
// import RegisterPage from './cocmponents/auth/Register';
// import LoginPage from './cocmponents/auth/Login';
// import UsersPage from './cocmponents/userlist';
// import HomePage from './cocmponents/home';
// import MainAdminPage from './cocmponents/admin';
// import RegisterProduct from './cocmponents/admin/RegisterProduct'
//  import EditPage from './cocmponents/userlist/Edit';
 const DefaultLayout = React.lazy(()=>import('./cocmponents/containers/DefaultLayout'));
 const AdminLayout = React.lazy(()=>import('./cocmponents/containers/AdminLayout'));

//  function App() {
//   return (
//     <>
//         <Header />
//         <div className="container">
//           <Switch>
//           <Route exact path="/"><HomePage /></Route>
//             <Route exact path="/register"><RegisterPage /></Route>
//             <Route exact path="/login"><LoginPage /></Route>
//             <Route exact path="/users"><UsersPage /></Route> 
//             <Route exact path="/registerProduct"><RegisterProduct /></Route> 
//             <Route exact path="/admin"><MainAdminPage /></Route> 
//           </Switch>
//         </div>
//       </>
//     );
//   }
// export default App;
class App extends React.Component {

  render() {
    return (
      <>
        <Suspense fallback={<div>Загрузка ...</div>}>
          <Switch>
            <Route path="/admin" name="Admin" render={props=> <AdminLayout {...props}/>} />
            <Route path="/" name="Default" render={props=> <DefaultLayout {...props}/>} />
          </Switch>
        </Suspense>
        </>
      
    );
  }
}

export default App;