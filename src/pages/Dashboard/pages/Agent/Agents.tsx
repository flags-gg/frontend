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
  TableBody, CircularProgress
} from "@mui/material";
import {Link, useParams} from "react-router-dom";

import useAuthFetch from "@DL/fetcher";
import {CreateAgent} from "@DP/Agent/Create.tsx";
interface AgentProps {
  agentLimit?: number,
}

export const Agents: FC<AgentProps> = ({
  agentLimit = 0
}) => {
  const authFetch = useAuthFetch();
  const [agentData, setAgentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {projectId} = useParams();

  const fetchAgentData = async () => {
    if (projectId !== "") {
      const response = await authFetch(`/project/${projectId}/agents`);
      const data = await response.json();

      setAgentData(data?.agents);
      setIsLoading(false);
    } else {
      const response = await authFetch('/agents');
      const data = await response.json();
      setAgentData(data?.agents);
      setIsLoading(true);
    }
  }
  useEffect(() => {
    fetchAgentData().catch(error => console.error("failed to fetch agent data:", error));
  }, [agentLimit]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader title={"Agents"} />
        <Divider />
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          p: 2,
        }}>
          <CircularProgress />
        </Box>
      </Card>
    );
  }

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
          <CreateAgent projectId={projectId} agentLimit={agentLimit} setIsLoading={setIsLoading} />
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
                <TableCell><Link to={`/agents/${agent.agent_id}`}>{agent.name}</Link></TableCell>
                <TableCell><Link to={`/agents/${agent.agent_id}`}>{agent.agent_id}</Link></TableCell>
                <TableCell>
                  {agent.environments.map((env: any) => (
                    <Chip key={env.environment_id} label={env.name} component={Link} to={`/environments/${env.environment_id}`} clickable sx={{mr: 2}}/>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <CreateAgent projectId={projectId} agentLimit={agentLimit} setIsLoading={setIsLoading} />
    </Card>
  );
}
