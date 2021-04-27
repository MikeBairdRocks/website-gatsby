import * as React from "react";
import Page from "../components/Page";
import {HeroSplashProps} from "../components/HeroSplash";
import {graphql, useStaticQuery} from "gatsby";
import {IGatsbyImageData} from "gatsby-plugin-image";
import BlogCard from "../components/Blog/BlogCard";
import {HomeQuery, MarkdownRemark} from "../../types/graphql-types";

const Index = () => {
  const data = useStaticQuery<HomeQuery>(graphql`
      query Home {  
          site {
              siteMetadata {
                  author {
                      name
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
              limit: 4
          ) {
              nodes {
                  frontmatter {
                      author
                      title
                      tags
                      slug
                      description
                      date
                      image {
                          childImageSharp {
                              gatsbyImageData(
                                  height: 300
                                  aspectRatio: 1.778
                              )
                          }
                      }
                  }
                  timeToRead
              }
          }
      }
  `);

  const image: IGatsbyImageData = data.splashImage?.childImageSharp?.gatsbyImageData ?? {} as IGatsbyImageData;
  const featuredPost = data.featured?.nodes[0];
  const posts = data.featured.nodes.filter((x, i) => i != 0);

  const splash: HeroSplashProps = {
    label: "Programmer's Laptop",
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
            <BlogCard post={featuredPost as MarkdownRemark} featured={true} />

            {posts.map(post => {
              return (
                <div key={post.frontmatter?.slug} className="flex w-full md:w-4/12 px-4">
                  <BlogCard post={post as MarkdownRemark} featured={false} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Page>
  );
};

export default Index;