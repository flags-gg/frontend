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
  Apps, BubbleChart, ScatterPlot, Schema
} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useFlags} from "@flags-gg/react-library";
import {useAtom} from "jotai";

import Logo from "@C/Logo";
import {projectAtom, agentAtom, environmentAtom} from "@DL/statemanager";

interface SidebarProps {
  open: boolean
  setOpen: Dispatch<boolean>
}

const Sidebar: FC<SidebarProps> = ({open, setOpen}) => {
  const {is} = useFlags()
  const [selectedProject] = useAtom(projectAtom)
  const [selectedAgent] = useAtom(agentAtom)
  const [selectedEnvironment] = useAtom(environmentAtom)

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
          <MenuItem component={Link} to={`/projects/${selectedProject?.project_id}/${selectedAgent?.agent_id}`} onClick={() => {setOpen(!open)}}>
            <ListItemIcon>
              <ScatterPlot />
            </ListItemIcon>
            <ListItemText sx={{
              marginLeft: '10px',
            }} primary={"Agent Info"} />
          </MenuItem>
        )}
        {selectedEnvironment?.environment_id && is("environment").enabled() && (
          <MenuItem component={Link} to={`/projects/${selectedProject?.project_id}/${selectedAgent?.agent_id}/${selectedEnvironment?.environment_id}`} onClick={() => {setOpen(!open)}}>
            <ListItemIcon>
              <Schema />
            </ListItemIcon>
            <ListItemText sx={{
              marginLeft: '10px',
            }} primary={"Environment Info"} />
          </MenuItem>
        )}
      </MenuList>
    </Drawer>
  )
}

export default Sidebar;
