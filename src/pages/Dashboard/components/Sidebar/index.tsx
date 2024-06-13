import {
  Divider,
  Drawer,
  ListItemIcon,
  Toolbar,
  ListItemText,
  IconButton,
  Box,
  MenuItem,
  MenuList
} from "@mui/material";
import {
  Dispatch,
  FC,
} from "react";
import {
  Dashboard,
  Store,
  ChevronLeft,
  Menu,
  Apps, BubbleChart, ScatterPlot, Schema, Widgets, LocationCity
} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useFlags} from "@flags-gg/react-library";
import {useAtom} from "jotai";

import Logo from "@C/Logo";
import {projectAtom, agentAtom, environmentAtom, menuAtom} from "@DL/statemanager";

interface SidebarProps {
  open: boolean
  setOpen: Dispatch<boolean>
}

const Sidebar: FC<SidebarProps> = ({open, setOpen}) => {
  const {is} = useFlags()
  const [selectedProject] = useAtom(projectAtom)
  const [selectedAgent] = useAtom(agentAtom)
  const [selectedEnvironment] = useAtom(environmentAtom)
  const [selectedMenu] = useAtom(menuAtom)

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
        <IconButton onClick={() => setOpen(!open)} color={"inherit"}>
          {open ? <ChevronLeft /> : <Menu />}
        </IconButton>
      </Toolbar>
      <Divider />
      <MenuList variant={"menu"}>
        <MenuItem component={Link} to={"/"} onClick={() => {setOpen(!open)}}>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText sx={{
            marginLeft: '10px',
          }} primary={"Overview"} />
        </MenuItem>
        {is("company").enabled() && (
          <MenuItem component={Link} to={"/company"} onClick={() => {setOpen(!open)}}>
            <ListItemIcon>
              <LocationCity />
            </ListItemIcon>
            <ListItemText sx={{
              marginLeft: '10px',
            }} primary={"Company"} />
          </MenuItem>
        )}
        {is("account").enabled() && (
          <MenuItem component={Link} to={"/company/account"} onClick={() => {setOpen(!open)}}>
            <ListItemIcon>
              <Store />
            </ListItemIcon>
            <ListItemText sx={{
              marginLeft: '10px',
            }} primary={"Account"} />
          </MenuItem>
        )}
        {is("projects").enabled() && (
          <MenuItem component={Link} to={"/projects"} onClick={() => {setOpen(!open)}}>
            <ListItemIcon>
              <Apps />
            </ListItemIcon>
            <ListItemText sx={{
              marginLeft: '10px',
            }} primary={"Projects"} />
          </MenuItem>
        )}
        {selectedProject?.project_id && is("projects").enabled() && (
          <MenuItem component={Link} to={`/projects/${selectedProject?.project_id}`} onClick={() => {setOpen(!open)}}>
            <ListItemIcon>
              <BubbleChart />
            </ListItemIcon>
            <ListItemText sx={{
              marginLeft: '10px',
            }} primary={"Project Info"} />
          </MenuItem>
        )}
        {selectedAgent?.agent_id && is("agent").enabled() && (
          <MenuItem component={Link} to={`/agents/${selectedAgent?.agent_id}`} onClick={() => {setOpen(!open)}}>
            <ListItemIcon>
              <ScatterPlot />
            </ListItemIcon>
            <ListItemText sx={{
              marginLeft: '10px',
            }} primary={"Agent Info"} />
          </MenuItem>
        )}
        {selectedEnvironment?.environment_id && is("environment").enabled() && (
          <MenuItem component={Link} to={`/environments/${selectedEnvironment?.environment_id}`} onClick={() => {setOpen(!open)}}>
            <ListItemIcon>
              <Schema />
            </ListItemIcon>
            <ListItemText sx={{
              marginLeft: '10px',
            }} primary={"Environment Info"} />
          </MenuItem>
        )}
        {selectedMenu?.menu_id && is("secret menu").enabled() && (
          <MenuItem component={Link} to={`/secretmenu/${selectedMenu?.menu_id}`} onClick={() => {setOpen(!open)}}>
            <ListItemIcon>
              <Widgets />
            </ListItemIcon>
            <ListItemText sx={{
              marginLeft: '10px',
            }} primary={"Menu Info"} />
          </MenuItem>
        )}
      </MenuList>
    </Drawer>
  )
}

export default Sidebar;
