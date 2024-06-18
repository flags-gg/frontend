import {FC, useEffect, useState} from "react";
import {
  Box,
  Card,
  CardHeader,
  Chip, CircularProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {Link} from "react-router-dom";

import useAuthFetch from "@DL/fetcher";
import {IProject} from "@DL/statemanager";
import {CreateProject} from "@DP/Project/Create.tsx";

export const Projects: FC = () => {
  const authFetch = useAuthFetch();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [allowedProjects, setAllowedProjects] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchLimits = async () => {
    try {
      const response = await authFetch("/company/limits");
      return await response.json();
    } catch (error) {
      console.error("failed to fetch limits", error);
    }
  }
  const fetchProjects = async () => {
    try {
      const response = await authFetch("/projects");
      const data = await response.json();
      return data.projects;
    } catch (error) {
      console.error("failed to fetch projects", error);
    }
  }

  useEffect(() => {
    fetchLimits().then((limits) => {
      setAllowedProjects(limits?.projects);
    }).catch((error) => {
      console.error("failed to fetch limits", error);
    })
    fetchProjects().then((projects) => {
      setProjects(Array.isArray(projects) ? projects : []);
      setIsLoading(false);
    }).catch((error) => {
      console.error("failed to fetch projects", error);
    })
  }, [allowedProjects, projects.length]);


  if (isLoading) {
    return (
      <Card>
        <CardHeader title={"Projects"} />
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

  if (!projects || projects.length === 0) {
    return (
      <Card>
        <CardHeader title={"Projects"} />
        <Divider />
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}>
          <p>No projects found</p>
        </Box>
        <CreateProject projectLimit={allowedProjects} />
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader title={"Projects"} />
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
            {projects?.map((project) => (
              <TableRow key={project.id}>
                <TableCell><Link to={`/projects/${project.project_id}`}>{project.name}</Link></TableCell>
                <TableCell><Link to={`/projects/${project.project_id}`}>{project.project_id}</Link></TableCell>
                <TableCell>
                  <Chip key={project.id} label={"Edit"} component={Link} to={`/projects/${project.project_id}`} clickable />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <CreateProject projectLimit={allowedProjects}/>
    </Card>
  );
}
