import {FC, FormEvent, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useAtom} from "jotai";
import {
  Button,
  Card,
  CardContent, CircularProgress,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow, TextField,
  Typography
} from "@mui/material";

import {Environments} from "./Environments.tsx";
import {IEnvironment, agentAtom, environmentAtom} from "@DL/statemanager";
import useAuthFetch from "@DL/fetcher";
import {Flags} from "../Flags";

export const Environment: FC = () => {
  const {environmentId} = useParams()
  const authFetch = useAuthFetch()
  const [environmentData, setEnvironmentData] = useState<IEnvironment | null>(null)
  const [agentData, setAgentData] = useState<any>(null)
  const [, setSelectedEnvironment] = useAtom(environmentAtom)
  const [selectedAgent] = useAtom(agentAtom)
  const [showEdit, setShowEdit] = useState(false)
  const [showVerify, setShowVerify] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const fetchEnvironment = async () => {
    try {
      const response = await authFetch(`/environment/${environmentId}`)
      const data = await response.json()
      setEnvironmentData(data)
      setSelectedEnvironment(data)
    } catch (error) {
      console.error("failed to fetch environment", error)
    }
  }

  const handleDelete = async() => {
    setIsLoading(true)
    try {
      await authFetch(`/environment/${environmentId}`, {
        method: "DELETE"
      })
      navigate(`/agents/${selectedAgent.agent_id}`)
    } catch (error) {
      console.error("failed to delete environment", error)
    }
  }

  const fetchAgent = async() => {
    try {
      const response = await authFetch(`/agent/${selectedAgent.agent_id}`)
      const data = await response.json()
      setAgentData(data)
      setIsLoading(false)
    } catch (error) {
      console.error("failed to fetch agent", error)
    }
  }

  const handleEdit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    if (environmentData) {
      setEnvironmentData({...environmentData, ...data})
    }
    try {
      authFetch(`/environment/${environmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(environmentData)
      }).catch(error => console.error("failed to update environment", error))
    } finally {
      setShowEdit(false)
    }
    event.currentTarget.reset()
  }

  useEffect(() => {
    fetchEnvironment().catch(error => console.error("failed to fetch environment", error))
    fetchAgent().catch(error => console.error("failed to fetch agent", error))
  }, [])

  return (
    <Stack spacing={3}>
      <Typography variant={"h4"}>Environment Details</Typography>
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
                        <TableCell>{environmentData?.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Environment ID</TableCell>
                        <TableCell>{environmentData?.environment_id}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Secret Menu</TableCell>
                        <TableCell><Link to={`/secretmenu/${environmentId}`}>{environmentData?.secret_menu.enabled ? "Enabled" : "Disabled"}</Link></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Owner Agent</TableCell>
                        <TableCell><Link to={`/agents/${selectedAgent.agent_id}`}>{agentData?.name}</Link></TableCell>
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
          <Flags />
        </Grid>
      </Grid>
      <Dialog open={showEdit} onClose={() => setShowEdit(false)} PaperProps={{
        component: 'form',
        onSubmit: handleEdit,
      }}>
        <DialogTitle>Edit Environment</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{p: 3}}>
            Rename or Delete the environment
          </DialogContentText>
          <TextField autoFocus margin={"dense"} label={"Environment Name"} name={"name"} fullWidth defaultValue={environmentData?.name} />
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
            Are you sure you want to delete this {environmentData?.name}?
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
  Environments
}
