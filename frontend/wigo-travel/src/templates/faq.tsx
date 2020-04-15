import { graphql } from "gatsby"
import React from "react"
import FaqContainer from "../containers/faq/FaqContainer"
import PrismicPageSEO from "../components/seo/PrismicPageSEO"

export const FaqPage = ({ data: { prismicFaqPage } }: any) => {
  return (
    <>
      <PrismicPageSEO page={prismicFaqPage} />
      <FaqContainer page={prismicFaqPage} />
    </>
  )
}

export default FaqPage

export const pageQuery = graphql`
  query Faq {
    prismicFaqPage {
      data {
        title {
          html
        }
        description {
          html
        }
        body {
          ... on PrismicFaqPageBodySeo {
            slice_type
            primary {
              seo_title {
                text
              }
              seo_description {
                text
              }
              seo_no_index
              seo_no_follow
            }
          }
        }
        body1 {
          ... on PrismicFaqPageBody1Question {
            items {
              question {
                html
              }
              answer {
                html
              }
            }
          }
        }
      }
    }
  }
`
