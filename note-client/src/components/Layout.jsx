import React from "react";
import Header from "./Header";
import "./Layout.scss";
import Navbar from "./Navbar";

const Layout = (props) => {
  return (
    <>
      <Header />
      <div className="wrapper">
          <Navbar />
          <main>{props.children}</main>
      </div>
    </>
  );
};

export default Layout;
