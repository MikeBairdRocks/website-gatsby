import React from "react";
import {Link} from "gatsby";
import LogoIcon from "../images/logo-icon.inline.svg";
import LogoText from "../images/logo-text.inline.svg";

type Props = {
  text: string
  className?: string
}

const Logo: React.FunctionComponent<Props> = (props) => {
  const className = props.className ?? "text-white dark:text-black";

  return (
    <div className={`flex-shrink-0 flex items-center ${className}`}>
      <Link to="/" aria-label={props.text}>
        <LogoIcon className="block lg:hidden h-10 w-auto" title={props.text}/>
        <LogoText className="hidden lg:block h-10 w-auto" title={props.text}/>
      </Link>
    </div>
  );
};

export default Logo;