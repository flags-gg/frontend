import {
  Divider,
  Drawer,
  ListItemIcon,
  Toolbar,
  ListItemText,
  IconButton, Box, MenuItem, MenuList
} from "@mui/material";
import {Dispatch, FC} from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "@C/Logo";
import {Link} from "react-router-dom";

interface SidebarProps {
  open: boolean
  setOpen: Dispatch<boolean>
}

const Sidebar: FC<SidebarProps> = ({open, setOpen}) => {
  return (
    <Drawer
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
        <MenuItem component={Link} to={"/account"} onClick={() => {setOpen(!open)}}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText sx={{
            marginLeft: '10px',
          }} primary={"Account"} />
        </MenuItem>
        <Divider />
      </MenuList>
    </Drawer>
  )
}

export default Sidebar;
