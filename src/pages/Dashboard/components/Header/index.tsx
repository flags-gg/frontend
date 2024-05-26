import {FC} from "react";
import {AppBar, Box, Toolbar, Typography} from "@mui/material";

import Notifications from "@DC/Notifications";
import AccountMenu from "@DC/AccountMenu";
import {ProjectSelector} from "@DC/ProjectSelector";

const Header: FC = () => {
  return (
    <AppBar position={"absolute"}>
      <Toolbar sx={{ pr: '24px' }}>
        <Box width={"72px"} sx={{
          display: 'flex',
        }} />
        <Typography
          variant={"h6"}
          component={"h1"}
          color={"inherit"}
          noWrap
          sx={{
            flexGrow: 1
        }}>
          Flags.gg Dashboard
        </Typography>
        <ProjectSelector />
        <Notifications />
        <AccountMenu />
      </Toolbar>
    </AppBar>
  )
}

export default Header;
