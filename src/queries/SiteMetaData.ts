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
