import {FC, useEffect, useState} from "react";

import {Agents} from "./Agents"
import {Card, Grid, Stack, Table, Typography, CardContent, TableBody, TableRow, TableCell} from "@mui/material";
import {Environments} from "@/pages/Dashboard/pages/Project/Agent/Environment";
import useAuthFetch from "@DL/fetcher";
import {useParams} from "react-router-dom";

interface FlagAgent {
  id: string;
  name: string;
  agent_id: string;
  environment_limit: number;
}

export const Agent: FC = () => {
  const {agentId} = useParams()
  const authFetch = useAuthFetch();
  const [agentData, setAgentData] = useState<FlagAgent | null>(null);

  const fetchAgent = async () => {
    try {
      const response = await authFetch(`/agent/${agentId}`);
      const data = await response.json();
      setAgentData(data);
    } catch (error) {
      console.error("Failed to fetch project:", error);
    }
  }

  useEffect(() => {
    fetchAgent().catch(error => console.error("Failed to fetch agent:", error));
  }, []);

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant={"h4"}>Agent Details</Typography>
      </div>
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
                      <TableCell>Envrionment Limit</TableCell>
                      <TableCell>{agentData?.environment_limit}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item={true} lg={7} md={6} xs={12}>
          <Environments />
        </Grid>
      </Grid>
    </Stack>
  );
}

export {
  Agents,
}
