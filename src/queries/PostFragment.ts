import {graphql} from "gatsby";

export const PostFragment = graphql`
    fragment Post on MarkdownRemark {
        id
        excerpt(pruneLength: 200)
        html
        timeToRead
        frontmatter {
            title
            author
            description
            tags
            slug
            date
            image {
                childImageSharp {
                    gatsbyImageData(
                        height: 300,
                        layout: FULL_WIDTH,
                        aspectRatio: 1.778
                        placeholder: BLURRED
                    )
                }
            }
        }
    }
`;

