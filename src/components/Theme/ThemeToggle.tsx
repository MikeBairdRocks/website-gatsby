import React, {ReactElement, useContext} from "react";
import {ThemeContext} from "./ThemeProvider";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Switch} from "@headlessui/react";

interface ThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  darkIcon?: string | ReactElement;
  lightIcon?: string | ReactElement;
}

const ThemeToggle: React.FunctionComponent<ThemeToggleProps> = (props) => {
  const {isDark, toggle} = useContext(ThemeContext);

  const defaultIconClass = "text-yellow-600 w-4 h-4";
  const darkIcon = props.darkIcon ?? <FontAwesomeIcon className={`${defaultIconClass}`} icon={faMoon}/>;
  const lightIcon = props.lightIcon ?? <FontAwesomeIcon className={`${defaultIconClass}`} icon={faSun}/>;
  const icon = isDark ? darkIcon : lightIcon;

  return (
    <Switch
      checked={isDark}
      onChange={toggle}
      className={`${
        isDark ? "bg-gray-700" : "bg-gray-500"
      } relative inline-flex items-center flex-shrink-0 h-7 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Use setting</span>
      <div className={`${isDark ? "translate-x-5 bg-gray-900" : "translate-x-0 bg-white"} 
        pointer-events-none inline-block h-6 w-6 rounded-full shadow-lg transform ring-0 transition ease-in-out duration-200`}>{icon}</div>
    </Switch>
  );
};

export default ThemeToggle;