import React, {useEffect} from "react";
import Date from "../components/Blog/Date";
import {getSrc, IGatsbyImageData} from "gatsby-plugin-image";
import HeroSplash from "../components/HeroSplash";
import {graphql} from "gatsby";
import {BlogPostBySlugQuery} from "../../types/graphql-types";
import Layout from "../components/Layout";
import Meta from "../components/Meta";
import TagLinks from "../components/Blog/TagLinks";
import Content from "../components/Content";

type PostProps = {
  readonly data: BlogPostBySlugQuery
  readonly pageContext: {
    previous?: any
    next?: any
  }
};

const Post: React.FunctionComponent<PostProps> = (props) => {
  useEffect(() => {
  }, []);

  const post = {
    title: props.data.post?.frontmatter?.title as string,
    description: props.data.post?.frontmatter?.description as string,
    html: props.data.post?.html as string,
    date: props.data.post?.frontmatter?.date as string,
    slug: props.data.post?.frontmatter?.slug as string,
    readingTime: `${props.data.post?.timeToRead} MIN READ`,
    image: props.data.post?.frontmatter?.image?.childImageSharp?.gatsbyImageData as IGatsbyImageData,
    tags: props.data.post?.frontmatter?.tags as string[]
  };

  const imageSource = getSrc(post.image);

  return (
    <Layout navbarTransparent={true}>
      <Meta title={post.title} description={post.description} url={`blog/${post.slug}`} image={imageSource}/>

      <HeroSplash label={post.title} image={post.image} minHeight="50vh">
        <h1 className="text-white font-semibold text-5xl">{post.title}</h1>
        <p className="text-sm font-bold mt-5 text-gray-400">
          <Date value={post.date}/> • {post.readingTime}
        </p>
        <p className="mt-5 text-indigo-500 hover:text-indigo-600">
          <TagLinks tags={post.tags}/>
        </p>
      </HeroSplash>

      <article className="pb-20">
        <Content>
          <div dangerouslySetInnerHTML={{__html: post.html}}></div>
        </Content>
      </article>
    </Layout>
  );
};

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                ...SiteMetadata
            }
        }
        post: markdownRemark(frontmatter: {slug: {eq: $slug}}) {
            ...Post
        }
    }
`;

export default Post;