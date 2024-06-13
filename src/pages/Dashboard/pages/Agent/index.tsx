import {FC, useEffect, useState} from "react";
import {Card, Grid, Stack, Table, Typography, CardContent, TableBody, TableRow, TableCell, Button} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {useAtom} from "jotai";

import {Agents} from "./Agents.tsx"
import {FlagAgent, agentAtom} from "@DL/statemanager";
import {Environments} from "../Environment";
import useAuthFetch from "@DL/fetcher";

export const Agent: FC = () => {
  const {agentId} = useParams()
  const authFetch = useAuthFetch();
  const [agentData, setAgentData] = useState<FlagAgent | null>(null);
  const [, setSelectedAgent] = useAtom(agentAtom);

  const fetchAgent = async () => {
    try {
      const response = await authFetch(`/agent/${agentId}`);
      const data = await response.json();
      setAgentData(data);
      setSelectedAgent(data)
    } catch (error) {
      console.error("Failed to fetch agent:", error);
    }
  }

  useEffect(() => {
    fetchAgent().catch(error => console.error("Failed to fetch agent:", error));
  }, []);

  return (
    <Stack spacing={3}>
      <Typography variant={"h4"}>Agent Details</Typography>
      <Grid container spacing={4}>
        <Grid item={true} lg={4} md={6} xs={12}>
          <Card>
            <CardContent>
              <Stack spacing={2} sx={{alignItems: "center"}}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>{agentData?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Agent ID</TableCell>
                      <TableCell>{agentData?.agent_id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Environment Limit</TableCell>
                      <TableCell>{agentData?.environment_limit}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Owner Project</TableCell>
                      <TableCell><Link to={`/projects/${agentData?.project_info.project_id}`}>{agentData?.project_info.name}</Link></TableCell>
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
          <Environments envLimit={agentData?.environment_limit} />
        </Grid>
      </Grid>
    </Stack>
  );
}

export {
  Agents,
}
