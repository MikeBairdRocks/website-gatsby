import {BlogPostsByTagQuery} from "../../types/graphql-types";
import React from "react";
import {graphql} from "gatsby";

type TagProps = {
  readonly data: BlogPostsByTagQuery
};

const Tag: React.FunctionComponent<TagProps> = (props) => {

  return (
    <>{props.data}</>
  );
}

export const pageQuery = graphql`
    query BlogPostsByTag($tag: String!) {
        posts: allMarkdownRemark(filter: {frontmatter: {tags: {eq: $tag}}}) {
            edges {
                node {
                    ...Post
                }
            }
        }
    }
`;

export default Tag;