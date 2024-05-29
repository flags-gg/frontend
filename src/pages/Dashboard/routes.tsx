import NotFound from "@C/NotFound";
import {Dashboard, Summary} from "./";
import {Company, CompanyAccount, CompanySettings} from "./pages/Company";
import {Agents} from "./pages/Project/Agent";
import {Flags} from "./pages/Project/Agent/Environment/Flags";
import {UserAccount} from "./pages/User/";
import {Project, Projects} from "./pages/Project";

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
        path: "projects",
        children: [
          {
            path: "",
            element: <Projects />
          },
          {
            path: ":projectId",
            element: <Project />
          },
        ],
      },
      {
        path: "agents",
        children: [
          {
            path: ":projectId",
            element: <Agents />
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
