import { graphql } from "gatsby"
import React from "react"
import ProductContainer from "../containers/product/ProductContainer"
import SEO from "../components/seo/SEO"
const Product = ({ data: { prismicProduct } }: any) => (
  <>
    <SEO title={prismicProduct.data.title.text} />
    <ProductContainer page={prismicProduct}></ProductContainer>
  </>
)

export default Product

export const pageQuery = graphql`
  query ProductBySlug($uid: String!) {
    prismicProduct(uid: { eq: $uid }) {
      uid
      data {
        product_id
        description {
          html
        }
        title {
          html
          text
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
                      fluid(maxWidth: 1500, maxHeight: 600, quality: 90) {
                        ...GatsbyImageSharpFluid_withWebp_tracedSVG
                      }
                    }
                  }
                }
                subtitle {
                  text
                }
                title {
                  text
                }
              }
            }
          }
        }
        airport_info {
          html
        }
        description {
          html
        }
        duration_info {
          html
        }
        people_info {
          html
        }
        price_info {
          html
        }
        week_info {
          html
        }
        destinations {
          destination {
            id
            document {
              ... on PrismicProductDestination {
                data {
                  description {
                    html
                  }
                  name {
                    text
                  }
                  image {
                    localFile {
                      childImageSharp {
                        fluid(maxWidth: 1500, maxHeight: 600, quality: 90) {
                          ...GatsbyImageSharpFluid_withWebp_tracedSVG
                        }
                      }
                    }
                  }
                  hotels {
                    hotel {
                      document {
                        ... on PrismicHotel {
                          id
                          data {
                            name {
                              text
                            }
                            gallery {
                              image {
                                localFile {
                                  childImageSharp {
                                    fluid(
                                      maxWidth: 1500
                                      maxHeight: 600
                                      quality: 90
                                    ) {
                                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                                    }
                                  }
                                }
                              }
                            }
                            description {
                              html
                            }
                            coordinates {
                              longitude
                              latitude
                            }
                            cover_image {
                              localFile {
                                childImageSharp {
                                  fluid(
                                    maxWidth: 1500
                                    maxHeight: 600
                                    quality: 90
                                  ) {
                                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
