import React from 'react';
import {BrowserRouter} from "react-router-dom";

import SiteRouter from "@C/SiteRouter";
import {FlagsProvider} from "./lib/flags/react";

function App() {
  return (
    <BrowserRouter>
      <FlagsProvider
        flagsURL={"http://localhost:8080"}
        companyId={"bob"}
        apiKey={"bob"}
        enableSecretMenu={true}>
        <SiteRouter />
      </FlagsProvider>
    </BrowserRouter>
  );
}

export default App;
