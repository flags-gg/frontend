import {FC, useEffect, useState} from "react";

import {
  Chip,
  TableCell,
  TableRow,
  TableHead,
  Card,
  CardHeader,
  Divider,
  Box,
  Table,
  TableBody
} from "@mui/material";

import useAuthFetch from "@DL/fetcher";
import {useParams} from "react-router-dom";

export const Agents: FC = () => {
  const authFetch = useAuthFetch();
  const [agentData, setAgentData] = useState<any>(null);
  const {projectId} = useParams();

  const fetchAgentData = async () => {
    if (projectId !== "") {
      const response = await authFetch(`/agents/${projectId}`);
      const data = await response.json();
      setAgentData(data?.agents);
    } else {
      const response = await authFetch('/agents');
      const data = await response.json();
      setAgentData(data?.agents);
    }
  }
  useEffect(() => {
    fetchAgentData().catch(error => console.error("failed to fetch agent data:", error));
  }, []);

  if (!agentData) {
    return (
      <Card>
        <CardHeader title={"Agents"} />
        <Divider />
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}>
          <p>No agents found</p>
        </Box>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader title={"Agents"} />
      <Divider />
      <Box sx={{
        overflowX: 'auto',
      }}>
        <Table sx={{
          minWidth: 800
        }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Environments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agentData?.map((agent: any) => (
              <TableRow key={agent.id}>
                <TableCell>{agent.name}</TableCell>
                <TableCell>{agent.agent_id}</TableCell>
                <TableCell>
                  {agent.environments.map((env: any) => (
                    <Chip key={env.environment_id} label={env.name} component="a" href={`/agent/${agent.agent_id}/${env.environment_id}/flags`} clickable />
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
}
