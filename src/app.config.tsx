export const BuildDetails = {
    Hash: import.meta.env.VITE_COMMIT_HASH,
    Tag: import.meta.env.VITE_GIT_TAG,
}

export const flagsConfig = {
  projectId: import.meta.env.VITE_FLAGS_PROJECT_ID,
  agentId: import.meta.env.VITE_FLAGS_AGENT_ID,
  environmentId: import.meta.env.VITE_FLAGS_ENVIRONMENT_ID,
}
