import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

const Layout = ({ theme, setTheme }) => {
  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <Outlet />
    </>
  );
};

export default Layout;
