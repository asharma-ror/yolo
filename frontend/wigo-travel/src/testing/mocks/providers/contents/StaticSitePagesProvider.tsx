import React from "react"
import { SitePagesContext } from "../../../../context/contents/sitePagesContext"
import { SitePage } from "../../../../types/contents"

interface Props {
  children: React.ReactNode
}

const fakePages: SitePage[] = [
  {
    id: "1",
    path: "/",
    source: "mock",
  },
  {
    id: "2",
    path: "/page",
    source: "mock",
  },
]

const StaticSitePagesProvider = ({ children }: Props) => (
  <SitePagesContext.Provider value={fakePages}>
    {children}
  </SitePagesContext.Provider>
)

export { StaticSitePagesProvider }
