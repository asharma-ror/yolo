import { graphql } from "gatsby"
import React from "react"
import ErrorContainer from "../containers/error/ErrorContainer"
import SEO from "../components/seo/SEO"
const ErrorPage = ({ data: { prismicErrorPage } }: any) => {
  return (
    <>
      <SEO title={prismicErrorPage.data.title.text} noIndex />
      <ErrorContainer page={prismicErrorPage} />
    </>
  )
}

export default ErrorPage

export const pageQuery = graphql`
  query ErrorPage($uid: String!) {
    prismicErrorPage(uid: { eq: $uid }) {
      uid
      data {
        body {
          html
        }
        title {
          html
          text
        }
      }
    }
  }
`
