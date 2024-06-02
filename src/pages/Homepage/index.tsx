import {FC} from "react";
import {Box, Container} from "@mui/material";
import {FlagsProvider} from "@flags-gg/react-library";

import Hero from "@HC/Hero";
import TopBar from "@HC/TopBar";
import Features from "@HC/Features";
import Pricing from "@HC/Pricing";
import FAQ from "@HC/FAQ";
import Footer from "@C/Footer";
import {flagsFrontendConfig} from "@/app.config.tsx";


const Homepage: FC = () => {
  return (
    <FlagsProvider options={{
        flagsURL: flagsFrontendConfig.flagsURL,
        projectId: flagsFrontendConfig.projectId,
        agentId: flagsFrontendConfig.agentId,
        environmentId: flagsFrontendConfig.environmentId
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
