import {FC} from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  OutlinedInput,
  InputLabel,
  CardActions,
  Button
} from "@mui/material";

export const Form: FC = () => {
  return (
    <form onSubmit={(event) => {
      event.preventDefault()

      console.info("event", event)
    }}>
      <Card>
        <CardHeader subheader={"The information can be edited"} title={"Profile"}/>
        <Divider/>
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel htmlFor={"knownAs"}>Known As</InputLabel>
                <OutlinedInput label={"Bob"} margin={"dense"} required id={"knownAs"} />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel htmlFor={"emailAddress"}>Email</InputLabel>
                <OutlinedInput label={"Email"} margin={"dense"} required id={"emailAddress"}/>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button color={"primary"} variant={"contained"}>Save details</Button>
        </CardActions>
      </Card>
    </form>
  )
}
