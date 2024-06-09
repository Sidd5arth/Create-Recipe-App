import React, { useContext } from "react";
import { siteCardData } from "../LandingPageData";
import SiteCards from "./SiteCards";
import heroImage from "../../../assets/hero.png";
import AppContext from "../../../Context/AppContext";
const LandingHeader = () => {
  const { dimensions } = useContext(AppContext);
  return (
    <div
      style={{
        background: "var(--bg)",
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: dimensions.width < 700 ? "0" : "50%",
          height: "100%",
          right: "0",
          top: "5%",
          zIndex: "1",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
          src={heroImage}
        ></img>
      </div>
      <section
        style={{
          position: "absolute",
          zIndex: "0",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            backgroundColor: "var(--yellow)",
            width: dimensions.width < 700 ? "100%" : "60%",
            height: "90%",
            borderRadius: "0 0em 10em 0",
            zIndex: "1",
          }}
        ></div>
        <div
          style={{
            width: dimensions.width < 700 ? "0%" : "40%",
            height: "100%",
            borderRadius: "0 0em 10em 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1em",
            position: "relative",
          }}
        ></div>
      </section>
      <div
        style={{
          width: dimensions.width < 700 ? "80%" : "50%",
          height: dimensions.width < 700 ? "70%" : "100%",
          paddingTop: dimensions.width < 700 ? "6em" : "10em",
          paddingLeft: dimensions.width < 700 ? "4em" : "10%",
          zIndex: "1",
        }}
      >
        <h1
          style={{
            fontSize: dimensions.width < 700 ? "2.2em" : "2.5em",
            background: "transparent",
          }}
        >
          Find Your Best Cooking Recipes
          <h1 style={{ color: "var(--pink)" }}>Here!</h1>
        </h1>
      </div>
      <ul
        style={{
          width: "100%",
          height: "100%",
          paddingTop: "1em",
          paddingLeft: dimensions.width < 700 ? "4em" : "10%",
          paddingRight: dimensions.width < 700 ? "4em" : "",
          zIndex: "1",
          display: "flex",
          flexDirection: dimensions.width < 700 ? "column" : "row",
          gap: "1em",
        }}
      >
        {siteCardData.map((item, index) => (
          <l1 key={index}>
            <SiteCards svg={item.svg} heading={item.heading} desc={item.desc} />
          </l1>
        ))}
      </ul>
    </div>
  );
};

export default LandingHeader;
