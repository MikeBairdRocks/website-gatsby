import {IGatsbyImageData} from "gatsby-plugin-image";
import {IGatsbyImageDataParent} from "gatsby-plugin-image/dist/src/components/hooks";

export interface Social {
  type: SocialType;
  url: string;
  username?: string;
}

export enum SocialType {
  Github = "Github",
  Twitter = "Twitter",
  LinkedIn = "LinkedIn",
  StackOverflow = "StackOverflow"
}
