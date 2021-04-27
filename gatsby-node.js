const createPosts = (actions, posts) => {
  const postTemplate = require.resolve("./src/templates/post.tsx");
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;
    const path = `/blog/${post.node.frontmatter.slug}`;

    actions.createPage({
      path: path,
      component: postTemplate,
      context: {
        slug: post.node.frontmatter.slug,
        previous,
        next
      }
    });
  });
};

const createTags = (actions, tags) => {
  const tagTemplate = require.resolve("./src/templates/tag.tsx");
  tags.forEach((tag, index) => {
    const path = `/tag/${tag}`;
    actions.createPage({
      path: path,
      component: tagTemplate,
      context: {
        tag: tag
      }
    });
  });
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
      {
          tags: allMarkdownRemark {
            distinct(field: frontmatter___tags)
          }
          posts: allMarkdownRemark(
              filter: {frontmatter: {date: {ne: null}}}
              sort: {order: DESC, fields: [frontmatter___date]}) {
              edges {
                  node {
                      frontmatter {
                          slug
                      }
                  }
              }
          }
      }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your blog posts`, result.errors);
    return;
  }

  const data = result.data;

  createTags(actions, data.tags.distinct);
  createPosts(actions, data.posts.edges);
}