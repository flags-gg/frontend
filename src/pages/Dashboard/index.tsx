import {FC} from "react";
import {Outlet} from "react-router-dom";
import {AppBar, Box, Toolbar, Typography} from "@mui/material";

import Sidebar from "./components/Sidebar";
import Footer from "../../components/Footer";

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
      <Box component="main" sx={{
        flexGrow: 1,
        bgcolor: 'background.default',
        p: 3 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

export default Dashboard
