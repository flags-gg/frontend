import {FC} from "react";
import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import Notifications from "@DC/Notifications";
import AccountMenu from "@DC/AccountMenu";

interface HeaderProps {
  open: boolean,
}

const Header: FC<HeaderProps> = ({open}) => {
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
        <AccountMenu />
        <Notifications />
      </Toolbar>
    </AppBar>
  )
}

export default Header;
