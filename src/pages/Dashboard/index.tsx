import {FC, useState} from "react";
import {Outlet} from "react-router-dom";
import {Box, Container, Toolbar} from "@mui/material";

import Header from "@DC/Header";
import Sidebar from "@DC/Sidebar";
import Footer from "@C/Footer";

const Dashboard: FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex' }}>
      <Header open={open} />
      <Sidebar open={open} setOpen={setOpen} />
      <Box component="main" sx={{
        flexGrow: 1,
        bgcolor: 'background.default',
        height: '100vh',
        overflow: 'auto',
        p: 3 }}>
        <Toolbar />
        <Container
          maxWidth={false}
          sx={{
            mt: 4,
            mb: 4
        }}>
          <Outlet />
        </Container>
        <Footer />
      </Box>
    </Box>
  )
}

export default Dashboard
