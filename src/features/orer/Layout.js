import React, { useEffect, useRef, useState } from 'react';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { Container } from 'reactstrap';
import { Header } from '../headers';
import AdminNavbar from '../navbars/AdminNavbar';
import Sidebar from '../sidebars/Sidebar';
// import PropTypes from 'prop-types';

import orerroute from './route'

export default function Layout({ history, children }) {
  const [token, setToken] = useState(localStorage.getItem('jwt') || null)
  const mainRef = useRef(null)

  const routes = orerroute
  // routes.push(orerroute.childRoutes.map(item => (orerroute.path + "/" + item.path)))

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // mainRef.current.scrollTop = 0;
  }, [mainRef])

  const getBrandText = path => {
    for (let i = 0; i < routes.childRoutes.length; i++) {
      if (
        history.location.pathname.indexOf(
          routes.path + "/" + routes.childRoutes[i].path
        ) !== -1 && (routes.childRoutes[i].path !== "")
      ) {
        return routes.childRoutes[i].name;
      }
    }
    return "Brand";
  };
  return (
    token && <>
      <Sidebar
        // {...this.props}
        routes={routes}
        logo={{
          innerLink: "/dashboard/index",
          imgSrc: require("../../assets/img/brand/argon-react.png"),
          imgAlt: "..."
        }}
      />
      <div className="main-content" ref={el => mainRef.current = el}>
        <AdminNavbar
          // {...this.props}
          brandText={getBrandText(history.location.pathname)}
        />
        <Header />
        {children}
        <Container fluid>
        </Container>
      </div>
    </> || <Redirect from="/" to={"/auth/login"} />
  );
};

Layout.propTypes = {};
Layout.defaultProps = {};
