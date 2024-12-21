import React, { useContext } from "react";
import Layout from "../../Layout/Layout";
import LandingHeader from "./Components/LandingHeader";
import LandingAboutSite from "./Components/LandingAboutSite";
import LandingExp from "./Components/LandingExp";
import LandingHacks from "./Components/LandingHacks";
import AboveFooter from "./Components/AboveFooter";
import { useNavigate } from "react-router-dom";
import AppContext from "../../Context/AppContext";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  if (user) {
    navigate("/");
  }
  return (
    <Layout>
      <LandingHeader />
      <LandingHacks />
      <LandingAboutSite />
      <LandingExp />
      <AboveFooter />
    </Layout>
  );
};
export default LandingPage;
