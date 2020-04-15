import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { CommonIcons } from "../../__generated__/CommonIcons"

export const IconsContext = React.createContext<Icons>({
  product: {
    star: "",
    treatment: "",
    ranking: "",
  },
})

export const IconsContextProvider = ({ children }: any) => {
  const icons = useStaticQuery<CommonIcons>(
    graphql`
      query CommonIcons {
        prismicCommonIcons {
          data {
            product_ranking {
              url
            }
            product_star {
              url
            }
            product_treatment {
              url
            }
          }
        }
      }
    `
  )
  return (
    <IconsContext.Provider
      value={{
        product: {
          star: icons.prismicCommonIcons?.data?.product_star?.url ?? "",
          ranking: icons.prismicCommonIcons?.data?.product_ranking?.url ?? "",
          treatment:
            icons.prismicCommonIcons?.data?.product_treatment?.url ?? "",
        },
      }}
    >
      {children}
    </IconsContext.Provider>
  )
}

export interface Icons {
  product: {
    star: string
    treatment: string
    ranking: string
  }
}
