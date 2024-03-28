import {Avatar, Box, Divider, ListItemIcon, ListItemText, MenuItem, MenuList, Popover, Typography} from "@mui/material";
import {AccountCircleOutlined} from "@mui/icons-material";
import {FC} from "react";
import {usePopover} from "@DL/popover";
import {useAuth} from "react-oidc-context";
import {Link} from "react-router-dom";
import {User, SignOut, GearSix} from '@phosphor-icons/react'

interface UserPopoverInterface {
  anchorEl: HTMLDivElement | null
  onClose: () => void
  open: boolean
}
const UserPopover: FC<UserPopoverInterface> = ({anchorEl, onClose, open}) => {
  const {user} = useAuth()
  const auth = useAuth()

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
          <MenuItem component={Link} to={"/settings"} onClick={onClose}>
            <ListItemIcon>
              <GearSix fontSize={"small"} />
            </ListItemIcon>
            <ListItemText primary={"Settings"} />
          </MenuItem>
          <MenuItem component={Link} to={"/useraccount"} onClick={onClose}>
            <ListItemIcon>
              <User fontSize={"small"} />
            </ListItemIcon>
            <ListItemText primary={"Account"} />
          </MenuItem>
          <MenuItem onClick={() => {
              auth.signoutSilent().catch(console.error)
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
