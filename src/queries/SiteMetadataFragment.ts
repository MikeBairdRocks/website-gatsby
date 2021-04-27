import {graphql} from "gatsby";

export const SiteMetadataFragment = graphql`
    fragment SiteMetadata on SiteSiteMetadata {
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
`;