import {FC, FormEvent, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {
  Box, Button,
  Card, CardActions,
  CardContent,
  CardHeader,
  Divider, FormControl, Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, TextField
} from "@mui/material";

import useAuthFetch from "@DL/fetcher";


interface EnvironmentProps {
  envLimit?: number;
}

export const Environments: FC<EnvironmentProps> = ({
  envLimit = 0
}) => {
  const authFetch = useAuthFetch();
  const [envData, setEnvData] = useState<any>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {agentId} = useParams();

  const fetchEnvData = async () => {
    const response = await authFetch(`/agent/${agentId}/environments`);
    const data = await response.json();

    if (envLimit > data?.environments?.length) {
      setShowForm(true);
    }
    setEnvData(data?.environments);
  }
  useEffect(() => {
    fetchEnvData().catch(error => console.error("failed to fetch environment data:", error));
  }, [envLimit]);

  if (!envData) {
    return (
      <Card>
        <CardHeader title={"Environments"} />
        <Divider />
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}>
          <p>No Environments found</p>
        </Box>
      </Card>
    );
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

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

  return (
    <Card>
      <CardHeader title={"Environments"} />
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
              <TableCell>Enabled</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {envData?.map((env: any) => (
              <TableRow key={env.id}>
                <TableCell><Link to={`/environments/${env.environment_id}`}>{env.name}</Link></TableCell>
                <TableCell><Link to={`/environments/${env.environment_id}`}>{env.environment_id}</Link></TableCell>
                <TableCell><Link to={`/environments/${env.environment_id}`}>{env.enabled ? "Enabled" : "Disabled"}</Link></TableCell>
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
      )}
    </Card>
  );
}
