import React from 'react';
import {BrowserRouter} from "react-router-dom";

import SiteRouter from "@C/SiteRouter";
import {FlagsProvider} from "@flags-gg/react";

function App() {
  return (
    <BrowserRouter>
      <FlagsProvider>
        <SiteRouter />
      </FlagsProvider>
    </BrowserRouter>
  );
}

export default App;
