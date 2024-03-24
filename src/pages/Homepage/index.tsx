import {FC} from "react";
import {Box} from "@mui/material";

import Hero from "./components/Hero";
import TopBar from "./components/TopBar";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Footer from "../../components/Footer";

const Homepage: FC = () => {
  return (
    <>
      <TopBar />
      <Hero />
      <Box sx={{bgcolor: 'background.default'}}>
        <Features />
        <Pricing />
        <FAQ />
      </Box>
      <Footer />
    </>
  )
}

export default Homepage
