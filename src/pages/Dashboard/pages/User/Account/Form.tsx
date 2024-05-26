import {FC, useEffect, useState} from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  CardActions,
  Button, TextField
} from "@mui/material";
import useAuthFetch from "@DL/fetcher";

export const Form: FC = () => {
  const authFetch = useAuthFetch();
  const [userDetails, setUserDetails] = useState({
    knownAs: "",
    emailAddress: ""
  });

  const fetchUserDetails = async () => {
    try {
      const response = await authFetch(`/user`);
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };
  useEffect(() => {
    fetchUserDetails().catch(error => console.error("Failed to fetch user details:", error));
  }, []);

  const updateDetails = async (details: any) => {
    try {
      const response = await authFetch(`/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(details)
      });
      if (response.status !== 200) {
        console.error("Failed to update user details, received status:", response.status);
        return;
      }
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error("Failed to update user details:", error);
    }
  }

  return (
    <form onSubmit={(event) => {
      const formTarget = event.target as HTMLFormElement
      const formData = new FormData(formTarget)
      event.preventDefault()

      updateDetails({
        knownAs: formData.get("knownAs") as string,
        emailAddress: formData.get("emailAddress") as string
      }).catch(error => console.error("Failed to update user details:", error))
    }}>
      <Card sx={{
        p: 3
      }}>
        <CardHeader subheader={"The information can be edited"} title={"Profile"}/>
        <Divider />
        <CardContent sx={{
          p: 5,
        }}>
          <Grid container spacing={1}>
            <Grid md={6} xs={12} sx={{
              paddingRight: 2
            }} item={true}>
              <FormControl fullWidth required>
                <TextField variant={"outlined"}  label={"Known As"} margin={"dense"} required id={"knownAs"} name={"knownAs"} value={userDetails?.knownAs} />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12} item={true}>
              <FormControl fullWidth required>
                <TextField variant={"outlined"} label={"Email"} margin={"dense"} required id={"emailAddress"} name={"emailAddress"} value={userDetails?.emailAddress} type={"email"} />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button color={"primary"} variant={"contained"} type={"submit"}>Save details</Button>
        </CardActions>
      </Card>
    </form>
  )
}
