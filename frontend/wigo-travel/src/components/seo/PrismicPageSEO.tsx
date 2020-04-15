import React from "react"
import SEO from "./SEO"

interface Props {
  page: any
}

const getSeoElement = (page: any) => {
  return page?.data?.body?.find((x: any) => x.slice_type === "seo")?.primary
}

const PrismicPageSEO = ({ page }: Props) => {
  const seo = getSeoElement(page)
  return (
    <SEO
      title={seo?.seo_title?.text}
      description={seo?.seo_description?.text}
      noIndex={seo?.seo_no_index}
      noFollow={seo?.seo_no_follow}
    />
  )
}

export default PrismicPageSEO
