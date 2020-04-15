import { graphql } from "gatsby"
import React from "react"
import EditorialContainer from "../containers/editorial/EditorialContainer"
import PrismicPageSEO from "../components/seo/PrismicPageSEO"
const EditorialPage = ({ data: { prismicEditorialPage } }: any) => {
  return (
    <>
      <PrismicPageSEO page={prismicEditorialPage} />
      <EditorialContainer page={prismicEditorialPage} />
    </>
  )
}

export default EditorialPage

export const pageQuery = graphql`
  query EditorialPage($uid: String!) {
    prismicEditorialPage(uid: { eq: $uid }) {
      uid
      data {
        title {
          html
        }
        content {
          html
        }
        body {
          ... on PrismicEditorialPageBodySeo {
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
      }
    }
  }
`
