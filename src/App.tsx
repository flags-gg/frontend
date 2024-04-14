import React from 'react';
import {BrowserRouter} from "react-router-dom";

import SiteRouter from "@C/SiteRouter";
import {FlagsProvider} from "./lib/flags/";

function App() {
  return (
    <BrowserRouter>
      <FlagsProvider options={{
        flagsURL: "http://localhost:8080",
        companyId: "bob",
        agentId: "bob",
      }}>
        <SiteRouter />
      </FlagsProvider>
    </BrowserRouter>
  );
}

export default App;
