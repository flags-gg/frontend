import {FC, useEffect, useState} from "react";
import {Project} from "@DC/ProjectSelector/types";
import useAuthFetch from "@DL/fetcher";

export const Projects: FC = () => {
  const authFetch = useAuthFetch();
  const [projects, setProjects] = useState<Project[]>([]);
  const [allowedProjects, setAllowedProjects] = useState<number>(1);

  const fetchLimits = async () => {
    try {
      const response = await authFetch("/company/limits");
      return await response.json();
    } catch (error) {
      console.error("failed to fetch limits", error);
    }
  }
  const fetchProjects = async () => {
    try {
      const response = await authFetch("/projects");
      return await response.json();
    } catch (error) {
      console.error("failed to fetch projects", error);
    }
  }

  useEffect(() => {
    fetchLimits().then((limits) => {
      setAllowedProjects(limits?.projects);
    }).catch((error) => {
      console.error("failed to fetch limits", error);
    })
    fetchProjects().then((projects) => {
      setProjects(projects);
    }).catch((error) => {
      console.error("failed to fetch projects", error);
    })
  }, []);


  return (
    <div>
      <h1>Projects</h1>
    </div>
  );
}
