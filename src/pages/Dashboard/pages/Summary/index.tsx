import {FC} from "react";
import {Grid} from "@mui/material";
import {PerAgent, TotalRequests} from "@DC/Requests";
import {useFlags} from "../../../../lib/flags";

const Summary: FC = () => {
  const flags = useFlags();
  return (
    <Grid container spacing={3}>
      {flags.is("perAgent").enabled() && (
        <Grid item lg={6} xs={12}>
          <PerAgent />
        </Grid>
      )}
      {flags.is("totalRequests").enabled() && (
        <Grid item lg={6} xs={12}>
          <TotalRequests />
        </Grid>
      )}
    </Grid>
  )
}

export default Summary;
