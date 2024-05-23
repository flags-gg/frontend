import {FC, useEffect} from "react";
import {Projects} from "./Projects"
import {useAtom} from "jotai";
import { useParams } from "react-router-dom";
import {projectAtom} from "@DL/statemanager";
import useAuthFetch from "@DL/fetcher";

export const Project: FC = () => {
  const [_, setSelectedProject] = useAtom(projectAtom);
  const {projectId} = useParams()
  const authFetch = useAuthFetch();

  const fetchProject = async () => {
    try {
      const response = await authFetch(`/project/${projectId}`);
      const data = await response.json();
      setSelectedProject({id: data.project_id, name: data.name});
    } catch (error) {
      console.error("Failed to fetch project:", error);
    }
  }

  useEffect(() => {
    fetchProject().catch(error => console.error("Failed to fetch project:", error));
  }, []);

  return (
    <div>
      <h1>Project</h1>
    </div>
  );
}

export {
  Projects,
}
