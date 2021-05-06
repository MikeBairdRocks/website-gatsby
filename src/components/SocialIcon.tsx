import React, {HTMLAttributes} from "react";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin, faStackOverflow, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {SocialType} from "../queries/SiteMetaData";

interface SocialIconProps extends HTMLAttributes<HTMLDivElement> {
  href: string;
  text?: string;
  type: SocialType;
  size?: SizeProp;
  color?: string;
  showText?: boolean;
};

const GetIcon = (type: SocialType) => {
  switch (type) {
    case SocialType.Github:
      return faGithub;
      break;
    case SocialType.Twitter:
      return faTwitter;
      break;
    case SocialType.LinkedIn:
      return faLinkedin;
      break;
    case SocialType.StackOverflow:
      return faStackOverflow;
      break;
    default:
      throw new Error(`Social icon not supported for '${type}'.`);
  }
}

const SocialIcon: React.FunctionComponent<SocialIconProps> = (props) => {
  const iconClass = `${props.color ?? "text-gray-500"}`;
  const size = props.size ?? "1x";
  const icon = GetIcon(props.type);
  const showText = props.showText ?? false;
  const text = ` ${showText ? props.text : ""}`;

  return (
    <div {...props}>
      <a href={props.href}
         aria-label={props.text}
         className={`${props.color} font-normal rounded-full outline-none focus:outline-none`}>
        <span className={iconClass}><FontAwesomeIcon icon={icon} size={size} />{text}</span>
      </a>
    </div>
  );
};

export default SocialIcon;