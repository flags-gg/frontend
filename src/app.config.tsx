import {User, WebStorageStateStore} from "oidc-client-ts";
import {AuthProviderProps} from "react-oidc-context";

export const oidcConfig = {
  authority: "https://keys.chwedfeed.com/realms/flags.gg",
  client_id: "dashboard",
  client_secret: "U8JsJ259HKiL0b62RH7Qu4kHJ6nP8ifX",
  redirect_uri: window.location.origin,
  onSigninCallback: (_user: User | void) => {
    window.history.replaceState({}, document.title, window.location.pathname)
  },
  useStore: new WebStorageStateStore({store: window.localStorage}),
} as AuthProviderProps
