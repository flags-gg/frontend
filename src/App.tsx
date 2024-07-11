import {BrowserRouter} from "react-router-dom";

import SiteRouter from "@C/SiteRouter";
import {createStore} from "jotai/vanilla";
import {Provider} from "jotai";
import {AuthWrapper} from "@C/AuthWrapper";

function App() {
  const flagsStore = createStore()

  return (
    <BrowserRouter>
      <Provider store={flagsStore}>
        <AuthWrapper>
          <SiteRouter />
        </AuthWrapper>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
