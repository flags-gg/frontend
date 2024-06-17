import {Dispatch, FC, FormEvent, SetStateAction, useState} from "react";
import {Box, Button, Card, CardContent, CardHeader} from "@mui/material";
import {useAtom} from "jotai";
import {Flag} from "@flags-gg/react-library/types";

import {agentAtom} from "@DL/statemanager";
import useAuthFetch from "@DL/fetcher";

interface CreateFlagProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setFlags: Dispatch<SetStateAction<Flag[]>>;
  environmentId?: string;
}
export const CreateFlag: FC<CreateFlagProps> = ({setIsLoading, environmentId, setFlags}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [selectedAgent] = useAtom(agentAtom)
  const authFetch = useAuthFetch()

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

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setIsLoading(true)
    const formData = new FormData(event.target as HTMLFormElement)
    const name = formData.get('name') as string
    if (name) {
      authFetch(`/flag`, {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          agentId: selectedAgent.agent_id,
          environmentId: environmentId,
        })
      }).then(() => {
        setIsLoading(true)
        fetchFlags().catch(error => console.error("Failed to fetch flags", error))
      }).catch(error => console.error("Failed to create flag", error))
      event.currentTarget.reset()
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <form onSubmit={handleCreate}>
        <Card>
          <CardHeader title={"Create Flag"} />
          <CardContent sx={{display: 'flex', p: 2}}>
            <input type="text" name="name" placeholder="Flag Name" required disabled={isSubmitting} />
            <Button type="submit" disabled={isSubmitting}>Create</Button>
          </CardContent>
        </Card>
      </form>
    </Box>
  )
}
