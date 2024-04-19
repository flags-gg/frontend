import {FC} from "react";
import {
  Stack,
  Typography,
  Grid
} from "@mui/material";
import {AccountInfo} from "./AccountInfo";
import {AccountForm} from "./AccountForm"

const UserAccount: FC = () => {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant={"h4"}>User Account</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid lg={2} md={6} xs={12} item={true}>
          <AccountInfo />
        </Grid>
        <Grid lg={10} md={6} xs={12} item={true}>
          <AccountForm />
        </Grid>
      </Grid>
    </Stack>
  )
}

export default UserAccount;
