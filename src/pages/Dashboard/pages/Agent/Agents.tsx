import {FC, FormEvent, useEffect, useState} from "react";

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
  TableBody, CardContent, Grid, FormControl, TextField, CardActions, Button, CircularProgress
} from "@mui/material";
import {Link, useParams} from "react-router-dom";

import useAuthFetch from "@DL/fetcher";
interface AgentProps {
  agentLimit?: number,
}

export const Agents: FC<AgentProps> = ({
  agentLimit = 0
}) => {
  const authFetch = useAuthFetch();
  const [agentData, setAgentData] = useState<any>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {projectId} = useParams();

  const fetchAgentData = async () => {
    if (projectId !== "") {
      const response = await authFetch(`/project/${projectId}/agents`);
      const data = await response.json();

      if (agentLimit > data?.agents?.length) {
        setShowForm(true);
      }
      setAgentData(data?.agents);
      setIsLoading(false);
    } else {
      const response = await authFetch('/agents');
      const data = await response.json();
      if (agentLimit > data?.agents?.length) {
        setShowForm(true);
      }
      setAgentData(data?.agents);
      setIsLoading(true);
    }
  }
  useEffect(() => {
    fetchAgentData().catch(error => console.error("failed to fetch agent data:", error));
  }, [agentLimit]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.currentTarget
    const formData = new FormData(event.target as HTMLFormElement);
    const agentName = formData.get("agentName") as string;

    try {
      authFetch('/agent', {
        method: 'POST',
        body: JSON.stringify({
          name: agentName
        })
      }).then(() => {
        fetchAgentData().catch(error => console.error("failed to fetch agent data:", error));
        setShowForm(false);
      });
    } catch (error) {
      console.error("failed to create agent:", error)
    } finally {
      form.reset();
      setIsSubmitting(false);
    }
  }

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
          {showForm && (
            <>
              <Divider />
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
              }}>
                <form onSubmit={handleSubmit}>
                  <Card>
                    <CardHeader title={"Create Agent"} />
                    <CardContent>
                      <Grid container spacing={1}>
                        <FormControl required>
                          <TextField variant={"outlined"} label={"Agent Name"} margin={"dense"} required id={"agentName"} name={"agentName"} />
                        </FormControl>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Button color={"primary"} variant={"contained"} type={"submit"} disabled={isSubmitting}>Create Agent</Button>
                    </CardActions>
                  </Card>
                </form>
              </Box>
            </>
          )}
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
      {showForm && (
        <>
          <Divider />
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}>
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader title={"Create Agent"} />
                <CardContent>
                  <Grid container spacing={1}>
                    <FormControl required>
                      <TextField variant={"outlined"} label={"Agent Name"} margin={"dense"} required id={"agentName"} name={"agentName"} />
                    </FormControl>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button color={"primary"} variant={"contained"} type={"submit"} disabled={isSubmitting}>Create Agent</Button>
                </CardActions>
              </Card>
            </form>
          </Box>
        </>
      )}
    </Card>
  );
}
