import {BrowserRouter, useRoutes} from "react-router-dom";
import {createStore} from "jotai/vanilla";
import {Provider} from "jotai";
import Homepage from "@/Homepage";
import NotFound from "@C/NotFound";

const Router = () => {
  const homeRoutes = [
    {
      path: '/',
      element: <Homepage />,
    },
    {
      path: '*',
      element: <NotFound />,
    }
  ]

  return useRoutes(homeRoutes)
}

function App() {
  const flagsStore = createStore()

  return (
    <BrowserRouter>
      <Provider store={flagsStore}>
         <Router />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
