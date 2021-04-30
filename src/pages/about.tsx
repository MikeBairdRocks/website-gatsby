import React from "react";
import {graphql, PageProps, useStaticQuery} from "gatsby";
import Page from "../components/Page";
import {AboutQuery} from "../../types/graphql-types";
import {HeroSplashProps} from "../components/HeroSplash";
import {IGatsbyImageData, StaticImage} from "gatsby-plugin-image";
import Content from "../components/Content";

const About: React.FunctionComponent<PageProps> = (props) => {
  const data = useStaticQuery<AboutQuery>(graphql`
      query About {
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

      }
  `);

  const image = data.splashImage?.childImageSharp?.gatsbyImageData as IGatsbyImageData;
  const name = data.site?.siteMetadata?.author?.name as string;
  const splash: HeroSplashProps = {
    label: "Programmer's Laptop",
    image: image
  };

  return (
    <Page title="About"
          description={data.site?.siteMetadata?.description as string}
          splash={splash}>
      <section itemScope itemType="https://schema.org/Person" className="py-5">
        <div className="items-center justify-center flex relative mb-5">
          <StaticImage src="../images/michael-baird.jpg"
                       className="rounded-full justify-center shadow-lg"
                       width={200}
                       itemProp="image"
                       alt={name}/>
        </div>

        <Content>
          <h2>Hello Friends 🖖🏼</h2>
          <p>
            My name is <span itemProp="name">{name}</span>, and you’ve just found my website. Stick around and I'll tell
            you a little bit about myself, my hobbies and my interests. Don't have time? Here is a TLDR:
          </p>
          <blockquote>
            <p>I’m an experienced software developer with over two decades focusing on .NET technologies, web
              development, CI/CD automation, UX, design...among other things and dedicating a lot of time to improving
              peoples' lives with software.</p>
            <footer>
              <small className="text-sm">–Michael</small>
            </footer>
          </blockquote>

          <h2>The Early Years 🐣</h2>
          <p></p>

          <h2>Contact Me 📬</h2>

        </Content>
      </section>
    </Page>
  )
};

export default About;