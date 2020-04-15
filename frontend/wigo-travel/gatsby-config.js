require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "production"}`,
})

module.exports = {
  siteMetadata: {
    title: `WIGO`,
    description: `WIGO travel`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-typescript`,
    {
      resolve: "gatsby-plugin-codegen",
      options: {
        apolloConfigFile: "gatsby.apollo.config.js",
        localSchemaFile: "./gatsby.schema.json",
        output: "src/__generated__",
        outputFlat: true,
        watch: process.env.NODE_ENV === "development",
      },
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Chivo`,
            variants: [`400`, `900`],
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-apollo",
      options: {
        uri: `${process.env.BACKEND_GRAPHQL_ENDPOINT}`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Where I Go`,
        short_name: `WIGO`,
        start_url: `/`,
        background_color: `#FF3333`,
        theme_color: `#FF3333`,
        display: `minimal-ui`,
        icon: `src/images/logos/wigo-primary-red-square.png`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        appendScript: require.resolve("./src/service-worker.js"),
      },
    },
    {
      resolve: "gatsby-plugin-google-marketing-platform",
      options: {
        tagmanager: {
          id: process.env.GOOGLE_TAG_MANAGER_ID,
        },
        analytics: {
          id: process.env.GOOGLE_ANALYTICS_ID,
        },
        optimize: {
          id: process.env.GOOGLE_OPTIMIZE_ID,
        },
      },
    },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `yolo-travel`,
        accessToken: `${process.env.PRISMIC_API_KEY}`,
        linkResolver: ({ node, key, value }) => page => `/${page.uid}`,
        shouldDownloadImage: ({ node, key, value }) => {
          // Return true to download the image or false to skip.
          return false
        },
        schemas: {
          common_icons: require("./src/__schemas__/common_icons.json"),
          company_info_page: require("./src/__schemas__/company_info_page.json"),
          editorial_page: require("./src/__schemas__/editorial_page.json"),
          error_category: require("./src/__schemas__/error_category.json"),
          error_page: require("./src/__schemas__/error_page.json"),
          faq_page: require("./src/__schemas__/faq_page.json"),
          hero_image: require("./src/__schemas__/hero_image.json"),
          home: require("./src/__schemas__/home.json"),
          hotel: require("./src/__schemas__/hotel.json"),
          info_block: require("./src/__schemas__/info_block.json"),
          landing_page: require("./src/__schemas__/landing_page.json"),
          logos: require("./src/__schemas__/logos.json"),
          offer_box: require("./src/__schemas__/offer_box.json"),
          offers_group: require("./src/__schemas__/offers_group.json"),
          page_category: require("./src/__schemas__/page_category.json"),
          product_destination: require("./src/__schemas__/product_destination.json"),
          product: require("./src/__schemas__/product.json"),
          sitemap: require("./src/__schemas__/sitemap.json"),
          standard_footer: require("./src/__schemas__/standard_footer.json"),
          standard_header: require("./src/__schemas__/standard_header.json"),
        },
      },
    },
    {
      resolve: "gatsby-plugin-load-script",
      options: {
        src: "https://apis.google.com/js/platform.js",
        async: true,
        defer: true,
      },
    },
    {
      resolve: "gatsby-plugin-load-script",
      options: {
        disable: false,
        src:
          "https://static.cdn.prismic.io/prismic.js?repo=yolo-travel&new=true",
        async: true,
        defer: true,
      },
    },
  ],
}
