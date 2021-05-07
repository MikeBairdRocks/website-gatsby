import {graphql} from "gatsby";

export const PostFeaturedFragment = graphql`
    fragment PostFeatured on MarkdownRemark {
        id
        excerpt(pruneLength: 400)
        timeToRead
        frontmatter {
            title
            description
            tags
            slug
            date
            image {
                childImageSharp {
                    gatsbyImageData(
                        height: 225,
                        layout: CONSTRAINED,
                        aspectRatio: 1.778,
                        placeholder: BLURRED
                    )
                }
            }
        }
    }
`;