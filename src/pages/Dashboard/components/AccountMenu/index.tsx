import {Avatar, Box, Divider, ListItemIcon, ListItemText, MenuItem, MenuList, Popover, Typography} from "@mui/material";
import {AccountCircleOutlined} from "@mui/icons-material";
import {FC, useEffect} from "react";
import {useAuth} from "react-oidc-context";
import {Link, useNavigate} from "react-router-dom";
import {User, SignOut, GearSix} from '@phosphor-icons/react'

import {usePopover} from "@DL/popover";
import {useFlags} from "@flags-gg/react-library";
import useAuthFetch from "@DL/fetcher";

interface UserPopoverInterface {
  anchorEl: HTMLDivElement | null
  onClose: () => void
  open: boolean
}
const UserPopover: FC<UserPopoverInterface> = ({anchorEl, onClose, open}) => {
  const {user} = useAuth()
  const auth = useAuth()
  const navigate = useNavigate()
  const {is} = useFlags()
  const authFetch = useAuthFetch()

  useEffect(() => {
    authFetch("/user", {
      method: "POST",
      body: JSON.stringify({
        subject: user?.profile.sub,
      }),
    }).catch(console.error)
  }, [is])

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom"
      }}
      onClose={onClose}
      open={open}
      slotProps={{
        paper: {
          sx: {
            width: '240px'
          }
        }
      }}>
      <Box sx={{ p: '16px 20px'}}>
        <Typography variant={"subtitle1"}>{user?.profile.name}</Typography>
        <Typography variant={"body2"} color={"text.secondary"}>{user?.profile.email}</Typography>
        <Divider />
        <MenuList
          disablePadding
          sx={{
            p: '8px',
            '& .MuiMenuItem-root': {
              borderRadius: 1
            }
          }}>
          {is("userSettings").enabled() && (
            <MenuItem component={Link} to={"/user/settings"} onMouseDown={onClose}>
              <ListItemIcon>
                <GearSix fontSize={"small"} />
              </ListItemIcon>
              <ListItemText primary={"Settings"} />
            </MenuItem>
          )}
          <MenuItem component={Link} to={"/user/account"} onMouseDown={onClose}>
            <ListItemIcon>
              <User fontSize={"small"} />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </MenuItem>
          <MenuItem onMouseDown={() => {
              auth.signoutSilent().catch(console.error)
              navigate("/")
            }}>
            <ListItemIcon>
              <SignOut fontSize={"small"} />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </MenuItem>
        </MenuList>
      </Box>
    </Popover>
  )
}

const AccountMenu: FC = () => {
  const userPopover = usePopover<HTMLDivElement>()

  return (
    <>
      <Avatar
        color={"inherit"}
        onClick={userPopover.handleOpen}
        ref={userPopover.anchorRef}
        sx={{
          cursor: "pointer",
          color: "inherit",
          backgroundColor: "transparent",
        }}
        children={<AccountCircleOutlined sx={{
          cursor: "pointer",
          width: '32px',
          height: '32px',
        }}/>}/>
      <UserPopover
        anchorEl={userPopover.anchorRef.current}
        onClose={userPopover.handleClose}
        open={userPopover.open} />
    </>
  )
}

export default AccountMenu
