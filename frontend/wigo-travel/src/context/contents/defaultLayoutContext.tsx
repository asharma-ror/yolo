import React from "react"
import { LayoutData } from "../../types/contents"
import { useStaticQuery, graphql } from "gatsby"
import {
  DefaultLayoutContents,
  DefaultLayoutContents_prismicStandardHeader as PrismicStandardHeader,
  DefaultLayoutContents_prismicStandardFooter as PrismicStandardFooter,
  DefaultLayoutContents_prismicStandardFooterBodySocialLinks as PrismicStandardFooterSocialLinks,
} from "../../__generated__/DefaultLayoutContents"
import { toHeader } from "../../converters/prismic/standardHeaderConverter"
import { toFooter } from "../../converters/prismic/standardFooterConverter"

export const LayoutContext = React.createContext<LayoutData>({
  header: {
    links: [],
    labels: {
      loginMenuName: "",
    },
  },
  footer: {},
})

export const LayoutContextProvider = ({ children }: any) => {
  const {
    prismicStandardHeader,
    prismicStandardFooter,
    prismicStandardFooterBodySocialLinks,
  } = useStaticQuery<DefaultLayoutContents>(
    graphql`
      query DefaultLayoutContents {
        prismicStandardHeader {
          data {
            body {
              ... on PrismicStandardHeaderBodyMenuLink {
                items {
                  link {
                    url
                    target
                    id
                    link_type
                  }
                  name {
                    text
                  }
                }
              }
            }
            login_menu_name {
              text
            }
          }
        }
        prismicStandardFooter {
          data {
            newsletter_box_title {
              text
            }
            newsletter_box_disclaimer {
              html
            }
            newsletter_input_placeholder {
              text
            }
            newsletter_input_cta_text {
              text
            }
            newsletter_subscribed_message {
              html
            }
            company_name {
              text
            }
            company_info {
              html
            }
            body {
              ... on PrismicStandardFooterBodySocialLinks {
                slice_type
                primary {
                  title {
                    html
                  }
                }
                items {
                  icon {
                    url
                  }
                  url {
                    url
                  }
                }
              }
            }
            body1 {
              ... on PrismicStandardFooterBody1FooterLink {
                items {
                  link_address {
                    id
                    url
                    link_type
                    target
                  }
                  link_title {
                    text
                  }
                }
              }
            }
          }
        }
        prismicStandardFooterBodySocialLinks {
          primary {
            title {
              html
            }
          }
          items {
            icon {
              url
            }
            url {
              url
            }
          }
        }
      }
    `
  )

  return (
    <LayoutContext.Provider
      value={{
        header: toHeader(prismicStandardHeader as PrismicStandardHeader),
        footer: toFooter(
          prismicStandardFooter as PrismicStandardFooter,
          prismicStandardFooterBodySocialLinks as PrismicStandardFooterSocialLinks
        ),
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}
