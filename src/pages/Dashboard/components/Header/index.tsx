import {FC, useEffect} from "react";
import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import {useFlags} from "@flags-gg/react-library"

import Notifications from "@DC/Notifications";
import AccountMenu from "@DC/AccountMenu";

interface HeaderProps {
  open: boolean,
}

const Header: FC<HeaderProps> = ({open}) => {
  const {is} = useFlags();

  useEffect(() => {
    is("accountMenu").initialize()
    is("notifications").initialize()
  }, [is])

  return (
    <AppBar position={"absolute"}>
      <Toolbar sx={{ pr: '24px' }}>
        <Box width={"72px"} sx={{
          ...(open && { display: 'flex' }),
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
        {is("accountMenu").enabled() && <AccountMenu />}
        {is("notifications").enabled() && <Notifications />}
      </Toolbar>
    </AppBar>
  )
}

export default Header;
