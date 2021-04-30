import * as React from "react";
import Page from "../components/Page";
import {HeroSplashProps} from "../components/HeroSplash";
import {graphql, useStaticQuery} from "gatsby";
import {IGatsbyImageData} from "gatsby-plugin-image";
import BlogCard from "../components/Blog/BlogCard";
import {HomeQuery, MarkdownRemark} from "../../types/graphql-types";
import BlogList from "../components/Blog/BlogList";

const Index: React.FunctionComponent = (props) => {
  const data = useStaticQuery<HomeQuery>(graphql`
      query Home {      
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
                  gatsbyImageData
              }
          }
          featured: allMarkdownRemark(
              sort: {fields: [frontmatter___date], order: DESC}
              filter: {frontmatter: {date: {ne: null}}}
              skip: 0
              limit: 1
          ) {
              nodes {
                  ...PostFeatured
              }
          }
          posts: allMarkdownRemark(
              sort: {fields: [frontmatter___date], order: DESC}
              filter: {frontmatter: {date: {ne: null}}}
              skip: 1
              limit: 3
          ) {
              nodes {
                  ...Post
              }
          }
      }
  `);

  const image = data.splashImage?.childImageSharp?.gatsbyImageData as IGatsbyImageData;
  const posts = data.posts.nodes as MarkdownRemark[];
  const featuredPost = data.featured.nodes[0] as MarkdownRemark;
  const secondaryPosts = posts.filter((_, i) => i !== 0) as MarkdownRemark[];

  const splash: HeroSplashProps = {
    label: "Laptop",
    image: image,
    minHeight: "60vh"
  };

  return (
    <Page
    title="Home"
    splashTitle={`Hi, I'm ${data.site?.siteMetadata?.author?.name}.`}
    splashSecondary={`I’m an experienced software developer, focusing on code quality.`}
    splash={splash}>
      <section className="-mt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <BlogCard featured={true} post={featuredPost} descriptionLimit={50}  />
          </div>
        </div>

        <BlogList posts={secondaryPosts} />
      </section>
    </Page>
  );
};

export default Index;
