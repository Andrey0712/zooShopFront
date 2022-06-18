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