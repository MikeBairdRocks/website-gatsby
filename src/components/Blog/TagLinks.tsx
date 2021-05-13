import {Link} from "gatsby";
import React from "react";

type TagLinksProps = {
  tags: string[];
  className?: string;
};

const TagLinks: React.FunctionComponent<TagLinksProps> = (props) => {
  return (
    <>
      {props.tags.map(tag => <span key={tag} className="pr-2"><Link className={props.className} to={`/tag/${tag}`} title={`View all posts with tag #${tag}`}>{`#${tag}`}</Link></span>)}
    </>
  );
};

export default TagLinks;