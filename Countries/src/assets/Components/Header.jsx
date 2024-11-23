import { FaMoon } from "react-icons/fa";

const Header = ({ theme, setTheme }) => {
  function handleToggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <header
      className={`element-${theme} shadow-2xl`}
    >
      <div className="flex justify-between py-5 px-6 mx-auto mv:w-[min(1300px,90%)]  dv:w-[min(1300px,90%)]">
        <h2>Where in the world?</h2>
        <button onClick={handleToggleTheme} className="flex items-center gap-1">
          <FaMoon />
          Dark Mode
        </button>
      </div>
    </header>
  );
};

export default Header;