import { graphql } from "gatsby"
import React from "react"
import LandingContainer from "../containers/landing/LandingContainer"
import { HomeQuery_prismicHome as PrismicHome } from "../__generated__/HomeQuery"
import { toHeroData } from "../converters/prismic/heroConverter"
import { toContents } from "../converters/prismic/landingContentsConverter"
import PrismicPageSEO from "../components/seo/PrismicPageSEO"
import SearchWidgetDialog from "../components/sections/search/SearchWidgetDialog"
import { ThemeProvider } from "@material-ui/styles"
import theme from "../themes/default"

interface Props {
  data: {
    prismicHome: PrismicHome
  }
}

export const IndexPage = ({ data: { prismicHome } }: Props) => {
  const [open, setOpen] = React.useState(false)
  const hero = toHeroData(prismicHome.data?.wide?.document, () => setOpen(true))
  const contents = prismicHome.data?.contents
    ? toContents(prismicHome.data?.contents)
    : []
  return (
    <>
      <PrismicPageSEO page={prismicHome} />
      <LandingContainer hero={hero} contents={contents} />
      <ThemeProvider theme={theme}>
        <SearchWidgetDialog open={open} onClose={() => setOpen(false)} />
      </ThemeProvider>
    </>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query HomeQuery {
    prismicHome {
      id
      data {
        body {
          ... on PrismicHomeBodySeo {
            primary {
              seo_description {
                text
              }
              seo_no_follow
              seo_no_index
              seo_title {
                text
              }
            }
            slice_type
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
