import {User, WebStorageStateStore} from "oidc-client-ts";
import {AuthProviderProps} from "react-oidc-context";

export const oidcConfig = {
  authority: "https://keys.chewedfeed.com/realms/flags-gg",
  client_id: "dashboard",
  client_secret: import.meta.env.VITE_KEYCLOAK_SECRET,
  redirect_uri: window.location.origin,
  onSigninCallback: (_user: User | void) => {
    window.history.replaceState({}, document.title, window.location.pathname)
  },
  useStore: new WebStorageStateStore({store: window.localStorage}),
} as AuthProviderProps

export const BuildDetails = {
    Hash: import.meta.env.VITE_COMMIT_HASH,
    Tag: import.meta.env.VITE_GIT_TAG,
}
