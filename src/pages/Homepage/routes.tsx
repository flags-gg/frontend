import Homepage from "./";
import NotFound from "@C/NotFound";

const homeRoutes = [
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '*',
    element: <NotFound />,
  }
]

export default homeRoutes
