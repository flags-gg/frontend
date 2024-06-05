import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import useAuthFetch from "@DL/fetcher";

export const Flags: FC = () => {
  const authFetch = useAuthFetch()
  const [flags, setFlags] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const {projectId, agentId, environmentId} = useParams()

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

  if (!flags) {
    return <p>No flags found</p>
  }
}
