import React, {ReactNode, useState} from "react";
import {graphql, Link, useStaticQuery} from "gatsby";
import SocialIcon from "./SocialIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import ThemeToggle from "./Theme/ThemeToggle";
import {SocialType} from "../queries/SiteMetaData";
import {SiteQuery} from "../../types/graphql-types";

type NavbarProps = {
  transparent?: boolean
};

interface NavLinkProps extends NavbarProps {
  to: string;
  text: string;
  children?: ReactNode;
}

const NavLink: React.FunctionComponent<NavLinkProps> = (props) => {
  const linkClass = `${props.transparent ? "lg:text-white lg:hover:text-gray-300 text-gray-800" : "text-gray-800 hover:text-gray-600"} px-4 py-5 lg:py-2 flex items-center text-md uppercase font-medium`;

  return (
    <Link to={props.to} className={linkClass} aria-label={props.text} title={props.text}>{props.children}</Link>
  );
};

const Navbar: React.FunctionComponent<NavbarProps> = (props) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navClass = `${props.transparent ? "top-0 absolute z-50 w-full" : "relative shadow-lg bg-white shadow-lg"} flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg`;
  const baseLinkClass = props.transparent ? "text-white" : "text-gray-800";
  const socialClass = props.transparent ? "lg:text-white lg:hover:text-gray-300 text-gray-800" : "text-gray-800 hover:text-gray-600";

  const data = useStaticQuery<SiteQuery>(graphql`
      query Site {
          site {
              siteMetadata {
                  title
                  description
                  social {
                      type
                      url
                  }
              }
          }
      }
  `);

  return (
    <nav className={navClass}>
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link to="/"
                className={`${baseLinkClass} text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase`}>
            {data.site?.siteMetadata?.title}
          </Link>
          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            aria-label="Menu"
            onClick={() => setNavbarOpen(!navbarOpen)}>
            <span className={baseLinkClass}>
              <FontAwesomeIcon icon={faBars}/>
            </span>
          </button>
        </div>

        <div
          className={`z-50 lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none${navbarOpen ? " block rounded shadow-lg" : " hidden"}`}
          id="navbar-drop">
          <ul className="flex flex-col lg:flex-row list-none mr-auto">
            <li className="flex items-center">
              <NavLink {...props} to="/blog" text="Blog">Blog</NavLink>
              <NavLink {...props} to="/about" text="About">About</NavLink>
            </li>
          </ul>
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            {data.site?.siteMetadata?.social?.map((value, index) => {
              return (
                <li key={`social-${index}`} className="flex items-center">
                  <SocialIcon color={socialClass} type={value?.type as SocialType} href={value?.url ?? ""} text={value?.type?.toString()}
                                  smallDeviceText={true}/>
                </li>
              );
            })}

            <li className="flex items-center pl-10 invisible lg:visible">
              <ThemeToggle/>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;