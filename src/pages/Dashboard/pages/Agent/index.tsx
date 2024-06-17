import {FC, FormEvent, useEffect, useState} from "react";
import {
  Card,
  Grid,
  Stack,
  Table,
  Typography,
  CardContent,
  TableBody,
  TableRow,
  TableCell,
  Button,
  CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions
} from "@mui/material";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useAtom} from "jotai";

import {Agents} from "./Agents.tsx"
import {FlagAgent, agentAtom, projectAtom} from "@DL/statemanager";
import {Environments} from "../Environment";
import useAuthFetch from "@DL/fetcher";

export const Agent: FC = () => {
  const {agentId} = useParams()
  const authFetch = useAuthFetch();
  const [agentData, setAgentData] = useState<FlagAgent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setSelectedAgent] = useAtom(agentAtom);
  const [selectedProject] = useAtom(projectAtom);
  const [showEdit, setShowEdit] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const navigate = useNavigate();

  const fetchAgent = async () => {
    try {
      const response = await authFetch(`/agent/${agentId}`);
      const data = await response.json();
      setAgentData(data);
      setSelectedAgent(data)
    } catch (error) {
      console.error("Failed to fetch agent:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async () => {
    try {
      await authFetch(`/agent/${agentId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Failed to delete agent:", error);
    }
    navigate(`/projects/${selectedProject.project_id}`);
  }

  const handleEdit = (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formObj = Object.fromEntries(formData.entries())
    if (agentData) {
      const data = {...agentData, ...formObj}
      try {
        authFetch(`/agent/${agentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).catch(error => console.error("failed to update environment", error))
      } finally {
        setShowEdit(false)
        setAgentData(data)
        setIsLoading(false)
      }
    }
    event.currentTarget.reset()
  }

  useEffect(() => {
    fetchAgent().catch(error => console.error("Failed to fetch agent:", error));
  }, []);

  return (
    <Stack spacing={3}>
      <Typography variant={"h4"}>Agent Details</Typography>
      <Grid container spacing={4}>
        <Grid item={true} lg={4} md={6} xs={12}>
          <Card>
            <CardContent>
              <Stack spacing={2} sx={{alignItems: "center"}}>
                {isLoading ? <CircularProgress /> : (
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>{agentData?.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Agent ID</TableCell>
                        <TableCell>{agentData?.agent_id}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Environment Limit</TableCell>
                        <TableCell>{agentData?.environment_limit}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Owner Project</TableCell>
                        <TableCell><Link to={`/projects/${agentData?.project_info.project_id}`}>{agentData?.project_info.name}</Link></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>
                          <Button variant={"contained"} color={"primary"} fullWidth onClick={() => setShowEdit(true)}>Edit</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item={true} lg={7} md={6} xs={12}>
          <Environments envLimit={agentData?.environment_limit} />
        </Grid>
      </Grid>
      <Dialog open={showEdit} onClose={() => setShowEdit(false)} PaperProps={{
        component: 'form',
        onSubmit: handleEdit,
      }}>
        <DialogTitle>Edit Agent</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{p: 3}}>
            Rename or Delete the Agent
          </DialogContentText>
          <TextField autoFocus margin={"dense"} label={"Environment Name"} name={"name"} fullWidth defaultValue={agentData?.name} />
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
            Are you sure you want to delete {agentData?.name}?
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
  Agents,
}
