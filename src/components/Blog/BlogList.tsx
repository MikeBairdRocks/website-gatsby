import BlogCard from "./BlogCard";
import React from "react";
import {MarkdownRemark} from "../../../types/graphql-types";

type BlogListProps = {
  posts: MarkdownRemark[];
};

const BlogList: React.FunctionComponent<BlogListProps> = (props) => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap">
        {props.posts.map((post) => (
          <div key={post.frontmatter?.slug} className="flex w-full md:w-4/12 px-4">
            <BlogCard post={post} descriptionLimit={15}  />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;