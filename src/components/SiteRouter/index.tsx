import homeRoutes from "../../pages/Homepage/routes";
import dashboardRoutes from "../../pages/Dashboard/routes";
import {useAuth} from "react-oidc-context";
import {useEffect} from "react";
import {useRoutes} from "react-router-dom";

const SiteRouter = () => {
  const auth = useAuth()
  useEffect(() => {
    return auth.events.addAccessTokenExpired((error: any) => {
      if (error) {
        console.error("Access token expired", error)
      }
      auth.signoutSilent().catch((error: any) => console.error("silent sign-out error", error))
    })
  }, [auth])

  const routes = auth.isAuthenticated ? dashboardRoutes : homeRoutes;
  return useRoutes(routes)
}

export default SiteRouter;
