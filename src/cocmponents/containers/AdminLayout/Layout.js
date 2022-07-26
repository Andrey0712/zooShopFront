import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
//import "primereact/resources/themes/mdc-light-deeppurple/theme.css";
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
//import 'primereact/resources/themes/saga-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
 import 'primeflex/primeflex.css';
 
import React from 'react';
import HeaderAdmin from './Header';


export default props => (
    <>
      <HeaderAdmin />
      <div className="container">
        {props.children}
      </div>
    </>
  );