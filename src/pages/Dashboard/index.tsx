import {FC, useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import {Box, Container} from "@mui/material";
import {FlagsProvider} from "@flags-gg/react-library";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import {Summary} from "@DP/Summary";
import Header from "@DC/Header";
import Sidebar from "@DC/Sidebar";
import {flagsDashboardConfig} from "@/app.config";

const queryClient = new QueryClient()

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
    <QueryClientProvider client={queryClient}>
      <FlagsProvider options={{
          flagsURL: flagsDashboardConfig.flagsURL,
          projectId: flagsDashboardConfig.projectId,
          agentId: flagsDashboardConfig.agentId,
          environmentId: flagsDashboardConfig.environmentId
        }}>
        <Box sx={{ display: 'flex' }}>
          <Sidebar open={open} setOpen={setOpen} />
          <Box component="main" sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            minWidth: '95vw',
            overflow: 'auto',
            marginTop: 5,
            p: 1,
            paddingTop: '38px',
            height: '95vh',
            marginLeft: '1.5%',
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
      </FlagsProvider>
    </QueryClientProvider>
  )
}

export {
  Summary
}
