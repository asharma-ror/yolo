import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

interface MetaObject {
  name: string
  content: string
}

interface SEOProps {
  description?: string
  lang?: string
  meta?: MetaObject[]
  title: string
  noIndex?: boolean
  noFollow?: boolean
}

const defaultProps = {
  lang: "it",
}

const SEO = ({
  description,
  meta,
  title,
  noIndex,
  noFollow,
  lang = defaultProps.lang,
}: SEOProps) => {
  const { site } = useStaticQuery(
    graphql`
      query SEO {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )

  const metaDescription = description ?? site.siteMetadata.description
  const robots = [
    noIndex ? "noindex" : "index",
    noFollow ? "nofollow" : "follow",
  ].join(", ")

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: "description",
          content: metaDescription,
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: metaDescription,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "robots",
          content: robots,
        },
      ].concat(meta ?? [])}
    />
  )
}

export default SEO
