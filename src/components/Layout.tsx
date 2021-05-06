import React, {ReactNode} from "react";
import Navbar from "./Navbar";
import Theme from "./Theme/ThemeProvider";

import {config} from "@fortawesome/fontawesome-svg-core";
import Footer from "./Footer";
config.autoAddCss = false;

type LayoutProps = {
  children?: ReactNode,
  navbarTransparent?: boolean
};

const Layout: React.FunctionComponent<LayoutProps> = (props) => {
  return (
    <Theme>
      <div className="antialiased overflow-x-hidden bg-gray-200 dark:bg-gray-900 transition-all duration-500 ease-in-out">
        <Navbar />
        <main>
          {props.children}
        </main>
      </div>
      <Footer />
    </Theme>
  )
};

export default Layout;