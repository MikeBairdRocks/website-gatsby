import React from "react";
import {graphql, Link, useStaticQuery} from "gatsby";
import Logo from "./Logo";
import SocialIcon from "./SocialIcon";
import {SocialType} from "../queries/SiteMetaData";
import {FooterQuery} from "../../types/graphql-types";
import ThemeToggle from "./Theme/ThemeToggle";

const Footer: React.FunctionComponent = (props) => {
  const data = useStaticQuery<FooterQuery>(graphql`
      query Footer {
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
    <footer className="relative bg-gray-900 dark:bg-gray-300 pt-8 pb-6">
      <div className="container mx-auto px-4">

        <div className="flex justify-between">
          <Logo text={title} />

          <div className="flex space-x-4">
            {data.site?.siteMetadata?.social?.map((value, index) => {
              return (
                <SocialIcon colorize={true} className="text-2xl" key={`social-mobile-${index}`} color="dark:text-white text-black hover:text-gray-300" type={value?.type as SocialType} href={value?.url ?? ""} text={value?.type?.toString()} showText={false}/>
              );
            })}
            <div className="pl-4">
              <ThemeToggle />
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-800 dark:border-gray-400" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-gray-300 dark:text-gray-700 font-semibold py-1">
              Copyright © {new Date().getFullYear()} <Link to="/about">Michael Baird</Link>.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;