import React from 'react'
import { Link } from "react-router-dom";

const NoMatch = () => {
    return (
      <>
        
        <h2>Сторінка знаходиться в розробці!</h2>
        <p>
          <Link to="/">Go to the home page</Link>
        </p>
      </>
    );
}

export default NoMatch;