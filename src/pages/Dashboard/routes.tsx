import NotFound from "@C/NotFound";
import {Dashboard, Summary} from "./";
import {Company, CompanyAccount, CompanySettings} from "./pages/Company";
import {Flags, Agent} from "./pages/Agent";
import {UserAccount} from "./pages/User/";

const dashboardRoutes = [
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <Summary />,
      },
      {
        path: "company",
        children: [
          {
            path: "",
            element: <Company />,
          },
          {
            path: "account",
            element: <CompanyAccount />,
          },
          {
            path: "settings",
            element: <CompanySettings />,
          }
        ],
      },
      {
        path: "user",
        children: [
          {
            path: "account",
            element: <UserAccount />,
          },
        ],
      },
      {
        path: "agent",
        children: [
          {
            path: "",
            element: <Agent />
          },
          {
            path: ":agentId",
            children: [
              {
                path: ":environmentId/flags",
                element: <Flags />
              }
            ],
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  },
]

export default dashboardRoutes;
