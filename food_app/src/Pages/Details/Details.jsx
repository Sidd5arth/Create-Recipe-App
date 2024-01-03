import React, { useContext, useEffect } from "react";
import Layout from "../../Layout/Layout";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import { getWord } from "../../utils/getWords";
const Details = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const params = new URLSearchParams(search);
  const desc = params.get("desc");
  const title = params.get("title");
  const image = params.get("image");
  const steps = getWord(params.get("steps"));
  const ingredients = getWord(params.get("ingredients"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      window.scrollTo({
        top: 0,
      });
    }
  }, [user]);

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          height: "85vh",
          gap: "5em",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <img
            src={image}
            alt="Recipe"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "2em",
              objectFit: "cover",
            }}
          />
        </div>
        <div>
          <h1 style={{ marginBottom: "1em" }}>{title}</h1>
          <p>{desc}</p>
        </div>
      </div>
      <div>
        <h1
          style={{ margin: "2em 0em", paddingTop: "1em", textAlign: "center" }}
        >
          Recipe
        </h1>
        <ul>
          <h2 style={{ marginBottom: "0.2em" }}>Ingredients</h2>
          <hr style={{ marginBottom: "0.5em" }}></hr>
          {ingredients.map((item, index) => (
            <li style={{ marginBottom: "1em" }} key={index}>
              {item}
            </li>
          ))}
        </ul>
        <ul>
          <h2 style={{ marginBottom: "0.5em", marginTop: "1em" }}>
            Steps to Prepare
          </h2>
          <hr style={{ marginBottom: "0.5em" }}></hr>
          {steps.map((item, index) => (
            <li style={{ marginBottom: "1em" }} key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Details;
