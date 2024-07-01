import {FC, useState} from "react";
import {
  Avatar, Button,
  Card,
  CardContent,
  CircularProgress, Dialog,
  Stack,
  Table,
  TableBody, TableCell,
  TableRow,
  Typography
} from "@mui/material";

const company = {
  name: "ChewedFeed",
  avatar: "https://avatars.githubusercontent.com/u/200350?v=4",
  timezone: "GMT",
  currentPlan: "Free",
}

export const Info: FC = () => {
  const [avatarURL, setAvatarURL] = useState<string>(company.avatar);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showPlanDialog, setShowPlanDialog] = useState<boolean>(false);

  return (
    <Card>
      <CardContent>
        {isLoading ? <CircularProgress /> : (
          <Stack spacing={2} sx={{ alignItems: "center" }}>
            <Typography variant={"h5"}>{company.name}</Typography>
            <Avatar
              src={avatarURL}
              sx={{ height: '80px', width: '80px', cursor: 'pointer' }}
            />
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Timezone</TableCell>
                  <TableCell>{company.timezone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Current Plan</TableCell>
                  <TableCell>
                    <Button variant={"contained"} size={"small"} onClick={() => setShowPlanDialog(true)}>{company.currentPlan}</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Button variant={"contained"} color={"primary"} fullWidth onClick={() => setShowEdit(true)}>Edit</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Stack>
        )}
      </CardContent>

      <Dialog open={showPlanDialog} onClose={() => setShowPlanDialog(false)}>
        Plan Details
      </Dialog>

      <Dialog open={showEdit} onClose={() => setShowEdit(false)}>
        Edit Company
      </Dialog>
    </Card>
  )
}
