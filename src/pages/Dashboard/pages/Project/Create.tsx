import {FC, FormEvent, useEffect, useState} from "react";
import {
  Box, Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  Skeleton,
  TextField
} from "@mui/material";

import {IProject} from "@DL/statemanager";
import useAuthFetch from "@DL/fetcher";

interface CreateProjectProps {
  projectLimit: number;
}
export const CreateProject: FC<CreateProjectProps> = ({projectLimit}) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const authFetch = useAuthFetch();

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
    fetchProjects().then((projects) => {
      setProjects(Array.isArray(projects) ? projects : []);
      setIsLoading(false);
    }).catch((error) => {
      console.error("failed to fetch projects", error);
    })
  }, [projectLimit]);

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

  if (isLoading) {
    return <Skeleton variant="rectangular" height={200} />
  }

  if (projects.length >= projectLimit) {
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
  )
}
