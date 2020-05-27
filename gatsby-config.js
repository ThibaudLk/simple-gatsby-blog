module.exports = {
  siteMetadata: {
    title: `Simple Blog avec Gatsby`,
    description: `Un simple blog à customiser au besoin`,
    author: `DevDurable`
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-component`,
          'gatsby-remark-relative-images',
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          // `gatsby-remark-prismjs`,
          // `gatsby-remark-copy-linked-files`,
          // `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-remark-external-links`,
            options: {
              target: `_blank`
            }
          },
          {
            resolve: `@raae/gatsby-remark-oembed`,
            options: {
              providers: {
                include: ['Twitter', 'YouTube']
              }
            }
          }
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { 
        name: `mdArticles`, 
        path: `${__dirname}/mdArticles/` 
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { 
        name: `mdPages`, 
        path: `${__dirname}/mdPages/` 
      },
    },
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-styled-components',
    `gatsby-plugin-netlify-cms`,
    {
      resolve: "gatsby-plugin-less",
      options: {
        modifyVars: require("./src/theme/antd.js"),
        // Needed to load antdesign less files.
        javascriptEnabled: true,
      },
    },
    {
      resolve: "gatsby-plugin-antd",
      options: {
        // Activate less files
        style: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `simple-gatsby-blog`,
        short_name: `blog`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
