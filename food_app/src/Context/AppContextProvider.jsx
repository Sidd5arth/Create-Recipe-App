import React, { useCallback, useEffect, useState } from "react";
import AppContext from "./AppContext";
import PropTypes from "prop-types";

const AppContextProvider = ({ children }) => {
  const [isSite, setIsSite] = useState(window.location.pathname === "/site");
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [allData, setAllData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    setIsSite(window.location.pathname === "/site" || "/Site");
  }, [window.location.pathname]);

  const changeDimensionsHandler = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", changeDimensionsHandler);
    return () => {
      window.removeEventListener("resize", changeDimensionsHandler);
    };
  }, [changeDimensionsHandler]);

  return (
    <AppContext.Provider
      value={{
        isSite,
        dimensions,
        allData,
        user,
        setUser,
        setAllData,
        filteredData,
        setFilteredData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
