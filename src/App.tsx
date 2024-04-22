import {BrowserRouter} from "react-router-dom";
import {FlagsProvider} from "@flags-gg/react-library";

import SiteRouter from "@C/SiteRouter";

function App() {
  return (
    <BrowserRouter>
      <FlagsProvider options={{
        flagsURL: "http://localhost:8080/flags",
        companyId: "bob",
        agentId: "bob",
        environmentId: "bob",
      }}>
        <SiteRouter />
      </FlagsProvider>
    </BrowserRouter>
  );
}

export default App;
