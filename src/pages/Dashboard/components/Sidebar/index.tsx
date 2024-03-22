import {Box} from "@mui/material";
import {FC} from "react";

import Logo from "../Logo";

const Sidebar: FC = () => {
  return (
    <>
      <Box sx={{display: { xs: 'block', md: 'none'}}}>
        <Box sx={{
            display: 'flex',
            p: 2,
            mx: 'auto'
        }}>
          <Logo />
        </Box>
      </Box>
    </>
  )
}

export default Sidebar;

