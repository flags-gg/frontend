import NotFound from "@C/NotFound";
import Dashboard from "./"
import Account from "./pages/Account";
import UserAccount from "./pages/UserAccount";
import Summary from "./pages/Summary";
import Settings from "./pages/Settings";
import {Flags} from "./pages/Flags";

const dashboardRoutes = [
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <Summary />
      },
      {
        path: "account",
        element: <Account />
      },
      {
        path: "settings",
        element: <Settings />
      },
      {
        path: "useraccount",
        element: <UserAccount />
      },
      {
        path: "flags",
        element: <Flags />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  },
]

export default dashboardRoutes;
