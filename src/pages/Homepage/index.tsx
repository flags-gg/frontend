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

      </Box>
    </>
  )
}

export default Homepage
