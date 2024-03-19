import {User, WebStorageStateStore} from "oidc-client-ts";
import {AuthProviderProps} from "react-oidc-context";

export const oidcConfig = {
  authority: "https://keys.chewedfeed.com/realms/flags-gg",
  client_id: "dashboard",
  client_secret: "uFBHtS1wJ9p5Epbw2wWHuBYVmK2tQzhc",
  redirect_uri: window.location.origin,
  onSigninCallback: (_user: User | void) => {
    window.history.replaceState({}, document.title, window.location.pathname)
  },
  useStore: new WebStorageStateStore({store: window.localStorage}),
} as AuthProviderProps
