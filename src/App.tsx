import {BrowserRouter} from "react-router-dom";
import {FlagsProvider} from "@flags-gg/react-library";

import SiteRouter from "@C/SiteRouter";
import {createStore} from "jotai/vanilla";
import {Provider} from "jotai";

function App() {
  const flagsStore = createStore()

  return (
    <BrowserRouter>
      <FlagsProvider options={{
        flagsURL: import.meta.env.VITE_FLAGS_API_SERVER + "/flags",
        projectId: import.meta.env.VITE_FLAGS_PROJECT_ID,
        agentId: import.meta.env.VITE_FLAGS_AGENT_ID,
        environmentId: import.meta.env.VITE_FLAGS_ENVIRONMENT_ID,
      }}>
        <Provider store={flagsStore}>
          <SiteRouter />
        </Provider>
      </FlagsProvider>
    </BrowserRouter>
  );
}

export default App;
