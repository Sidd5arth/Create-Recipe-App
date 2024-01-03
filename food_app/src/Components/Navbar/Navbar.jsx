import React, { useState, useContext, useEffect } from "react";
import { ReactComponent as Forky } from "../../assets/forky.svg";
import { ReactComponent as Profile } from "../../assets/Profile.svg";
import { ReactComponent as Search } from "../../assets/search.svg";
import { useNavigate } from "react-router";
import AppContext from "../../Context/AppContext";
const Navbar = () => {
  const navigate = useNavigate();
  const { setFilteredData, allData, dimensions } = useContext(AppContext);
  const [smallScreen, setSmallScreen] = useState(dimensions.width < 600);
  const [searchQuery, setSearchQuery] = useState("");
  const [clear, setClear] = useState(false);
  useEffect(() => {
    if (dimensions.width < 600) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  }, [dimensions]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const queryToLowercase = searchQuery.toLowerCase();
    //filtering the allData array and creating
    // a new array (matchedArr) containing only those recipes for which
    //either the title or at least one ingredient matches
    const matchedArr = allData.filter((recipe) => {
      return (
        recipe.title.toLowerCase().includes(queryToLowercase) ||
        (recipe.ingredients &&
          recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(queryToLowercase)
          ))
      );
    });
    if (searchQuery) {
      setClear(true);
    }
    setFilteredData(matchedArr);
  };

  return (
    <nav
      style={{
        width: "100%",
        color: "var(--pink)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--yellow)",
        gap: smallScreen ? "1em" : "12em",
        position: "fixed",
        boxShadow: "var(--shadow)",
        padding: "1em 0",
        zIndex: "100",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: "0.512em",
          cursor: "pointer",
          marginLeft: "2em",
        }}
        onClick={() => navigate("/")}
      >
        <Forky width={30} height={30} />
        {smallScreen ? "" : <p>Forky</p>}
      </div>

      <form
        style={{
          position: "relative",
          backgroundColor: "var(--bg)",
          borderRadius: "2em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.6em 1em",
          gap: "0.5em",
        }}
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          placeholder="Search Recipes..."
          value={searchQuery}
          onChange={handleInputChange}
          style={{
            width: "100%",
            padding: "0.3em 0.7em",
            borderRadius: "1em",
            border: "0.1em solid #cfcfcf",
            fontFamily: "poppins",
          }}
        />
        <button
          type="submit"
          style={{
            background: "transparent",
            border: "none",
            borderRadius: "1em",
            padding: "0.3em",
            width: "2em",
            boxShadow: "var(--shadow)",
            marginLeft: "0.5em",
            cursor: "pointer",
          }}
        >
          <Search width={15} height={15} />
        </button>
        {clear ? (
          <button
            onClick={() => {
              setFilteredData(allData);
              setSearchQuery("");
              setClear(false);
            }}
            style={{
              color: "var(--pink)",
              background: "white",
              padding: "0.1em 0.5em",
              position: "absolute",
              borderRadius: "1em",
              right: smallScreen ? "17vw" : "20%",
              boxShadow: "var(--shadow)",
              border: "none",
              fontFamily: "poppins",
              fontSize: "0.7em",
            }}
          >
            {smallScreen ? "X" : "clear"}
          </button>
        ) : (
          ""
        )}
      </form>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: "0.512em",
          cursor: "pointer",
          marginRight: "2em",
        }}
        onClick={() => {
          navigate("/Profile");
          setFilteredData(allData);
        }}
      >
        <Profile width={30} height={30} />
        {smallScreen ? "" : <p>Profile</p>}
      </div>
    </nav>
  );
};

export default Navbar;
