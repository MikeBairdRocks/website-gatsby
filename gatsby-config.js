require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: "Michael Baird",
    siteUrl: "https://baird.rocks",
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
    "gatsby-plugin-loadable-components-ssr",
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
                const url = `${site.siteMetadata.siteUrl}/blog/${edge.node.frontmatter.slug}`;

                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: url,
                  guid: url,
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
        lang: 'en',
        background_color: "#434190",
        start_url: "/",
        display: "standalone",
        icon: "src/images/icon.png",
        icon_options: {
          purpose: `any maskable`
        },
      }
    },
    {
      resolve: "gatsby-plugin-offline",
      options: {
        workboxConfig: {
          runtimeCaching: [{
            // Use cacheFirst since these don't need to be revalidated (same RegExp
            // and same reason as above)
            urlPattern: /(\.js$|\.css$|[^:]static\/)/,
            handler: 'CacheFirst',
          },
            {
              // page-data.json files, static query results and app-data.json
              // are not content hashed
              urlPattern: /^https?:.*\/page-data\/.*\.json/,
              handler: 'StaleWhileRevalidate',
            },
            {
              // Add runtime caching of various other page resources
              urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
              handler: 'StaleWhileRevalidate',
            },
            {
              // Google Fonts CSS (doesn't end in .css so we need to specify it)
              urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
              handler: 'StaleWhileRevalidate',
            },
          ],
        }
      }
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
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaults: {
          formats: ["auto", "webp"],
          breakpoints: [320, 640, 768, 1024, 1280, 1536, 1920]
        }
      }
    },
    "gatsby-transformer-sharp",
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
    },
    {
      resolve: '@sentry/gatsby',
      options: {
        dsn: process.env.SENTRY_DSN,
        tracesSampleRate: 1
      }
    }
  ],
};
