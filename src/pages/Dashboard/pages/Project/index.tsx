import {FC, useEffect, useState} from "react";
import {Projects} from "./Projects"
import {useAtom} from "jotai";
import { useParams } from "react-router-dom";
import {projectAtom} from "@DL/statemanager";
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
import {Agents} from "@/pages/Dashboard/pages/Project/Agent";

interface Project {
  id: string;
  name: string;
  project_id: string;
  agent_limit: number;
  logo: string;
}

export const Project: FC = () => {
  const [_, setSelectedProject] = useAtom(projectAtom);
  const {projectId} = useParams()
  const authFetch = useAuthFetch();
  const [projectData, setProjectData] = useState<Project | null>(null);

  const fetchProject = async () => {
    try {
      const response = await authFetch(`/project/${projectId}`);
      const data = await response.json();
      setSelectedProject({id: data.project_id, name: data.name, project_id: data.project_id});
      setProjectData(data);
    } catch (error) {
      console.error("Failed to fetch project:", error);
    }
  }
  const handleChangeImage = () => {
    console.log("Change image");
  }
  const handleChangeName = () => {
    console.log("Change name");
  }

  useEffect(() => {
    fetchProject().catch(error => console.error("Failed to fetch project:", error));
  }, []);

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant={"h4"}>Project Details</Typography>
      </div>
      <Grid container spacing={4}>
        <Grid item={true} lg={4} md={6} xs={12}>
          <Card>
            <CardContent>
              <Stack spacing={2} sx={{alignItems: "center"}}>
                <Avatar src={projectData?.logo} sx={{
                  height: '80px',
                  width: '80px',
                  cursor: 'pointer'
                }} onClick={handleChangeImage} />
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell onClick={handleChangeName} sx={{
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
                        <Button variant={"contained"} color={"error"} fullWidth>Delete Project</Button>
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
