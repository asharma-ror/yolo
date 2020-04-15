import { graphql } from "gatsby"
import React from "react"
import { LandingPage_prismicLandingPage } from "../__generated__/LandingPage" // eslint-disable-line
import LandingContainer from "../containers/landing/LandingContainer"
import { toHeroData } from "../converters/prismic/heroConverter"
import { toContents } from "../converters/prismic/landingContentsConverter"
import PrismicPageSEO from "../components/seo/PrismicPageSEO"

interface Props {
  data: {
    prismicLandingPage: LandingPage_prismicLandingPage // eslint-disable-line
  }
}

const LandingPage = ({ data: { prismicLandingPage } }: Props) => {
  const hero = toHeroData(prismicLandingPage.data?.wide?.document)
  const contents = prismicLandingPage.data?.contents
    ? toContents(prismicLandingPage.data?.contents)
    : []
  return (
    <>
      <PrismicPageSEO page={prismicLandingPage} />
      <LandingContainer hero={hero} contents={contents} />
    </>
  )
}

export default LandingPage

export const pageQuery = graphql`
  query LandingPage($uid: String!) {
    prismicLandingPage(uid: { eq: $uid }) {
      uid
      data {
        body {
          ... on PrismicLandingPageBodySeo {
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
        contents {
          content {
            type
            document {
              ... on PrismicInfoBlock {
                id
                data {
                  box_body_right_padding
                  box_title_right_padding
                  boxes {
                    box_content {
                      html
                    }
                    box_image {
                      localFile {
                        childImageSharp {
                          fixed {
                            ...GatsbyImageSharpFixed_withWebp
                          }
                          fluid {
                            ...GatsbyImageSharpFluid_withWebp
                          }
                        }
                      }
                    }
                    box_image_size
                    box_title {
                      html
                    }
                  }
                  title {
                    html
                  }
                  subtitle {
                    html
                  }
                  layout
                  title_padding_right
                  subtitle_right_padding
                }
              }
              ... on PrismicOffersGroup {
                id
                data {
                  offers {
                    offer {
                      document {
                        ... on PrismicOfferBox {
                          data {
                            title {
                              html
                            }
                            subtitle {
                              html
                            }
                            cta_text {
                              text
                            }
                            description {
                              html
                            }
                            image {
                              alt
                              localFile {
                                childImageSharp {
                                  fluid {
                                    ...GatsbyImageSharpFluid_withWebp
                                  }
                                }
                              }
                            }
                            price {
                              html
                            }
                            price_prefix {
                              html
                            }
                            product {
                              document {
                                ... on PrismicProduct {
                                  type
                                  uid
                                  data {
                                    price_info {
                                      text
                                    }
                                    product_ranking
                                    product_ranking_label {
                                      text
                                    }
                                    treatment_name {
                                      html
                                    }
                                  }
                                }
                              }
                            }
                            color
                          }
                        }
                      }
                    }
                  }
                  title {
                    html
                  }
                }
              }
            }
          }
        }
        wide {
          id
          document {
            ... on PrismicHeroImage {
              data {
                image {
                  alt
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 2000, maxHeight: 800, quality: 80) {
                        ...GatsbyImageSharpFluid_withWebp_tracedSVG
                      }
                    }
                  }
                }
                subtitle {
                  html
                }
                title {
                  html
                }
                subtitle_style
                title_style
                cta_link {
                  url
                  link_type
                  id
                  target
                }
                cta_name {
                  text
                }
              }
            }
          }
        }
      }
    }
  }
`
