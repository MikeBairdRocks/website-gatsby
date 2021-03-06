import React, {HTMLAttributes} from "react";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin, faStackOverflow, faTwitter, IconDefinition} from "@fortawesome/free-brands-svg-icons";
import {SocialType} from "../queries/SiteMetaData";

interface SocialIconProps extends HTMLAttributes<HTMLDivElement> {
  href: string;
  text?: string;
  type: SocialType;
  size?: SizeProp;
  showText: boolean;
  colorize: boolean;
};

const GetIcon = (type: SocialType): [IconDefinition, string] => {
  switch (type) {
    case SocialType.Github:
      return [faGithub, "text-white hover:text-gray-200 dark:text-black dark:hover:text-gray-800"];
      break;
    case SocialType.Twitter:
      return [faTwitter, "text-blue-400 hover:text-blue-500"];
      break;
    case SocialType.LinkedIn:
      return [faLinkedin, "text-blue-600 hover:text-blue-700"];
      break;
    case SocialType.StackOverflow:
      return [faStackOverflow, "text-yellow-500 hover:text-yellow-600"];
      break;
    default:
      throw new Error(`Social icon not supported for '${type}'.`);
  }
}

const SocialIcon: React.FunctionComponent<SocialIconProps> = (props) => {
  const size = props.size ?? "1x";
  const icon = GetIcon(props.type);
  const text = ` ${props.showText ? props.text : ""}`;
  const iconClass: string = props.colorize ? icon[1] : "";
  const className = props.className ?? "";

  return (
    <div className={className}>
      <a href={props.href}
         aria-label={props.text}
         target="_blank"
         rel="noreferrer"
         className={`${props.color} font-normal rounded-full outline-none focus:outline-none`}>
        <span className={iconClass}><FontAwesomeIcon icon={icon[0]} size={size} />{text}</span>
      </a>
    </div>
  );
};

export default SocialIcon;