import {FC, useEffect} from "react";
import {Projects} from "./Projects"
import {atom, useAtom} from "jotai";
import { useParams } from "react-router-dom";

export const Project: FC = () => {
  const selectedProjectAtom = atom<string>('projectId');
  const [setSelectedProject] = useAtom(selectedProjectAtom);
  const {projectId} = useParams()
  useEffect(() => {
    setSelectedProject(projectId);
  }, [projectId]);

  return (
    <div>
      <h1>Project</h1>
    </div>
  );
}

export {
  Projects,
}
