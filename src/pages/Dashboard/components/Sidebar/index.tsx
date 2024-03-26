import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  ListItemText,
  IconButton
} from "@mui/material";
import {Dispatch, FC, Fragment} from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";

interface SidebarProps {
  open: boolean
  setOpen: Dispatch<boolean>
}

const Sidebar: FC<SidebarProps> = ({open, setOpen}) => {
  console.log("sidebar open", open)

  return (
    <Drawer
      variant={"permanent"}
      sx={{
        width: '240px',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '240px',
          boxSizing: 'border-box',
          ...(!open && {
            overflowX: 'hidden',
            width: '72px',
          }),
        },
      }}>
      <Toolbar sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1]}}>
        <IconButton
          onClick={() => setOpen(!open)}
          color={"inherit"}>
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Toolbar>
      <Divider />
      <List component={"nav"}>
        <Fragment>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItemButton>
        </Fragment>
        <Divider sx={{ my: 1 }} />
      </List>
    </Drawer>
  )
}

export default Sidebar;
