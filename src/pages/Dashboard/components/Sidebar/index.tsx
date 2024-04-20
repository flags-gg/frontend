import {
  Divider,
  Drawer,
  ListItemIcon,
  Toolbar,
  ListItemText,
  IconButton, Box, MenuItem, MenuList
} from "@mui/material";
import {Dispatch, FC, useEffect} from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SettingsIcon from "@mui/icons-material/Settings";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import MenuIcon from "@mui/icons-material/Menu";
import {Link} from "react-router-dom";
import {useFlags} from "@flags-gg/react-library";

import Logo from "@C/Logo";

interface SidebarProps {
  open: boolean
  setOpen: Dispatch<boolean>
}

const Sidebar: FC<SidebarProps> = ({open, setOpen}) => {
  const {is} = useFlags()

  useEffect(() => {
    is("account").initialize()
    is("flags").initialize()
  }, [is])

  return (
    <Drawer
      id={"sidebar"}
      variant={"permanent"}
      sx={{
        width: '57px',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '240px',
          boxSizing: 'border-box',
          ...(!open && {
            overflowX: 'hidden',
            width: '57px',
          }),
        },
      }}>
      <Toolbar sx={{
        display: 'flex',
        alignItems: 'center',
        px: [1]}}>
        <Box sx={{
          flexGrow: 1
        }}>
          <Logo size={open ? 80 : 1} />
        </Box>
        <IconButton
          onClick={() => setOpen(!open)}
          color={"inherit"}>
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Toolbar>
      <Divider />
      <MenuList>
        <MenuItem component={Link} to={"/"} onClick={() => {setOpen(!open)}}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText sx={{
            marginLeft: '10px',
          }} primary={"Overview"} />
        </MenuItem>
        {is("account").enabled() && (
          <MenuItem component={Link} to={"/account"} onClick={() => {setOpen(!open)}}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText sx={{
              marginLeft: '10px',
            }} primary={"Account"} />
          </MenuItem>
        )}
        {is("flags").enabled() && (
          <MenuItem component={Link} to={"/flags"} onClick={() => {setOpen(!open)}}>
            <ListItemIcon>
              <OutlinedFlagIcon />
            </ListItemIcon>
            <ListItemText sx={{
              marginLeft: '10px',
            }} primary={"Flags"} />
          </MenuItem>
        )}
        <Divider />
      </MenuList>
    </Drawer>
  )
}

export default Sidebar;
