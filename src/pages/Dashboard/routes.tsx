import Dashboard from "./"
import Account from "./pages/Account";
import UserAccount from "./pages/UserAccount";
import NotFound from "@C/NotFound";
import Summary from "@/pages/Dashboard/pages/Summary";

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
        path: "useraccount",
        element: <UserAccount />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  },
]

export default dashboardRoutes;
