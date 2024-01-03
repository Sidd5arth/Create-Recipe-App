import React, { useContext, useEffect } from "react";
import Layout from "../../Layout/Layout";
import RecipesCard from "../../Components/Card/RecipesCard";
import { getAllRecipes } from "../../apis/Recipes";
import AppContext from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { setAllData, user, setFilteredData, filteredData } =
    useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      const recipes = await getAllRecipes();
      setAllData(recipes);
      setFilteredData(recipes);
    };

    getData();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <Layout>
      {filteredData?.length === 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          Sorry we found nothing...
        </div>
      ) : (
        ""
      )}
      <ul
        style={{
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gridTemplateRows: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "0.5em",
        }}
      >
        {filteredData?.map((recipe) => (
          <li key={recipe._id} style={{ listStyleType: "none" }}>
            <RecipesCard
              id={recipe._id}
              title={recipe.title}
              description={recipe.description}
              image={recipe.image}
              ingredients={recipe.ingredients}
              steps={recipe.steps}
              enableEdit={false}
            ></RecipesCard>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Home;
