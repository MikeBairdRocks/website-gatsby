const postTemplate = require.resolve("./src/templates/post.tsx");

exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
      {
          allMarkdownRemark {
              edges {
                  node {
                      id
                      excerpt
                      frontmatter {
                          author
                          date
                          description
                          tags
                          title
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
  const posts = data.allMarkdownRemark.edges;

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
}