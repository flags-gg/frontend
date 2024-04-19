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

export const AccountForm: FC = () => {
  return (
    <form onSubmit={(event) => {
      event.preventDefault()
    }}>
      <Card>
        <CardHeader subheader={"The information can be edited"} title={"Profile"}/>
        <Divider/>
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>First Name</InputLabel>
                <OutlinedInput label={"Bob"} margin={"dense"} required/>
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Last Name</InputLabel>
                <OutlinedInput label={"Bobbington"} margin={"dense"} required/>
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Email</InputLabel>
                <OutlinedInput label={"Email"} margin={"dense"} required/>
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
