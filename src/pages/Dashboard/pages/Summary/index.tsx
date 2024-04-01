import {FC} from "react";
import {Grid} from "@mui/material";
import {PerAgent, TotalRequests} from "@DC/Requests";

const Summary: FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid item lg={6} xs={12}>
        <PerAgent />
      </Grid>
      <Grid item lg={6} xs={12}>
        <TotalRequests />
      </Grid>
    </Grid>
  )
}

export default Summary;
