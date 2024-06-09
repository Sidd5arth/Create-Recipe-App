import React, { useContext } from "react";
import PropTypes from "prop-types";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import AppContext from "../Context/AppContext";

const Layout = ({ children }) => {
  const { isSite } = useContext(AppContext);
  return (
    <div>
      <Navbar />
      <div
        style={{
          width: isSite ? "100%" : "80%",
          margin: "0 auto",
          paddingTop: isSite ? "" : "8em",
        }}
      >
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
