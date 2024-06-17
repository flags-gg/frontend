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

interface CreateEnvironmentProps {
  agentId? : string;
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setEnvData: Dispatch<SetStateAction<any>>
  envLimit: number;
}
export const CreateEnvironment: FC<CreateEnvironmentProps> = ({agentId, setEnvData, setIsLoading, envLimit}) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const authFetch = useAuthFetch();

  const fetchEnvData = async () => {
    const response = await authFetch(`/agent/${agentId}/environments`);
    const data = await response.json();

    if (data?.environments?.length >= envLimit) {
      setShowForm(true);
    }

    setEnvData(data?.environments);
    setIsLoading(false);
    setFormLoading(false);
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setIsLoading(true)

    const form = event.currentTarget
    const formData = new FormData(event.target as HTMLFormElement);
    const envName = formData.get("envName") as string;

    try {
      authFetch(`/agent/${agentId}/environment`, {
        method: 'POST',
        body: JSON.stringify({
          name: envName
        })
      }).then(() => {
        fetchEnvData().catch(error => console.error("failed to fetch agent data:", error));
        setShowForm(false);
      });
    } catch (error) {
      console.error("failed to create agent:", error)
    } finally {
      form.reset();
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    setFormLoading(true);
    fetchEnvData().catch(error => console.error("failed to fetch agent data:", error));
  }, [envLimit]);

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
            <CardHeader title={"Create Environment"} />
            <CardContent>
              <Grid container spacing={1}>
                <FormControl required>
                  <TextField variant={"outlined"} label={"Environment Name"} margin={"dense"} required id={"envName"} name={"envName"} />
                </FormControl>
              </Grid>
            </CardContent>
            <CardActions>
              <Button color={"primary"} variant={"contained"} type={"submit"} disabled={isSubmitting}>Create Environment</Button>
            </CardActions>
          </Card>
        </form>
      </Box>
    </>
  )
}
