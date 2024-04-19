import {FC} from "react";
import {Grid} from "@mui/material";
import {useFlags} from "@flags-gg/react-library";
import {PerAgent, TotalRequests} from "@DC/Requests";

const Summary: FC = () => {
  const {is} = useFlags();
  return (
    <Grid container spacing={3}>
      {is("perAgent").enabled() && (
        <Grid item lg={6} xs={12}>
          <PerAgent />
        </Grid>
      )}
      {is("totalRequests").enabled() && (
        <Grid item lg={6} xs={12}>
          <TotalRequests />
        </Grid>
      )}
    </Grid>
  )
}

export default Summary;
