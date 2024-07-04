import {FC, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { Setup } from '@DP/Company/Setup';
import { useAuth } from 'react-oidc-context'; // Assuming you're using react-oidc-context

export const SetupWrapper: FC = () => {
  const location = useLocation();
  const auth = useAuth();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const inviteCode = searchParams.get('invite');

    if (auth.isAuthenticated && auth.user) {
      const email = auth.user.profile.email;
      // Your setup logic here
    }
  }, [auth.isAuthenticated, auth.user, location.search]);

  return <Setup />;
};
