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
  useEffect
} from "react";
import {
  Dashboard,
  Store,
  ChevronLeft,
  Settings,
  OutlinedFlag,
  Menu,
  AndroidOutlined
} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useFlags} from "@flags-gg/react-library";
import {useAtom} from "jotai";

import Logo from "@C/Logo";
import {
  agentIdAtom,
  projectAtom
} from "@DL/statemanager";

interface SidebarProps {
  open: boolean
  setOpen: Dispatch<boolean>
}

const Sidebar: FC<SidebarProps> = ({open, setOpen}) => {
  const {is} = useFlags()
  const [agentId] = useAtom(agentIdAtom)
  const [selectedProject] = useAtom(projectAtom)
  const projectId = selectedProject?.id

  useEffect(() => {
    is("account").initialize()
    is("agent").initialize()
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
              <Settings />
            </ListItemIcon>
            <ListItemText sx={{
              marginLeft: '10px',
            }} primary={"Projects"} />
          </MenuItem>
        )}
        {projectId && is("agent").enabled() && (
            <MenuItem component={Link} to={"/agent"} onClick={() => {setOpen(!open)}}>
              <ListItemIcon>
                <AndroidOutlined />
              </ListItemIcon>
              <ListItemText sx={{
                marginLeft: '10px',
              }} primary={"Agent"} />
            </MenuItem>
          )
        }
        {agentId && is("flags").enabled() && (
          <MenuItem component={Link} to={`/agent/${agentId}/flags`} onClick={() => {setOpen(!open)}}>
            <ListItemIcon>
              <OutlinedFlag />
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
