import {FC} from "react";
import {
  Stack,
  Typography,
  Grid
} from "@mui/material";
import {Info} from "./Info.tsx";
import {Form} from "./Form.tsx"

export const Account: FC = () => {
  return (
    <Stack spacing={3}>
      <Typography variant={"h4"}>User Account</Typography>
      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12} item={true}>
          <Info />
        </Grid>
        <Grid lg={7} md={6} xs={12} item={true}>
          <Form />
        </Grid>
      </Grid>
    </Stack>
  )
}
