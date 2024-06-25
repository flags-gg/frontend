import {FC, useEffect, useState} from "react";
import {
  Card,
  CardContent,
  Avatar,
  Stack,
  CircularProgress, Table, TableBody, TableRow, TableCell
} from "@mui/material";

import useAuthFetch from "@DL/fetcher";

interface User {
  known_as: string;
  jobTitle: string;
  timezone: string;
  avatar: string;
}

export const Info: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const authFetch = useAuthFetch();
  const [user, setUser] = useState<User>({
    known_as: "",
    jobTitle: "",
    timezone: "",
    avatar: ""
  });

  const fetchUserDetails = async () => {
    try {
      const response = await authFetch(`/user`);
      const data = await response.json();
      setUser(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  }
  useEffect(() => {
    fetchUserDetails().catch(error => console.error("Failed to fetch user details:", error));
  }, []);

  return (
    <Card>
      <CardContent>
        {isLoading ? <CircularProgress /> : (
          <Stack spacing={2} sx={{ alignItems: "center" }}>
            <Avatar
              src={user.avatar}
              sx={{ height: '80px', width: '80px', cursor: 'pointer' }}
            />
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Known As</TableCell>
                  <TableCell>{user.known_as}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Job Title</TableCell>
                  <TableCell>{user.jobTitle}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Timezone</TableCell>
                  <TableCell>{user.timezone}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};
