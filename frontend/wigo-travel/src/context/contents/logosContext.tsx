import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { BrandLogos } from "../../__generated__/BrandLogos"

export const LogosContext = React.createContext<Logos>({
  primary: {
    default: undefined,
    background: undefined,
    negative: undefined,
  },
  light: {
    default: undefined,
    background: undefined,
    negative: undefined,
  },
})

export const LogosProvider = ({ children }: any) => {
  const logos = useStaticQuery<BrandLogos>(
    graphql`
      query BrandLogos {
        prismicLogos {
          data {
            primary {
              url
            }
            primary_background {
              url
            }
            primary_negative {
              url
            }
            light {
              url
            }
            light_background {
              url
            }
          }
        }
      }
    `
  )
  return (
    <LogosContext.Provider
      value={{
        primary: {
          default: logos.prismicLogos?.data?.primary?.url ?? "",
          background: logos.prismicLogos?.data?.primary_background?.url ?? "",
          negative: logos.prismicLogos?.data?.primary_negative?.url ?? "",
        },
        light: {
          default: logos.prismicLogos?.data?.light?.url ?? "",
          background: logos.prismicLogos?.data?.light_background?.url ?? "",
          negative: "",
        },
      }}
    >
      {children}
    </LogosContext.Provider>
  )
}

export interface Logos {
  primary: LogoSet
  light: LogoSet
}

export interface LogoSet {
  default: string | undefined
  background: string | undefined
  negative: string | undefined
}
