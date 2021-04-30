import React, {ReactNode} from "react";
import "../styles/index.scss";
import Navbar from "./Navbar";
import Theme from "./Theme/ThemeProvider";

type LayoutProps = {
  children?: ReactNode,
  navbarTransparent?: boolean
};

const Layout: React.FunctionComponent<LayoutProps> = (props) => {
  return (
    <Theme>
      <div className="antialiased overflow-x-hidden bg-gray-200 dark:bg-gray-900 transition-all duration-500 ease-in-out">
        <Navbar transparent={props.navbarTransparent} />
        <main>
          {props.children}
        </main>
      </div>
    </Theme>
  )
};

export default Layout;