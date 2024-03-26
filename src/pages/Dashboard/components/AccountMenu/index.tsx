import {IconButton} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {FC} from "react";

const AccountMenu: FC = () => {
  return (
    <IconButton color={"inherit"}>
      <AccountCircle />
    </IconButton>
  )
}

export default AccountMenu
