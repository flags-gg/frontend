import {useState} from "react";
import {Avatar, Card, CardContent, Stack, Typography} from "@mui/material";

const company = {
  name: "ChewedFeed",
  avatar: "https://avatars.githubusercontent.com/u/200350?v=4",
  timezone: "GMT",
  currentPlan: "Free",
}

export const Info: FC = () => {
  const [avatarURL, setAvatarURL] = useState<string>(company.avatar);

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <Avatar
            src={avatarURL}
            sx={{ height: '80px', width: '80px', cursor: 'pointer' }}
          />
          <Stack spacing={1} sx={{ textAlign: "center" }}>
            <Typography variant={"h5"}>{company.name}</Typography>
            <Typography variant={"body2"} color={"text.secondary"}>
              {company.timezone}
            </Typography>
            <Typography variant={"body2"} color={"text.secondary"}>
              {company.currentPlan}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
