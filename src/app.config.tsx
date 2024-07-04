import {User, WebStorageStateStore} from "oidc-client-ts";
import {AuthProviderProps} from "react-oidc-context";

export const oidcConfig = {
  authority: "https://keys.chewedfeed.com/realms/flags-gg",
  client_id: "dashboard",
  client_secret: import.meta.env.VITE_KEYCLOAK_SECRET,
  redirect_uri: (() => {
    const url = new URL(window.location.origin)
    const inviteCode = new URLSearchParams(window.location.search).get("invite")
    if (inviteCode) {
      url.searchParams.append("invite", inviteCode)
    }
    return url.toString()
  })(),
  onSigninCallback: (_user: User | void) => {
  },
  useStore: new WebStorageStateStore({store: window.localStorage}),
} as AuthProviderProps

export const BuildDetails = {
    Hash: import.meta.env.VITE_COMMIT_HASH,
    Tag: import.meta.env.VITE_GIT_TAG,
}

export const flagsDashboardConfig = {
  flagsURL: import.meta.env.VITE_FLAGS_API_SERVER + "/flags",
  projectId: import.meta.env.VITE_FLAGS_PROJECT_ID,
  agentId: import.meta.env.VITE_FLAGS_DASHBOARD_ID,
  environmentId: import.meta.env.VITE_FLAGS_DASHBOARD_ENVIRONMENT_ID,
}

export const flagsFrontendConfig = {
  flagsURL: import.meta.env.VITE_FLAGS_API_SERVER + "/flags",
  projectId: import.meta.env.VITE_FLAGS_PROJECT_ID,
  agentId: import.meta.env.VITE_FLAGS_FRONTEND_ID,
  environmentId: import.meta.env.VITE_FLAGS_FRONTEND_ENVIRONMENT_ID,
}

export const flagsAPIConfig = {
  URL: import.meta.env.VITE_FLAGS_API_SERVER,
}

export const stripeConfig = {
  stripe: import.meta.env.VITE_STRIPE_KEY,
}

export const uploadThingConfig = {
  uploadURL: import.meta.env.VITE_FLAGS_API_SERVER + "/uploadthing",
}
