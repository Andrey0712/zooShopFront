import React, { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import DefaultRoutes from "../../../routes/DefaultRoutes";
import Footer from "../../footer/footer";
import Header from "../../header";

class DefaultLayout extends Component {
  render() {
    return (
      <Layout>
        <Suspense fallback={<div>Загрузка ...</div>}>
          <Header />
          <Switch>
            {DefaultRoutes.map((route, index) => {
              return route.component ? (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => <route.component {...props} />}
                />
              ) : null;
            })}
          </Switch>
          <Footer />
        </Suspense>
      </Layout>
    );
  }
}

export default DefaultLayout;
