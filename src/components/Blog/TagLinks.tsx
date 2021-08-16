import {Link, navigate} from "gatsby";
import React from "react";

type TagLinksProps = {
  tags: string[];
  className?: string;
};

const TagLinks: React.FunctionComponent<TagLinksProps> = (props) => {
  const goToTag= (event: React.MouseEvent, slug: string) => {
    event.preventDefault();
    event.stopPropagation();

    if (slug) {
      navigate(slug);
    }
  };

  return (
    <>
      {props.tags.map(tag => <span key={tag} className="pr-2 cursor-pointer"><span onClick={e => goToTag(e, `/tag/${tag}`)} onMouseDown={e => e.stopPropagation()} className={props.className} title={`View all posts with tag #${tag}`}>{`#${tag}`}</span></span>)}
    </>
  );
};

export default TagLinks;