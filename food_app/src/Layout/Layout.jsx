import React from "react";
import PropTypes from "prop-types";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div style={{ width: "80%", margin: "0 auto", paddingTop: "8em" }}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
