import React, {useState, useEffect, useLayoutEffect} from "react";
import {useMediaQuery} from "react-responsive";

type ThemeContextProps = {
  isDark: boolean,
  toggle: () => void
};

export const ThemeContext = React.createContext<ThemeContextProps>({
    isDark: false,
    toggle: () => { /*empty*/
    }
  }
);

const isBrowser = typeof window !== "undefined";

const ThemeProvider: React.FunctionComponent = (props) => {
  let localTheme: string | null = null;
  if (isBrowser) {
    localTheme = window.localStorage.getItem("theme") ;
  }

  const isLocalDark = localTheme === "dark";
  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)"
    },
    undefined,
    prefersDark => {
      setDark(prefersDark);
    }
  );

  const initialState = () => {
    if (!localTheme)
      return systemPrefersDark;
    else
      return isLocalDark;
  }

  const [isDark, setDark] = useState(initialState);
  useLayoutEffect(() => {
    applyTheme(isDark);
  }, [isDark]);

  const applyTheme = (darkMode: boolean) => {
    const theme = darkMode ? "dark" : "light";

    localStorage.setItem("theme", theme);
    const root = document.getElementsByTagName("html")[0];
    root.className = theme;
  };

  const toggle = () => {
    setDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{isDark, toggle}}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

