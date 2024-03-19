import {FC} from "react";
import Hero from "./components/Hero";
import {Box} from "@mui/material";
import TopBar from "./components/TopBar";

const Homepage: FC = () => {
  return (
    <>
      <TopBar />
      <Hero />
      <Box sx={{bgcolor: 'background.default'}}>
        <Box id={"features"} sx={{bgcolor: 'background.paper', py: 8}}>
          Features
        </Box>
        <Box id={"pricing"} sx={{bgcolor: 'background.paper', py: 8}}>
          Pricing
        </Box>
      </Box>
    </>
  )
}

export default Homepage
