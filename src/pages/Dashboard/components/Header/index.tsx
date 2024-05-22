import {FC, useEffect} from "react";
import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import {useFlags} from "@flags-gg/react-library"

import Notifications from "@DC/Notifications";
import AccountMenu from "@DC/AccountMenu";
import {ProjectSelector} from "@DC/ProjectSelector";

const Header: FC = () => {
  const {is} = useFlags();

  useEffect(() => {
    is("notifications").initialize()
    is("projects").initialize(true)
  }, [is])

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
        {is("projects").enabled() && <ProjectSelector />}
        {is("notifications").enabled() && <Notifications />}
        <AccountMenu />
      </Toolbar>
    </AppBar>
  )
}

export default Header;
