import {FC, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAtom} from "jotai";

import {Environments} from "./Environments";
import {environmentAtom} from "@DL/statemanager";


export const Environment: FC = () => {
  const {environmentId} = useParams()
  const [_, setSelectedEnvironment] = useAtom(environmentAtom)

  const fetchEnvironment = async () => {
    try {
      const data = {
        id: "1",
        name: "dev",
        environment_id: environmentId,
        flags: [],
        secretMenu: {},
      }
      setSelectedEnvironment(data)
    } catch (error) {
      console.error("failed to fetch environment", error)
    }
  }

  useEffect(() => {
    fetchEnvironment().catch(error => console.error("failed to fetch environment", error))
  }, [])

  return (
    <div>
      <h1>Environment</h1>
    </div>
  );
}

export {
  Environments
}
