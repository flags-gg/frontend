import {Avatar, Badge, Box, Divider, IconButton, Popover, Typography} from "@mui/material";
import {FC, useEffect, useState} from "react";
import {Delete, NotificationsOutlined} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

import {usePopover} from "@DL/popover";
import useAuthFetch from "@DL/fetcher";

interface Notification {
  id: number
  subject: string
  content: string
  read: boolean
  action?: string
}

interface NotificationsPopoverInterface {
  anchorEl: HTMLDivElement | null
  onClose: () => void
  open: boolean
  notifications: Notification[]
  setNotifications: (notifications: (prevNotifications: Notification[]) => Notification[]) => void
  setUnreadNotifications: (unreadNotifications: number) => void
}
const NotificationsPopover: FC<NotificationsPopoverInterface> = ({anchorEl, onClose, open, notifications, setNotifications, setUnreadNotifications}) => {
  const navigate = useNavigate()
  const authFetch = useAuthFetch()

  const clickNotification = (notification: Notification) => {
    markAsRead(notification)

    if (notification.action) {
      if (notification.action.startsWith("goto:")) {
        navigate(notification.action.replace("goto:", ""))
        return
      }
      console.info("Unknown action", notification.action)
    }
  }

  const deleteNotification = (notification: Notification) => {
    authFetch(`/user/notification/${notification.id}`, {
      method: "DELETE",
    }).then(() => {
      setNotifications((prevNotifications: Notification[]) => {
        const updatedNotifications = prevNotifications.filter(n => n.id !== notification.id);
        setUnreadNotifications(updatedNotifications.filter(n => !n.read).length);
        return updatedNotifications;
      });
    }).catch(console.error)
  }

  const markAsRead = (notification: Notification) => {
    authFetch(`/user/notification/${notification.id}`, {
      method: "PATCH",
    }).then(() => {
      setNotifications((prevNotifications: Notification[]) => {
        const updatedNotifications = prevNotifications.map(n =>
            n.id === notification.id ? { ...n, read: true } : n
        );
        setUnreadNotifications(updatedNotifications.filter(n => !n.read).length);
        return updatedNotifications;
      });
    }).catch(console.error)
  }

  if (!notifications || notifications.length === 0) {
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
          <Box sx={{ p: '8px'}}>
            <Typography variant={"body2"} color={"text.secondary"}>No notifications</Typography>
          </Box>
        </Box>
      </Popover>
    )
  }

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
            sx={{
              p: '8px',
              cursor: "pointer",
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              },
              display: 'flex',
            }}>
            <Box sx={{
              width: '75%',
            }}>
              <Typography variant={"subtitle2"} onClick={() => clickNotification(notification)}>{notification.subject}</Typography>
              <Typography variant={"body2"} color={"text.secondary"} onClick={() => clickNotification(notification)}>{notification.content}</Typography>
            </Box>
            <Box sx={{
              width: '10%',
            }}>
              <IconButton onClick={() => deleteNotification(notification)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </Popover>
  )

}

const Notifications: FC = () => {
  const authFetch = useAuthFetch()
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(0);
  const notificationsPopover = usePopover<HTMLDivElement>()
  const fetchNotifications = async () => {
    try {
      const response = await authFetch("/user/notifications")
      const data = await response.json()
      return data.notifications
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchNotifications().then(setNotifications).catch(console.error)
    const interval = setInterval(fetchNotifications, 60000)
    return () => clearInterval(interval)
  }, [])
  useEffect(() => {
    if (!notifications || notifications.length === 0) {
      return
    }
    setUnreadNotifications(notifications.filter(notification => !notification.read).length)
  }, [notifications])

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
        onMouseDown={notificationsPopover.handleOpen}
        ref={notificationsPopover.anchorRef}
      >
        <Badge
          badgeContent={unreadNotifications}
          color={"secondary"}>
          <NotificationsOutlined />
        </Badge>
      </Avatar>
      <NotificationsPopover
        anchorEl={notificationsPopover.anchorRef.current}
        onClose={notificationsPopover.handleClose}
        open={notificationsPopover.open}
        notifications={notifications}
        setNotifications={setNotifications}
        setUnreadNotifications={setUnreadNotifications} />
    </>
  )
}

export default Notifications;
