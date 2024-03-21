import {FC} from "react";
import {Outlet} from "react-router-dom";
import {AppBar, Box, Toolbar, Typography} from "@mui/material";

import Sidebar from "./components/Sidebar";

const Dashboard: FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar enableColorOnDark>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default Dashboard
