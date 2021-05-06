module.exports = {
  siteMetadata: {
    title: "Michael Baird",
    siteUrl: "https://baird.rocks/",
    description: "I’m an experienced software developer, focusing on code quality.",
    author: {
      name: "Michael Baird"
    },
    social: [
      {type: "Twitter", url: "https://twitter.com/MikeBairdRocks", username: "@MikeBairdRocks"},
      {type: "Github", url: "https://github.com/MikeBairdRocks"},
      {type: "LinkedIn", url: "https://linkedin.com/in/MikeBairdRocks"},
      {type: "StackOverflow", url: "https://stackoverflow.com/users/131076/michael-baird"},
    ]
  },
  plugins: [
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({query: {site, allMarkdownRemark}}) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.slug,
                  custom_elements: [{"content:encoded": edge.node.html}],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  filter: {frontmatter: {date: {ne: null}}}
                  sort: {order: DESC, fields: [frontmatter___date]}) {
                  edges {
                    node {
                      excerpt
                      html
                      frontmatter {
                      slug
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/feed.xml",
            title: "Baird.rocks's RSS Feed",
            match: "^/blog/"
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/
        }
      }
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Michael Baird's Website",
        short_name: "baird.rocks",
        theme_color: "#1a202c",
        start_url: "/",
        background_color: "#434190",
        display: "standalone",
        icon: "src/images/icon.png",
        icon_options: {
          purpose: `any maskable`
        },
      }
    },
    {
      resolve: "gatsby-plugin-offline",
      options: {}
    },
    "gatsby-transformer-json",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./content/data/`,
      },
    },
    {
      resolve: "gatsby-plugin-graphql-codegen",
      options: {
        codegen: true,
        fileName: `types/graphql-types.d.ts`,
      }
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require("tailwindcss"),
          require("./tailwind.config.js")
        ],
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: true,
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
              escapeEntities: {},
            },
          },
        ],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "blog",
        path: `${__dirname}/content/blog`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    }
  ],
};
