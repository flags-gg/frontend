import {FC, useEffect, useState} from "react";
import {
  Card,
  CardContent,
  Avatar,
  Stack,
  CircularProgress, Table, TableBody, TableRow, TableCell
} from "@mui/material";

import useAuthFetch from "@DL/fetcher";
import {CustomUploadButton} from "@DC/UploadThing";
import {useAuth} from "react-oidc-context";
import {useFlags} from "@flags-gg/react-library";

interface User {
  job_title: string;
  avatar: string;
}

export const Info: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const authFetch = useAuthFetch();
  const auth = useAuth();
  const {is} = useFlags()
  const [user, setUser] = useState<User>({
    job_title: "",
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
                  <TableCell>Job Title</TableCell>
                  <TableCell>{user.job_title}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            {is("imageUpload").enabled() && (
              <CustomUploadButton
                onClientUploadComplete={(res) => console.info("upload complete", res)}
                onUploadError={(err) => console.error("upload error", err)}
                onBeforeUploadBegin={(files) => {return files.map((f) => new File([f], auth.user?.profile.sub + "-" + f.name, {type: f.type}))}} />
            )}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};
