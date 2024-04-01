import {FC} from "react";
import {Box, Container} from "@mui/material";

import Hero from "@HC/Hero";
import TopBar from "@HC/TopBar";
import Features from "@HC/Features";
import Pricing from "@HC/Pricing";
import FAQ from "@HC/FAQ";
import Footer from "@C/Footer";

const Homepage: FC = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        minWidth: '98vw',
      }}>
      <TopBar />
      <Hero />
      <Box sx={{bgcolor: 'background.default'}}>
        <Features />
        <Pricing />
        <FAQ />
      </Box>
      <Footer />
    </Container>
  )
}

export default Homepage
