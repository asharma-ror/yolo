import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { SitePage } from "../../types/contents"
import {
  SitePages,
  SitePages_allSitePage_nodes as SitePageNodes, // eslint-disable-line
} from "../../__generated__/SitePages"

export const SitePagesContext = React.createContext<SitePage[]>([])

const toSitePage = (page: SitePageNodes): SitePage => ({
  id: page.context?.id ?? "",
  path: page.path,
  source: page.context?.source ?? "",
})

export const SitePagesProvider = ({ children }: any) => {
  const { allSitePage } = useStaticQuery<SitePages>(graphql`
    query SitePages {
      allSitePage {
        nodes {
          path
          context {
            id
            source
          }
        }
      }
    }
  `)

  return (
    <SitePagesContext.Provider value={allSitePage.nodes.map(toSitePage)}>
      {children}
    </SitePagesContext.Provider>
  )
}
