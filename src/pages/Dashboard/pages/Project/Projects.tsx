import {FC, useState} from "react";
import {Project} from "@DC/ProjectSelector/types";
import useAuthFetch from "@DL/fetcher";

export const Projects: FC = () => {
  const authFetch = useAuthFetch();
  const [projects, setProjects] = useState<Project[]>([]);
  const 


  return (
    <div>
      <h1>Projects</h1>
    </div>
  );
}
