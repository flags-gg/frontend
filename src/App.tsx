import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useAuth} from "react-oidc-context";

import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Homepage";

function App() {
  const auth = useAuth()

  useEffect(() => {
    return auth.events.addAccessTokenExpired((error) => {
      auth.signoutSilent().catch(error => console.error("auth error", error))
    })
  }, [auth])

  return (
    <BrowserRouter>
      <Routes>
        {auth?.isAuthenticated ? (
          <Route path={"/"} element={<Dashboard />} />
        ) : (
          <Route path={"/"} element={<Homepage />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
