import {FC, useEffect, useState} from "react";
import {useAtom} from "jotai";
import {
  Card,
  CardContent, CircularProgress,
  Grid,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from "@mui/material";
import {Link} from "react-router-dom";

import {environmentAtom, agentAtom, projectAtom, secretMenu, menuAtom} from "@DL/statemanager";
import {CodeList} from "@DP/Secretmenu/CodeList";
import useAuthFetch from "@DL/fetcher";

export const SecretMenu: FC = () => {
  const [selectedEnvironment] = useAtom(environmentAtom)
  const [selectedAgent] = useAtom(agentAtom)
  const [selectedProject] = useAtom(projectAtom)
  const [, setSelectedMenu] = useAtom(menuAtom)
  const [menuData, setMenuData] = useState<secretMenu | null>(null);
  const authFetch = useAuthFetch();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleDisable = async () => {
    setIsSubmitting(true);
    try {
      if (!menuData) {
        return;
      }
      menuData.enabled = !menuData.enabled;
      await authFetch(`/secret-menu/${menuData?.menu_id}`, {
        method: 'PUT',
        body: JSON.stringify(menuData)
      });
      setSelectedMenu(menuData);
    } catch (error) {
      console.error("Failed to update secret menu:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const fetchMenu = async () => {
    try {
      const response = await authFetch(`/secret-menu/${selectedEnvironment.environment_id}`);
      if (response.status === 404) {
        return;
      }
      const data = await response.json();
      setMenuData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    }
  }

  useEffect(() => {
    fetchMenu().catch(error => console.error("Failed to fetch menu:", error));
  }, [])

  return (
    <Stack spacing={3}>
      <Typography variant={"h4"}>Secret Menu</Typography>
      <Grid container spacing={4}>
        <Grid item={true} lg={4} md={6} xs={12}>
          <Card>
            <CardContent>
              <Stack spacing={2} sx={{alignItems: "center"}}>
                {isLoading ? <CircularProgress /> : (
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Owner Project</TableCell>
                        <TableCell><Link to={`/projects/${selectedProject.project_id}`}>{selectedProject.name}</Link></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Owner Agent</TableCell>
                        <TableCell><Link to={`/agents/${selectedAgent.agent_id}`}>{selectedAgent.name}</Link></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Owner Environment</TableCell>
                        <TableCell><Link to={`/environments/${selectedEnvironment.environment_id}`}>{selectedEnvironment.name}</Link></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Enabled</TableCell>
                        <TableCell><Switch checked={menuData?.enabled ?? false} onChange={handleDisable} disabled={isSubmitting} /></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item={true} lg={7} md={6} xs={12}>
          <CodeList />
        </Grid>
      </Grid>
    </Stack>
  );
}
