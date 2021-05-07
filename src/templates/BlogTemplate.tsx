import React from "react";
import Page from "../components/Page";
import {HeroSplashProps} from "../components/HeroSplash";
import {graphql, PageProps} from "gatsby";
import {BlogQuery, MarkdownRemark} from "../../types/graphql-types";
import {IGatsbyImageData} from "gatsby-plugin-image";
import BlogList from "../components/Blog/BlogList";
import {PageContext} from "gatsby/internal";
import Pagination from "../components/Blog/Pagination";

interface BlogPageContext extends PageContext {
  currentPage: number;
  totalPages: number;
}

interface BlogProps extends PageProps<BlogQuery, BlogPageContext> {
  readonly data: BlogQuery;
}

const BlogTemplate: React.FunctionComponent<BlogProps> = (props) => {
  const { currentPage, totalPages } = props.pageContext;
  const data = props.data;
  const posts = data.posts.nodes as MarkdownRemark[];
  const totalCount = data.posts.totalCount;
  const image = data.splashImage?.childImageSharp?.gatsbyImageData as IGatsbyImageData;
  let splash: HeroSplashProps = {
    image: image,
    label: "Blog"
  };

  return (
    <Page title="Blog"
          description={data.site?.siteMetadata?.description as string}
          splashTitle="Blog"
          splash={splash}>
      <section className="-mt-10">
        <BlogList posts={posts} />
        <Pagination />
      </section>
    </Page>
  )
}

export const blogQuery = graphql`
    query Blog($skip: Int!, $limit: Int!) {
        site {
            siteMetadata {
                title
                description
                siteUrl
                author {
                    name
                }
                social {
                    type
                    url
                    username
                }
            }
        }
        splashImage: file(relativePath: {eq: "splash.jpg"}) {
            childImageSharp {
                gatsbyImageData(
                    layout: FULL_WIDTH
                )
            }
        }
        posts: allMarkdownRemark(
            sort: {fields: [frontmatter___date], order: DESC}
            filter: {frontmatter: {date: {ne: null}}}
            limit: $limit
            skip: $skip
        ) {
            totalCount
            nodes {
                ...Post
            }
        }
    }
`;

export default BlogTemplate;