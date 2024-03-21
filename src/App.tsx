import React from 'react';
import {BrowserRouter} from "react-router-dom";

import SiteRouter from "./components/SiteRouter";

function App() {
  return (
    <BrowserRouter>
      <SiteRouter />
    </BrowserRouter>
  );
}

export default App;
