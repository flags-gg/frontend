import {FC, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {
  Box, Button,
  Card,
  CardHeader, CircularProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";

import useAuthFetch from "@DL/fetcher";
import {FileCopy} from "@mui/icons-material";
import {CreateEnvironment} from "@DP/Environment/Create.tsx";


interface EnvironmentProps {
  envLimit?: number;
}

export const Environments: FC<EnvironmentProps> = ({
  envLimit = 0
}) => {
  const authFetch = useAuthFetch();
  const [envData, setEnvData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {agentId} = useParams();

  const fetchEnvData = async () => {
    const response = await authFetch(`/agent/${agentId}/environments`);
    const data = await response.json();
    setEnvData(data?.environments);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchEnvData().then(() => setIsLoading(false)).catch(error => console.error("failed to fetch environment data:", error));
  }, [envLimit]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader title={"Environments"} />
        <Divider />
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          p: 2
        }}>
          <CircularProgress />
        </Box>
      </Card>
    );
  }

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
        <CreateEnvironment agentId={agentId} envLimit={envLimit} setEnvData={setEnvData} setIsLoading={setIsLoading}/>
      </Card>
    );
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {envData?.map((env: any) => (
              <TableRow key={env.id}>
                <TableCell><Link to={`/environments/${env.environment_id}`}>{env.name}</Link></TableCell>
                <TableCell><Link to={`/environments/${env.environment_id}`}>{env.environment_id}</Link></TableCell>
                <TableCell><Button variant={"contained"} endIcon={<FileCopy />}>Clone</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <CreateEnvironment agentId={agentId} envLimit={envLimit} setEnvData={setEnvData} setIsLoading={setIsLoading}/>
    </Card>
  );
}
