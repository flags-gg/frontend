import {FC} from "react";
import {
  Card,
  CardContent,
  Avatar,
  Stack,
  Typography,
  Divider
} from "@mui/material";

const user = {
  name: "Keloran",
  avatar: "https://avatars.githubusercontent.com/u/200350?v=4",
  jobTitle: "Software Engineer",
  country: "UK",
  city: "Manchester",
  timezone: "GMT"
}

export const Info: FC = () => {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{alignItems: "center"}}>
          <div>
            <Avatar src={user.avatar} sx={{
              height: '80px',
              width: '80px'
            }} />
          </div>
          <Stack spacing={1} sx={{ textAlign: "center" }}>
            <Typography variant={"h5"}>{user.name}</Typography>
            <Typography variant={"body2"} color={"text.secondary"}>
              {user.city} {user.country}
            </Typography>
            <Typography variant={"body2"} color={"text.secondary"}>
              {user.timezone}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
    </Card>
  )
}
