import React, {ReactNode, useState} from "react";
import {graphql, Link, useStaticQuery} from "gatsby";
import SocialIcon from "./SocialIcon";
import ThemeToggle from "./Theme/ThemeToggle";
import {SocialType} from "../queries/SiteMetaData";
import {SiteQuery} from "../../types/graphql-types";
import LogoIcon from "../images/logo-icon.inline.svg";
import LogoText from "../images/logo-white-text.inline.svg";

type NavbarProps = {
};

interface NavLinkProps extends NavbarProps {
  to: string;
  text: string;
  children?: ReactNode;
}

const NavLink: React.FunctionComponent<NavLinkProps> = (props) => {
  const linkClass = `sm:text-white dark:text-white text-black hover:text-gray-300 dark:hover:text-gray-300 px-4 py-2 flex items-center text-md uppercase font-medium`;

  return (
    <Link to={props.to} className={linkClass} aria-label={props.text} title={props.text}>{props.children}</Link>
  );
};

const Navbar: React.FunctionComponent<NavbarProps> = (props) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

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
  const title = data.site?.siteMetadata?.title as string;

  return (
    <nav className="sm:absolute w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button onClick={() => setNavbarOpen(!navbarOpen)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>

              <svg className={`h-6 w-6 ${navbarOpen ? "hidden" : "block"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>

              <svg className={`h-6 w-6 ${navbarOpen ? "block" : "hidden"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <LogoIcon className="block lg:hidden h-10 w-auto" />
                <LogoText className="hidden lg:block h-10 w-auto" />
{/*                <img className="block lg:hidden h-10 w-auto" src="/logo-icon.svg" alt={title} />
                <img className="hidden lg:block h-10 w-auto" src="/logo-white-text.svg" alt={title} />*/}
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-2">
                <NavLink {...props} to="/blog" text="Blog">Blog</NavLink>
                <NavLink {...props} to="/about" text="About">About</NavLink>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <ul className="flex items-center list-none ml-auto hidden sm:inline-flex">
              {data.site?.siteMetadata?.social?.map((value, index) => {
                return (
                  <li key={`social-${index}`} className="flex items-center text-3xl leading-lg mr-2 p-3">
                    <SocialIcon color="text-white hover:text-gray-300" type={value?.type as SocialType} href={value?.url ?? ""} text={value?.type?.toString()}/>
                  </li>
                );
              })}
            </ul>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className={`sm:hidden transition ease-out duration-500 ${navbarOpen ? "block" : "hidden"}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 border-b border-gray-300 dark:border-gray-800">
          <NavLink {...props} to="/blog" text="Blog">Blog</NavLink>
          <NavLink {...props} to="/about" text="About">About</NavLink>
        </div>
        <div className="h-24 flex flex-wrap content-center space-x-6 justify-center text-md font-medium">
          {data.site?.siteMetadata?.social?.map((value, index) => {
            return (
              <SocialIcon className="" key={`social-mobile-${index}`} color="dark:text-white text-black hover:text-gray-300" type={value?.type as SocialType} href={value?.url ?? ""} text={value?.type?.toString()} showText={true}/>
            );
          })}
        </div>
      </div>
    </nav>
);

/*  return (
    <nav className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 absolute z-50 top-0">
      <div className="relative flex items-center justify-between h-16">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">


        </div>

        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className={`${baseLinkClass} text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase`}>
              {data.site?.siteMetadata?.title}
            </Link>
          </div>
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-2">
              <NavLink {...props} to="/blog" text="Blog">Blog</NavLink>
              <NavLink {...props} to="/about" text="About">About</NavLink>
            </div>
          </div>
        </div>

        <div className="relative inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <ul className="flex items-center list-none ml-auto">
            {data.site?.siteMetadata?.social?.map((value, index) => {
              return (
                <li key={`social-${index}`} className="flex items-center">
                  <SocialIcon color={socialClass} type={value?.type as SocialType} href={value?.url ?? ""} text={value?.type?.toString()}/>
                </li>
              );
            })}
          </ul>
          <div className="pl-10">
            <ThemeToggle/>
          </div>
        </div>

      </div>
    </nav>
  );*/
};

export default Navbar;