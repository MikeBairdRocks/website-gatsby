import {BlogPostsByTagQuery, MarkdownRemark} from "../../types/graphql-types";
import React from "react";
import {graphql, PageProps} from "gatsby";
import Page from "../components/Page";
import {HeroSplashProps} from "../components/HeroSplash";
import {IGatsbyImageData} from "gatsby-plugin-image";
import {PageContext} from "gatsby/internal";
import BlogList from "../components/Blog/BlogList";

interface TagPageContext extends PageContext {
  tag: string
}

interface TagProps extends PageProps<BlogPostsByTagQuery, TagPageContext> {
  readonly data: BlogPostsByTagQuery;
};

const TagTemplate: React.FunctionComponent<TagProps> = (props) => {
  const title = `Posts for #${props.pageContext.tag}`;
  const splashTitle = `#${props.pageContext.tag}`;
  const posts = props.data?.posts?.nodes as MarkdownRemark[];

  const image = props.data.splashImage?.childImageSharp?.gatsbyImageData as IGatsbyImageData;
  const splash: HeroSplashProps = {
    label: "Programmer's Laptop",
    image: image,
    minHeight: "40vh"
  };

  return (
    <Page
      title={title}
      splashTitle={splashTitle}
      splashSecondary={`A collection of ${posts.length} posts.`}
      splash={splash}>
      <section className="-mt-10">
        <BlogList posts={posts} />
      </section>
    </Page>
  );
}

export const tagQuery = graphql`
    query BlogPostsByTag($tag: String!) {
        splashImage: file(relativePath: {eq: "splash.jpg"}) {
            childImageSharp {
                gatsbyImageData
            }
        }
        posts: allMarkdownRemark(
            limit: 100
            filter: {frontmatter: {tags: {eq: $tag}}}) {
            nodes {
                ...Post
            }
        }
    }
`;

export default TagTemplate;