import React from "react";
import Page from "../components/Page";
import {graphql, useStaticQuery} from "gatsby";
import {CommentPolicyQuery} from "../../types/graphql-types";
import {IGatsbyImageData} from "gatsby-plugin-image";
import {HeroSplashProps} from "../components/HeroSplash";
import Content from "../components/Content";

const CommentPolicy: React.FunctionComponent = () => {
  const data = useStaticQuery<CommentPolicyQuery>(graphql`
      query CommentPolicy {
          splashImage: file(relativePath: {eq: "troll.jpg"}) {
              childImageSharp {
                  gatsbyImageData
              }
          }
      }
  `);

  const image = data.splashImage?.childImageSharp?.gatsbyImageData as IGatsbyImageData;
  const splash: HeroSplashProps = {
    label: "No Trolls",
    image: image
  };

  return (
    <Page title="Comment Policy"
          description={""}
          splash={splash}>
      <section className="py-5">
        <Content>
          <p>Comments are welcomed and encouraged on this site, but there are some instances where comments will be edited or deleted as follows:</p>
          <ul>
            <li>Comments deemed to be spam or solely promotional in nature will be deleted. Including a link to relevant content is permitted, but comments should be relevant to the post topic.</li>
            <li>Comments including profanity will be deleted.</li>
            <li>Comments containing language or concepts that could be deemed offensive will be deleted. Note this may include abusive, threatening, pornographic, offensive, misleading or libelous language.</li>
            <li>Comments that attack an individual directly will be deleted.</li>
            <li>Comments that harass other posters will be deleted. Please be respectful toward other contributors.</li>
            <li>Anonymous comments will be deleted. We only accept comments from posters who identify themselves.</li>
            <li>Please do not put your personal blog or business website URL in the comment text unless it directly contributes to the comment and/or the conversation taking place, as it will cause your comment to be marked as spam and most likely deleted, or edited to conform to these guidelines. Do not add a website name or URL as your signature, as it will be deleted.</li>
          </ul>
        </Content>
      </section>
    </Page>
  );
};

export default CommentPolicy;