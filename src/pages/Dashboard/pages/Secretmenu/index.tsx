import {FC} from "react";
import {useAtom} from "jotai";
import {Button, Card, CardContent, Grid, Stack, Table, TableBody, TableCell, TableRow, Typography} from "@mui/material";

import {environmentAtom, agentAtom, projectAtom} from "@DL/statemanager";
import {Link} from "react-router-dom";
import {CodeList} from "@DP/Secretmenu/CodeList.tsx";

export const SecretMenu: FC = () => {
  const [selectedEnvironment] = useAtom(environmentAtom)
  const [selectedAgent] = useAtom(agentAtom)
  const [selectedProject] = useAtom(projectAtom)

  return (
    <Stack spacing={3}>
      <Typography variant={"h4"}>Secret Menu</Typography>
      <Grid container spacing={4}>
        <Grid item={true} lg={4} md={6} xs={12}>
          <Card>
            <CardContent>
              <Stack spacing={2} sx={{alignItems: "center"}}>
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
                      <TableCell colSpan={2}>
                        <Button variant={"contained"} color={"primary"} fullWidth>Edit</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
