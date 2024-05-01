import {BrowserRouter} from "react-router-dom";
import {FlagsProvider} from "@flags-gg/react-library";

import SiteRouter from "@C/SiteRouter";

function App() {
  return (
    <BrowserRouter>
      <FlagsProvider options={{
        flagsURL: import.meta.env.VITE_FLAGS_API_SERVER + "/flags",
        companyId: import.meta.env.VITE_FLAGS_COMPANY_ID,
        agentId: import.meta.env.VITE_FLAGS_AGENT_ID,
        environmentId: import.meta.env.VITE_FLAGS_ENVIRONMENT_ID,
      }}>
        <SiteRouter />
      </FlagsProvider>
    </BrowserRouter>
  );
}

export default App;
