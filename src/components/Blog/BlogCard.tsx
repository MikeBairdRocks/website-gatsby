import React from "react";
import {Link, navigate} from "gatsby";
import Date from "./Date";
import "../../common/StringExtensions";
import {GatsbyImage, IGatsbyImageData, StaticImage} from "gatsby-plugin-image";
import {MarkdownRemark} from "../../../types/graphql-types";
import TagLinks from "./TagLinks";

type BlogCardProps = {
  post: MarkdownRemark;
  featured?: boolean;
  descriptionLimit?: number;
};

const BlogCard: React.FunctionComponent<BlogCardProps> = (props) => {
  const featured = props.featured ?? false;
  const bgColor = featured ? "bg-indigo-800" : "bg-gray-100 dark:bg-gray-800";
  const headTextColor = featured ? "text-white" : "text-gray-800 dark:text-white";
  const bodyTextColor = featured ? "text-white" : "text-gray-700 dark:text-gray-300";
  const timestampColor = featured ? "text-gray-300" : "text-gray-600 dark:text-gray-300";
  const tagColor = featured ? "text-indigo-200" : "text-indigo-800 dark:text-indigo-400";

  const post = props.post;
  const frontmatter = post.frontmatter;
  const author = frontmatter?.author as string;
  const title = frontmatter?.title ?? "";
  const description = frontmatter?.description ?? "";
  const slug = `/blog/${frontmatter?.slug}` ?? "";
  const date = frontmatter?.date ?? "";
  const readingTime = `${post?.timeToRead} MIN READ` ?? "";
  const image: IGatsbyImageData = frontmatter?.image?.childImageSharp?.gatsbyImageData as IGatsbyImageData;

  const goToPost = (event: React.MouseEvent, slug: string) => {
    event.preventDefault();
    event.stopPropagation();

    if (slug) {
      navigate(slug);
    }
  };

  return (
    <div onClick={e => goToPost(e, slug)} className="cursor-pointer w-full transition duration-200 ease-in-out transform hover:scale-105" title={title} aria-label={description}>
      <div className={`relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-xl p-2 ${bgColor}`}>
        <GatsbyImage imgClassName="rounded-lg" alt={title} image={image} loading="eager" objectFit="cover" />

        <blockquote className="relative p-4 mb-2">
          <div className="text-sm mb-3">
            <TagLinks className={tagColor} tags={props.post.frontmatter?.tags as string[]} />
          </div>
          <h1 className={`text-xl font-bold truncate ${headTextColor}`}>{title}</h1>
          <p className={`text-md font-light mt-2 line-clamp-2 ${bodyTextColor}`}>{description}</p>
          <div className="flex items-center space-x-3 mt-10">
            <div className="inline-flex w-10 h-10">
              <StaticImage width={40} className='w-10 h-10 object-cover rounded-full' src="../../images/michael-baird.jpg" alt={author} />
            </div>
            <div>
              <p className={`${headTextColor} text-sm`}>{author}</p>
              <p className={`${timestampColor} text-sm font-semibold tracking-wide`}>
                <Date value={date} /> • {readingTime}
              </p>
            </div>
          </div>
        </blockquote>
      </div>
    </div>
  );
};

export default BlogCard;