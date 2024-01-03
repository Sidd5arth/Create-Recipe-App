import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../../assets/bgb2.jpg";
import { signUpUser } from "../../apis/Auth";
import { toast } from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();

    try {
      await signUpUser(formData.email, formData.password, formData.name);
      toast.success("User registered successfully");

      setFormData({
        email: "",
        password: "",
        name: "",
      });
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
      }}
    >
      <form
        onSubmit={handleSumbit}
        style={{
          width: "360px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1em",
          backgroundColor: "rgba(255,255,255,0.9)",
          padding: "2em",
          borderRadius: "1em",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <label htmlFor="password" style={{ color: "#666" }}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={{
              borderColor: "#666",
              backgroundColor: "var(--bg)",
              borderRadius: "1em",
              padding: "0.8em",
              border: "1px solid #666",
            }}
          />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <label htmlFor="password" style={{ color: "#666" }}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{
              borderColor: "#666",
              backgroundColor: "var(--bg)",
              borderRadius: "1em",
              padding: "0.8em",
              border: "1px solid #666",
            }}
          />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <label htmlFor="password" style={{ color: "#666" }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={{
              borderColor: "#666",
              backgroundColor: "var(--bg)",
              borderRadius: "1em",
              padding: "0.8em",
              border: "1px solid #666",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.8em",
            borderRadius: "1em",
            backgroundColor: "var(--pink)",
            color: "white",
            marginTop: "1em",
            border: "none",
          }}
        >
          Sign-up
        </button>
        <div style={{ fontSize: "var(--text-sm)" }}>
          <p>
            already have an account ?{" "}
            <em
              onClick={() => navigate("/login")}
              style={{
                color: "var(--pink)",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Log-in
            </em>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
