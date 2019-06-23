module.exports = {
  siteMetadata: {
    title: `DanckelApp`,
    description: ``,
    author: `Dorothea Wiemann & David Pogorzelski`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `DanckelApp`,
        short_name: `DanckelApp`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `fullscreen`,
        icon: `src/images/dd.png`, // This path is relative to the root of the site.
        gcm_sender_id: '482941778795',
        gcm_sender_id_comment: 'Do not change the GCM Sender ID',
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    'gatsby-plugin-offline',
  ],
};
