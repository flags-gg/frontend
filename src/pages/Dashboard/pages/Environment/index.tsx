import {FC, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useAtom} from "jotai";
import {Button, Card, CardContent, Grid, Stack, Table, TableBody, TableCell, TableRow, Typography} from "@mui/material";

import {Environments} from "./Environments.tsx";
import {agentAtom, environmentAtom} from "@DL/statemanager";
import useAuthFetch from "@DL/fetcher";
import {Flags} from "../Flags";

interface Environment {
  id: string;
  name: string;
  environment_id: string;
  secret_menu: {
    enabled: boolean,
    id: string,
  };
}

export const Environment: FC = () => {
  const {environmentId} = useParams()
  const authFetch = useAuthFetch()
  const [environmentData, setEnvironmentData] = useState<Environment | null>(null)
  const [agentData, setAgentData] = useState<any>(null)
  const [, setSelectedEnvironment] = useAtom(environmentAtom)
  const [selectedAgent] = useAtom(agentAtom)

  const fetchEnvironment = async () => {
    try {
      const response = await authFetch(`/agent/${selectedAgent.agent_id}/environment/${environmentId}`)
      const data = await response.json()
      setEnvironmentData(data)
      setSelectedEnvironment(data)
    } catch (error) {
      console.error("failed to fetch environment", error)
    }
  }

  const fetchAgent = async() => {
    try {
      const response = await authFetch(`/agent/${selectedAgent.agent_id}`)
      const data = await response.json()
      setAgentData(data)
    } catch (error) {
      console.error("failed to fetch agent", error)
    }
  }

  useEffect(() => {
    fetchEnvironment().catch(error => console.error("failed to fetch environment", error))
    fetchAgent().catch(error => console.error("failed to fetch agent", error))
  }, [])

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant={"h4"}>Environment Details</Typography>
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
                      <TableCell>{environmentData?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Environment ID</TableCell>
                      <TableCell>{environmentData?.environment_id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Secret Menu</TableCell>
                      <TableCell><Link to={`/secretmenu/${environmentId}`}>{environmentData?.secret_menu.enabled ? "Enabled" : "Disabled"}</Link></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Owner Agent</TableCell>
                      <TableCell><Link to={`/agents/${selectedAgent.agent_id}`}>{agentData?.name}</Link></TableCell>
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
          <Flags />
        </Grid>
      </Grid>
    </Stack>
  );
}

export {
  Environments
}
