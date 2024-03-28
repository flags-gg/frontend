import {FC} from "react";
import {Grid} from "@mui/material";
import Requests from "@DC/Requests";

const Summary: FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid lg={8} xs={12}>
        <Requests />
      </Grid>
    </Grid>
  )
}

export default Summary;
