import { graphql } from "gatsby"
import React from "react"
import SitemapContainer from "../containers/sitemap/SitemapContainer"
import PrismicPageSEO from "../components/seo/PrismicPageSEO"

export const SitemapPage = ({ data: { prismicSitemap } }: any) => {
  return (
    <>
      <PrismicPageSEO page={prismicSitemap} />
      <SitemapContainer page={prismicSitemap} />
    </>
  )
}

export default SitemapPage

export const pageQuery = graphql`
  query Sitemap {
    prismicSitemap {
      data {
        title {
          html
        }
        content {
          html
        }
        body {
          ... on PrismicSitemapBodySeo {
            id
            slice_type
            primary {
              seo_no_index
              seo_no_follow
              seo_description {
                text
              }
              seo_title {
                text
              }
            }
          }
        }
      }
    }
  }
`
