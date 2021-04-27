import {Link} from "gatsby";
import React from "react";

type TagLinksProps = {
  tags: string[]
};

const TagLinks: React.FunctionComponent<TagLinksProps> = (props) => {
  return (
    <>
      {props.tags.map(tag => <span key={tag} className="pr-2"><Link to={`/tag/${tag}`} title={`View all posts with tag #${tag}`}>{`#${tag}`}</Link></span>)}
    </>
  );
};

export default TagLinks;