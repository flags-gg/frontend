import {FC, useEffect, useState} from "react";
import {Projects} from "./Projects"
import {useAtom} from "jotai";
import { useParams } from "react-router-dom";
import {projectAtom} from "@DL/statemanager";
import useAuthFetch from "@DL/fetcher";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  TextField,
  Stack,
  Typography,
  Avatar
} from "@mui/material";

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

  useEffect(() => {
    fetchProject().catch(error => console.error("Failed to fetch project:", error));
  }, []);

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant={"h4"}>Project</Typography>
      </div>
      <Grid container spacing={3}>
        <Card>
          <CardContent>
            <Stack spacing={2} sx={{alignItems: "center"}}>
              <Avatar src={projectData?.logo} sx={{
                height: '80px',
                width: '80px'
              }} />
              <Stack spacing={1} sx={{ textAlign: "center" }}>
                <Typography variant={"body2"} color={"text.secondary"}>
                  ID: {projectData?.project_id}
                </Typography>
                <Typography variant={"body2"} color={"text.secondary"}>
                  Agent Limit: {projectData?.agent_limit}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Stack>
  );
}

export {
  Projects,
}
