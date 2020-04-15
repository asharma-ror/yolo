import { resolve } from "path"
import { GatsbyCreatePages, PageTemplateParameters } from "./types"
import { createPagePath } from "./routing"

export const createPages: GatsbyCreatePages = async ({
  graphql,
  boundActionCreators,
}: any) => {
  const { createPage } = boundActionCreators

  const generatePageFromTemplate = (
    templateParameters: PageTemplateParameters
  ) => {
    const path = createPagePath(templateParameters.edge.node)
    console.log(`Generating page -> ${path}`)
    return createPage({
      path,
      component: resolve(templateParameters.template),
      context: {
        source: "prismic",
        id: templateParameters.edge.node.prismicId,
        uid: templateParameters.edge.node.uid,
        type: templateParameters.edge.node.type,
      },
    })
  }

  const productPages = await graphql(`
    query ProductPages {
      allPrismicProduct {
        edges {
          node {
            prismicId
            uid
            type
          }
        }
      }
    }
  `)

  productPages.data.allPrismicProduct.edges.forEach((edge: any) =>
    generatePageFromTemplate({
      edge,
      template: "src/templates/product.tsx",
    })
  )

  const errorPages = await graphql(`
    query ErrorPages {
      allPrismicErrorPage {
        edges {
          node {
            prismicId
            uid
            type
            data {
              category {
                uid
              }
            }
          }
        }
      }
    }
  `)

  errorPages.data.allPrismicErrorPage.edges.forEach((edge: any) =>
    generatePageFromTemplate({
      edge,
      template: "src/templates/error.tsx",
    })
  )

  const landingPages = await graphql(`
    query LandingPages {
      allPrismicLandingPage {
        edges {
          node {
            prismicId
            uid
            type
            data {
              category {
                uid
              }
            }
          }
        }
      }
    }
  `)

  landingPages.data.allPrismicLandingPage.edges.forEach((edge: any) =>
    generatePageFromTemplate({
      edge,
      template: "src/templates/landing.tsx",
    })
  )

  const editorialPages = await graphql(`
    query EditorialPages {
      allPrismicEditorialPage {
        edges {
          node {
            prismicId
            uid
            type
            data {
              category {
                uid
              }
            }
          }
        }
      }
    }
  `)

  editorialPages.data.allPrismicEditorialPage.edges.forEach((edge: any) =>
    generatePageFromTemplate({
      edge,
      template: "src/templates/editorial.tsx",
    })
  )

  const faqPages = await graphql(`
    query FaqPages {
      allPrismicFaqPage {
        edges {
          node {
            prismicId
            uid
            type
          }
        }
      }
    }
  `)

  faqPages.data.allPrismicFaqPage.edges.forEach((edge: any) =>
    generatePageFromTemplate({
      edge,
      template: "src/templates/faq.tsx",
    })
  )

  const sitemapPages = await graphql(`
    query SitemapPages {
      allPrismicSitemap {
        edges {
          node {
            prismicId
            uid
            type
          }
        }
      }
    }
  `)

  sitemapPages.data.allPrismicSitemap.edges.forEach((edge: any) =>
    generatePageFromTemplate({
      edge,
      template: "src/templates/sitemap.tsx",
    })
  )
}
