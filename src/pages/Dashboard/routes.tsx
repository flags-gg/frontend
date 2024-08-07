import NotFound from "@C/NotFound";
import {Dashboard, Summary} from "./";
import {Company} from "@DP/Company";
import {SetupWrapper} from "@DP/Company/Setup/wrapper";
import {Agent} from "@DP/Agent";
import {Flags} from "@DP/Flags";
import {UserAccount} from "@DP/User";
import {Project, Projects} from "@DP/Project";
import {Environment} from "@DP/Environment";
import {SecretMenu} from "@DP/Secretmenu";

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
            path: "setup",
            element: <SetupWrapper />,
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
        path: "agents",
        children: [
          {
            path: ":agentId",
            element: <Agent />,
          }
        ]
      },
      {
        path: "environments",
        children: [
          {
            path: ":environmentId",
            children: [
              {
                path: "",
                element: <Environment/>
              },
              {
                path: "flags",
                element: <Flags/>
              }
            ]
          }
        ]
      },
      {
        path: "secretmenu",
        children: [
          {
            path: ":secretMenuId",
            element: <SecretMenu />
          }
        ]
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
            children: [
              {
                path: "",
                element: <Project/>
              },
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
  {
    path: "*",
    element: <NotFound />
  }
]

export default dashboardRoutes;
