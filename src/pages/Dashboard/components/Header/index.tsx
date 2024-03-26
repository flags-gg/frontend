import {FC, Dispatch} from "react";
import {AppBar, Badge, Box, IconButton, Toolbar, Typography} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

interface HeaderProps {
  open: boolean,
  setOpen: Dispatch<boolean>
}

const Header: FC<HeaderProps> = ({open, setOpen}) => {
  console.log("header open", open)

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
          Dashboard
        </Typography>
        <IconButton color={"inherit"}>
          <Badge badgeContent={4} color={"secondary"}>
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header;
