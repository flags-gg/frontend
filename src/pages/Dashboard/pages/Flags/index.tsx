import {FC, FormEvent, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
  CardHeader,
  Divider,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Switch,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  Tooltip,
  CircularProgress,
  DialogContent
} from "@mui/material";
import {Flag} from "@flags-gg/react-library/types";
import {Create, Delete} from "@mui/icons-material";

import useAuthFetch from "@DL/fetcher";
import {CreateFlag} from "@DP/Flags/Create.tsx";

export const Flags: FC = () => {
  const authFetch = useAuthFetch()
  const [flags, setFlags] = useState<Flag[]>([])
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const {environmentId} = useParams()
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [selectedFlag, setSelectedFlag] = useState<Flag | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [openEdit, setOpenEdit] = useState<boolean>(false)

  const fetchFlags = async () => {
    try {
      const response = await authFetch(`/environment/${environmentId}/flags`)
      const data = await response.json()
      setFlags(data)
      setIsLoading(false)
    } catch (error) {
      console.error("Failed to fetch flags", error)
    }
  }

  useEffect(() => {
    fetchFlags().catch(error => console.error("Failed to fetch flags", error))
  }, [])

  const handleSwitch = async (flag: Flag) => {
    setIsSubmitting(true)
    setIsLoading(true)
    try {
      await authFetch(`/flag/${flag.details.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          enabled: !flag.enabled,
          name: flag.details.name,
        })
      })
      setFlags(f => f.map(f => f.details.id === flag.details.id ? {...f, enabled: !f.enabled} : f))
      setIsSubmitting(false)
      setIsLoading(false)
    } catch (error) {
      console.error("Failed to update flag", error)
    }
  }

  const handleDelete = async (flag: Flag) => {
    setIsSubmitting(true)
    setIsLoading(true)
    try {
      await authFetch(`/flag/${flag.details.id}`, {
        method: 'DELETE'
      })
      setFlags(f => f.filter(f => f.details.id !== flag.details.id))
      setIsLoading(false)
      setIsSubmitting(false)
    } catch (error) {
      console.error("Failed to delete flag", error)
    } finally {
      setOpenDelete(false)
    }
  }

  const handleEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setIsLoading(true)
    const formData = new FormData(event.target as HTMLFormElement)
    const name = formData.get('name') as string
    if (name) {
      authFetch(`/flag/${selectedFlag?.details.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: name,
          enabled: selectedFlag?.enabled,
        })
      }).then(() => {
        setFlags(f => f.map(f => f.details.id === selectedFlag?.details.id ? {...f, name: name} : f))
        setIsLoading(false)
        setIsSubmitting(false)
        setSelectedFlag(null)
      }).catch(error => console.error("Failed to create flag", error))
      event.currentTarget.reset()
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader title={"Flags"} />
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

  if (flags.length === 0) {
    return (
      <Card>
        <CardHeader title={"No Flags"}/>
        <Divider/>
        <CreateFlag setIsLoading={setIsLoading} setFlags={setFlags} environmentId={environmentId} />
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader title={"Flags"} />
      <Divider />
      <Box sx={{overflowX: 'auto'}}>
        <Table sx={{
          minWidth: 800
        }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Enabled</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flags?.map((flag: Flag) => (
              <TableRow key={flag.details.id}>
                <TableCell>{flag.details.name}</TableCell>
                <TableCell>
                  <Switch checked={flag.enabled} color={"secondary"} onChange={() => handleSwitch(flag)} disabled={isSubmitting} />
                </TableCell>
                <TableCell>
                  <Tooltip title={"Edit"}>
                    <IconButton onClick={() => {
                      setSelectedFlag(flag)
                      setOpenEdit(true)
                    }}><Create /></IconButton>
                  </Tooltip>
                  <Tooltip title={"Delete"}>
                    <IconButton onClick={() => {
                      setOpenDelete(true)
                      setSelectedFlag(flag)
                    }}><Delete /></IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Dialog open={openDelete} onClose={() => {
        setOpenDelete(false)
        setSelectedFlag(null)
      }}>
        <DialogTitle>Delete "{selectedFlag?.details.name}"</DialogTitle>
        <DialogContentText sx={{p: 2}}>Are you sure you want to delete "{selectedFlag?.details.name}"?<br />It is an unrecoverable command</DialogContentText>
        <DialogActions>
          <Button onClick={() => {
            setOpenDelete(false)
            setSelectedFlag(null)
          }}>Cancel</Button>
          <Button onClick={() => {
            handleDelete(selectedFlag as Flag).catch(error => console.error("Failed to delete flag", error))
            setOpenDelete(false)
            setSelectedFlag(null)
          }}>Delete</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit} onClose={() => {
        setOpenEdit(false)
      }}>
        <form onSubmit={handleEdit}>
          <DialogTitle>Edit "{selectedFlag?.details.name}"</DialogTitle>
          <DialogContent>
              <input type="text" name="name" placeholder="Flag Name" required disabled={isSubmitting} defaultValue={selectedFlag?.details.name} autoFocus={true} />
          </DialogContent>
          <DialogActions>
            <Button type="submit" disabled={isSubmitting}>Save</Button>
          </DialogActions>
        </form>
      </Dialog>
      <CreateFlag setIsLoading={setIsLoading} setFlags={setFlags} environmentId={environmentId} />
    </Card>
  )
}
