import NotificationsIcon from "@mui/icons-material/Notifications";
import {Badge, IconButton} from "@mui/material";
import {FC} from "react";

const Notifications: FC = () => {
  return (
    <IconButton color={"inherit"}>
      <Badge badgeContent={4} color={"secondary"}>
        <NotificationsIcon />
      </Badge>
    </IconButton>
  )
}

export default Notifications;
