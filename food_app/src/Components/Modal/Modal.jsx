import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import { getuuid } from "../../utils/generateUUID";
import { Circles } from "react-loader-spinner";
import AppContext from "../../Context/AppContext";
import { getWords } from "../../utils/getWords";
import useFileUpload from "../../hook/useFileUpload";
import toast from "react-hot-toast";
import { createRecipe, getAllRecipes } from "../../apis/Recipes";
import { updateRecipe } from "../../apis/Recipes";

const Modal = ({ setOpen, cardToEdit, setCardToEdit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setAllData, dimensions } = useContext(AppContext);
  const { uploadFile, uploadResponse, setUploadResponse } = useFileUpload();
  const [smallScreen, setSmallScreen] = useState(dimensions.width < 600);
  const [desc, setDesc] = useState();
  const [title, setTitle] = useState();
  const [file, setFile] = useState();
  const [ing, setIng] = useState();
  const [stepsArr, setStepsArr] = useState([{ id: getuuid(), inputData: "" }]);

  useEffect(() => {
    if (dimensions.width < 600) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  }, [dimensions]);

  useEffect(() => {
    if (cardToEdit) {
      setTitle(cardToEdit.title);
      setDesc(cardToEdit.description);
      const ingredientsString = cardToEdit.ingredients.join(",");
      setIng(ingredientsString);
      const selectedStepArr = cardToEdit.steps.map((item) => {
        return {
          id: getuuid(),
          inputData: item,
        };
      });
      setStepsArr(selectedStepArr);
    }
  }, [cardToEdit]);
  const handleInputChange = (e, id) => {
    e.preventDefault();
    setStepsArr((prev) =>
      prev.map((data) =>
        data.id === id ? { ...data, inputData: e.target.value } : data
      )
    );
  };

  const handleAddStep = (e) => {
    e.preventDefault();
    setStepsArr((prev) => [...prev, { id: getuuid(), inputData: "" }]);
  };

  const handleDeleteStep = (idToDelete, e) => {
    e.preventDefault();
    setStepsArr((prev) => prev.filter((item) => item.id !== idToDelete));
  };

  const uploadRecipe = async () => {
    const ingArr = getWords(ing);
    const stepArr = stepsArr.map((step) => step.inputData);
    const recData = {
      user_id: user.id,
      title: title,
      description: desc,
      ingredients: ingArr,
      steps: stepArr,
      image: uploadResponse,
    };

    if (cardToEdit && cardToEdit.id) {
      try {
        await updateRecipe({ id: cardToEdit.id, ...recData });
        toast.success("Recipe updated successfully");
        setIsLoading(false);
      } catch (error) {
        toast.error("Error updating recipe");
      }
    } else {
      try {
        await createRecipe(recData);
        toast.success("Recipe created successfully");
        setIsLoading(false);
      } catch (error) {
        toast.error("Error creating recipe");
      }
    }
    try {
      const data = await getAllRecipes();
      setAllData(data);
    } catch (error) {
      toast.error("server error please reload");
    }
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      file &&
      desc &&
      title &&
      ing.length !== 0 &&
      stepsArr[0].inputData !== ""
    ) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "food_app");
      formData.append("cloud_name", "dmpir7wfy");

      try {
        setIsLoading(true);
        await uploadFile(formData);
      } catch (error) {
        toast.error("upload error", error);
        setIsLoading(false);
      }
    } else if (cardToEdit) {
      setUploadResponse(cardToEdit.image);
    } else {
      toast.error("some fields are empty");
      if (!file || cardToEdit?.image) {
        toast.error("image is require");
      }
      return;
    }
  };

  useEffect(() => {
    if (uploadResponse) {
      uploadRecipe();
    }
  }, [uploadResponse]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  return (
    <div>
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: "70",
        }}
      ></div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -45%)",
          width: smallScreen ? "300px" : "560px",
          height: smallScreen ? "70vh" : "80vh",
          overflowY: "scroll",
          backgroundColor: "white",
          padding: "1em",
          borderRadius: "1em",
          zIndex: "70",
        }}
      >
        {isLoading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "50%",
            }}
          >
            <Circles color="var(--pink)" width={30} height={30} />
          </div>
        ) : (
          <>
            <button
              style={{
                color: "red",
                position: "absolute",
                right: 2,
                top: 2,
                background: "transparent",
                border: "none",
                borderRadius: "1em",
                padding: "0.2em",
                width: "4em",
                boxShadow: "var(--shadow)",
                marginLeft: "0.5em",
                cursor: "pointer",
                fontSize: "var(--text-sm)",
                fontFamily: "poppins",
              }}
              onClick={() => {
                setOpen(false);
                setTitle(null);
                setIng([]);
                setStepsArr([{ id: getuuid(), inputData: "" }]);
                setDesc(null);
                setCardToEdit();
              }}
            >
              Close
            </button>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              style={{
                width: "100%",
                borderRadius: "1em",
                padding: "1em",
                border: "1px solid #cfcfcf",
                fontFamily: "poppins",
                marginBottom: "1em",
                marginTop: "1.2em",
              }}
              type="text"
              placeholder="Enter the tite"
            ></input>
            <input
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              style={{
                width: "100%",
                borderRadius: "1em",
                padding: "1em",
                border: "1px solid #cfcfcf",
                fontFamily: "poppins",
                marginBottom: "1em",
              }}
              type="text"
              placeholder="Enter a description"
            ></input>
            <input
              onChange={(e) => setIng(e.target.value)}
              value={ing}
              style={{
                width: "100%",
                borderRadius: "1em",
                padding: "1em",
                border: "1px solid #cfcfcf",
                fontFamily: "poppins",
                marginBottom: "1em",
              }}
              type="text"
              placeholder="Enter comma spareated ingrideints"
            ></input>
            <input
              style={{
                width: "100%",
                borderRadius: "1em",
                padding: "1em",
                border: "1px solid var(--pink)",
                fontFamily: "poppins",
                marginBottom: "1em",
                backgroundColor: "white",
              }}
              type="file"
              accept="image/*"
              placeholder="Upload an image"
              onChange={handleImageChange}
            />
            {stepsArr.map((stepItem) => (
              <div key={stepItem.id} style={{ position: "relative" }}>
                <textarea
                  type="text"
                  placeholder="Step Description here"
                  value={stepItem.inputData}
                  onChange={(e) => handleInputChange(e, stepItem.id)}
                  style={{
                    width: "100%",
                    padding: "0.3em 0.7em",
                    borderRadius: "1em",
                    border: "0.1em solid #cfcfcf",
                    fontFamily: "poppins",
                    resize: "vertical",
                  }}
                />
                <button
                  style={{
                    color: "red",
                    position: "absolute",
                    right: 2,
                    top: 2,
                    background: "transparent",
                    border: "none",
                    borderRadius: "1em",
                    padding: "0.3em",
                    width: "2em",
                    boxShadow: "var(--shadow)",
                    marginLeft: "0.5em",
                    cursor: "pointer",
                    fontSize: "1em",
                  }}
                  onClick={(e) => handleDeleteStep(stepItem.id, e)}
                >
                  x
                </button>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1em",
              }}
            >
              <Button
                title="add step"
                size={dimensions?.width < 600 ? "small" : "large"}
                type="outline"
                disabled={false}
                onClick={handleAddStep}
              />
              <Button
                title={cardToEdit ? "Update" : "Create"}
                size={dimensions?.width < 600 ? "small" : "large"}
                type="submit"
                disabled={false}
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
};

Modal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  cardToEdit: PropTypes.object,
  setCardToEdit: PropTypes.func,
};

export default Modal;
