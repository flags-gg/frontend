import NotFound from "@C/NotFound";
import {Dashboard, Summary} from "./";
import {Company, CompanyAccount, CompanySettings} from "./pages/Company";
import {Agent} from "./pages/Project/Agent";
import {Flags} from "./pages/Project/Agent/Environment/Flags";
import {UserAccount} from "./pages/User/";
import {Project, Projects} from "./pages/Project";
import {Environment} from "@/pages/Dashboard/pages/Project/Agent/Environment";
import {uploadRouter} from "@DL/uploadthing";
import {createRouteHandler} from "uploadthing/next";

export const {GET, POST} = createRouteHandler({
  router: uploadRouter
})

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
            children: [
              {
                path: "",
                element: <Project/>
              },
              {
                path: ":agentId",
                children: [
                  {
                    path: "",
                    element: <Agent/>
                  },
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
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "api",
        children: [
          {
            path: "uploadthing",
            handle: createRouteHandler
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
