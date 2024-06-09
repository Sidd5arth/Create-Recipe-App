import React, { useContext, useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import Button from "../../Components/Button/Button";
import AppContext from "../../Context/AppContext";
import RecipesCard from "../../Components/Card/RecipesCard";
import Modal from "../../Components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { getAllRecipes } from "../../apis/Recipes";
let imgUrl =
  "https://images.pexels.com/photos/4057700/pexels-photo-4057700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
const Profile = () => {
  const {
    setAllData,
    filteredData,
    setFilteredData,
    user,
    setUser,
    dimensions,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [smallScreen, setSmallScreen] = useState(dimensions.width < 600);
  const [open, setOpen] = useState(false);
  const [cardToEdit, setCardToEdit] = useState();
  const [userRecipes, setUserRecipes] = useState();
  useEffect(() => {
    if (dimensions.width < 600) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  }, [dimensions]);
  useEffect(() => {
    if (!user) {
      navigate("/site");
    } else {
      window.scrollTo({
        top: 0,
      });
    }
  }, [user, navigate]);

  useEffect(() => {
    const getData = async () => {
      const recipes = await getAllRecipes();
      setAllData(recipes);
      setFilteredData(recipes);
    };

    if (!filteredData) {
      getData();
    }

    const userRecipeData = filteredData?.filter(
      (item) => item.user_id === user?.id
    );
    setUserRecipes(userRecipeData);
  }, [filteredData, user]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [open]);

  return (
    <>
      {open ? (
        <Modal
          setOpen={setOpen}
          cardToEdit={cardToEdit}
          setCardToEdit={setCardToEdit}
        />
      ) : (
        ""
      )}
      <Layout>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <section
            style={{
              width: "100%",
              display: "flex",
              gap: "3em",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingBottom: "1em",
              borderBottom: "2px solid var(--pink)",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "130px",
                height: "130px",
                overflow: "hidden",
              }}
            >
              <img
                src={imgUrl}
                alt="Recipe"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "1em",
                  objectFit: "cover",
                }}
              />
            </div>
            <div>
              <h3>{user?.name}</h3>
              <p style={{ fontSize: "var(--text-sm)" }}>
                {userRecipes?.length}{" "}
                {userRecipes?.length > 1 ? "Recipes" : "Recipe"}
              </p>
            </div>
            <Button
              title="+ Recipes"
              type="outline"
              disabled={false}
              size={smallScreen ? "none" : "large"}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                });
                setOpen(true);
              }}
            />
            <Button
              title="Log-out"
              type="none"
              disabled={false}
              size={smallScreen ? "none" : "large"}
              onClick={() => setUser(null)}
            />
          </section>
          {userRecipes?.length === 0 ? (
            <h3 style={{ width: "100%", height: "50vh" }}>
              Create your Recipes to see here
            </h3>
          ) : (
            <section
              style={{
                width: "100%",
              }}
            >
              <h2 style={{ margin: "1em 0em" }}>Your Recipes</h2>
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
                {userRecipes?.map((recipe) => (
                  <li key={recipe._id} style={{ listStyleType: "none" }}>
                    <RecipesCard
                      id={recipe._id}
                      title={recipe.title}
                      description={recipe.description}
                      image={recipe.image}
                      ingredients={recipe.ingredients}
                      steps={recipe.steps}
                      enableEdit={true}
                      setOpen={setOpen}
                      setCardToEdit={setCardToEdit}
                    ></RecipesCard>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Profile;
