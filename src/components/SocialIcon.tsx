import React from "react";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin, faStackOverflow, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {SocialType} from "../queries/SiteMetaData";

type SocialIconProps = {
  href: string;
  text?: string;
  type: SocialType;
  size?: SizeProp;
  color?: string;
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
  const iconClass = `${props.color ?? "text-gray-500"} text-3xl leading-lg`;
  const size = props.size ?? "1x";
  const icon = GetIcon(props.type);

  return (
    <a href={props.href}
       aria-label={props.text}
       className={`${props.color} text-2xl font-normal items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3`}>
      <span className={iconClass}><FontAwesomeIcon icon={icon} size={size} /></span>
    </a>
  );
};

export default SocialIcon;