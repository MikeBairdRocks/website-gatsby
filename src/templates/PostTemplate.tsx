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
import { DiscussionEmbed } from "disqus-react";

type PostProps = {
  readonly data: BlogPostBySlugQuery
  readonly pageContext: {
    previous?: any
    next?: any
  }
};

const PostTemplate: React.FunctionComponent<PostProps> = (props) => {
  useEffect(() => {
  }, []);

  const post = {
    title: props.data.post?.frontmatter?.title as string,
    description: props.data.post?.frontmatter?.description as string,
    html: props.data.post?.html as string,
    date: props.data.post?.frontmatter?.date as string,
    slug: `blog/${props.data.post?.frontmatter?.slug}`,
    canonical: ``,
    readingTime: `${props.data.post?.timeToRead} MIN READ`,
    image: props.data.post?.frontmatter?.image?.childImageSharp?.gatsbyImageData as IGatsbyImageData,
    tags: props.data.post?.frontmatter?.tags as string[]
  };

  const imageSource = getSrc(post.image);

  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME as string,
    config: {
      identifier: post.slug,
      title: post.title
    },
  };

  console.log(disqusConfig);

  return (
    <Layout navbarTransparent={true}>
      <Meta title={post.title} description={post.description} url={post.slug} image={imageSource}/>

      <HeroSplash label={post.title} image={post.image} minHeight="50vh">
        <h1 className="text-white font-semibold text-5xl">{post.title}</h1>
        <p className="text-sm font-bold mt-5 text-gray-400">
          <Date value={post.date}/> • {post.readingTime}
        </p>
        <p className="mt-5">
          <TagLinks className="text-indigo-500 hover:text-indigo-600" tags={post.tags}/>
        </p>
      </HeroSplash>

      <article className="pb-20">
        <Content>
          <section>
            <div dangerouslySetInnerHTML={{__html: post.html}}></div>
          </section>
          <section className="mt-10">
            <h2 className="text-white font-semibold text-2xl">Comments</h2>
            <DiscussionEmbed shortname={disqusConfig.shortname} config={disqusConfig.config} />
          </section>
        </Content>
      </article>
    </Layout>
  );
};

export const postQuery = graphql`
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

export default PostTemplate;