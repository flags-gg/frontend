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
    }
  }, [auth, location, navigate]);

  return <>{children}</>;
}
