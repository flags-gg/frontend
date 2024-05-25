import {FC, useEffect, useState} from "react";
import {
  Box,
  Card, CardHeader, Chip, Divider, Table, TableBody, TableCell, TableHead, TableRow
} from "@mui/material";

import {Project} from "@DC/ProjectSelector/types";
import useAuthFetch from "@DL/fetcher";
import {Link} from "react-router-dom";

export const Projects: FC = () => {
  const authFetch = useAuthFetch();
  const [projects, setProjects] = useState<Project[]>([]);
  const [allowedProjects, setAllowedProjects] = useState<number>(1);
  const [showForm, setShowForm] = useState<boolean>(false);

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
    }).catch((error) => {
      console.error("failed to fetch projects", error);
    })

    if (allowedProjects > projects.length) {
      setShowForm(true);
    }
  }, [allowedProjects, projects.length]);

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
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
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
      {showForm && (
        <>
          <Divider />

        </>
      )}
    </Card>
  );
}
