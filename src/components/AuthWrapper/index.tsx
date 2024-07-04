import {FC, ReactNode, useEffect} from 'react';
import {useAuth} from 'react-oidc-context';
import {useNavigate, useLocation} from 'react-router-dom';

export const AuthWrapper: FC<{children: ReactNode}> = ({children}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  useEffect(() => {
    if (auth.isAuthenticated && auth.user) {
      const searchParams = new URLSearchParams(location.search);
      const inviteCode = searchParams.get('invite');

      if (inviteCode && location.pathname !== '/company/setup') {
        navigate(`/company/setup?invite=${inviteCode}`, {replace: true});
      }
    } else if (auth.isLoading) {
      console.log("Auth is loading...");
    } else {
      console.log("User is not authenticated");
    }
  }, [auth.isAuthenticated, auth.user, auth.isLoading, location, navigate]);

  return <>{children}</>;
}
