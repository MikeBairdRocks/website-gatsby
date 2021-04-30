import React from "react";
import {Helmet} from "react-helmet";
import {SocialType} from "../queries/SiteMetaData";
import {graphql, useStaticQuery} from "gatsby";
import {SiteMetaQuery, SiteSiteMetadata} from "../../types/graphql-types";

export enum TwitterCard {
  summary,
  summary_large_image,
  app,
  player
}

type MetaProps = {
  title?: string
  description?: string
  url?: string
  image?: string
  twitterCard?: TwitterCard
};




const Meta: React.FunctionComponent<MetaProps> = ({
                                                    title = "",
                                                    description = "",
                                                    url = "",
                                                    image = "/images/michael-baird2.jpg",
                                                    twitterCard = TwitterCard.summary_large_image,
                                                  }) => {

  const data = useStaticQuery<SiteMetaQuery>(graphql`
      query SiteMeta {
          site {
              siteMetadata {
                  title
                  siteUrl
                  description
                  social {
                      type
                      url
                      username
                  }
              }
          }
      }
  `);

  let siteMetadata = data.site?.siteMetadata as SiteSiteMetadata;
  let siteUrl = siteMetadata.siteUrl;
  let twitter = siteMetadata?.social?.find(x => x?.type == SocialType.Twitter);
  image = image?.substr(0, 4) === "http" ? image : `${siteUrl}${image}`;
  const pathWithSlash = url[url.length - 1] === "/" ? url : `${url}/`;
  title = title !== "" ? `${title} | ${siteMetadata.title as string}` : siteMetadata.title as string;
  return (
    <Helmet htmlAttributes={{lang: "en"}}>
      <title>{title}</title>

      <meta name="title" content={title}/>
      <meta name="description" content={description}/>

      <meta name="theme-color" content="#1a202c"/>
      <meta itemProp="name" content={title}/>
      <meta itemProp="description" content={description}/>
      <meta itemProp="image" content={image}/>

      {/* OpenGraph */}
      <meta name="og:site_name" content={siteMetadata.title as string}/>
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website"/>
      <meta property="og:url" content={`${siteUrl}/${pathWithSlash}`}/>
      <meta property="og:title" content={title}/>
      <meta property="og:description" content={description}/>
      <meta property="og:image" content={image}/>

      {/* Twitter Card */}
      <meta name="twitter:card" content={TwitterCard[twitterCard]}/>
      <meta name="twitter:url" content={`${siteUrl}/${pathWithSlash}`}/>
      <meta name="twitter:title" content={title}/>
      <meta name="twitter:description" content={description}/>
      <meta property="twitter:image:src" content={image}/>
      <meta property="twitter:image:alt" content={description}/>
      <meta name="twitter:site" content={twitter?.url as string}/>
      <meta name="twitter:creator" content={twitter?.username as string}/>

      <link rel="shortcut icon" href="/favicon.ico"/>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x.png"/>
    </Helmet>
  );
};

export default Meta;