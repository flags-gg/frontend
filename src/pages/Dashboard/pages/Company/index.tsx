import {FC} from "react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import {Divider, Grid, Stack, Typography} from "@mui/material";

import {stripeConfig} from "@/app.config.tsx";
import {Info} from "@DP/Company/Info.tsx";
import {Users} from "@DP/Company/Users";
import {Settings} from "@DP/Company/Settings"

export const Company: FC = () => {
  const stripePromise = loadStripe(stripeConfig.stripe)

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Company</Typography>
      <Elements stripe={stripePromise}>
        <Grid container spacing={3}>
          <Grid lg={4} md={6} xs={12} item={true}>
            <Info />
          </Grid>
          <Grid lg={7} md={6} xs={12} item={true}>
            <Settings />
            <Divider />
            <Users />
          </Grid>
        </Grid>
      </Elements>
    </Stack>
  );
}
