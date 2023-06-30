import React from "react";
// import { Link } from "react-router-dom";
import "./NoMatch.css";
const NoMatch = () => {
  return (
    <>
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1>404</h1>
                </div>

                <div className="contant_box_404">
                  <h3>Look like you're lost</h3>

                  <p>the page you are looking for not avaible!</p>

                  <a href="/" className="link_404">
                    Go to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <h2>Сторінка знаходиться в розробці!</h2>
        <p>
          <Link to="/">Go to the home page</Link>
        </p> */}
    </>
  );
};

export default NoMatch;
