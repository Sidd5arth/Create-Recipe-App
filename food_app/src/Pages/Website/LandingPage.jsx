import React from "react";
import Layout from "../../Layout/Layout";
import LandingHeader from "./Components/LandingHeader";
import LandingAboutSite from "./Components/LandingAboutSite";
import LandingExp from "./Components/LandingExp";
import LandingHacks from "./Components/LandingHacks";
import AboveFooter from "./Components/AboveFooter";

const LandingPage = () => {
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
