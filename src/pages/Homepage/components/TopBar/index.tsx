import {FC} from "react";
import {AppBar} from "@mui/material";

const TopBar: FC = () => {
  return (
    <div>
      <AppBar position={"fixed"} sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 2
      }}>

      </AppBar>
    </div>
  )
}

export default TopBar

