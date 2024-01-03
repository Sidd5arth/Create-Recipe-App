import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { wordLimiter } from "../../utils/wordLimiter";
import { deleteRecipe } from "../../apis/Recipes";
import { toast } from "react-hot-toast";
import AppContext from "../../Context/AppContext";
import { getAllRecipes } from "../../apis/Recipes";

const RecipesCard = ({
  id,
  title,
  description,
  ingredients,
  steps,
  image,
  enableEdit,
  setOpen,
  setCardToEdit,
}) => {
  const navigate = useNavigate();
  const { setAllData } = useContext(AppContext);
  const [openDelete, setOpenDelete] = useState(false);

  const handleRecipeClick = () => {
    const ingredientsString = ingredients
      .map((item) => item.replace(/(?<!\w),/g, "|"))
      .join("|");
    const stepsString = steps
      .map((item) => item.replace(/(?<!\w),/g, "|"))
      .join("|");

    const queryString = `?id=${id}&desc=${encodeURIComponent(
      description
    )}&title=${encodeURIComponent(title)}&image=${encodeURIComponent(
      image
    )}&ingredients=${encodeURIComponent(
      ingredientsString
    )}&steps=${encodeURIComponent(stepsString)}`;

    navigate(`/details${queryString}`);
  };

  const handleDelete = async () => {
    try {
      await deleteRecipe(id);
      const data = await getAllRecipes();
      setAllData(data);
      toast.success("Recipe Deleted");
    } catch (error) {
      toast.error("Deletion Error");
    }
  };
  const handleEdit = async () => {
    window.scrollTo({
      top: 0,
    });
    const selectedCard = {
      id: id,
      title: title,
      description: description,
      ingredients: ingredients,
      steps: steps,
      image: image,
    };
    setCardToEdit(selectedCard);
    setOpen(true);
  };

  return (
    <>
      <div
        onClick={() => handleRecipeClick()}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "0.5em",
          width: "100%",
          height: "290px",
          wordWrap: "break-word",
          borderRadius: "1em",
          border: "var(--outline)",
          padding: "1.5em",
          fontSize: "0.8em",
          backgroundColor: "white",
          cursor: "pointer",
        }}
      >
        <div style={{ width: "100%", height: "130px", overflow: "hidden" }}>
          <img
            src={image}
            alt="Recipe"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "1em",
              objectFit: "cover",
            }}
          />
        </div>
        <h4 style={{ margin: "1em 0", textAlign: "left" }}>
          {wordLimiter(title, 30)}
        </h4>
        <p style={{ fontSize: "var(--text-sm)" }}>
          {wordLimiter(description, 75)}
        </p>
      </div>
      {enableEdit === true ? (
        <div
          style={{
            position: "relative",
            borderRadius: "2em",
            width: "100%",
            height: "50px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => {
              openDelete ? setOpenDelete(false) : handleEdit();
            }}
            style={{
              width: "30%",
              height: "30px",
              borderRadius: "0em 0em 0em 1em",
              border: "0.5px solid #cfcfcf",
              color: "green",
              backgroundColor: openDelete ? "var(--yellow)" : "white",
              cursor: "pointer",
              fontFamily: "poppins",
            }}
          >
            {openDelete ? "Cancle" : "Edit"}
          </button>
          <button
            onClick={() => {
              openDelete ? handleDelete() : setOpenDelete(true);
            }}
            style={{
              width: "30%",
              height: "30px",
              borderRadius: "0em 0em 1em 0em",
              border: "0.5px solid #cfcfcf",
              color: openDelete ? "white" : "red",
              backgroundColor: openDelete ? "var(--pink)" : "white",
              cursor: "pointer",
              fontFamily: "poppins",
            }}
          >
            {openDelete ? "Confirm" : "Delete"}
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

RecipesCard.propTypes = {
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  enableEdit: PropTypes.bool.isRequired,
  setCardToEdit: PropTypes.func,
  setOpen: PropTypes.func,
};

export default RecipesCard;
