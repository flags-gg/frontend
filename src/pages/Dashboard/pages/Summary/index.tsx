import {FC} from "react";
import {Grid} from "@mui/material";
import Requests from "@DC/Requests";

const Summary: FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid lg={8} xs={12}>
        <Requests
          chartSeries={
            [
              {
                name: 'Requests',
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
              },
              {
                name: 'Errors',
                data: [10, 20, 15, 25, 20, 30, 25, 35, 30]
              }
            ]
          }
          sx={{
            height: '100%'
          }} />
      </Grid>
    </Grid>
  )
}

export default Summary;
