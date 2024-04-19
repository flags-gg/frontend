import { useAuth } from 'react-oidc-context';

function useAuthFetch() {
  const auth = useAuth();

  const authFetch = async (apiPath: string, options: RequestInit = {}) => {
    if (!auth.isAuthenticated) {
      throw new Error('No user profile found. User must be logged in.');
    }

    // Extract the necessary tokens from the user profile
    const xUserSubject = auth.user?.profile?.sub || "";
    const xUserAccessToken = auth.user?.access_token || "";

    // Set up headers
    const headers = new Headers(options.headers);
    headers.set('x-user-subject', xUserSubject);
    headers.set('x-user-access-token', xUserAccessToken);

    const url = `${import.meta.env.VITE_API_SERVER}${apiPath}`;

    // Make the fetch request with the additional headers
    const response = await fetch(url, {
      ...options,
      headers,
    });

    return response;
  };

  return authFetch;
}

export default useAuthFetch;
