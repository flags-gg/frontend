import {FC} from "react";
import Hero from "./components/Hero";
import {Box} from "@mui/material";

import TopBar from "./components/TopBar";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";

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
    </>
  )
}

export default Homepage
