import {Dispatch, FC, FormEvent, SetStateAction, useEffect, useState} from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid, Skeleton,
  TextField
} from "@mui/material";

import useAuthFetch from "@DL/fetcher";

interface CreateAgentProps {
  projectId?: string,
  agentLimit: number,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
}
export const CreateAgent: FC<CreateAgentProps> = ({projectId, agentLimit, setIsLoading}) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const authFetch = useAuthFetch();

  const fetchAgentData = async () => {
    if (projectId !== "") {
      const response = await authFetch(`/project/${projectId}/agents`);
      const data = await response.json();

      if (agentLimit > data?.agents?.length) {
        setShowForm(true);
      }
      setIsLoading(false);
      setFormLoading(false);
      if (data?.agents?.length >= agentLimit) {
        setShowForm(true);
      }
    } else {
      const response = await authFetch('/agents');
      const data = await response.json();
      if (agentLimit > data?.agents?.length) {
        setShowForm(true);
      }
      setIsLoading(true);
      setFormLoading(false);
    }
  }
  useEffect(() => {
    setFormLoading(true);
    fetchAgentData().catch(error => console.error("failed to fetch agent data:", error));
  }, [agentLimit]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setIsLoading(true);

    const form = event.currentTarget
    const formData = new FormData(event.target as HTMLFormElement);
    const agentName = formData.get("agentName") as string;

    try {
      authFetch(`/project/${projectId}/agent`, {
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

  if (formLoading) {
    return <Skeleton
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
        width={"100%"}
        height={100} />
  }

  if (!showForm) {
    return null
  }

  return (
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
  )
}
