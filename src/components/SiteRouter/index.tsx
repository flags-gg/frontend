import homeRoutes from "../../pages/Homepage/routes";
import dashboardRoutes from "../../pages/Dashboard/routes";
import {useAuth} from "react-oidc-context";
import {useEffect} from "react";
import {useRoutes} from "react-router-dom";

const SiteRouter = () => {
  const auth = useAuth()
  useEffect(() => {
    return auth.events.addAccessTokenExpired((error) => {
      console.error("access token expired", error)
      auth.signoutSilent().catch(error => console.error("silent sign-out error", error))
    })
  }, [auth])

  let routes = [...homeRoutes]
  if (auth.isAuthenticated) {
    routes = [...dashboardRoutes]
  }

  return useRoutes(routes)
}

export default SiteRouter;
