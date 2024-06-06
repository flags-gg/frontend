import {FC, useEffect, useState} from "react";
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
  IconButton, Dialog, DialogTitle, DialogContentText, DialogActions, Button
} from "@mui/material";

import useAuthFetch from "@DL/fetcher";
import {Flag} from "@flags-gg/react-library/types";
import {Create, Delete} from "@mui/icons-material";

export const Flags: FC = () => {
  const authFetch = useAuthFetch()
  const [flags, setFlags] = useState<Flag[]>([])
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const {projectId, agentId, environmentId} = useParams()
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [selectedFlag, setSelectedFlag] = useState<Flag | null>(null)


  const fetchFlags = async () => {
    try {
      const response = await authFetch(`/flags/${projectId}/${agentId}/${environmentId}`)
      const data = await response.json()
      setFlags(data)
    } catch (error) {
      console.error("Failed to fetch flags", error)
    }
  }

  useEffect(() => {
    fetchFlags().catch(error => console.error("Failed to fetch flags", error))
  }, [])

  const handleSwitch = async (flag: Flag) => {
    setIsSubmitting(true)
    try {
      await authFetch(`/flag/${flag.details.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          enabled: !flag.enabled,
          name: flag.details.name,
        })
      })
      setFlags(f => f.map(f => f.details.id === flag.details.id ? {...f, enabled: !f.enabled} : f))
    } catch (error) {
      console.error("Failed to update flag", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (flag: Flag) => {
    console.log("Edit flag", flag)
  }
  const handleDelete = async (flag: Flag) => {
    setIsSubmitting(true)
    try {
      await authFetch(`/flag/${flag.details.id}`, {
        method: 'DELETE'
      })
      setFlags(f => f.filter(f => f.details.id !== flag.details.id))
    } catch (error) {
      console.error("Failed to delete flag", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (flags.length === 0) {
    return (
      <Card>
        <CardHeader title={"Flags"}/>
        <Divider/>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 200
        }}>
          No Flags
        </Box>
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
                  <IconButton onClick={() => handleEdit(flag)}><Create /></IconButton>
                  <IconButton onClick={() => {
                    setOpenDelete(true)
                    setSelectedFlag(flag)
                  }}><Delete /></IconButton>
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
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <form onSubmit={e => {
          e.preventDefault()
          setIsSubmitting(true)
          const formData = new FormData(e.target as HTMLFormElement)
          const name = formData.get('name') as string
          if (name) {
            authFetch(`/flag`, {
              method: 'POST',
              body: JSON.stringify({
                name: name,
                agentId: agentId,
                environmentId: environmentId,
              })
            }).then(() => {
              fetchFlags().catch(error => console.error("Failed to fetch flags", error))
            }).catch(error => console.error("Failed to create flag", error))
              .finally(() => setIsSubmitting(false))
          }
        }}>
          <Card>
            <CardHeader title={"Create Flag"} />
            <Divider />
            <Box sx={{display: 'flex', p: 2}}>
              <input type="text" name="name" placeholder="Flag Name" required />
              <Button type="submit" disabled={isSubmitting}>Create</Button>
            </Box>
          </Card>
        </form>
      </Box>
    </Card>
  )
}
