import {FC, useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import {Box, Container} from "@mui/material";
import "@uploadthing/react/styles.css"

import {Summary} from "./pages/Summary";

import Header from "@DC/Header";
import Sidebar from "@DC/Sidebar";

export const Dashboard: FC = () => {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const handleClickNotSidebar = (event: MouseEvent) => {
      if (open && !document?.getElementById('sidebar')?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickNotSidebar)
    return () => {
      document.removeEventListener('mousedown', handleClickNotSidebar)
    }
  }, [open])

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar open={open} setOpen={setOpen} />
      <Box component="main" sx={{
        flexGrow: 1,
        bgcolor: 'background.default',
        minWidth: '98vw',
        overflow: 'auto',
        marginTop: 5,
        p: 1,
        paddingTop: '38px',
        height: '95vh'
      }}>
        <Header />
        <Container
          maxWidth={false}
          sx={{
            verticalAlign: "top",
            horizontalAlign: "top",
            mt: 0,
            mb: 0
        }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  )
}

export {
  Summary
}
