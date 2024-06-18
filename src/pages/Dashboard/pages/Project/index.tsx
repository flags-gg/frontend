import {FC, FormEvent, useEffect, useState} from "react";
import {useAtom} from "jotai";
import {useNavigate, useParams} from "react-router-dom";
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
  Table, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions,
} from "@mui/material";

import {IProject, projectAtom} from "@DL/statemanager";
import useAuthFetch from "@DL/fetcher";
import {Projects} from "./Projects"
import {Agents} from "../Agent";

export const Project: FC = () => {
  const [, setSelectedProject] = useAtom(projectAtom);
  const {projectId} = useParams()
  const authFetch = useAuthFetch();
  const [projectData, setProjectData] = useState<IProject | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showEdit, setShowEdit] = useState(false)
  const [showVerify, setShowVerify] = useState(false)
  const navigate = useNavigate()

  const handleDelete = async() => {
    setIsLoading(true)
    try {
      await authFetch(`/project/${projectId}`, {
        method: "DELETE"
      })
      navigate(`/projects`)
    } catch (error) {
      console.error("failed to delete environment", error)
    }
  }

  const handleEdit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    if (projectData) {
      setProjectData({...projectData, ...data})
    }
    try {
      authFetch(`/project/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(projectData)
      }).catch(error => console.error("failed to update environment", error))
    } finally {
      setShowEdit(false)
    }
    event.currentTarget.reset()
  }

  const fetchProject = async () => {
    try {
      const response = await authFetch(`/project/${projectId}`);
      const data = await response.json();
      setSelectedProject(data);
      setProjectData(data);
      setIsLoading(false);
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
              {isLoading ? <CircularProgress /> : (
                <Stack spacing={2} sx={{alignItems: "center"}}>
                  <Avatar src={projectData?.logo} sx={{
                    height: '80px',
                    width: '80px'
                  }} />
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>{projectData?.name}</TableCell>
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
                          <Button variant={"contained"} color={"primary"} fullWidth onClick={() => setShowEdit(true)}>Edit</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Stack>
                )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item={true} lg={7} md={6} xs={12}>
          <Agents agentLimit={projectData?.agent_limit} />
        </Grid>
      </Grid>
      <Dialog open={showEdit} onClose={() => setShowEdit(false)} PaperProps={{
        component: 'form',
        onSubmit: handleEdit,
      }}>
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{p: 3}}>
            Rename or Delete the project
          </DialogContentText>
          <TextField autoFocus margin={"dense"} label={"Environment Name"} name={"name"} fullWidth defaultValue={projectData?.name} />
        </DialogContent>
        <DialogActions>
          <Button variant={"contained"} color={"primary"} type={"submit"}>Rename</Button>
          <Button variant={"contained"} color={"error"} onClick={() => setShowVerify(true)}>Delete</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showVerify} onClose={() => setShowVerify(false)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this {projectData?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant={"contained"} color={"primary"} onClick={handleDelete}>Yes</Button>
          <Button variant={"contained"} color={"error"} onClick={() => setShowVerify(false)}>No</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export {
  Projects,
}
