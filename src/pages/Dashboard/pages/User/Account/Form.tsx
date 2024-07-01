import {FC, useEffect, useState} from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  CardActions,
  Button, TextField, Select, MenuItem, CircularProgress
} from "@mui/material";
import ct from "countries-and-timezones";

import useAuthFetch from "@DL/fetcher";


export const Form: FC = () => {
  const authFetch = useAuthFetch();
  const [userDetails, setUserDetails] = useState({
    known_as: "",
    email_address: "",
    first_name: "",
    last_name: "",
    timezone: "",
    country: ""
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const timezones = ct.getAllTimezones();
  const sortedTimezones = Object.values(timezones).sort((a, b) => a.name.localeCompare(b.name));

  const fetchUserDetails = async () => {
    try {
      const response = await authFetch(`/user`);
      const data = await response.json();
      setUserDetails(data);
      setIsLoading(false);
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
      const formData = new FormData(event.target as HTMLFormElement)
      event.preventDefault()

      updateDetails({
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        timezone: formData.get("timezone") as string,
        knownAs: formData.get("knownAs") as string,
        emailAddress: formData.get("emailAddress") as string
      }).catch(error => console.error("Failed to update user details:", error))
    }}>
      <Card sx={{
        p: 3
      }}>
        {isLoading ? <CircularProgress /> : (
          <>
            <CardHeader subheader={"The information can be edited"} title={"Profile"}/>
            <Divider />
            <CardContent sx={{
              p: 5,
            }}>
              <Grid container spacing={1}>
                <Grid md={6} xs={12} item={true}>
                  <FormControl fullWidth required>
                    <TextField variant={"outlined"}  label={"First Name"} margin={"dense"} required id={"first_name"} name={"first_name"} value={userDetails?.first_name} />
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12} item={true}>
                  <FormControl fullWidth required>
                    <TextField variant={"outlined"}  label={"Last Name"} margin={"dense"} required id={"last_name"} name={"last_name"} value={userDetails?.last_name} />
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12} item={true}>
                  <FormControl fullWidth required>
                    <TextField variant={"outlined"}  label={"Known As"} margin={"dense"} required id={"knownAs"} name={"knownAs"} value={userDetails?.known_as} />
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12} item={true}>
                  <FormControl fullWidth required>
                    <TextField variant={"outlined"} label={"Email"} margin={"dense"} required id={"emailAddress"} name={"emailAddress"} value={userDetails?.email_address} type={"email"} />
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12} item={true}>
                  <FormControl fullWidth required>
                    <Select variant={"outlined"} label={"Timezone"} margin={"dense"} required id={"timezone"} name={"timezone"} value={"Europe/London"}>
                      {sortedTimezones.map((timezone) => (
                        <MenuItem key={`zone-${timezone.name}`} value={timezone.name}>{timezone.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button color={"primary"} variant={"contained"} type={"submit"}>Save details</Button>
            </CardActions>
          </>
        )}
      </Card>
    </form>
  )
}
