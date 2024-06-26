import {FC, useEffect, useState} from "react";
import {MenuItem, Select, FormControl, InputLabel, Box} from "@mui/material";
import { useAtom } from "jotai";

import useAuthFetch from "@DL/fetcher";
import {IProject, projectAtom} from "@DL/statemanager";

export const ProjectSelector: FC = () => {
  const [selectedProject, setSelectedProject] = useAtom(projectAtom);
  const authFetch = useAuthFetch();
  const [projects, setProjects] = useState<IProject[]>([]);

  const fetchProjects = async () => {
    try {
      const response = await authFetch('/projects');
      const data = await response.json();
      if (!Array.isArray(data.projects)) {
        console.error("Expected projects data to be an array, received:", data);
        setProjects([]); // Setting to empty array as a fallback
        return;
      }
      // Only update if there's a change
      setProjects(prevProjects => {
        if (JSON.stringify(prevProjects) !== JSON.stringify(data.projects)) {
          return data.projects;
        }
        return prevProjects;
      });
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setProjects([]); // Setting to empty array in case of error
    }
  };

  const changeProject = (event: { target: { value: string; }; }) => {
    const sp = projects.find(project => project.name === event.target.value);
    if (sp) {
      setSelectedProject(sp);
    }
  }

  useEffect(() => {
    fetchProjects().catch(error =>
      console.error("Failed to fetch projects:", error)
    );
    const interval = setInterval(fetchProjects, 60000);
    return () => clearInterval(interval);
  }, []);

  if (projects.length === 0) {
    return (
      <></>
    )
  }

  let inputLabel = "Select a project";
  if (selectedProject.name !== "") {
    inputLabel = selectedProject.name;
  }

  return (
    <Box sx={{ minWidth: 160 }}>
      <FormControl fullWidth>
        <InputLabel id="project-selector-label">{inputLabel}</InputLabel>
        <Select value={selectedProject.name} onChange={changeProject}>
          {projects.map(project => (
            <MenuItem key={project.id} value={project.name}>{project.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
