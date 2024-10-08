import {FC} from "react";
import {Box, Container} from "@mui/material";
import {FlagsProvider} from "@flags-gg/react-library";

import Hero from "@HC/Hero";
import TopBar from "@HC/TopBar";
import Features from "@HC/Features";
import Pricing from "@HC/Pricing";
import FAQ from "@HC/FAQ";
import Footer from "@C/Footer";
import {flagsConfig} from "@/app.config.tsx";

const Homepage: FC = () => {
  return (
    <FlagsProvider options={{
        projectId: flagsConfig.projectId,
        agentId: flagsConfig.agentId,
        environmentId: flagsConfig.environmentId
      }}>
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
    </FlagsProvider>
  )
}

export default Homepage
