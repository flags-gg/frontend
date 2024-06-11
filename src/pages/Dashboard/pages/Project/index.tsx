import {FC, useEffect, useState} from "react";
import {Projects} from "./Projects"
import {useAtom} from "jotai";
import { useParams } from "react-router-dom";
import {IProject, projectAtom} from "@DL/statemanager";
import useAuthFetch from "@DL/fetcher";
import {
  Card,
  CardContent,
  TableBody,
  TableCell,
  TableRow,
  Grid,
  Stack,
  Typography,
  Avatar,
  Table, Button,
} from "@mui/material";
import {Agents} from "../Agent";

export const Project: FC = () => {
  const [_, setSelectedProject] = useAtom(projectAtom);
  const {projectId} = useParams()
  const authFetch = useAuthFetch();
  const [projectData, setProjectData] = useState<IProject | null>(null);

  const fetchProject = async () => {
    try {
      const response = await authFetch(`/project/${projectId}`);
      const data = await response.json();
      setSelectedProject(data);
      setProjectData(data);
    } catch (error) {
      console.error("Failed to fetch project:", error);
    }
  }

  useEffect(() => {
    fetchProject().catch(error => console.error("Failed to fetch project:", error));
  }, []);

  return (
    <Stack spacing={3}>
      <Typography variant={"h4"}>Project Details</Typography>
      <Grid container spacing={4}>
        <Grid item={true} lg={4} md={6} xs={12}>
          <Card>
            <CardContent>
              <Stack spacing={2} sx={{alignItems: "center"}}>
                <Avatar src={projectData?.logo} sx={{
                  height: '80px',
                  width: '80px',
                  cursor: 'pointer'
                }} />
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell sx={{
                        cursor: 'pointer'
                      }}>{projectData?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Project ID</TableCell>
                      <TableCell>{projectData?.project_id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Agent Limit</TableCell>
                      <TableCell>{projectData?.agent_limit}</TableCell>
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
          <Agents agentLimit={projectData?.agent_limit} />
        </Grid>
      </Grid>
    </Stack>
  );
}

export {
  Projects,
}
