import Dashboard from "./"
import Account from "./pages/Account";

const dashboardRoutes = [
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "account",
        element: <Account />
      }
    ]
  },
]

export default dashboardRoutes;
