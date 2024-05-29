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
import {useAtom} from "jotai";

import {Agents} from "./Agents"
import useAuthFetch from "@DL/fetcher";
import {projectAtom} from "@DL/statemanager";

export const Agent: FC = () => {
  const authFetch = useAuthFetch();
  const [agentData, setAgentData] = useState<any>(null);
  const [selectedProject] = useAtom(projectAtom);

  const fetchAgentData = async () => {
    if (selectedProject.id !== "") {
      const response = await authFetch(`/agents/${selectedProject.project_id}`);
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
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Environments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agentData?.map((agent: any) => (
              <TableRow key={agent.id}>
                <TableCell>{agent.agent_id}</TableCell>
                <TableCell>{agent.name}</TableCell>
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

export {
  Agents,
}
