import {FC, useEffect, useState, FormEvent} from "react";
import {
  Box,
  Button,
  Card, CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  FormControl,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";

import useAuthFetch from "@DL/fetcher";
import {Link} from "react-router-dom";
import {IProject} from "@DL/statemanager";

export const Projects: FC = () => {
  const authFetch = useAuthFetch();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [allowedProjects, setAllowedProjects] = useState<number>(1);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget
    const formData = new FormData(event.target as HTMLFormElement);
    const projectName = formData.get("projectName") as string;
    setIsSubmitting(true);

    try {
      await authFetch("/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: projectName
        })
      })
      fetchProjects().then((projects) => {
        setProjects(Array.isArray(projects) ? projects : []);
      }).catch((error) => {
        console.error("failed to fetch projects", error);
      })
    } catch (error) {
      console.error("failed to create project", error);
    } finally {
      form.reset();
      setIsSubmitting(false);
    }
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
                <CardHeader title={"Create Project"} />
                <CardContent>
                  <Grid container spacing={1}>
                    <FormControl required>
                      <TextField variant={"outlined"} label={"Project Name"} margin={"dense"} required id={"projectName"} name={"projectName"} />
                    </FormControl>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button color={"primary"} variant={"contained"} type={"submit"} disabled={isSubmitting}>Create Project</Button>
                </CardActions>
              </Card>
            </form>
          </Box>
        </>
      )}
    </Card>
  );
}
