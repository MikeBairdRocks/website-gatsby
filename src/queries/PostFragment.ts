import {graphql} from "gatsby";

export const PostFragment = graphql`
    fragment Post on MarkdownRemark {
        id
        excerpt(pruneLength: 200)
        html
        timeToRead
        frontmatter {
            title
            description
            tags
            slug
            date
            image {
                childImageSharp {
                    gatsbyImageData(height: 300, aspectRatio: 1.778)
                }
            }
        }
    }
`;
