import {Avatar, Badge, Box, Divider, Popover, Typography} from "@mui/material";
import {FC, useEffect, useMemo, useState} from "react";
import {usePopover} from "@DL/popover";
import {NotificationsOutlined} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

interface Notification {
  id: number
  title: string
  description: string
  read: boolean
  link?: string
}

interface NotificationsPopoverInterface {
  anchorEl: HTMLDivElement | null
  onClose: () => void
  open: boolean
  notifications: Notification[]
  setNotifications: (notifications: Notification[]) => void
}
const NotificationsPopover: FC<NotificationsPopoverInterface> = ({anchorEl, onClose, open, notifications, setNotifications}) => {
  const navigate = useNavigate()

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
        <Typography variant={"subtitle1"}>Notifications</Typography>
        <Divider />
        {notifications.map(notification => (
          <Box
            key={notification.id}
            onClick={() => {
              setNotifications(notifications.map(n => n.id === notification.id ? {...n, read: true} : n))
              if (notification.link) {
                navigate(notification.link)
              }
            }}
            sx={{
              p: '8px',
              cursor: "pointer",
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}>
            <Typography variant={"subtitle2"}>{notification.title}</Typography>
            <Typography variant={"body2"} color={"text.secondary"}>{notification.description}</Typography>
          </Box>
        ))}
      </Box>
    </Popover>
  )

}

const Notifications: FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const notificationsPopover = usePopover<HTMLDivElement>()
  const fetchNotifications = async () => {
    return [
      {
        id: 1,
        title: "New message",
        description: "You have a new message from John Doe",
        read: false
      },
      {
        id: 2,
        title: "New order",
        description: "You have a new order from Jane Doe",
        read: false,
        link: "/settings"
      }
    ]
  }
  useEffect(() => {
    fetchNotifications().then(setNotifications)
  }, [])
  const unreadNotifications = useMemo(() => notifications.filter(notification => !notification.read).length, [notifications]);

  return (
    <>
      <Avatar
        color={"inherit"}
        sx={{
          color: "inherit",
          backgroundColor: "transparent",
          height: '50px',
          width: '50px',
          borderRadius: 0,
          cursor: "pointer",
        }}
        onClick={notificationsPopover.handleOpen}
        ref={notificationsPopover.anchorRef}
        children={<Badge
          badgeContent={unreadNotifications}
          color={"secondary"}>
          <NotificationsOutlined />
      </Badge>} />
      <NotificationsPopover
        anchorEl={notificationsPopover.anchorRef.current}
        onClose={notificationsPopover.handleClose}
        open={notificationsPopover.open}
        notifications={notifications}
        setNotifications={setNotifications} />
    </>
  )
}

export default Notifications;
