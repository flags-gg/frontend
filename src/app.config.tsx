import {User, WebStorageStateStore} from "oidc-client-ts";
import {AuthProviderProps} from "react-oidc-context";

export const oidcConfig = {
  authority: "https://keys.chewedfeed.com/realms/flags-gg",
  client_id: "dashboard",
  client_secret: process.env.REACT_APP_KEYCLOAK_SECRET,
  redirect_uri: window.location.origin,
  onSigninCallback: (_user: User | void) => {
    window.history.replaceState({}, document.title, window.location.pathname)
  },
  useStore: new WebStorageStateStore({store: window.localStorage}),
} as AuthProviderProps

export const BuildDetails = {
    Hash: process.env.REACT_APP_COMMIT_HASH,
    Tag: process.env.REACT_APP_GIT_TAG,
}
