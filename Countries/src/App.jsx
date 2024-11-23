import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import FetchCountries from "./assets/Components/coutries";
import CountryDetails from "./assets/Components/CountryDetails";
import UseLocalStorage from "./assets/Components/localStorage";
import Layout from "./assets/Components/layout";

function App() {
  const [theme, setTheme] = UseLocalStorage("theme", "dark");
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout theme={theme} setTheme={setTheme} />}>
          <Route index element={<FetchCountries theme={theme} />} />
          <Route
            path="country/:ccn3"
            element={<CountryDetails theme={theme} />}
          />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
